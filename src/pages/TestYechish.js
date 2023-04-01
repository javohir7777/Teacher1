import React, { Component } from 'react'
import Header from './Header'
import style from "../Css/TestYechish.module.css"
import {Row, Col, Container} from 'react-bootstrap'
import { url } from '../host/Host'
import axios from 'axios'
import $ from "jquery";
import PuffLoader from "react-spinners/PuffLoader";
import Footer from './Footer'

export default class TestYechish extends Component {
   state={tests:null,
exam:[],
loader:true,
student:null,
    test:0,
    javoblar:[], bel:[], soat:5400,
    number:0,
    send:false,
    natija:'',



}

getTest=()=>{
    this.setState({
        tests:null,
        exam:[],
        loader:true,
      
            test:0,
            javoblar:[], bel:[], soat:5400,
            number:0,
            send:false,
            natija:''
    })
    axios.get(`${url}/tests/exam`, {
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`
        }
      }).then(res=>{
        console.log(res.data)
        var t=[]
        for(let i=0; i<30; i++){
t.push(-1)
        }
        this.setState({tests:res.data.slice(0, 30), number:res.data.length, loader:false, exam:t})
        setInterval(()=>{
            if(this.state.soat===0){
                this.sendJavob()
            }else{
                this.setState({
                    soat:this.state.soat-1
                })
              
            }
        }, 1000)
     
    })
}


componentDidMount(){
this.getTest()
   
    axios.get(`${url}/users`, {
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`
        }
      }).then(res=>{
          var a=res.data
          a.avatar=url+a.avatar
        console.log(a)
        this.setState({student:a})
       
     
    })
}
sendJavob=()=>{
var javoblar=this.state.javoblar
this.setState({
   loader:true,
    tests:null
})
var test=this.state.tests
for(let i=0; i<test.length; i++){
var g=true    
    for(let j=0; j<javoblar.length; j+=2){
        if(test[i].id===javoblar[j]){
            g=false
       
        }
    }
    if(g){
        javoblar.push(test[i].id)
        javoblar.push(null)
    }
}

console.log(javoblar)

    axios.post(`${url}/tests/exam/`, {response:javoblar},{
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`
        }
      }).then(res=>{
          console.log(res.data.point)
          this.setState({ natija:res.data.point, send:true, loader:false})
      })
    
}
clickJavob=(q, a, w)=>{
    var j=this.state.javoblar
    var v=this.state.exam
    var bel=this.state.bel
    var f=true
  
    var t=0
v[this.state.test]=w
    for(let i=0; i<j.length; i+=2){
        if(j[i]===q){
            f=false
        t=i
        }
    }
    if(f){
        j.push(q)
        j.push(a)
    }else{
        j[t+1]=a
    }
    
    var k=true
    for(let i=0; i<bel.length; i++){
        if(bel[i]===this.state.test){
            k=false
    }
    }
    if(k){
        bel.push(this.state.test)
       
    }
    setTimeout(()=>{
        $("input[type=radio][name=javob]").prop('checked', false);
        this.setState({
            javoblar:j,
            bel:bel,
          
        })
        if(this.state.test!==this.state.number-1){
            this.setState({
                test:this.state.test+1
            })
        }
    }, 200)
console.log(j)

}
 
editTest=(id)=>{
    this.setState({test:id})
}
    render() {
        return (
            <div>
                  {this.state.loader ? 
          <div
            style={{
              backgroundColor: "rgb(40, 30, 100)",
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PuffLoader
              color="#ff4500"
              loading={this.state.loader}
              size={200}
            />
          </div>:
          <>
        <Header/>
        
              <Row className={style.oq}>
                  <Col className={style.fio} lg={3} md={3} sm={12}>
                     <div>
                       
                         {this.state.student!==null && this.state.student.avatar!==null? <img src= {this.state.student!==null?this.state.student.avatar:''}/>:''}
                        
                     </div>
                      <h1><i class="fa fa-user"></i>  {this.state.student!==null?this.state.student.last_name:''} {this.state.student!==null?this.state.student.first_name:''} {this.state.student!==null?this.state.student.patronymic:''}</h1>
                      <br/>
                      <br/>
                      <p><i class="fa fa-phone"></i>  {this.state.student!==null?this.state.student.phone:''}</p>
                      <br/>
                      <p><i class="fa fa-building"></i>  {this.state.student!==null?this.state.student.university:''}</p>
                      <br/>
                      <p><i class="fa fa-home"></i>   {this.state.student!==null?this.state.student.faculty:''} fakulteti</p>
                      <br/>
                      <p><i class="fa fa-group"></i>   {this.state.student!==null?this.state.student.group:''}-guruh</p>
                  </Col>
                  <Col className={style.test} lg={9} md={9} sm={12}>
                  {
              this.state.send?<div className={style.send}>
                  <Container>
         
                  <Row>
                  <Col lg={6} md={12}>
                      <h4>To'g'ri javoblar soni</h4>
                      <h5>{this.state.natija!==null?this.state.natija:''} ta</h5>
                  </Col>
                  <Col lg={6} md={12}>   
                  <h4>To'plangan ball</h4>
                      <h5>{this.state.natija!==null?this.state.natija*100/this.state.number:''} %</h5>
                  </Col>
               
                      </Row>
                      </Container>
                 <p className={style.page}>Bu sahifa test tizimida ishlayapti !!!</p>
               <button type="button" onClick={this.getTest} className={style.butN}>Testni boshlash</button>

                  </div>:<>
                  <div className={style.tt}>
              <h6>Test boshlandi!!!</h6>
    <h4>{parseInt(this.state.soat/3600)} : {parseInt((this.state.soat-parseInt(this.state.soat/3600)*3600)/60)} : {this.state.soat-(parseInt(this.state.soat/3600)*3600)-parseInt((this.state.soat-parseInt(this.state.soat/3600)*3600)/60)*60} vaqt qoldi</h4>
    
                 {this.state.tests!==null?
                 <form>
                      <h5>{this.state.test+1}. 
                      {this.state.tests[this.state.test].test.question}</h5>
                      <br/>
                      {this.state.exam[this.state.test]===0? <input type="radio" id="j" name="javob" checked onClick={()=>{this.clickJavob(this.state.tests[this.state.test].id,this.state.tests[this.state.test].test.answers[0].id, 0)}}/>:
                       <input type="radio" id="j" name="javob"  onClick={()=>{this.clickJavob(this.state.tests[this.state.test].id,this.state.tests[this.state.test].test.answers[0].id, 0)}}/>} A) {this.state.tests[this.state.test].test.answers[0].answer}
                     <br/><br/>
                      {this.state.exam[this.state.test]===1? <input type="radio" id="j" name="javob" checked onClick={()=>{this.clickJavob(this.state.tests[this.state.test].id,this.state.tests[this.state.test].test.answers[1].id, 1)}}/>:
                       <input type="radio" id="j" name="javob"  onClick={()=>{this.clickJavob(this.state.tests[this.state.test].id,this.state.tests[this.state.test].test.answers[1].id, 1)}}/>} B) {this.state.tests[this.state.test].test.answers[1].answer}
                     <br/><br/>
                      {this.state.exam[this.state.test]===2? <input type="radio" id="j" name="javob" checked onClick={()=>{this.clickJavob(this.state.tests[this.state.test].id,this.state.tests[this.state.test].test.answers[2].id, 2)}}/>:
                       <input type="radio" id="j" name="javob"  onClick={()=>{this.clickJavob(this.state.tests[this.state.test].id,this.state.tests[this.state.test].test.answers[2].id, 2)}}/>} C) {this.state.tests[this.state.test].test.answers[2].answer}
                     <br/><br/>
                      {this.state.exam[this.state.test]===3? <input type="radio" id="j" name="javob" checked onClick={()=>{this.clickJavob(this.state.tests[this.state.test].id,this.state.tests[this.state.test].test.answers[3].id, 3)}}/>:
                       <input type="radio" id="j" name="javob"  onClick={()=>{this.clickJavob(this.state.tests[this.state.test].id,this.state.tests[this.state.test].test.answers[3].id, 3)}}/>} D) {this.state.tests[this.state.test].test.answers[3].answer}
                     
                       </form>:''}
                 
              </div>
               <div className={style.numbers}> 
               
               {this.state.tests!==null?this.state.tests.map((item, key)=>{
                 if(key===this.state.test){
                    
                        return(<div className={style.active}>
                        {key+1}
                    </div>)
                    
                 }
                 else{
                    if( this.state.bel.indexOf(key)!==-1){
                        return(<div className={style.numberT} onClick={()=>{this.editTest(key)}} >
                        {key+1}
                    </div>)
                     }
                   else{
                    return(<div className={style.number} onClick={()=>{this.editTest(key)}} >
                    {key+1}
                </div>)
                   }
                  
                 }
               
               }):''}</div>
               <button type="button" onClick={this.sendJavob} className={style.butN}>Testni topshirish</button>
              
    
                      
                  </>}
                  </Col>
              </Row>
              </>
          }
          
         
            </div>
        )
    }
}

