import React, { useState, useEffect } from "react";
import "../Css/sidebar.css";
import { Switch, Link, Route } from "react-router-dom";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
import styles from "../Css/Menu.module.css";

import { FaCrown, FaComments, FaRibbon } from "react-icons/fa";

import Top from "./Top";
import { Container, Row, Col } from "react-bootstrap";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  VideoCameraOutlined,
  CameraOutlined,
  UsergroupAddOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { BiNews } from "react-icons/bi";
import { SiBookstack } from "react-icons/si";
import { GiProgression } from "react-icons/gi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { isArray } from "lodash";
// import Tadbirlar from "./Tadbirlar";
import Dashboard from "./Dashboard";
import News from "./News";
import Murojatlar from "./Murojat";
import Test from "./Test";
import Youtube from "./Youtube";
import Gallery from "./Galerry";
import { Redirect, NavLink } from "react-router-dom";
import Loader from "./LoaderHome";
import Yutuqlar from "./Yutuqlar";
import Books from "./Books";
import Result from "./Result";
const Home = ({ routes }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState(null);
  const menu = [
    {
      id: 1,
      path: "/admin/home/uz", // the url
      name: "Dashboard",
      icon: <AppstoreOutlined />, // name that appear in Sidebar
    },
    {
      id: 2,
      path: "/admin/home/uz/youtube/uz",
      name: "Videolar",
      icon: <VideoCameraOutlined />,
    },
    {
      id: 5,
      path: "/admin/home/uz/gallery/uz",
      name: "Galereya",
      icon: <CameraOutlined />,
    },
    // { id: 2, path: "/admin/home/uz/admin/uz", name: "Maktab", icon: <UserOutlined /> },
    {
      id: 3,
      path: "/admin/home/uz/yangiliklar/uz",
      name: "Yangiliklar",
      icon: <BiNews />,
    },
    {
      id: 4,
      path: "/admin/home/uz/yutuqlar/uz",
      name: "Yutuqlar",
      icon: <FaRibbon />,
    },
    {
      id: 6,
      path: "/admin/home/uz/kitoblar/uz",
      name: "Kitoblar",
      icon: <SiBookstack />,
    },
    {
      id: 7,
      path: "/admin/home/uz/murojaatlar/uz",
      name: "Murojaatlar",
      icon: <FaComments />,
    },
    {
      id: 8,
      path: "/admin/home/uz/test/uz",
      name: "Test",
      icon: <FaComments />,
    },
    {
      id: 9,
      path: "/admin/home/uz/natijalar/uz",
      name: "Natijalar",
      icon: <GiProgression />,
    },
  ];
  useEffect(() => {
    window.addEventListener("resize", resize.bind(this));
    resize();
  }, []);

  const resize = () => {
    if (window.innerWidth <= 767) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };
  return window.localStorage.getItem("token") !== null ? (
    <div>
      {loading === false ? (
        <Loader />
      ) : (
        <div>
          <Container fluid style={{ padding: "0", position: "relative" }}>
            <Row>
              <Col lg={12} style={{ position: "sticky" }}>
                <Row>
                  <Col xl={2} lg={3} md={4} sm={2} xs={2}>
                    <div
                      style={{
                        position: "sticky",
                        top: "0px",
                        height: "100vh",
                        boxShadow:
                          "0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%), 0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%)",
                        zIndex: "10000000",
                      }}
                    >
                      <div className={styles.topMenu}>
                        <span className={styles.crown}>
                          <FaCrown style={{ fontSize: "30px" }} />
                        </span>
                      </div>
                      <Menu
                        style={{
                          overflowY: "scroll",
                          height: "90%",
                          overflowX: "hidden",
                          marginTop: "0",
                        }}
                        className={styles.Menyusidebar}
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        mode="inline"
                        inlineCollapsed={collapsed}
                      >
                        {menu && isArray(menu)
                          ? menu.map((item) => {
                              return (
                                <Menu.Item
                                  key={item.id}
                                  icon={item.icon}
                                  className={styles.menuitem}
                                >
                                  <NavLink
                                    activeStyle={{ color: "blue" }}
                                    to={item.path}
                                  >
                                    {item.name}
                                  </NavLink>
                                </Menu.Item>
                              );
                            })
                          : ""}
                      </Menu>
                    </div>
                  </Col>
                  <Col
                    xl={10}
                    lg={9}
                    md={8}
                    sm={10}
                    xs={10}
                    style={{ padding: "0" }}
                  >
                    <Row>
                      <Col
                        lg={12}
                        style={{
                          padding: "0",
                          position: "sticky",
                          top: "0px",
                          zIndex: "100000",
                        }}
                      >
                        <Top />
                      </Col>
                      <Col
                        lg={12}
                        style={{ padding: "40px", overflowY: "scroll" }}
                      >
                        <Switch>
                          <Route exact path="/admin/home/uz">
                            <Dashboard />
                          </Route>
                          <Route exact path="/admin/home/uz/youtube/uz">
                            <Youtube />
                          </Route>
                          <Route exact path="/admin/home/uz/gallery/uz">
                            <Gallery />
                          </Route>
                          <Route exact path="/admin/home/uz/murojaatlar/uz">
                            <Murojatlar />
                          </Route>
                          <Route exact path="/admin/home/uz/yangiliklar/uz">
                            <News />
                          </Route>
                          <Route exact path="/admin/home/uz/yutuqlar/uz">
                            <Yutuqlar />
                          </Route>
                          <Route exact path="/admin/home/uz/kitoblar/uz">
                            <Books />
                          </Route>
                          <Route exact path="/admin/home/uz/test/uz">
                            <Test />
                          </Route>
                          <Route exact path="/admin/home/uz/natijalar/uz">
                            <Result />
                          </Route>
                        </Switch>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  ) : (
    <Redirect to="/admin/home" />
  );
};

export default Home;
