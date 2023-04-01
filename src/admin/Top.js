import React, { Component } from 'react';
import styles from '../Css/Top.module.css'

import {Container,Row,Col} from 'react-bootstrap'
import {FiSearch,FiChevronDown, FiPauseCircle} from "react-icons/fi";
import school1 from '../Img/user.png'
class Top extends Component {
    state={
        isOpen:false
    }
    openDiv=()=>{
       if(!this.state.isOpen){
           this.setState({
               isOpen:true
           })
           console.log(this.state.isOpen)
       }else{
           this.setState({
               isOpen:false
           })
           console.log(this.state.isOpen)

       }
    }
    render() {
        return (
            <div>
                <Container fluid className={styles.top}>
                    <Row>
                        <Col sm={12} xs={12}>
                        <h1>O'qituvchilar online platformasi
                      </h1></Col>
                       
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Top;