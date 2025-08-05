import React, { Component } from 'react';
import NavBar from './components/NavBar';
import NewsComponent from './components/NewsComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



export default class App extends Component {
  pageSize = 9
  
  render() {

    return (
      <div>
        <Router>
          <NavBar></NavBar>
          <Routes>
            <Route exact path="/" element={<NewsComponent key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/sports" element={<NewsComponent key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
            <Route exact path="/business" element={<NewsComponent key="business" pageSize={this.pageSize} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<NewsComponent key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<NewsComponent key="health" pageSize={this.pageSize} country="us" category="health" />} />
            <Route exact path="/science" element={<NewsComponent key="science" pageSize={this.pageSize} country="us" category="science" />} />
            <Route exact path="/technology" element={<NewsComponent key="technology" pageSize={this.pageSize} country="us" category="technology" />} />
            <Route exact path="/general" element={<NewsComponent key="general" pageSize={this.pageSize} country="us" category="general" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
