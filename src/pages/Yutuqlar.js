import { Collapse } from "antd";
import React, { Component } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Dashyutuqlar from "./Dashyutuqlar";
import { Col, Container, Row } from "react-bootstrap";
import rasm from "../Img/bosh6.png";
import style1 from "../Css/Dashboard.module.css";
import PuffLoader from "react-spinners/PuffLoader";

const { Panel } = Collapse;
export default class Yangiliklar extends Component {
  callback = (key) => {
    console.log(key);
  };
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

            <div style={{ marginBottom: "110px" }}></div>
            <Dashyutuqlar />
            <Footer />
          </>
        )}
      </div>
    );
  }
}

{
  /* <div>
{" "}
dsadasdas
<Collapse defaultActiveKey={["1"]} onChange={this.callback}>
  <Panel header="yangilik11" key="1">
    <div>
      <Container>
        <div className={style.imag}>
          <img src={rasm13} />
        </div>
        <div className={style.yozuv}>
          <h1>Elektr</h1>
          <p>
            <i className="fa fa-calendar"></i>
            19.08.2001
          </p>
          <p>
            dajsndjandjkandkjadnkjandkjndakj
            dajsndjandjkandkjadnkjandkjndakj
            dajsndjandjkandkjadnkjandkjndakjdajsndjandjkandkjadnkjandkjndakj
          </p>
        </div>
      </Container>
    </div>
  </Panel>
  <Panel header="panel" key="2">
    <p>dadasdassds</p>{" "}
  </Panel>
</Collapse>
</div> */
}
