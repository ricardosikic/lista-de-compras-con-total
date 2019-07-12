import React, { useState } from 'react';
import './App.css';
import './animation.css';
import { 
  Container, 
  Row, 
  Col, 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  ListGroup, 
  ListGroupItem } from 'reactstrap';
 
import { TransitionGroup, CSSTransition } from 'react-transition-group';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      list: []
    }
  }


  getData = (e) => {
    // desconstructing
    const {name, value} = e.target;
    const input = { [name]: value }
    const data = {...this.state.items, ...input}
    this.setState({
      items: data
    })

  }
  

  submitData = (e) => {
    const newData = this.state.items;
    console.log(newData)
    this.setState({
      list: this.state.list.concat(newData)
    })
  }
  

  remove = (e, i) => {
    e.preventDefault();
    console.log('deleted')
    const del = this.state.list.splice(i, 1);
    console.log(del);
    this.setState({
      del
    })
  }



  render(){

   let listado = this.state.list.map( (lista, i) => {
     return(
      <CSSTransition
      classNames="example"
      timeout={{ enter: 1000, exit: 300 }}
      >
       <div className='border it pt-2 mb-2' style={{width: '180px'}} key={i}>
         <p className='d-inline-block mr-3'>{lista.product}</p>
         <p className='d-inline-block mr-3'>${lista.price}</p>
         <p className='d-inline-block' onClick={e => this.remove(e, i)}>X</p>
       </div>
       </CSSTransition>
     );
  
   })

   
   let arr = [];
   let total = this.state.list.map((a, i) => {
     arr.push(a.price);
     return arr;
   })
   
   let re = arr.reduce((v, b) => parseInt(v) + parseInt(b), 0)
   console.log(re);

    return(
      <Container>
        <Row>
          <Col sm='6'>
            <Form>
              <FormGroup>
                <Label>Producto</Label>
                <Input type='text' name='product' onChange={ e => this.getData(e) } placeholder='añade un item'></Input>
              </FormGroup>
              <FormGroup>
                <Label>Precio</Label>
                <Input type='text' name='price' onChange={ e => this.getData(e) } placeholder='añade un item'></Input>
              </FormGroup>
              <Button className='btn btn-success' onClick={ e => this.submitData(e) } >Añadir</Button>
            </Form>
          </Col>
          <Col sm='6' className='mt-4 border' style={{ overflowY: 'scroll', position: 'relative', height: '200px'}}>
          <h4>Productos {listado.length}</h4>
          <TransitionGroup>
          {listado}
          </TransitionGroup>
          </Col>
        </Row>
        <Row>
          <Container className='mt-4'>
           <h3>Total</h3>
           {re}
          </Container>
        </Row>
      </Container>
  
    );
  }
}
export default App;
 
