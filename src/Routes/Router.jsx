import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error from "../Pages/Error"
import AllIssues from "../Pages/AllIssues";
import IssueDetails from "../Pages/IssueDetails";
import MyIssues from "../Pages/MyIssues";
import MyContribution from "../Pages/MyContribution";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path: "/allIssues",
                Component: AllIssues
            },
            {
                path: "/issueDetails",
                element: <PrivateRoute><IssueDetails/></PrivateRoute>
            },
            {
                path: "/myIssues",
                element: <PrivateRoute><MyIssues/></PrivateRoute>
            },
            {
                path: "/myContribution",
                element: <PrivateRoute><MyContribution/></PrivateRoute>
            },
        ]
    }
])

export default router;