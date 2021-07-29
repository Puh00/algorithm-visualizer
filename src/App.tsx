import { Header } from "./components/common/Header";
import { SortingVisualizer } from "./components/sorting/SortingVisualizer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
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
