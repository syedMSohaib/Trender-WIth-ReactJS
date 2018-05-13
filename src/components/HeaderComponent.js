import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
  <div className="navbar navbar-expand-lg  navbar-dark bg-primary">
      <div className="container">
        <a href="" className="navbar-brand">
            <img className="Logo" src="/images/logo.png" alt="trender logo"/>
         </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="" target="_blank">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" target="_blank">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" target="_blank">App</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
        );
    }
}

export default HeaderComponent;