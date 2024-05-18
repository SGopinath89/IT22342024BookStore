import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../home/Shop";
import About from "../home/About";
import Login from "../home/Login";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "/shop",
                    element: <Shop/>
                },
                {
                    path: "/about",
                    element: <About/>
                },
                {
                    path: "/login",
                    element: <Login/>
                }
            ]
        },
    ]
);

export default router;