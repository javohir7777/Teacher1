import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from "../Css/Author.module.css";
import bosh from "../video/bosh.mp4";
import teach from "../Img/uzim.png";
export default class Author extends Component {
  render() {
    return (
      <div className={style.teacher}>
        <video src={bosh} autoPlay muted />
        <div className={style.blue}>
          <Container>
            <Row>
              <Col lg={8} md={12} sm={12}>
                <img
                  alt="Teacher_picture"
                  src={teach}
                  className={style.teachfoto}
                />
                <div>
                  <h3>Yo'lchiyev Mash'albek Erkinovich</h3>
                  <h5>
                    T.N.Qori Niyoziy nomidagi O‘zPFITI loyiha stajer-tadqiqotchi
                    (dasturchi)
                  </h5>
                  <p>
                    <b>1985 yil 30-avgustda</b> Andijon viloyati Oltinko‘l
                    tumanida tug'ilgan
                  </p>
                  <p>
                    <b>2001 yil</b> Oltinko‘l tumanidagi 1-o‘rta umumta’lim
                    maktabini tamomlagan
                  </p>
                  <p>
                    <b>2004 yil</b> Oltinko‘l Iqtisodiyot kollejini imtiyozli
                    tamomlagan
                  </p>
                  <p>
                    <b>2009 yil</b> Farg‘ona politexnika institutini Energetika
                    fakulteti Elektr energetikasi yo‘nalishini
                  </p>
                  <p>
                    <b>2011 yil</b> Farg‘ona politexnika institutini Elektr
                    ta’minoti mutaxasisligi bo‘yicha magistratura bo‘limini
                    tamomlagan
                  </p>
                  <p>
                    <b>2010 -2012 yillar</b> Andijon xududiy elektr tarmoqlari
                    korxonasida muxandis lavozimida ishlagan
                  </p>
                  <p>
                    <b>2012 yildan</b> Farg‘ona politexnika instituti Energetika
                    fakulteti Elektr energetikasi kafedrasi assistenti bo'lib
                    ishlagan
                  </p>
                  <p>
                    <b>2015 yildan</b> Farg‘ona politexnika instituti Energetika
                    fakulteti Elektr energetikasi kafedrasi katta o‘qituvchisi
                    bo'lib ishlagan
                  </p>
                  <p>
                    <b>2016 yildan</b> Farg‘ona politexnika instituti Energetika
                    fakulteti dekan muovini lavozimida ishlagan
                  </p>
                  <p>
                    <b>2019 yildan 2021 yilgacha</b> Islom Karimov nomidagi
                    Toshkent davlat texnika universiteti doktoranti bo‘lgan
                  </p>
                </div>
              </Col>

              <Col lg={4} md={12} sm={12}>
                <img
                  alt="Teacher_picture"
                  src={teach}
                  className={style.teachfoto2}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
