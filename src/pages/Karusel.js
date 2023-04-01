import React, { Component } from "react";
import Photo1 from "../Img/photo1.jpg";
import Photo2 from "../Img/photo2.jpg";

import {
  Button,
  Carousel,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
export default class Karusel extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item
            interval={500}
            style={{ height: "100vh", backgroundColor: "grey" }}
          >
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item
            interval={500}
            style={{ height: "100vh", backgroundColor: "grey" }}
          >
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item
            interval={500}
            style={{ height: "100vh", backgroundColor: "grey" }}
          >
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
