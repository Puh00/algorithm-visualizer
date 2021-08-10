import React from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from './components/common/Header';
import { PathfindingVisualizer } from './components/pathfinding/PathfindingVisualizer';
import { SortingVisualizer } from './components/sorting/SortingVisualizer';

const App = (): JSX.Element => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={['/', '/sorting']} component={SortingVisualizer} />
        <Route path="/pathfinding" component={PathfindingVisualizer} />
      </Switch>
    </Router>
  );
};

export default App;
