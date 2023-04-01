import React, { Component } from "react";
import Header from "./Header";
import "react-multi-carousel/lib/styles.css";
import Dashvideolar from "./Dashvideolar";
import Dashyangiliklar from "./Dashyangiliklar";
import Dashyutuqlar from "./Dashyutuqlar";
import Dashfotolavhalar from "./Dashfotolavhalar";
import Dashkitoblar from "./Dashkitoblar";
import Dashmurojat from "./Dashmurojat";
import Footer from "./Footer";
import { Col, Container, Row } from "react-bootstrap";
import rasm from "../Img/bosh1.png";
import style from "../Css/Dashboard.module.css";
import PuffLoader from "react-spinners/PuffLoader";
import rasm2 from "../Img/mustafoev.jpg";
import Author from "./Author";
import DashTaqdimotlar from "./DashTaqdimotlar";
export default class Dashboard extends Component {
  state = {
    loader: true,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loader: false,
      });
    }, 5000);
  }
  render() {
    return (
      <div className={style.dashboardhead}>
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

            <div className={style.head}>
              <Container>
                <Row>
                  <Col
                    lg="6"
                    md="12"
                    sm="12"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                    }}
                    className={style.head1}
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
                    <div className={style.afterrasm}>
                      <div className={style.rasm}>
                        <div className={style.rasm1}>
                          <div className={style.rasm2}>
                            <img src={rasm} alt="..." />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <Author />
            <Dashyangiliklar />
            <DashTaqdimotlar />
            <Dashfotolavhalar />
            <div className={style.ifdiv}>
              <h1 className="sarlavha">
                <a href="http://radiomer.uz/index" target="_blank">
                  Radiomer.uz
                </a>
              </h1>
              <div className="chiziqoq"></div>
              {/* <iframe
                className={style.if}
                src="http://radiomer.uz/index"
              ></iframe> */}
              <Row>
                <Col lg="6" md="12" sm="12">
                  <div className={style.radio}>
                    {" "}
                    <img src={rasm2}></img>
                  </div>
                </Col>
                <Col lg="6" md="12" sm="12">
                  <h3>Radiomer</h3>
                  <p className={style.radionipisi}>
                    RadioMer mijozning topshirig'iga binoan elektron
                    qurilmalarni kalitlarga topshirish xizmatlarini, shuningdek,
                    elektron qurilmalarni boshqarish monitoring qilish
                    dasturlash uchun kompyuterlar uchun dasturiy ta'minotni
                    yaratish xizmatlarini taklif qiladi.Biz radio komponentlar,
                    korpuslar, bosilgan elektron platalar, ramkalar, stikerlar
                    ishlab chiqaruvchilari bilan asosiy yetkazib beruvchilar
                    bilan hamkorlik qilamiz, shuning uchun loyihalashtirilgan
                    qurilma uchun komponentlarning narxi va yetkazib berish
                    muddati minimal bo'ladi. Tajribamiz va bilimlarimizdan
                    foydalanib, biz faqat zamonaviy va bozorda mavjud bo'lgan
                    qurilmalarni tanlaymiz va loyihalashtiramiz. P-CAD (Altium
                    Designer) da PCB sxemasi va dizayni: dunyodagi eng mashhur
                    SAPR paketi, undan bosilgan elektron platalarni dunyodagi
                    istalgan ishlab chiqaruvchidan buyurtma qilish mumkin.&nbsp;
                    <br />
                    <a href="http://radiomer.uz">Saytga o'tish</a>
                  </p>
                </Col>
              </Row>
            </div>
            <Dashyutuqlar />
            <Dashkitoblar />
            <Dashvideolar />
            <Dashmurojat />
            <Footer />
          </>
        )}
      </div>
    );
  }
}
