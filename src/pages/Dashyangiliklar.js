import React, { Component, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { url } from "../host/Host";
import style from "../Css/Dashyangiliklar.module.css";
import Newj from "../Img/newsj.jpg"
import Mustafoyev from "../Img/mustafoev.jpg"
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default class Dashyangiliklar extends Component {
  state = {
    loader: true,
    yangilik: null,
    seen: false,
  };
  componentDidMount() {
    this.getYangilik();
  }
  getYangilik = () => {
    axios.get(`${url}/news/`).then((res) => {
      console.log(res.data);

      this.setState({
        yangilik: res.data,
        loader: false,
      });
    });
  };

  render() {
    return (
      <div
        style={{ backgroundColor: "white", zIndex: "-2", position: "relative" }}
        classname={style.yangi}
      >
        <h1 className="sarlavha">Yangiliklar</h1>
        <div className="chiziq"></div>
      
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlaySpeed={2000}
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
          >
         
                <div>
                  <div className={style.body1}>
                    <div className={style.bodyimg}>
                      <img src={Newj}></img>
                    </div>
                    <div className={style.bodytext}>
                      <h3>News from physics</h3>
                      <h5>19-08-2022</h5>
                      <br/> <p>Physics is the basic physical science. Until rather recent times physics and natural philosophy were used interchangeably for the science whose aim is the discovery and formulation of the fundamental laws of nature. As the modern sciences developed and became increasingly specialized, physics came to denote that part of physical science not included in astronomy, chemistry, geology, and engineering. Physics plays an important role in all the natural sciences, however, and all such fields have branches in which physical laws and measurements receive special emphasis, bearing such names as astrophysics, geophysics, biophysics, and even psychophysics.</p>
                      <br />
                    </div>
                  </div>
                </div>
                <div>
                  <div className={style.body1}>
                    <div className={style.bodyimg}>
                      <img src={Mustafoyev}></img>
                    </div>
                    <div className={style.bodytext}>
                      <h3>An event about innovative physics</h3>
                      <h5>19-08-2023</h5>
                      <br/> <p>Physics is the basic physical science. Until rather recent times physics and natural philosophy were used interchangeably for the science whose aim is the discovery and formulation of the fundamental laws of nature. As the modern sciences developed and became increasingly specialized, physics came to denote that part of physical science not included in astronomy, chemistry, geology, and engineering. Physics plays an important role in all the natural sciences, however, and all such fields have branches in which physical laws and measurements receive special emphasis, bearing such names as astrophysics, geophysics, biophysics, and even psychophysics.</p>
                      <br />
                    </div>
                  </div>
                </div>
            

            
          </Carousel>
       
         
      </div>
    );
  }
}
