import React, { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import PieChart from "../../components/PieChart/PieChart";
import Popup from "reactjs-popup";
import { PopupDate } from "../../components/PopupDate/PopupDate";
import axios from "axios";
import { Progress, Icon } from 'zarm';
import dayjs from "dayjs";
import cx from "classnames";
import { typeMap } from "../../utils/utils";
import { Idata } from "../../types/types";
import './Statistics.scss';

const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_3668999_ocqu5v5w59g.js');
export const Statistics = () => {
    const [pieType, setPieType] = useState('expense');
    const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'));
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalType, setType] = useState('expense');
    const [expenseData, setExpenseData] = useState<Idata[]>([]);
    const [incomeData, setIncomeData] = useState<Idata[]>([]);
    const [chartData, setChartData] = useState<Idata[]>([]);
    useEffect(() => {
        getBillList();
      }, [currentMonth])
    
      const selectMonth = (item : string) => {
        setCurrentMonth(item);
      }
    
      const changePieType = (type : string) => {
        setPieType(type);
        setType(type);
        setChartData(type == 'expense' ? expenseData : incomeData);
      }
      const getBillList = async () => {
        const { data } = await axios.get(`/api/bill/data?date=${currentMonth}`);
        console.log(data);
        setTotalExpense(data.totalExpense);
        setTotalIncome(data.totalIncome);
        const totalData : Idata[] = data.total_data
        let expense_data = totalData.filter(item => item.pay_type == 1).sort((a, b) => b.number - a.number);
        let income_data = totalData.filter(item => item.pay_type == 2).sort((a, b) => b.number - a.number);
        expense_data = expense_data.map(item => {
          return {
            ...item,
            payType: item.pay_type.toString(),
            percent: Number(Number((item.number / Number(data.totalExpense)) * 100).toFixed(2))
          }
        })
    
        income_data = income_data.map(item => {
          return {
            ...item,
            payType: item.pay_type.toString(),
            percent: Number(Number((item.number / Number(data.totalIncome)) * 100).toFixed(2))
          }
        })
    
        setExpenseData(expense_data);
        setIncomeData(income_data);
        setChartData(pieType == 'expense' ? expense_data : income_data);
      }
      return (<div className="page">
        <div className="header">
          <span className="date">
            <Popup trigger={<span>{currentMonth} </span>}>
              <PopupDate onSelect={selectMonth} mode="month" />
            </Popup>
            <MyIcon type="icon--rili" />
          </span>
          <div className="amount">
            <span className={"expense"}>Total Expense:</span>
            <span>{totalExpense}$</span>
            <span className="income">Total Income:{totalIncome}$</span>
          </div>
    
        </div>
    
        <div className="title">
          <div>Financial Statistics</div>
          <div className="tab">
            <span  onClick={() => {changePieType('expense')}}>Expense</span>
            <span  onClick={() => {changePieType('income')}}>Income</span>
          </div>
        </div>
    
        <div className="content">
    
          <div className="pieChart">
            <PieChart chartData={chartData}/>
          </div>
          {
    
            (totalType == 'expense' ? expenseData : incomeData).map(item => <div className="item" key={item.type_id}>
              <div className="left">
                <div className="typeName">
                  <MyIcon type={typeMap[item.type_id] ? typeMap[item.type_id].icon : 'icon-qita'} />
                  <div>{item.type_name}</div>
                </div>
                <div className="typeAmount">{item.number}</div>
              </div>
              <div className="right">
                <Progress
                  shape="line"
                  percent={item.percent}
                  theme='primary'
                />
              </div>
            </div>)
          }
        </div>
      </div>
      )
}