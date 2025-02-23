import { RouteObject } from "react-router-dom";
import Login from '../components/Login'
import Dashboard from "../components/Dashboard";
import { PrivateRoute } from "./private-routes";
import Signup from "../components/Signup";
import Unathorized from "../components/Unathorized";

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/unauthorized',
    element: <Unathorized />
  },
  {
    path: '/dashboard',
    element:
      <PrivateRoute
        roles={['admin', 'manager', 'employee']}>
        <Dashboard />
      </PrivateRoute >
  },

]
