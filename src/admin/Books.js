import React, { Component } from "react";
import Loader from "./Loader";
import { Table, Input, Modal, Button, Space, message } from "antd";
import Highlighter from "react-highlight-words";
import { Form, Card, Col, Row } from "react-bootstrap";
import {
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { url } from "../host/Host";
import axios from "axios";
import ImageDemo from "./ImageDemo";
import fileDownload from "js-file-download";

export class Books extends Component {
  state = {
    loading: true,
    showModal: false,
    books: [],
    title: "",
    author: "",
    image: null,
    description: "",
    file: null,
    previewImage: false,
    imageUrl: null,
    editId: null,
    keyId: null,
  };
  openModal = () => {
    this.setState({
      showModal: true,
    });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  customRequest = (e) => {
    if (e) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (a) => {
        this.setState({
          imageUrl: a.target.result,
          image: e.target.files[0],
          previewImage: true,
        });
      };
    }
    if (this.state.previewImage && e) {
      this.setState({ previewImage: false });
    }
  };
  changeTitle = (e) => {
    this.setState({ title: e.target.value });
  };
  changeAuthor = (e) => {
    this.setState({ author: e.target.value });
  };
  changeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  changeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };
  getBooks = () => {
    axios.get(`${url}/books/`).then((res) => {
      this.setState({ books: res.data, loading: false });
    });
  };
  saveBooks = () => {
    this.setState({ loading: true });
    let formData = new FormData();
    formData.append("title", this.state.title ?? "");
    formData.append("author", this.state.author ?? "");
    formData.append("description", this.state.description ?? "");
    if (this.state.editId === null) {
      formData.append("image", this.state.image ?? null);
      formData.append("file", this.state.file ?? null);
      axios
        .post(`${url}/books/`, formData, {
          headers: {
            Authorization: `Token ${window.localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.getBooks();
          this.closeModal();
          message.success("Ma'lumot qo'shildi");
        })
        .catch((err) => {
          message.error("Ma'lumot qo'shilmadi!");
          this.setState({ loading: false });
        });
    } else {
      if (this.state.books[this.state.keyId].image !== this.state.image) {
        formData.append("image", this.state.image ?? null);
      }
      if (this.state.file !== this.state.books[this.state.keyId].file) {
        formData.append("file", this.state.file ?? null);
      }
      axios
        .patch(`${url}/books/${this.state.editId}/`, formData, {
          headers: {
            Authorization: `Token ${window.localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.getBooks();
          this.closeModal();
          message.success("Ma'lumot o'zgartirildi");
        })
        .catch((err) => {
          message.error("Ma'lumot o'zgartirilmadi!");
          this.setState({ loading: false });
        });
    }
  };
  deleteBook = (id) => {
    this.setState({ loading: true });
    axios
      .delete(`${url}/books/${id}`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.getBooks();
        message.success("Ma'lumot o'chirildi");
      })
      .catch((err) => {
        message.error("Ma'lumot o'chirilmadi!");
        this.setState({ loading: false });
      });
  };
  editBook = (idKey) => {
    this.setState({
      editId: this.state.books[idKey].id,
      title: this.state.books[idKey].title,
      author: this.state.books[idKey].author,
      description: this.state.books[idKey].description,
      imageUrl: this.state.books[idKey].image,
      image: this.state.books[idKey].image,
      file: this.state.books[idKey].file,
      keyId: idKey,
      previewImage: true,
    });
    this.openModal();
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
  componentDidMount() {
    this.getBooks();
  }
  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <div>
            <br />
            <Button type="primary" onClick={this.openModal}>
              Kitob qo'shish
            </Button>

            <Modal
              title="Kitob"
              visible={this.state.showModal}
              onCancel={this.closeModal}
              footer={false}
            >
              <Form>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Kitob sarlavhasi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    value={this.state.title}
                    onChange={this.changeTitle}
                    required
                    type="text"
                    placeholder="Kitob sarlavhasi"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAuthor">
                  <Form.Label>Kitob muallifi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    value={this.state.author}
                    onChange={this.changeAuthor}
                    required
                    type="text"
                    placeholder="Kitob muallifi"
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicdate">
                  <Form.Label>Kitob sanasi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    // defaultValue={this.state.date_added}
                    name="date_added"
                    required
                    type="date"
                    placeholder="mm/dd/yy"
                  />
                </Form.Group> */}

                <Form.Group className="mb-3" controlId="formBasicFile">
                  <Form.Label>Kitob fayli</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf, .zip, .rar, .rar4"
                    onChange={this.changeFile}
                    required
                    type="file"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage">
                  <Form.Label>Kitob rasmi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.customRequest}
                    required
                    type="file"
                  />

                  {this.state.previewImage ? (
                    <>
                      <br />
                      <br /> {ImageDemo(this.state.imageUrl)}
                    </>
                  ) : (
                    ""
                  )}
                </Form.Group>

                <Form.Group
                  controlId="formBasictext"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Label>Qo'shimcha</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    value={this.state.description}
                    onChange={this.changeDescription}
                    as="textarea"
                    name="text"
                    placeholder="Izoh..."
                    style={{ height: "200px" }}
                  />
                </Form.Group>
                <br />
                <br />
                <Button
                  type="danger"
                  htmlType="button"
                  onClick={this.closeModal}
                  style={{ marginRight: 5 }}
                >
                  Bekor qilish
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={this.saveBooks}
                >
                  Saqlash
                </Button>
              </Form>
            </Modal>
            <div style={{ marginTop: 20 }}>
              <Row>
                {this.state.books.map((item, key) => {
                  return (
                    <Col lg={4} md={6} xs={12} style={{ marginBottom: "10px" }}>
                      <Card
                        style={{
                          width: "18rem",
                          boxShadow:
                            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={item.image}
                          style={{
                            height: "200px",
                            // width: "100%",
                          }}
                        />
                        <Card.Body>
                          <Card.Title>
                            {item.title}({item.author})
                          </Card.Title>
                          <Card.Text>{item.description}</Card.Text>
                          <Button
                            type="primary"
                            icon={<EditOutlined />}
                            block
                            style={{ marginBottom: 8 }}
                            onClick={() => this.editBook(key)}
                          >
                            O'zgartirish
                          </Button>
                          <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            block
                            style={{ marginBottom: 8 }}
                            onDoubleClick={() => this.deleteBook(item.id)}
                          >
                            O'chirish
                          </Button>
                          <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            block
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
                })}
              </Row>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Books;
