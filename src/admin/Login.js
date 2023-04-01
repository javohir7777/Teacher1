
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import style from "../Css/Verify.module.css";
import { Link, Redirect } from "react-router-dom";
import { url } from "../host/Host";
import axios from "axios"
import { message } from "antd";
export default class Login extends Component {
  state = {
    login: false,
    id: null,
    schools: [],
  };
 
  loginVeb = (e) => {
  var username=document.getElementById("username").value
  var password=document.getElementById("password").value
  var config={username, password}
axios.post(`${url}/auth/login/`, config).then(res=>{
  this.setState({login:true})
  window.localStorage.setItem("token",res.data.key)

}).catch(err=>{
  message.error('Login yoki parol xato iltimos tekshirib qaytatdan kiriting')
}
  )
  };

  render() {
    return this.state.login === false ? (
      <div className={style.formDiv}>
        <div className={style.loginBox}>
          <h2>Tizimga kirish</h2>
          <Form className={style.From}>
            <Form.Group className={style.userBox}>
              <Form.Control
                style={{ outline: "none" }}
                className={style.Forminput}
                type="text"
                name="username"
                id="username"
                required={true}
              />
              <Form.Label className={style.formLabel}>Login</Form.Label>
            </Form.Group>
            <Form.Group className={style.userBox}>
              <Form.Control
                style={{ outline: "none" }}
                className={style.Forminput}
                type="password"
                name="password"
                id="password"
                required={true}
              />
              <Form.Label className={style.formLabel}>Parol</Form.Label>
            </Form.Group>
         
            <Button className={style.sub} type="button" onClick={this.loginVeb}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Kirish
            </Button>
          </Form>
        </div>
      </div>
    ) : (
      
      <Redirect to="/admin/home/uz" />
    );
  }
}
