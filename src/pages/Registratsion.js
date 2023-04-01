import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import style from "../Css/Verify.module.css";
import { Link, Redirect } from "react-router-dom";
import { url } from "../host/Host";
import axios from "axios";
import { message } from "antd";

export class Registration extends Component {
  state = {
    login: false,
    verify: false,
    id: null,
    schools: [],
    email: "",
    username: "",
    password: "",
    token:''
  };
  registration = () => {
    var password;
    var username = document.getElementById("username").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var sharif = document.getElementById("sharif").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    var date = document.getElementById("date").value;
    var university = document.getElementById("university").value;
    var univerFak = document.getElementById("univerFak").value;
    var group = document.getElementById("group").value;
    if (password1 !== password2) {
      return message.error("Parolni qaytib kiriting!");
    } else {
      password = password1;
    }
    var user = {
      "password": password,
      "username": username,
      "first_name": firstname,
      "last_name": lastname,
      "email": email,
      "is_active": true,
      "patronymic": sharif,
      "phone": phone,
      "university": university,
      "faculty": univerFak,
      "group": group
  
    };
    axios
      .post(`${url}/users/`, 
        user
       
      )
      .then((res) => {
       
        axios.post(`${url}/auth/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        this.setState({
          email:email,
              verify: true,
            username: username,
            password: password,
            token: res.data.key,
          });
         
        window.localStorage.setItem("token",this.state.token);
      })
      .catch((err) => console.log(err));
       
      })
      .catch((err) => {message.error("Usernamingiz tizimda mavjud iltimos almashtirib qaytatdan kiriting");});
  };
  verify = () => {
    var verify = document.getElementById("verify").value;

    axios
    .post(`${url}/users/verify/`, 
      {code:verify},  {
        headers: {
          'Authorization': `token ${this.state.token}`
        }
      }
     
    ).then(res=>{
      this.setState({ login: true }); 
    }).catch(err=>{
      message.error("Parol xato iltimos qaytib tekshirib kiriting!");
    })
   
  };
  // autoLogin = () => {
  //   axios
  //     .post(`${url}/auth/login/`, {
  //       username: this.state.username,
  //       password: this.state.password,
  //     })
  //     .then((res) => {
       
  //       window.localStorage.setItem("token", res.data.key);
  //     })
  //     .catch((err) => console.log(err));
  // };
  render() {
    return this.state.login === false ? (
      this.state.verify === false ? (
        <div
          className={style.formDiv}
          style={{
            height: "1150px",
            position: "relative",
          }}
        >
          <div className={style.loginBox}>
            <h2>Ro'yxatdan o'tish</h2>
            <br />
            <Form className={style.From}>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="text"
                  name="firstname"
                  id="firstname"
                  required={true}
                />
                <Form.Label className={style.formLabel}>Familiya</Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="text"
                  name="lastname"
                  id="lastname"
                  required={true}
                />
                <Form.Label className={style.formLabel}>Ism</Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="text"
                  name="sharif"
                  id="sharif"
                  required={true}
                />
                <Form.Label className={style.formLabel}>Sharif</Form.Label>
              </Form.Group>
             
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="email"
                  name="email"
                  id="email"
                  required={true}
                />
                <Form.Label className={style.formLabel}>
                  Elektron pochtangizni kiriting
                </Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="phone"
                  name="phone"
                  id="phone"
                  required={true}
                />
                <Form.Label className={style.formLabel}>
                  Telefon raqamizni kiriting
                </Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="text"
                  name="username"
                  id="username"
                  required={true}
                />
                <Form.Label className={style.formLabel}>
                  Foydalanuvchi nomini kiriting
                </Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="password"
                  name="password1"
                  id="password1"
                  required={true}
                  minLength={8}
                />
                <Form.Label className={style.formLabel}>
                  Parol kiriting
                </Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="password"
                  name="password2"
                  id="password2"
                  required={true}
                  minLength={8}
                />
                <Form.Label className={style.formLabel}>
                  Parolni qayta kiriting
                </Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="date"
                  name="date"
                  id="date"
                  required={true}
                />
                <Form.Label className={style.formLabel}>
                  Tug'ilgan kuningizni kiriting
                </Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="text"
                  name="university"
                  id="university"
                  required={true}
                />
                <Form.Label className={style.formLabel}>
                  O'qiyotgan universitetingizni kiriting
                </Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="text"
                  name="univerFak"
                  id="univerFak"
                  required={true}
                />
                <Form.Label className={style.formLabel}>
                  O'qiyotgan universitetingizni fakultetini kiriting
                </Form.Label>
              </Form.Group>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="text"
                  name="group"
                  id="group"
                  required={true}
                />
                <Form.Label className={style.formLabel}>
                  O'qiyotgan universitetingizni guruhini kiriting
                </Form.Label>
              </Form.Group>
              <Link to="/login" style={{ color: "white" }}>
                Tizimga kirish
              </Link>
              <br />
              <Button
                className={style.sub}
                type="button"
                onClick={() => this.registration()}
              >
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
        <div className={style.formDiv}>
          <div className={style.loginBox}>
            <h2>Ro'yxatdan o'tish</h2>
            <br />
            <br />
            <Form className={style.From}>
              <Form.Group className={style.userBox}>
                <Form.Control
                  style={{ outline: "none" }}
                  className={style.Forminput}
                  type="text"
                  name="verify"
                  id="verify"
                  required={true}
                />
                <Form.Label
                  className={style.formLabel}
                  style={{ top: "-60px" }}
                >
                  {this.state.email} ga jo'natilgan kodni kiriting
                </Form.Label>
              </Form.Group>
              <Button
                className={style.sub}
                type="button"
                onClick={() => this.verify()}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Kirish
              </Button>
            </Form>
          </div>
        </div>
      )
    ) : (
      <Redirect to="/test" />
    );
  }
}

export default Registration;
