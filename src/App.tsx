import React from 'react';

import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from './components/common/Header';
import { PathfindingVisualizer } from './components/pathfinding/PathfindingVisualizer';
import { SortingVisualizer } from './components/sorting/SortingVisualizer';

const App = (): JSX.Element => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/sorting" component={SortingVisualizer} />
        <Route
          exact
          path={['/', '/pathfinding']}
          component={PathfindingVisualizer}
        />
      </Switch>
    </Router>
  );
};

export default App;
