import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';

class LogoShowCase extends Component {
    render() {
        return (
     <div className="container">       
     <div className="page-header" id="banner">
        <br/>
        <div className="row" style={{ textAlign: 'center' }}>
            <div className="col-md-6">
                <Link to="/Github">
                    <img src="/images/GitHub-Mark/PNG/GitHub-Mark-32px.png" alt="GitHub" />
                </Link>                           
            </div>
            <div className="col-md-6">
                <Link to="/Youtube">
                    <img style={{ width:100 }} src="/images/youtube.png" alt="Youtube" />            
                </Link>                           
            </div>
        </div>
      </div>
      <hr/>
      </div>
        );
    }
}

export default LogoShowCase;