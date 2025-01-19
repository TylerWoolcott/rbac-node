import { RouteObject } from "react-router-dom";
import Login from '../components/Login'
import Dashboard from "../components/Dashboard";
import { PrivateRoute } from "./private-routes";

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element:
      <PrivateRoute
        roles={['admin', 'manager']}>
        <Dashboard />
      </PrivateRoute >
  },

]
