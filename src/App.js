import logo from './logo.svg';
import './App.css';
import Nav from './views/Nav';
import React, { useState, useEffect } from 'react';
import Todo from './views/Todo';
import Covid from './views/Covid';
import { CountDown, NewCountDown } from './views/Countdown';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Blog from './views/Blog';
import DetailBlog from './views/DetailBlog';
import AddBlog from './views/AddBlog';

function App() {
  // let link = 'https://www.youtube.com/watch?v=4LvUanUct8Q';
  let [name, setName] = useState('Thanh');
  const [temp, setTemp] = useState('');
  const [todo, setTodo] = useState([
    { id: 'todo1', title: 'Playing game' },
    { id: 'todo2', title: 'Go out with my friends' }
  ]);

  useEffect(() => {
    console.log('run use effect');
  }, []);


  const deleteDataTodo = (id) => {
    let currentTodo = todo;
    currentTodo = currentTodo.filter(item => item.id !== id);
    setTodo(currentTodo);
  }

  const onTimesup = () => {
    alert('times up');
  }

  const handleEventClick = (event) => {
    if (!temp) {
      alert('empty')
      return;
    }
    let todos = { id: Math.floor((Math.random() * 1000) + 1), title: temp }
    setTodo([...todo, todos]);
    setTemp('');
  }
  const handleOnchangeInput = (event) => {
    setTemp(event.target.value);
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          {/* <h1>Hello React Hook and {name} </h1> */}

          {/* <Covid /> */}


        </header>
        <Switch>
          <Route path="/" exact>
            <h1>Data Covid In Viet Nam </h1>
            <Covid />
          </Route>
          <Route path="/timer">
            <CountDown onTimesup={onTimesup} />
            <span>--------------</span>
            <NewCountDown onTimesup={onTimesup} />
          </Route>
          <Route path="/app">
            <Todo
              todos={todo}
              title={'All Todo'}
              deleteDataTodo={deleteDataTodo}
            />
            {/* <a href={link} target="_blank">Visit link</a> */}
            <input type="text" value={temp} onChange={(event) => handleOnchangeInput(event)} />
            <button type="button" onClick={(event) => handleEventClick(event)}>Click me</button>
          </Route>
          <Route path="/blog" exact>
            <Blog />
          </Route>
          <Route path="/blog/:id">
            <DetailBlog />
          </Route>
          <Route path="/add-blog">
            <AddBlog />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
