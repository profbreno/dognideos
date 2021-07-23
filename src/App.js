import "./App.css";
import { Switch, Route } from "react-router-dom";

function ListaItem() {
  return <div className="ListaItem">Olá Mundo</div>;
}
//function VisualizarItem(props) {}
//function AdicionarItem(props) {}
//function DeleteItem(props) {}
function NotFound() {
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
    </div>
  );
}
function Header() {
  return (
    <div className="Header">
      <h1>React Router DOM</h1>
      <h2>Redux + React + Router</h2>
    </div>
  );
}
function Footer() {
  return (
    <div className="Footer">
      <p>React Router DOM</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact={true} component={ListaItem} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
