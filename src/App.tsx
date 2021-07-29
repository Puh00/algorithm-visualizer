import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from './components/common/Header';
import { SortingVisualizer } from './components/sorting/SortingVisualizer';

const App = (): JSX.Element => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={SortingVisualizer} />
      </Switch>
    </Router>
  );
};

export default App;
