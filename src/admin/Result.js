import React, { Component } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Calendar, message } from "antd";
import moment from "moment";
import { Table, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export class Result extends Component {
  constructor() {
    super();
    this.state = {
      results: null,
      data: "",
      date: new Date(),
      searchText: "",
      searchedColumn: "",
    };
  }
  componentDidMount() {
    this.getResults();
  }

  getResults = () => {
    axios
      .get("https://edusite.abrorjonaxmadov.uz/tests/results/")
      .then((res) => {
        var data = res.data;
        for (let i = 0; i < res.data.length; i++) {
          data[i].name =
            data[i].student.first_name + " " + data[i].student.last_name;
        }
        this.setState({ results: data });
        this.filterData(data, this.state.date);
      })
      .catch((err) => console.log(err));
  };

  changeDate = (value) => {
    var _date =
      value._d.getDate() > 9
        ? `${value._d.getDate()}`
        : `0${value._d.getDate()}`;
    var _month =
      value._d.getMonth() + 1 > 9
        ? `${value._d.getMonth() + 1}`
        : `0${value._d.getMonth() + 1}`;
    var _year = `${value._d.getFullYear()}`;
    var _d = _year + "-" + _month + "-" + _date;
    this.setState({ date: _d });
    this.filterData(this.state.results, _d);
  };

  filterData = (datas, date) => {
    if (typeof date === "string") {
      var data = datas.filter(
        (data) => data.date_created.slice(0, 10) === date
      );
      this.setState({ data });
    } else {
      this.changeDate(moment(date));
    }
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

  deleteResult = (id) => {
    axios
      .delete(`https://edusite.abrorjonaxmadov.uz/tests/results/${id}`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.getResults();
        message.success("Ma'lumot o'chirildi");
      })
      .catch((err) => message.error("Ma'lumot o'chirilmadi!"));
  };

  render() {
    const columns = [
      {
        title: "O'quvchining ismi",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Telefon raqami",
        dataIndex: "student",
        key: "phone",
        render: (student) => {
          return student.phone;
        },
      },
      {
        title: "O'qish joyi",
        dataIndex: "student",
        key: "university",
        render: (student) => {
          var university = student.university ? student.university : "";
          var faculty = student.faculty ? student.faculty : "";
          var group = student.group ? student.group : "";
          return university + " " + faculty + " " + group;
        },
      },
      {
        title: "Natijasi",
        dataIndex: "point",
        key: "point",
      },
      {
        title: "O'chirish",
        dataIndex: "id",
        key: "keyId",
        render: (id) => {
          return (
            <Button type="danger" onDoubleClick={() => this.deleteResult(id)}>
              O'chirish
            </Button>
          );
        },
      },
    ];
    return (
      <div>
        <h2>Natijalar jadvali</h2>
        <div>
          <Row>
            <Col lg="8">
              <Table
                columns={columns}
                dataSource={this.state.data}
                style={{ width: "100%" }}
              />
            </Col>
            <Col lg="4" style={{ minWidth: 324.44 }}>
              <div
                style={{
                  width: 300,
                  border: "1px solid #000000",
                  borderRadius: 2,
                }}
              >
                <Calendar
                  value={moment(this.state.date)}
                  fullscreen={false}
                  onChange={this.changeDate}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Result;
