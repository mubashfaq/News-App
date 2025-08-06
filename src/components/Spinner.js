import React, { Component } from 'react';
import './Spinner.css';
export default class Spinner extends Component {
  render() {
    return (

      <div className="loader-wrapper">

        <div className="loader"></div>
      </div>
    );
  }
}
