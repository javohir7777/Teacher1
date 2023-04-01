import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillFilePpt } from "react-icons/ai";
import { Link } from "react-router-dom";
import style from "../Css/DashTaqdimot.module.css";
import MyPDF1 from '../books/1.ppt';
import MyPDF2 from '../books/2.ppt';
import MyPDF3 from '../books/3.ppt';
import MyPDF4 from '../books/4.ppt';
import MyPDF5 from '../books/5.ppt';
import MyPDF6 from '../books/6.ppt';
import MyPDF7 from '../books/7.ppt';
import MyPDF8 from '../books/8.ppt';
import MyPDF9 from '../books/9.ppt';
import MyPDF10 from '../books/10.ppt';
import MyPDF11 from '../books/11.ppt';
import MyPDF12 from '../books/12.ppt';
import MyPDF13 from '../books/13.ppt';
import MyPDF14 from '../books/14.ppt';
import MyPDF15 from '../books/15.pptx';
import MyPDF16 from '../books/16.pptx';
import MyPDF17 from '../books/17.ppt';
import MyPDF18 from '../books/18.ppt';
export class DashTaqdimotlar extends Component {
render() {
 return (
<div className={style.body}>
<h1 className="sarlavha" style={{ color: "white", marginTop: 0 }}>
Taqdimotlar
</h1>
<div className="chiziq" style={{ backgroundColor: "white" }}></div>
<Container>
<Row>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF1} download="Elеktr tarmoqlari tuzilishlarining elеmеntlari.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />Elеktr tarmoqlari tuzilishlarining elеmеntlari</a>
 
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF2} download="Elеktr tarmoqlarining havo va kabеl liniyalari.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />Elеktr tarmoqlarining havo va kabеl liniyalari</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF3} download="Elеktr uzatish liniyalarining (eul) almashtirish sxеmalari va paramеtrlari.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />Elеktr uzatish liniyalarining (eul) almashtirish sxеmalari va paramеtrlari</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF4} download="Transformator va avtotransformatorlarning almashtirish sxеmalari va paramеtrlari.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />Transformator va avtotransformatorlarning almashtirish sxеmalari va paramеtrlari</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF5} download="Elеktr tarmoqlari elеmеntlarida quvvat va enеrgiya isroflari.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />Elеktr tarmoqlari elеmеntlarida quvvat va enеrgiya isroflari</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF6} download="Elеktr tarmoqlarini hisoblashning tеxnik–iqtisodiy asoslari.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />Elеktr tarmoqlarini hisoblashning tеxnik–iqtisodiy asoslari</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF7} download="Ochiq elеktr tarmoqlarini rеjimlarini hisoblash.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />Ochiq elеktr tarmoqlarini rеjimlarini hisoblash</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF8} download="Ochiq ta’minlovchi elеktr tarmoqlari rеjimlarini hisoblash.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />Ochiq ta’minlovchi elеktr tarmoqlari rеjimlarini hisoblash</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF9} download="Ochiq ta’minlovchi elеktr tarmoqlari rеjimlarini hisoblash kеtma–kеtligi.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />Ochiq ta’minlovchi elеktr tarmoqlari rеjimlarini hisoblash kеtma–kеtligi</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF10} download="Elеktr uzatish yo‘li holatlarini hisoblash.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />Elеktr uzatish yo‘li holatlarini hisoblash</a>
 
</Col>
{/* <Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF11} download="11.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />11</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF12} download="12.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />12</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF13} download="13.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />13</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF14} download="14.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />14</a>
 
</Col>
 <Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF15} download="15.pptx" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />15</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF16} download="16.pptx" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />16</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF17} download="17.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />17</a>
 
</Col>
<Col lg={6} md={12} style={{ padding: "15px 20px" }}>
<a href={MyPDF18} download="18.ppt" className={style.bodyA}> <AiFillFilePpt className={style.bodyAIcon} />18</a>
 
</Col> */}

</Row>
</Container>
</div>
 );
}
}

export default DashTaqdimotlar;











