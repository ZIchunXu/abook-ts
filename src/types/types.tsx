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