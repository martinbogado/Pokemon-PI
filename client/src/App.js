import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from "./components/LandingPage/LandingPage"
import Home from './components/Home/Home';
import PokemonCreate from './components/PokemonCreate/PokemonCreate'
import Detail from './components/Detail/Detail'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Pokemon</h1>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          <Route path="/pokemons" component={PokemonCreate}/>
          <Route exact path="/home/:id" component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
