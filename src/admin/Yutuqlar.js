import React, { Component } from "react";
import { Table, Input, Modal, Button, Space, message } from "antd";
import Highlighter from "react-highlight-words";
import { Form } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";
import { url } from "../host/Host";
import axios from "axios";
import ImageDemo from "./ImageDemo";
import GLOBAL from "../host/Global";
import Loader from "./Loader";

export class Yutuqlar extends Component {
  state = {
    loading: false,
    datas: [],
    searchText: "",
    searchedColumn: "",
    textF: "",
    show: false,
    showMatn: false,
    image: null,
    imageUrl: "",
    edit: null,
    previewImage: false,
    description: null,
    name: "",
    date_added: "",
  };
  matnKorish = (description) => {
    this.setState({
      showMatn: true,
      description: description,
    });
  };
  openModal = () => {
    this.setState({
      show: true,
    });
  };

  closeMatn = () => {
    this.setState({
      showMatn: false,
      description: "",
    });
  };

  closeModal = () => {
    this.setState({
      show: false,
      edit: null,
      image: null,
      imageUrl: null,
      date_added: "",
      name: "",
      description: "",
      previewImage: false,
    });
  };
  editAchievement = (key) => {
    this.setState({
      name: this.state.datas[key].name,
      date_added: this.state.datas[key].date_added,
      description: this.state.datas[key].description,
      imageUrl: this.state.datas[key].image,
      edit: this.state.datas[key].id,
      previewImage: true,
    });
    this.openModal();
  };
  customRequest = (e) => {
    let image = e.target.files[0];
    this.setState({
      image: image,
      imageUrl: image,
      previewImage: false,
    });
  };
  saveAchievement = () => {
    this.setState({ loading: true });
    let formData = new FormData();
    formData.append("name", this.state.name ?? "");
    formData.append("date_added", this.state.date_added ?? "");
    formData.append("description", this.state.description ?? "");
    if (this.state.edit !== null) {
      if (this.state.image !== null) {
        formData.append("image", this.state.image ?? "");
      }
      axios
        .patch(`${url}/achievements/${this.state.edit}/`, formData, {
          headers: {
            Authorization: `Token ${window.localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.getAchievement();
          message.success("Yutuq o'zgartirildi");
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
          message.error("Yutuq o'zgartirilmadi!");
        });
    } else {
      formData.append("image", this.state.image ?? "");
      axios
        .post(`${url}/achievements/`, formData, {
          headers: {
            Authorization: `Token ${window.localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.getAchievement();
          message.success("Yutuq saqlandi");
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
          message.error("Yutuq saqlanmadi!");
        });
    }
    this.closeModal();
  };
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (description) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={description ? description.toString() : ""}
        />
      ) : (
        description
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  getAchievement = () => {
    axios
      .get(`${url}/achievements/`)
      .then((res) => {
        var data = res.data;
        for (let i = 0; i < data.length; i++) {
          data[i].key = i + 1;
        }
        this.setState({
          datas: data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };
  deleteAchievement = (id) => {
    this.setState({
      loading: true,
    });
    axios
      .delete(`${url}/achievements/${id}`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        message.success("Yutuq o'chirildi");
        this.getAchievement();
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        message.error("Yutuq o'chirilmadi");
      });
  };
  componentDidMount() {
    this.getAchievement();
  }
  changeName = (e) => {
    this.setState({ name: e.target.value });
  };
  changeDate = (e) => {
    this.setState({ date_added: e.target.value });
  };
  changeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  render() {
    const columns = [
      {
        title: "Id",
        dataIndex: "key",
        key: "key",
        ...this.getColumnSearchProps("key"),
      },
      {
        title: "Yutuq rasmi",
        dataIndex: "image",
        key: "image",
        width: "20%",
        render: (image) => {
          return <img src={image} style={{ width: "100%" }} alt="rasm" />;
        },
      },
      {
        title: "Yutuq nomi",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },

      {
        title: "Yutuq sanasi",
        dataIndex: "date_added",
        key: "date_added",
        ...this.getColumnSearchProps("date_added"),
      },

      {
        title: "Yutuq matni",
        dataIndex: "description",
        key: "description",
        render: (description) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.matnKorish(description);
              }}
            >
              Matnni ko'ring
            </Button>
          );
        },
      },
      {
        title: "O'zgartirish",
        dataIndex: "key",
        key: "keyId",
        render: (key) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.editAchievement(key - 1);
              }}
            >
              O'zgartirish
            </Button>
          );
        },
      },
      {
        title: "O'chirish",
        dataIndex: "id",
        key: "keyId",
        render: (id) => {
          return (
            <Button
              type="danger"
              onClick={() => {
                this.deleteAchievement(id);
              }}
            >
              O'chirish
            </Button>
          );
        },
      },
    ];
    return (
      <div>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <div>
            <br />
            <Button type="primary" onClick={this.openModal}>
              Yutuq yaratish
            </Button>
            <br />
            <br />
            <Table columns={columns} dataSource={this.state.datas} />
            <Modal
              title="Yutuq matni"
              visible={this.state.showMatn}
              onCancel={this.closeMatn}
              footer={false}
            >
              <p>{this.state.description}</p>
            </Modal>
            <Modal
              title="Yutuq"
              visible={this.state.show}
              onCancel={this.closeModal}
              footer={false}
            >
              <Form>
                <Form.Group className="mb-3" controlId="formBasicname">
                  <Form.Label>Yutuq nomi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    required
                    type="text"
                    placeholder="Yutuq nomi"
                    value={this.state.name}
                    onChange={this.changeName}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicdate">
                  <Form.Label>Yutuq sanasi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    value={this.state.date_added}
                    required
                    type="date"
                    placeholder="mm/dd/yyyy"
                    onChange={this.changeDate}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicimage">
                  <Form.Label>Yutuq rasmi</Form.Label>
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
                      <br />
                      {ImageDemo(this.state.imageUrl)}
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
                  <Form.Label>Yutuq matni</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    value={this.state.description}
                    as="textarea"
                    placeholder="Yutuq matni"
                    style={{ height: "200px" }}
                    onChange={this.changeDescription}
                  />
                </Form.Group>
                <br />
                <br />
                <Button
                  type="danger"
                  htmlType="button"
                  onClick={this.closeModal}
                >
                  Bekor qilish
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={this.saveAchievement}
                >
                  Saqlash
                </Button>
              </Form>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default Yutuqlar;
