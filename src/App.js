import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/Main";
import NotFound from './components/NotFound';
import Landing from "./components/Landing";
import Profile from "./components/Profile";

function App() {
  return (

    <div className="App">
      <Router>
        <Switch>
          <Route path='/home' component={Main} />
          <Route path='/' exact component={Landing} />
          <Route path="/profile" component={Profile} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
