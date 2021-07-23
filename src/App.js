import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Item(props) {
  const item = props.item;
  return (
    <div className="item">
      <Link to={`/view/${item._id}`}>
        <img src={item.img} alt={item.nome} />
      </Link>
      <h3>{item.nome}</h3>
      <div className="item__buttons">
        <Link to={`/delete/${item._id}`}>Deletar</Link>/
        <Link to={`/edit/${item._id}`}>Editar</Link>
      </div>
    </div>
  );
}

function ListaItem() {
  console.log("Lista carregada");

  //useState
  const [listaResultadoApi, atualizarListaResultado] = useState("");

  //useEffect
  useEffect(() => {
    console.log({ listaResultadoApi });

    if (!listaResultadoApi) {
      obterLista();
    }
  });

  const obterLista = async () => {
    const result = await fetch("https://node-backend-nuvem.herokuapp.com/");

    console.log({ result });
    const dados = await result.json();
    console.log({ dados });

    atualizarListaResultado(dados);
  };
  if (!listaResultadoApi) {
    return <div>Carregando...</div>;
  }
  return (
    <div className="lista-item">
      {listaResultadoApi.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </div>
  );
}
function VisualizarItem(props) {
  const id = props.match.params.id;

  //useState
  const [item, setItem] = useState("");

  //useEffect
  useEffect(() => {
    if (!item) {
      getItemData();
    }
  });

  const getItemData = async () => {
    const result = await fetch(
      "https://node-backend-nuvem.herokuapp.com/view/" + id
    );
    const dados = await result.json();
    setItem(dados);
  };
  if (!item) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="visualizar-item">
      <Item item={item} />
      <Link to={`/`}>Voltar</Link>
    </div>
  );
}
//function AdicionarItem(props) {}
//function DeleteItem(props) {}
//function EditItem(props) {
function Header() {
  return (
    <div className="Header">
      <h1>Lista de Dognídeos</h1>
    </div>
  );
}
function Footer() {
  return (
    <div className="Footer">
      <p>Desenvolvido por: @ProfBreno</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact={true} component={ListaItem} />
        <Route path="/view/:id" component={VisualizarItem} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
