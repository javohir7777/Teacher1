import React, { Component, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import new3 from "../Img/new3.jpg";
import axios from "axios";
import { url } from "../host/Host";
import style from "../Css/Dashyangiliklar.module.css";
import yutuqimg1 from "../Img/mustafoev.jpg"
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
    axios.get(`${url}/achievements/`).then((res) => {
      console.log(res.data);

      this.setState({
        yangilik: res.data,
        loader: false,
      });
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: "white", zIndex: "-2" }}>
        <h1 className="sarlavha">Yutuqlar</h1>
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
                      <img src={yutuqimg1}></img>
                    </div>
                    <div className={style.bodytext}>
                      <h3>Presentation ceremony</h3>
                      <h5>17-03-2022</h5>
 <br/>                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur maxime eaque assumenda cumque suscipit facere harum libero quidem aperiam, sint, dicta sapiente quasi expedita laudantium autem, dolores voluptas nostrum quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nemo maiores consequatur voluptatem esse doloremque quos error atque tempore libero.</p>
                      <br />
                     
                    </div>
                  </div>
                </div>
             
           

        
          </Carousel>
      
      </div>
    );
  }
}
