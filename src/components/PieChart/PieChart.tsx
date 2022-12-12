import React from "react";
import Canvas from "@antv/f2-react";
import { Chart, Interval, Legend, PieLabel } from "@antv/f2";
import PropTypes from 'prop-types';
import { Idata } from "../../types/types";

interface PieChartProps {
    chartData: Idata[]
}
const PieChart : React.FC<PieChartProps>= ({chartData}) => {
    return (
        <div className="">
            {chartData.length > 0 ? <Canvas pixelRatio={window.devicePixelRatio}>
                <Chart
                    data={chartData}
                    coord={{
                        type: 'polar',
                        transposed: true,
                        radius: 0.75,
                    }}
                    scale={{}}
                >
                    <Interval
                        x="payType"
                        y="number"
                        adjust="stack"
                        color={{
                            field: 'type_name',
                            range: [
                                '#1890FF',
                                '#27fcfc',
                                '#a4b6f6',
                                '#F5E14C',
                                '#f76969',
                                '#8543E0',
                                '#f4bff2',
                                '#223273',
                                '#DAF7A6',
                                '#F39F6C',
                            ],
                        }}
                        selection={{
                            selectedStyle: (record) => {
                                const { yMax, yMin } = record;
                                return {
                                    r: (yMax - yMin) * 1.1,
                                };
                            },
                        }}
                    />
                    <Legend position="top" marker="square" nameStyle={{
                        fontSize: 13,
                        fill: '#000',
                    }} style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }} />
                    <PieLabel
                        label1={(data : Idata) => {
                            return {
                                text: `${data.type_name}:${data.percent}%`,
                                fill: '#808080',
                                fontWeight: 500,
                                fontSize: 10,
                            };
                        }}
                        onClick={(data : Idata) => {
                            console.log(data);
                        }}
                    />
                </Chart>
            </Canvas> : null}
        </div>
    );
};

// PieChart.propTypes = {
//     chartData: PropTypes.array,
// }

export default PieChart;