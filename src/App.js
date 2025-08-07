import React, { useState } from 'react';
import NavBar from './components/NavBar';
import NewsComponent from './components/NewsComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";


export default function App(props) {

  const pageSize = 9
  const apikey = process.env.REACT_APP_NEWS_API_KEY;

  const [progress, setProgress] = useState(0);
  // setProgress(progress);

  return (
    <div>
      <Router>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<NewsComponent
            setProgress={setProgress} apikey={apikey} key="general" pageSize={pageSize} country="us" category="general" />} />
          <Route exact path="/sports" element={<NewsComponent
            setProgress={setProgress} apikey={apikey} key="sports" pageSize={pageSize} country="us" category="sports" />} />
          <Route exact path="/business" element={<NewsComponent
            setProgress={setProgress} apikey={apikey} key="business" pageSize={pageSize} country="us" category="business" />} />
          <Route exact path="/entertainment" element={<NewsComponent
            setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
          <Route exact path="/health" element={<NewsComponent
            setProgress={setProgress} apikey={apikey} key="health" pageSize={pageSize} country="us" category="health" />} />
          <Route exact path="/science" element={<NewsComponent
            setProgress={setProgress} apikey={apikey} key="science" pageSize={pageSize} country="us" category="science" />} />
          <Route exact path="/technology" element={<NewsComponent
            setProgress={setProgress} apikey={apikey} key="technology" pageSize={pageSize} country="us" category="technology" />} />
          <Route exact path="/general" element={<NewsComponent
            setProgress={setProgress} apikey={apikey} key="general" pageSize={pageSize} country="us" category="general" />} />
        </Routes>
      </Router>
    </div>
  );
}

