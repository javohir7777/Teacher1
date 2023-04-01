import React, { Component } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillPhone,
  AiFillYoutube,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { BsTelegram } from "react-icons/bs";
import xalq from "../Img/xalq.png";
import style from "../Css/Footer.module.css";
export default class Footer extends Component {
  render() {
    return (
      <div className={style.Footerhead}>
        <Row>
          <Col lg={4} xs={12} md={12}>
            <img
              src={xalq}
              style={{ display: "inline-block" }}
              className={style.footerxalq}
            ></img>
            <p
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "500",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              Elektr tarmoqlari va tizimlari <br /> elektron platformasi
            </p>
          </Col>
          <Col lg={4} xs={12} md={6}>
            <div
              style={{
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <h3 className={style.sarlavhaa}>Havolalar</h3>
              <div className={style.chiziqq}></div>
              <ul className={style.ul2}>
                <li>
                  <NavLink
                    className="navbar"
                    to="/"
                    style={{
                      paddingTop: "0rem",
                      paddingBottom: "0rem",
                      display: "inline-block",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    Bosh sahifa
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbar"
                    to="/kitoblar"
                    style={{
                      paddingTop: "0rem",
                      paddingBottom: "0rem",
                      display: "inline-block",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    Kitoblar
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbar"
                    to="/yangiliklar"
                    style={{
                      paddingTop: "0rem",
                      paddingBottom: "0rem",
                      display: "inline-block",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    Yangiliklar
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbar"
                    to="/yutuqlar"
                    style={{
                      paddingTop: "0rem",
                      paddingBottom: "0rem",
                      display: "inline-block",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    Yutuqlar
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="navbar"
                    to="/fotolavhalar"
                    style={{
                      paddingTop: "0rem",
                      paddingBottom: "0rem",
                      display: "inline-block",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    Foto lavhalar
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbar"
                    to="videolavhalar"
                    style={{
                      paddingTop: "0rem",
                      paddingBottom: "0rem",
                      display: "inline-block",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    Video lavhalar
                  </NavLink>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={4} xs={12} md={6}>
            <div>
              <h3 className={style.sarlavhaa}>Ijtimoiy tarmoqlar</h3>
              <div className={style.chiziqq}></div>
              <ul>
                <li>
                  <Nav.Link className={style.ijsahifa}>
                    <i style={style.iconcala}>
                      {" "}
                      <AiFillInstagram />
                    </i>
                    &nbsp; Instagram
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link className={style.ijsahifa}>
                    <i style={style.iconcala}>
                      <BsTelegram />
                    </i>
                    &nbsp; Telegram
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link className={style.ijsahifa}>
                    <i style={style.iconcala}>
                      <AiFillFacebook />
                    </i>
                    &nbsp; Facebook
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link className={style.ijsahifa}>
                    <i style={style.iconcala}>
                      <AiFillYoutube />
                    </i>
                    &nbsp; Youtube
                  </Nav.Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className={style.ByIt}>
              Design ©2021 Created by{" "}
              <a target="_blank" href="http://ittower.uz/">
                IT Tower
              </a>
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
