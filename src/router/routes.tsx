import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Statistics } from "../pages/Statistics";
import { User } from "../pages/User";
import { Detail } from "../pages/Detail";
import { UserInfo } from "../pages/UserInfo";
import { UserPassword } from "../pages/UserPassword";
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