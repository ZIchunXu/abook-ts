export type RouteProps = {
    path: string;
    component: () => JSX.Element;
}

export interface UserData {
    username: string;
    about: string;
    avatar: string;
    password: string;
}

export interface BillData {
    user_id: string;
    pay_type: number;
    date: string;
    type_id: string;
    type_name: string;
    remark:string;
}

export interface TypeData {
    name: string;
    type: number;
    user_id: string;
}

export interface ITypeMap {
    [x:string]: {
        icon: string;
    };
}

export interface Idata {
    type_id: string;
    type_name: string;
    pay_type: number;
    number: number;
    percent: number;
}