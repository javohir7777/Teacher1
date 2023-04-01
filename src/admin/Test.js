import React, { Component } from "react";
import { Tabs, Radio, message } from "antd";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  BiArrowBack,
  BiArrowFromLeft,
  BiArrowFromRight,
  BiArrowToLeft,
  BiArrowToRight,
} from "react-icons/bi";
import axios from "axios";
import Loader from "./Loader";
import { Redirect } from "react-router-dom";

const { TabPane } = Tabs;
export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "top",
      loading: true,
      questions: null,
      editId: null,
      tabKey: 1,
    };
    this.getTest();
  }
  getTest = () => {
    axios
      .get("https://edusite.abrorjonaxmadov.uz/tests/", {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.setState({ questions: res.data, loading: false });
      })
      .catch((err) => {
        message.error("Ma'lumot topilmadi!");
      });
  };
  cleanForm = () => {
    document.getElementById("savol").value = "";
    document.getElementById("A").value = "";
    document.getElementById("B").value = "";
    document.getElementById("C").value = "";
    document.getElementById("D").value = "";
    this.setState({ editId: null });
  };
  addTest = () => {
    this.setState({ loading: true });
    var savol = document.getElementById("savol").value;
    var A = document.getElementById("A").value;
    var B = document.getElementById("B").value;
    var C = document.getElementById("C").value;
    var D = document.getElementById("D").value;
    if (this.state.editId !== null) {
      axios
        .patch(
          `https://edusite.abrorjonaxmadov.uz/tests/${this.state.editId}/`,
          {
            question: savol,
            answers: [
              {
                answer: A,
                isAnswer: true,
                image: null,
              },
              {
                answer: B,
                isAnswer: false,
                image: null,
              },
              {
                answer: C,
                isAnswer: false,
                image: null,
              },
              {
                answer: D,
                isAnswer: false,
                image: null,
              },
            ],
            image: null,
          },
          {
            headers: {
              Authorization: `Token ${window.localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.getTest();
          this.cleanForm();
          message.success("Savol o'zgartirildi");
        })
        .catch((err) => {
          this.setState({ loading: false });
          message.error("Savol o'zgartirilmadi!");
        });
    } else {
      axios
        .post(
          "https://edusite.abrorjonaxmadov.uz/tests/",
          {
            question: savol,
            answers: [
              {
                answer: A,
                isAnswer: true,
                image: null,
              },
              {
                answer: B,
                isAnswer: false,
                image: null,
              },
              {
                answer: C,
                isAnswer: false,
                image: null,
              },
              {
                answer: D,
                isAnswer: false,
                image: null,
              },
            ],
            image: null,
          },
          {
            headers: {
              Authorization: `Token ${window.localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          message.success("Savol qo'shildi");
          this.getTest();
          this.cleanForm();
        })
        .catch((err) => {
          this.setState({ loading: false });
          message.error("Savol qo'shilmadi!");
        });
    }
  };
  editTest = (id) => {
    console.log(this.state.questions[id].id);
    this.setState({ editId: this.state.questions[id].id });
    document.getElementById("savol").value = this.state.questions[id].question;
    this.state.questions[id].answers.map((item, key) => {
      document.getElementById(`${String.fromCharCode(key + 65)}`).value =
        item.answer;
    });
  };
  deleteTest = (id) => {
    this.setState({ loading: true });
    axios
      .delete(`https://edusite.abrorjonaxmadov.uz/tests/${id}/`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.getTest();
        message.success("Savol o'chirildi!");
      })
      .catch((err) => {
        this.setState({ loading: false });
        message.error("Savol o'chirilmadi!");
      });
  };
  handleModeChange = (e) => {
    const mode = e.target.value;
    this.setState({ mode });
  };
  changeTabs = (e) => {
    if (e > this.state.questions.length) {
      this.setState({ tabKey: 1 });
    } else if (e === 0) {
      this.setState({ tabKey: this.state.questions.length });
    } else {
      this.setState({ tabKey: e });
    }
  };
  render() {
    const { mode, questions } = this.state;
    return (
      <div>
        {window.localStorage.getItem("token") ? (
          this.state.loading ? (
            <Loader />
          ) : (
            <div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <h4>Savolni kiriting</h4>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id="savol"
                    placeholder="Savolni kiriting"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>To'g'ri javob</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    className="A"
                    id="A"
                    placeholder="A-varinat"
                    style={{ border: "1px solid red" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Noto'g'ri javoblar</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    id="B"
                    placeholder="B-varinat"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    size="sm"
                    type="text"
                    id="C"
                    placeholder="C-varinat"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    size="sm"
                    type="text"
                    id="D"
                    placeholder="D-varinat"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => this.addTest()}
                  style={{ marginRight: 10 }}
                >
                  Saqlash
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => this.cleanForm()}
                >
                  Bekor qilish
                </Button>
                &nbsp;
              </Form>
              <Tabs
                activeKey={`${this.state.tabKey}`}
                tabPosition={mode}
                onChange={this.changeTabs}
              >
                {questions !== null &&
                  questions.map((item, key) => (
                    <TabPane tab={`${key + 1}-savol`} key={key + 1}>
                      {key + 1}-savol
                      <Container>
                        <Row>
                          <Col>
                            <div>
                              <h4>{item.question}</h4>
                              {item.answers.map((answer, key1) => {
                                return (
                                  <p>
                                    {String.fromCharCode(key1 + 65)}
                                    {") "}
                                    {answer.answer}
                                  </p>
                                );
                              })}
                            </div>
                          </Col>
                        </Row>
                      </Container>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => this.editTest(key)}
                      >
                        O'zgartirish
                      </Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        type="button"
                        onClick={() => this.deleteTest(item.id)}
                      >
                        O'chirish
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        style={{ float: "right", marginRight: "5px" }}
                        onClick={() => this.changeTabs(this.state.tabKey + 1)}
                      >
                        <i>
                          <BiArrowToRight />
                        </i>
                      </Button>
                      <Button
                        variant="primary"
                        type="button"
                        style={{ float: "right", marginRight: "5px" }}
                        onClick={() => this.changeTabs(this.state.tabKey - 1)}
                      >
                        <BiArrowToLeft />
                      </Button>
                    </TabPane>
                  ))}
              </Tabs>
            </div>
          )
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }
}
