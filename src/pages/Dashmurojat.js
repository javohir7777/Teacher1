import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { AiFillFileText, AiOutlineFileText } from "react-icons/ai";
import style from "../Css/Murojat.module.css";
export default class Dashmurojat extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col lg={6} xs={12} md={12}>
              {" "}
              <div className={style.bodycontact}>
                <h1 className="sarlavha">Manzil</h1>
                <div className="chiziq"></div>
                <div className={style.mapcontact}>
                <iframe  style={{ border: 0 }}  className={style.iframe} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5990.261656915327!2d69.199606!3d41.34951!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3fc16458e372ba19!2zNDHCsDIwJzU4LjIiTiA2OcKwMTEnNTguNiJF!5e0!3m2!1sru!2s!4v1644391402252!5m2!1sru!2s" width="600" height="450" allowfullscreen="" loading="lazy"></iframe>

                </div>
              </div>
            </Col>
            <Col lg={6} xs={12} md={12}>
              {/* {" "}
              <div className={style.bodycontact}>
                <div className={style.formcontact}>
                  <h1>Murojaat</h1>
                  <div className={style.inputbox}>
                    <i className={style.icons}>
                      <FaUser />
                    </i>

                    <input type="text" placeholder="name"></input>
                  </div>
                  <div className={style.inputbox}>
                    <i className={style.icons}>
                      <FaEnvelope />
                    </i>

                    <input type="text" placeholder="email"></input>
                  </div>
                  <div className={style.inputbox}>
                    <i className={style.icons}>
                      <FaPhone />
                    </i>

                    <input type="text" placeholder="phone"></input>
                  </div>
                  <div className={style.inputbox}>
                    <i className={style.icons}>
                      <AiFillFileText />
                    </i>

                    <input type="text" placeholder="murojat"></input>
                  </div>
                </div>
              </div> */}
              <div className={style.murojaatlar}>
                {/* <h1 className={style.titleh1}>Murojaat</h1> */}
                <h1 className="sarlavha">Murojaat</h1>
                <div className="chiziq"></div>
                <div className={style.formm}>
                  <input type="text" placeholder="F.I.SH"></input>
                  <input type="text" placeholder="Telefon"></input>
                  <textarea placeholder="Murojaat matni..."></textarea>
                  <br />
                  <br /> <button className={style.btnn}>Yuborish</button>
                  {/* <input type={"text"} name="text"></input>
                <input type={"text"} name="text"></input>
                <input type={"text"} name="text"></input> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
