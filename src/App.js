import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { PublicRoute, ProtectedRoute } from "./routes/index";
import Login from "./components/Login";
import Users from "./components/Users";
import Products from "./components/Products";

const App = () => (
  <Router>
    <PublicRoute path="/" exact component={Login} />
    <ProtectedRoute path="/users" component={Users} />
    <ProtectedRoute path="/products" component={Products} />
  </Router>
);

export default App;
