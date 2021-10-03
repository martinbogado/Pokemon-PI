import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from "./components/LandingPage/LandingPage"
import Home from './components/Home/Home';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Pokemon</h1>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/home" component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
