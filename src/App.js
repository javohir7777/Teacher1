import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Fotolavhalar from "./pages/Fotolavhalar";
import Videolavhalar from "./pages/Videolavhalar";
import Kitoblar from "./pages/Kitoblar";
import Yangiliklar from "./pages/Yangiliklar";
import Login from "./admin/Login";
import Home from "./admin/Home";
import Yutuqlar from "./pages/Yutuqlar";
import LoginTest from "./pages/LoginTest";


import TestYechish from "./pages/TestYechish";
import Registration from "./pages/Registratsion";
export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/kitoblar">
              <Kitoblar />
            </Route>
            <Route path="/yangiliklar">
              <Yangiliklar />
            </Route>
            <Route path="/yutuqlar">
              <Yutuqlar />
            </Route>
            <Route path="/login">
              <LoginTest />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/test">
              <TestYechish />
            </Route>
            <Route exact path="/fotolavhalar">
              <Fotolavhalar />
            </Route>
            <Route exact path="/videolavhalar">
              <Videolavhalar />
            </Route>
            <Route exact path="/admin/home/">
            
                <Login />
            
            </Route>
             <Route path="/admin/home/uz">
            
            <Home />
        
        </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

