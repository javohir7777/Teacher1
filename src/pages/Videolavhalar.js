import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Dashvideolar from "./Dashvideolar";
import { Col, Container, Row } from "react-bootstrap";
import rasm from "../Img/bosh4.png";
import style1 from "../Css/Dashboard.module.css";
import PuffLoader from "react-spinners/PuffLoader";

export default class Videolavhalar extends Component {
  state = {
    loader: true,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loader: false,
      });
    }, 3000);
  }
  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        {this.state.loader ? (
          <div
            style={{
              backgroundColor: "rgb(40, 30, 100)",
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PuffLoader
              color="#ff4500"
              loading={this.state.loader}
              size={200}
            />
          </div>
        ) : (
          <>
            <Header />
            <div className={style1.head}>
              <Container>
                <Row>
                  <Col
                    lg="6"
                    md="12"
                    sm="12"
                    className={style1.head1}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <h1>O'qish eng yaxshi o'rganishdir.</h1>
                    <p>
                      O'qishda har bir narsada bo'lgani kabi, biz
                      harakatsizlikdan azoblanamiz va hayot uchun emas, balki
                      maktab uchun o'qish.
                    </p>
                    <a href="tel: +998930820372">Biz bilan bog'lanish</a>
                  </Col>
                  <Col lg="6" md="12" sm="12">
                    <br />
                    <br />

                    <div className={style1.rasm}>
                      <div className={style1.rasm1}>
                        <div className={style1.rasm2}>
                          <img src={rasm} alt="..." />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>

            {/* <div style={{ marginBottom: "130px" }}></div> */}
            <Dashvideolar />
            <Footer />
          </>
        )}
      </div>
    );
  }
}
