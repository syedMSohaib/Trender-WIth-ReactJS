import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import LogoShowcase from './components/LogoShowcase';
import HomePage from './components/HomePage';
import GithubComp from './components/mainComp/Github/GithubComp';
import YoutubeComp from './components/mainComp/Youtube/YoutubeComp';
import TwitterComp from './components/mainComp/twitter/twitter';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
   <div className="App">
      <HeaderComponent/>
      <LogoShowcase/>    
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/Github" exact component={GithubComp}/>
        <Route path="/Youtube" exact component={YoutubeComp}/>
          <Route path="/Twitter" exact component={TwitterComp}/>
        <Route component={HomePage}/>
      </Switch>
    </div>
  </Router>      
    );
  }
}

export default App;
