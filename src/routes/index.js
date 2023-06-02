import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"


// CA Marketing

import Users from "pages/CAMarketing/Users"
import Customers from "pages/CAMarketing/Customers"
import Banner from "pages/CAMarketing/Banners"
import Termsandconditions from "pages/CAMarketing/TermsandConditions"
import Privacy from "pages/CAMarketing/PrivacyPolicy"
import Refering from "pages/CAMarketing/ReferingPolicy"
import Withdraw from "pages/CAMarketing/Withdraw"
import Customerdetails from "pages/CAMarketing/Customerdetails"
import Userdetails from "pages/CAMarketing/Userdetails"
import Cities from "pages/CAMarketing/Cities"
import Customersrep from "pages/CAMarketing/reports/Customer"
import Agentpayout from "pages/CAMarketing/reports/Agentpayout"
import Transactions from "pages/CAMarketing/reports/Transactions"
import Aboutus from "pages/CAMarketing/Aboutus"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Otp from "pages/Authentication/Otp"
import Setpwd from "pages/Authentication/Setpwd"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/users", component: Users },
  { path: "/users_details", component: Userdetails },
  { path: "/customers", component: Customers },
  { path: "/customer_details", component: Customerdetails },
  { path: "/banner", component: Banner },
  { path: "/termsandconditions", component: Termsandconditions },
  { path: "/privacy", component: Privacy },
  { path: "/refering", component: Refering },  
  { path: "/withdraw", component: Withdraw },  
  { path: "/cities", component: Cities },  
  { path: "/agentpayout", component: Agentpayout },  
  { path: "/transactions", component: Transactions },  
  { path: "/aboutus", component: Aboutus },  

  // Reports
  { path: "/customer_reports", component: Customersrep },

  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/otp", component: Otp },
  { path: "/setpassword", component: Setpwd },
]

export { publicRoutes, authProtectedRoutes }
