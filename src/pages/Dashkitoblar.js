import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Eynshtayn from "../Img/enshtayn.jfif";
import mexanika3 from "../Img/mexanika3.webp";
import { message } from "antd";
import boshlangich from "../Img/fizikaboshlangich.jpg";
import fizikakursi from "../Img/fizikakursi.jfif";
import qoratuynik from "../Img/qoratuynik.jpg";
import atomfizika from "../Img/atomfizika.jpg";
import style from "../Css/Dashkitoblar.module.css";
import { url } from "../host/Host";
import fileDownload from "js-file-download";
import axios from "axios";
import {
  faClock,
  faMapMarkerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Dashkitoblar extends Component {
  state = {
    loader: true,
    kitoblar: null,
    author: "",
    seen: false,
  };
  componentDidMount() {
    this.getKitoblar();
  }
  getKitoblar = () => {
    axios.get(`${url}/books/`).then((res) => {
      console.log(res.data);

      this.setState({
        kitoblar: res.data,
        loader: false,
      });
    });
  };
  downloadBooks = (urlDownload, title, author) => {
    var type = urlDownload.slice(urlDownload.lastIndexOf("."));
    axios
      .get(`${urlDownload}`, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, `${title}(${author})${type}`);
      })
      .catch((err) => {
        message.error("Ma'lumot yuklab olinmadi!");
      });
  };
  render() {
    return (
      <div className={style.head}>
        <div>
          <h1 className="sarlavha">Kitoblar</h1>
          <div className="chiziq"></div>
        </div>
        <Container>
          <Row>
            {this.state.kitoblar !== null
              ? this.state.kitoblar.map((item, key) => {
                  return (
                    <Col lg={4} xs={12} md={6} style={{ marginBottom: "10px", height:'auto', }}>
                      <Card
                      
                        className={style.cardlar}
                      >
                        <Card.Img
                          variant="top"
                          src={item.image}
                        
                        />
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title><br/>
                          <Card.Text>{item.author}</Card.Text><br/>
                          <Card.Text>{item.description}</Card.Text><br/>
                          <Button
                            className={style.butn}
                            variant="primary"
                            onClick={() =>
                              this.downloadBooks(
                                item.file,
                                item.title,
                                item.author
                              )
                            }
                          >
                            Yuklab olish
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              : ""}
         
          </Row>
        </Container>
      </div>
    );
  }
}
