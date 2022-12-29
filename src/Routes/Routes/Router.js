import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Media from "../../Pages/Media/Media";
import Message from "../../Pages/Message/Message";
import MessageByUser from "../../Pages/Message/MessageByUser";
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";
import Register from "../../Pages/Register/Register";
import ResetPassword from "../../Pages/ResetPassword/ResetPassword";
import PostDetails from "../../Pages/SharedPages/PostDetails/PostDetails";
import UpdateUser from "../../Pages/UpdateUser/UpdateUser";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/message',
                element: <Message></Message>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/reset',
                element: <ResetPassword></ResetPassword>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/updateUser',
                element: <UpdateUser></UpdateUser>
            },
            {
                path: '/posts/:id',
                element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://mern-cial-server.vercel.app/posts/${params.id}`)
            },
            {
                path: '/users/:email',
                element: <MessageByUser></MessageByUser>,
                loader: ({ params }) => fetch(`https://mern-cial-server.vercel.app/users/${params.email}`)
            },
        ]
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    }
])