import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { url } from "../host/Host";
// import style from "../Css/Dashvideolar.module.css";
import style from "../Css/Dashfotolavhalar.module.css";
import Adnrew from "../Img/andrew.jpg"
import Engin from "../Img/engin.jpg"
import Karlis from "../Img/karlis.jpg"
import Sunder from "../Img/sunder.jpg"
export default class Dashfotolavhalar extends Component {
  state = {
    loader: true,
    fotolar: null,
    seen: false,
  };
  componentDidMount() {
    this.getFotolar();
  }
  getFotolar = () => {
    axios.get(`${url}/fotos/`).then((res) => {
      console.log(res.data);

      this.setState({
        fotolar: res.data,
        loader: false,
      });
    });
  };
  render() {
    return (
      <div>
        <div>
          <h1 className="sarlavha">Foto lavhalar</h1>
          <div className="chiziq"></div>
        </div>
        <div className={style.head}>
          <div style={{ overflowX: "hidden" }}>
            <Row>
             
                      <Col xs={12} className={style.img} md={4}>
                        <img
                          className="d-block w-100"
                          src={Adnrew}
                          alt="Second slide"
                          style={{
                           
                            marginBottom: "2px",
                          }}
                        />
                      </Col>
                      <Col xs={12} className={style.img} md={4}>
                        <img
                          className="d-block w-100"
                          src={Karlis}
                          alt="Second slide"
                          style={{
                           
                            marginBottom: "2px",
                          }}
                        />
                      </Col>
                      <Col xs={12} className={style.img} md={4}>
                        <img
                          className="d-block w-100"
                          src={Engin}
                          alt="Second slide"
                          style={{
                           
                            marginBottom: "2px",
                          }}
                        />
                      </Col>
                      <Col xs={12} className={style.img} md={4}>
                        <img
                          className="d-block w-100"
                          src={Sunder}
                          alt="Second slide"
                          style={{
                           
                            marginBottom: "2px",
                          }}
                        />
                      </Col>
                      <Col xs={12} className={style.img} md={4}>
                        <img
                          className="d-block w-100"
                          src={Sunder}
                          alt="Second slide"
                          style={{
                           
                            marginBottom: "2px",
                          }}
                        />
                      </Col>
                      <Col xs={12} className={style.img} md={4}>
                        <img
                          className="d-block w-100"
                          src={Sunder}
                          alt="Second slide"
                          style={{
                           
                            marginBottom: "2px",
                          }}
                        />
                      </Col>
                   

              {/* <Col xs={12} className={style.img} md={4}>
                <img
                  className="d-block w-100"
                  src={rasm1}
                  alt="Second slide"
                  style={{
                    width: "200px",
                    height: "300px",
                    marginBottom: "2px",
                  }}
                />
              </Col>
              <Col xs={12} className={style.img} md={4}>
                <img
                  className="d-block w-100"
                  src={rasm2}
                  alt="Second slide"
                  style={{
                    width: "200px",
                    height: "300px",
                    marginBottom: "2px",
                  }}
                />
              </Col>
              <Col xs={12} className={style.img} md={4}>
                <img
                  className="d-block w-100"
                  src={rasm1}
                  alt="Second slide"
                  style={{
                    width: "200px",
                    height: "300px",
                    marginBottom: "2px",
                  }}
                />
              </Col>
              <Col xs={12} className={style.img} md={4}>
                <img
                  className="d-block w-100"
                  src={rasm6}
                  alt="Second slide"
                  style={{
                    width: "200px",
                    height: "300px",
                    marginBottom: "2px",
                  }}
                />
              </Col>
              <Col xs={12} className={style.img} md={4}>
                <img
                  className="d-block w-100"
                  src={rasm3}
                  alt="Second slide"
                  style={{
                    width: "200px",
                    height: "300px",
                    marginBottom: "2px",
                  }}
                />
              </Col>
              <Col xs={12} className={style.img} md={4}>
                <img
                  className="d-block w-100"
                  src={rasm6}
                  alt="Second slide"
                  style={{
                    width: "200px",
                    height: "300px",
                    marginBottom: "2px",
                  }}
                />
              </Col> */}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
