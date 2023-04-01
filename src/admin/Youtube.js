import { message } from "antd";
import axios from "axios";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import YouTube from "@u-wave/react-youtube";
import { url } from "../host/Host";
import Loader from "./Loader";
import { Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default class Youtube extends Component {
  state = {
    videos: null,
    loading: true,
    edit: null,
    urlVideo: "",
  };
  addVideo = () => {
    this.setState({ loading: true });
    if (this.state.edit === null) {
      axios
        .post(
          `${url}/videos/`,
          { video_lavha: this.state.urlVideo },
          {
            headers: {
              Authorization: `Token ${window.localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.getVideos();
          message.success("Ma'lumot qo'shildi");
        })
        .catch((err) => {
          message.error("Ma'lumot qo'shilmadi!");
          this.setState({ loading: false });
        });
    } else {
      axios
        .patch(
          `${url}/videos/${this.state.edit}/`,
          { video_lavha: this.state.urlVideo },
          {
            headers: {
              Authorization: `Token ${window.localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.getVideos();
          message.success("Ma'lumot o'zgartirildi");
        })
        .catch((err) => {
          message.error("Ma'lumot o'zgartirilmadi!");
          this.setState({ loading: false });
        });
    }
    this.setState({
      edit: null,
    });
  };
  componentDidMount() {
    this.getVideos();
  }
  changeUrl = (e) => {
    this.setState({ urlVideo: e.target.value });
  };
  getVideos = () => {
    axios
      .get(`${url}/videos/`)
      .then((res) => {
        this.setState({
          videos: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        message.error("Ma'lumotlar kelmadi!");
        this.setState({
          loading: false,
        });
      });
  };
  close = () => {
    this.setState({
      edit: null,
      urlVideo: "",
    });
  };
  editVideo = (id) => {
    this.setState({
      edit: this.state.videos[id].id,
      urlVideo: this.state.videos[id].video_lavha,
    });
  };
  deleteVideo = (id) => {
    this.setState({ loading: true });
    axios
      .delete(`${url}/videos/${id}/`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.getVideos();
        message.success("Ma'lumot o'chirildi");
      })
      .catch((err) => {
        message.success("Ma'lumot o'chirildi!");
        this.setState({ loading: false });
      });
  };
  render() {
    return (
      <div>
        {window.localStorage.getItem("token") ? (
          this.state.loading ? (
            <Loader />
          ) : (
            <div>
              <div>
                <form className="formnew">
                  <h4>
                    {this.state.edit === null ? (
                      <p>Yangi video qo'shish</p>
                    ) : (
                      <p>Tanlangan videoni almashtirish</p>
                    )}
                  </h4>
                  <input
                    type="url"
                    placeholder="Videoni linkini kiriting"
                    id="you"
                    onChange={this.changeUrl}
                    value={this.state.urlVideo}
                    style={{
                      width: "100%",
                      display: "block",
                      fontSize: "17px",
                    }}
                  />
                  <br />
                  <Button
                    type="danger"
                    onClick={() => this.close()}
                    htmlType="button"
                    style={{ marginRight: 8 }}
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    type="primary"
                    onClick={this.addVideo}
                    htmlType="button"
                  >
                    Videoni saqlash
                  </Button>
                </form>
              </div>
              <Row>
                {this.state.videos !== null
                  ? this.state.videos.map((item, key) => {
                      return (
                        <Col lg={6} md={12} sm={12} style={{ padding: "20px" }}>
                          {console.log(item.video_lavha.indexOf("&"))}
                          <div className="you_col">
                            <YouTube
                              style={{ width: "100%", height: "300px" }}
                              video={
                                item.video_lavha.charAt(24) === "w"
                                  ? item.video_lavha.slice(
                                      item.video_lavha.indexOf("=") + 1,
                                      item.video_lavha.indexOf("&") !== -1
                                        ? item.video_lavha.indexOf("&")
                                        : item.video_lavha.length
                                    )
                                  : item.video_lavha.slice(
                                      item.video_lavha.indexOf("/")
                                    )
                              }
                              className="you"
                              // autoPlay={true}
                              // muted={true}
                            />
                            <div className="you_btn">
                              <Button
                                type="primary"
                                icon={
                                  <EditOutlined
                                    style={{
                                      position: "relative",
                                      top: "-5px",
                                    }}
                                  />
                                }
                                onClick={() => {
                                  this.editVideo(key);
                                }}
                              >
                                O'zgartirish
                              </Button>
                              <Button
                                type="danger"
                                icon={
                                  <DeleteOutlined
                                    style={{
                                      position: "relative",
                                      top: "-5px",
                                    }}
                                  />
                                }
                                onClick={() => {
                                  this.deleteVideo(item.id);
                                }}
                              >
                                O'chirish
                              </Button>
                            </div>
                          </div>
                        </Col>
                      );
                    })
                  : ""}
              </Row>
            </div>
          )
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }
}
