import { message, Image } from "antd";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import YouTube from "react-youtube";
import { url } from "../host/Host";
import Loader from "./Loader";
import {
  YMaps,
  Map,
  Clusterer,
  Placemark,
  TypeSelector,
  ZoomControl,
  GeolocationControl,
  RouteButton,
  TrafficControl,
} from "react-yandex-maps";
import { Redirect } from "react-router-dom";

export default class Dashboard extends Component {
  state = {
    loading: true,
    school: null,
    images: null,
    instagram: "",
    facebook: "",
    telegram: "",
    youtube: "",
    input: true,
    params: null,
    domain: null,
    selectA: false,
    img: "data:image/png;base64,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",
    manzil: "",
  };
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    axios
      .get(`${url}/dashboard/`)
      .then((res) => {
        this.setState({
          // domain: res.data[0].domain,
          school: res.data[0],
          loading: false,
          images: res.data[0].logo,
          instagram: res.data[0].instagram,
          telegram: res.data[0].telegram,
          youtube: res.data[0].youtube,
          facebook: res.data[0].facebook,
          params: res.data[0].address,
          manzil: res.data[0].manzil,
        });
      })
      .catch((err) => {
        message.error("Ma'lumot topilmadi!");
      });
  };

  customRequest = (e) => {
    let image = e.target.files[0];

    var a = this.state.images;
    // a.append(`${e.target.name}`, image)
    a[`${e.target.name}`] = image;

    this.setState({ images: a });
  };
  customText = (e) => {
    var a = this.state.images;
    // a.append(`${e.target.name}`, image)
    a[`${e.target.name}`] = e.target.value;

    this.setState({ images: a, selectA: true });
  };
  domain = (e) => {
    this.setState({ domain: e.target.value });
  };
  addLesson = () => {
    const formData = new FormData();
    this.setState({ loading: true });
    if (this.state.images !== this.state.school.logo)
      formData.append("logo", this.state.images);
    if (this.state.manzil !== this.state.school.manzil)
      formData.append("manzil", this.state.manzil);
    if (this.state.instagram !== this.state.school.instagram)
      formData.append("instagram", this.state.instagram);
    if (this.state.facebook !== this.state.school.facebook)
      formData.append("facebook", this.state.facebook);
    if (this.state.telegram !== this.state.school.telegram)
      formData.append("telegram", this.state.telegram);
    if (this.state.youtube !== this.state.school.youtube)
      formData.append("youtube", this.state.youtube);
    if (this.state.params !== this.state.school.address)
      formData.append("address", this.state.params);
    axios
      .patch(`${url}/dashboard/1/`, formData, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.getData();
        message.success("Ma'lumot o'zgartirildi");
      })
      .catch((err) => {
        message.error("Ma'lumot o'zgartirilmadi!");
      });

    // if (this.state.domain !== null) {
    //   formData.append("domain", this.state.domain);
    // }
    // if (this.state.images.instagram) {
    //   formData.append("instagram", this.state.images.instagram);
    // }
    // if (this.state.images.telegram) {
    //   formData.append("telegram", this.state.images.telegram);
    // }
    // if (this.state.images.facebook) {
    //   formData.append("facebook", this.state.images.facebook);
    // }
    // if (this.state.images.youtube) {
    //   formData.append("youtube", this.state.images.youtube);
    // }
    // if (this.state.images.email) {
    //   formData.append("email", this.state.images.email);
    // }

    // if (this.state.images.video1) {
    //   formData.append("video1", this.state.images.video1);
    // }

    // if (this.state.images.video2) {
    //   formData.append("video2", this.state.images.video2);
    // }

    // if (this.state.images.video3) {
    //   formData.append("video3", this.state.images.video3);
    // }

    // if (this.state.images.image_p) {
    //   formData.append("image_p", this.state.images.image_p);
    // }

    // if (this.state.images.video) {
    //   formData.append("video", this.state.images.video);
    // }

    // if (this.state.images.manzil) {
    //   formData.append("manzil", this.state.images.manzil);
    // }

    // if (this.state.images.video2_text) {
    //   formData.append("video2_text", this.state.images.video2_text);
    // }

    // if (this.state.images.video3_text) {
    //   formData.append("video3_text", this.state.images.video3_text);
    // }

    // if (this.state.images.text_p_ism) {
    //   formData.append("text_p_ism", this.state.images.text_p_ism);
    // }

    // if (this.state.images.text_p) {
    //   formData.append("text_p", this.state.images.text_p);
    // }

    // if (this.state.images.text_afzallik_1) {
    //   formData.append("text_afzallik_1", this.state.images.text_afzallik_1);
    // }
    // if (this.state.images.statistics_maktab) {
    //   formData.append("statistics_maktab", this.state.images.statistics_maktab);
    // }
    // if (this.state.images.statistics_pupils) {
    //   formData.append("statistics_pupils", this.state.images.statistics_pupils);
    // }
    // if (this.state.images.statistics_teachers) {
    //   formData.append(
    //     "statistics_teachers",
    //     this.state.images.statistics_teachers
    //   );
    // }
    // if (this.state.images.statistics_talim_tillari) {
    //   formData.append(
    //     "statistics_talim_tillari",
    //     this.state.images.statistics_talim_tillari
    //   );
    // }

    // if (this.state.images.text_afzallik_2) {
    //   formData.append("text_afzallik_2", this.state.images.text_afzallik_2);
    // }
    // if (this.state.images.text_afzallik_3) {
    //   formData.append("text_afzallik_3", this.state.images.text_afzallik_3);
    // }

    // if (this.state.images.text_afzallik_4) {
    //   formData.append("text_afzallik_4", this.state.images.text_afzallik_4);
    // }
    // if (this.state.images.name) {
    //   formData.append("name", this.state.images.name);
    // }
    // if (!!this.state.images.phone) {
    //   formData.append("phone", this.state.images.phone);
    // }
    // axios
    //   .patch(`${url}/boshqarma/${1}/`, formData, {
    //     headers: {
    //       "Content-type": "multipart/form-data; charset=UTF-8",
    //       Authorization: `Token ${window.localStorage.getItem("token")}`,
    //     },
    //   })
    //   .then((res) => {
    //     this.getData();
    //     axios
    //       .patch(
    //         `${url}/boshqarma/${1}/`,
    //         { params: this.state.params },
    //         {
    //           headers: {
    //             "Content-type": "multipart/form-data; charset=UTF-8",
    //             Authorization: `Token ${window.localStorage.getItem("token")}`,
    //           },
    //         }
    //       )
    //       .then((res) => {
    //         message.success("Ma'lumot qo'shildi");
    //       });

    //     message.success("Ma'lumot qo'shildi");
    //   })
    //   .catch((err) => {
    //     message.error("Ma'lumot qo'shilmadi");
    //     this.setState({ loading: false });
    //   });
  };
  onMapClick = (e) => {
    var coords = e.get("coords");
    this.setState({
      params: coords,
    });
  };
  changeManzil = (e) => {
    this.setState({ manzil: e.target.value });
  };
  changeInstagram = (e) => {
    this.setState({ instagram: e.target.value });
  };
  changeFacebook = (e) => {
    this.setState({ facebook: e.target.value });
  };
  changeTelegram = (e) => {
    this.setState({ telegram: e.target.value });
  };
  changeYoutube = (e) => {
    this.setState({ youtube: e.target.value });
  };
  changeFile = (e) => {
    this.setState({ images: e.target.files[0] });
  };
  coords = (e) => {
    if (e.length !== 1) {
      return e;
    } else {
      var a = e[0].slice(0, e[0].indexOf(","));
      var b = e[0].slice(e[0].indexOf(",") + 1);
      return [+a, +b];
    }
  };

  render() {
    return (
      <div>
        {window.localStorage.getItem("token") ? (
          this.state.loading === true ? (
            <Loader />
          ) : (
            <div>
              <Form
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                }}
              >
                <Row style={{ marginTop: "20px" }}>
                  <Col
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    sm={12}
                    md={6}
                    lg={6}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          borderBottom: "1px solid black",
                          marginBottom: "20px",
                          fontSize: "16px",
                        }}
                      >
                        Boshqarma manzili
                      </Form.Label>
                      <Form.Control
                        className="formInput"
                        type="text"
                        value={this.state.manzil}
                        onChange={this.changeManzil}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          borderBottom: "1px solid black",
                          marginBottom: "20px",
                          fontSize: "16px",
                        }}
                      >
                        Boshqarma instagram linki
                      </Form.Label>
                      <Form.Control
                        className="formInput"
                        type="text"
                        value={this.state.instagram}
                        onChange={this.changeInstagram}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          borderBottom: "1px solid black",
                          marginBottom: "20px",
                          fontSize: "16px",
                        }}
                      >
                        Boshqarma facebook linki
                      </Form.Label>
                      <Form.Control
                        className="formInput"
                        type="text"
                        value={this.state.facebook}
                        onChange={this.changeFacebook}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          borderBottom: "1px solid black",
                          marginBottom: "20px",
                          fontSize: "16px",
                        }}
                      >
                        Boshqarma telegram linki
                      </Form.Label>
                      <Form.Control
                        className="formInput"
                        type="text"
                        value={this.state.telegram}
                        onChange={this.changeTelegram}
                      />
                    </Form.Group>
                  </Col>
                  <Col
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    sm={12}
                    md={6}
                    lg={6}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          borderBottom: "1px solid black",
                          marginBottom: "20px",
                          fontSize: "16px",
                        }}
                      >
                        Boshqarma youtube linki
                      </Form.Label>
                      <Form.Control
                        className="formInput"
                        type="text"
                        value={this.state.youtube}
                        onChange={this.changeYoutube}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          borderBottom: "1px solid black",
                          marginBottom: "20px",
                          fontSize: "16px",
                        }}
                      >
                        Boshqarma logotipi
                      </Form.Label>
                      <Form.Control
                        className="formInput"
                        type="file"
                        accept="image/*"
                        onChange={this.changeFile}
                      />
                      {this.state.images !== null ? (
                        <>
                          <br />
                          <Image
                            src={this.state.images}
                            width={160}
                            height={160}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                {/* <Row style={{ marginTop: "20px" }}>
                  <Col lg={6} md={12} sm={12}>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Boshqarma nomi
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="name"
                            type="text"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.name
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Boshqarma manzili
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="manzil"
                            type="text"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.manzil
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Boshqarma veb sahifasining ssilkasini kiriting
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="domain"
                            type="url"
                            defaultValue={
                              this.state.domain !== null
                                ? this.state.domain
                                : ""
                            }
                            onChange={(e) => this.domain(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Boshqarma emailini kiriting
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="email"
                            type="email"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.email
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Boshqarma instagram sahifasining ssilkasini kiriting
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="instagram"
                            type="url"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.instagram
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Boshqarma telegram sahifasining ssilkasini kiriting
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="telegram"
                            type="url"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.telegram
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Boshqarma facebook sahifasining ssilkasini kiriting
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="facebook"
                            type="url"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.facebook
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Boshqarma youtube sahifasining ssilkasini kiriting
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="youtube"
                            type="url"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.youtube
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Boshqarma telefon raqamini kiriting
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="phone"
                            type="text"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.phone
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Maktablar soni
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="statistics_maktab"
                            type="text"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.statistics_maktab
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            O'quvchilar soni
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="statistics_pupils"
                            type="text"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.statistics_pupils
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            O'qituvchilar soni
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="statistics_teachers"
                            type="text"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.statistics_teachers
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Ta'lim tillari soni
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="statistics_talim_tillari"
                            type="text"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.statistics_talim_tillari
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={8}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={8}
                        lg={8}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifasining bosh qismidagi video
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            placeholder="Videoning linkini kiriting"
                            name="video1"
                            type="url"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.video1
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                      <Col
                        sm={4}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={4}
                        lg={4}
                      >
                        <video
                          controls={true}
                          autoPlay={true}
                          muted={true}
                          src={
                            this.state.school !== null
                              ? this.state.school.video1 !== null
                                ? this.state.school.video1
                                : this.state.img
                              : ""
                          }
                          style={{ width: "150px" }}
                        ></video>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={8}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={8}
                        lg={8}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifadagi ikkinchi video
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            placeholder="Videoning linkini kiriting"
                            name="video2"
                            type="url"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.video2
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                      <Col
                        sm={4}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={4}
                        lg={4}
                      >
                        <video
                          controls={true}
                          autoPlay={true}
                          muted={true}
                          src={
                            this.state.school !== null
                              ? this.state.school.video2 !== null
                                ? this.state.school.video2
                                : this.state.img
                              : ""
                          }
                          style={{ width: "150px" }}
                        ></video>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifasining 2-video ustidagi yozuv
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="video2_text"
                            as="textarea"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.video2_text
                                : ""
                            }
                            placeholder="Matn kiriting..."
                            style={{ height: "100px" }}
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={8}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={8}
                        lg={8}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifadagi uchinchi video
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            placeholder="Videoning linkini kiriting"
                            name="video3"
                            type="url"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.video3
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                      <Col
                        sm={4}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={4}
                        lg={4}
                      >
                        <video
                          controls={true}
                          autoPlay={true}
                          muted={true}
                          src={
                            this.state.school !== null
                              ? this.state.school.video3 !== null
                                ? this.state.school.video3
                                : this.state.img
                              : ""
                          }
                          style={{ width: "150px" }}
                        ></video>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifasining 3-videosi uchun yozuv
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="video3_text"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.video3_text
                                : ""
                            }
                            as="textarea"
                            placeholder="Matn kiriting..."
                            style={{ height: "100px" }}
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={8}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={8}
                        lg={8}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifadagi prezident rasmi
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            accept=".jpg, .jpeg, .png"
                            name="image_p"
                            type="file"
                            onChange={this.customRequest}
                          />
                        </Form.Group>
                      </Col>
                      <Col
                        sm={4}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={4}
                        lg={4}
                      >
                        <img
                          alt="..."
                          src={
                            this.state.school !== null
                              ? this.state.school.image_p !== null
                                ? this.state.school.image_p
                                : this.state.img
                              : ""
                          }
                          style={{ width: "150px" }}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifadagi prezident ismi
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="text_p_ism"
                            type="text"
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.text_p_ism
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifadagi prezident fikri
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="text_p"
                            as="textarea"
                            placeholder="Matn kiriting..."
                            style={{ height: "100px" }}
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.text_p
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifadagi 1-afzallik matni
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="text_afzallik_1"
                            as="textarea"
                            placeholder="Matn kiriting..."
                            style={{ height: "100px" }}
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.text_afzallik_1
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifadagi 1-afzallik matni
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="text_afzallik_2"
                            as="textarea"
                            placeholder="Matn kiriting..."
                            style={{ height: "100px" }}
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.text_afzallik_2
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifadagi 3-afzallik matni
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="text_afzallik_3"
                            as="textarea"
                            placeholder="Matn kiriting..."
                            style={{ height: "100px" }}
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.text_afzallik_3
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Col
                        sm={12}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        md={12}
                        lg={12}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "20px",
                              fontSize: "16px",
                            }}
                          >
                            Bosh sahifadagi 4-afzallik matni
                          </Form.Label>
                          <Form.Control
                            className="formInput"
                            name="text_afzallik_4"
                            as="textarea"
                            placeholder="Matn kiriting..."
                            style={{ height: "100px" }}
                            defaultValue={
                              this.state.school !== null
                                ? this.state.school.text_afzallik_4
                                : ""
                            }
                            onChange={(e) => this.customText(e)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>{" "}
                  </Col>
                </Row> */}
                <Button
                  className="btnFormIn"
                  onClick={this.addLesson}
                  variant="primary"
                  style={{ zIndex: 5 }}
                >
                  Ma'lumotlarni qo'shish
                </Button>
              </Form>

              <br />
              <br />
              <br />
              <div
                style={{
                  backgroundColor: "white",
                  marginBottom: "30px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                }}
              >
                <h4
                  style={{
                    textAlign: "center",
                    margin: "0",
                    padding: "0.5em 0",
                  }}
                >
                  Boshqarma joylashgan manzilni kiriting
                </h4>
                <YMaps query={{ lang: "uz_Uz" }}>
                  <Map
                    onClick={this.onMapClick}
                    width="100%"
                    height="65vh"
                    defaultState={{
                      center:
                        this.state.params !== null
                          ? this.coords(this.state.params)
                          : [41.79478951067519, 64.27236652149892],

                      zoom: 6,
                    }}
                  >
                    {
                      <Clusterer
                        options={{
                          preset: "islands#invertedVioletClusterIcons",
                          groupByCoordinates: false,
                        }}
                      >
                        <Placemark
                          key={0}
                          geometry={
                            this.state.params !== null
                              ? this.coords(this.state.params)
                              : [41.79478951067519, 64.27236652149892]
                          }
                          properties={{
                            balloonContent: "Boshqarma binosi",
                          }}
                        />
                      </Clusterer>
                    }

                    <GeolocationControl options={{ float: "left" }} />
                    <TypeSelector options={{ float: "right" }} />
                    <TrafficControl options={{ float: "right" }} />
                    <RouteButton options={{ float: "right" }} />
                    <ZoomControl options={{ float: "left" }} />
                  </Map>
                </YMaps>
              </div>
            </div>
          )
        ) : (
          <Redirect to="/admin/home" />
        )}
      </div>
    );
  }
}
