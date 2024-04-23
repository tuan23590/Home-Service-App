import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Test from "../../pages/Test";

const AuthLayout = ()=>{
   return <Outlet />
}

export default createBrowserRouter([
{
    element:<AuthLayout />,
    children:[
    {
        element : <Login />,
        path : '/login',
    },
    {
        element : <Home />,
        path : '/'
    },
    {
        element: <Test/>,
        path: '/test',
        loader: async ()=>{
            const query = `query MyQuery {
                categories {
                  name
                  id
                  type
                }
              }
              `;
            const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query
                })
            });
            const data = await res.json();
            return data;
        }
    }]
}
])