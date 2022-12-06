import { Login } from "../pages/Login/Login";
import { Home } from "../pages/Home/Home";
import { Statistics } from "../pages/Statistics/Statistics";
import { User } from "../pages/User/User";
import { Detail } from "../pages/Detail/Detail";
import { UserInfo } from "../pages/UserInfo/UserInfo";
import { UserPassword } from "../pages/UserPassword/UserPassword";
import { RouteProps } from "../types/types";
export const routes : RouteProps[] = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/statistics",
        component: Statistics
    },
    {
        path: "/user",
        component: User
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/detail",
        component: Detail
    },
    {
        path: "/user/edit",
        component: UserInfo
    },
    {
        path: "/user/password",
        component: UserPassword
    }
]