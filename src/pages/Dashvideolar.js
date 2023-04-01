import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import style from "../Css/Dashvideolar.module.css";
import YouTube from "@u-wave/react-youtube";
import axios from "axios";
import { url } from "../host/Host";
export default class Dashvideolar extends Component {
  state = {
    loader: true,
    vidoelavha: null,
    seen: false,
  
  };
  componentDidMount() {
    this.getVideolavha();
  }
  getVideolavha = () => {
    axios.get(`${url}/videos/`).then((res) => {
      console.log(res.data);
      this.setState({
        vidoelavha: res.data,
        loader: false,
      });
    });
  };
  render() {
    return (
      <div>
        <div>
          <h1 className="sarlavha">Video lavhalar</h1>
          <div className="chiziq"></div>
        </div>
        <div className={style.head}>
          <div style={{ overflowX: "hidden" }}>
            <Row>
             
                      <Col className={style.img} xs={12} md={6}>
                        <div className={style.videos_item}>
                          <YouTube
                            opts={{
                              playerVars: {
                                rel: 0,
                              },
                            }}
                            className={style.you}
                            // autoplay={true}
                            // muted={true}
                            video={
                              `https://youtu.be/ruBfXIVSYZ8`
                            }
                          />
                        </div>
                      </Col>
                      <Col className={style.img} xs={12} md={6}>
                        <div className={style.videos_item}>
                          <YouTube
                            opts={{
                              playerVars: {
                                rel: 0,
                              },
                            }}
                            className={style.you}
                            // autoplay={true}
                            // muted={true}
                            video={
                              `https://youtu.be/77ZF50ve6rs`
                            }
                          />
                        </div>
                      </Col>
                  
              {/* <Col className={style.img} xs={12} md={6}>
                <div className={style.videos_item}>
                  <YouTube
                    opts={{
                      playerVars: {
                        rel: 0,
                      },
                    }}
                    video="HM5JspglF84"
                    className={style.you}
                    autoplay={true}
                    muted={true}
                  />
                </div>
              </Col>
              <Col className={style.img} xs={12} md={6}>
                <div className={style.videos_item}>
                  <YouTube
                    opts={{
                      playerVars: {
                        rel: 0,
                      },
                    }}
                    video="HM5JspglF84"
                    className={style.you}
                    autoplay={true}
                    muted={true}
                  />
                </div>
              </Col>
              <Col className={style.img} xs={12} md={6}>
                <div className={style.videos_item}>
                  <YouTube
                    opts={{
                      playerVars: {
                        rel: 0,
                      },
                    }}
                    video="HM5JspglF84"
                    className={style.you}
                    autoplay={true}
                    muted={true}
                  />
                </div>
              </Col>
              <Col className={style.img} xs={12} md={6}>
                <div className={style.videos_item}>
                  <YouTube
                    opts={{
                      playerVars: {
                        rel: 0,
                      },
                    }}
                    video="HM5JspglF84"
                    className={style.you}
                    autoplay={true}
                    muted={true}
                  />
                </div>
              </Col>
              <Col className={style.img} xs={12} md={6}>
                <div className={style.videos_item}>
                  <YouTube
                    opts={{
                      playerVars: {
                        rel: 0,
                      },
                    }}
                    video="HM5JspglF84"
                    className={style.you}
                    autoplay={true}
                    muted={true}
                  />
                </div>
              </Col>
              <Col className={style.img} xs={12} md={6}>
                <div className={style.videos_item}>
                  <YouTube
                    opts={{
                      playerVars: {
                        rel: 0,
                      },
                    }}
                    video="HM5JspglF84"
                    className={style.you}
                    autoplay={true}
                    muted={true}
                  />
                </div>
              </Col> */}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
