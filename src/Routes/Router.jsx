import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error from "../Pages/Error"
import AllIssues from "../Pages/ AllIssues/AllIssues";
import IssueDetails from "../Pages/IssueDetails";
import MyIssues from "../Pages/MyIssues";
import MyContribution from "../Pages/MyContribution";
import PrivateRoute from "./PrivateRoute";
import Loading from "../Components/Loading";
import AddIssue from "../Pages/AddIssue";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        errorElement: <Error />,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch("https://community-cleanliness-server-phi.vercel.app/recent-issues"),
                hydrateFallbackElement: <Loading />
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
                Component: AllIssues,
                loader: () => fetch("https://community-cleanliness-server-phi.vercel.app/issues"),
                hydrateFallbackElement: <Loading />
            },
            {
                path: "/issueDetails/:id",
                element: <PrivateRoute><IssueDetails /></PrivateRoute>,
                loader: () => fetch("https://community-cleanliness-server-phi.vercel.app/issues"),
                hydrateFallbackElement: <Loading />
            },
            {
                path: "/addIssue",
                element: <PrivateRoute><AddIssue /></PrivateRoute>
            },
            {
                path: "/myIssues",
                element: <PrivateRoute><MyIssues /></PrivateRoute>
            },
            {
                path: "/myContribution",
                element: <PrivateRoute><MyContribution /></PrivateRoute>
            },
        ]
    }
])

export default router;