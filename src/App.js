import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Users from './components/Users';
import Post from './components/Post';

import { Container, Row, Col } from 'reactstrap';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Post Fetch</h1>
        <Container>
         <Row>
           <Col md={6}>
             <Users />
           </Col>
           <Col md={6}>
             <Post />
           </Col>
         </Row>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
