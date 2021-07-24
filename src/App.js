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
        <Link className="item__button" to={`/delete/${item._id}`}>
          Deletar
        </Link>
        <Link className="item__button" to={`/edit/${item._id}`}>
          Editar
        </Link>
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
function AdicionarItem(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target);
    const nome = event.target.nome.value;
    const img = event.target.img.value;

    const result = await fetch(
      "https://node-backend-nuvem.herokuapp.com/filmes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome,
          img,
        }),
      }
    );
    const dados = await result.json();
    console.log({ dados });
    window.location.href = `/view/` + dados._id;
  };

  return (
    <div className="AdicionarItem">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="nome" className="form__label">
          Nome
        </label>
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Nome"
          className="form__input"
        />
        <br />
        <label htmlFor="img" className="form__label">
          Imagem
        </label>
        <input
          type="text"
          name="img"
          id="img"
          placeholder="Imagem"
          className="form__input"
        />
        <br />
        <input type="submit" value="Adicionar" className="form__submit" />
      </form>
    </div>
  );
}
function DeleteItem(props) {
  const id = props.match.params.id;

  //useState
  const [item, setItem] = useState("");

  //useEffect
  useEffect(() => {
    if (!item) {
      getItemData();
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target);
    const result = await fetch(
      "https://node-backend-nuvem.herokuapp.com/filmes/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const dados = await result.json();
    console.log({ dados });
    window.location.href = `/`;
  };

  const getItemData = async () => {
    const result = await fetch(
      "https://node-backend-nuvem.herokuapp.com/view/" + id
    );
    const dados = await result.json();
    console.log({ dados });
    setItem(dados);
    return dados;
  };
  if (!item) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="DeleteItem">
      <Item item={item} />
      <form className="form" onSubmit={handleSubmit}>
        <input type="submit" value="Deletar" className="form__submit" />
      </form>
    </div>
  );
}
function EditItem(props) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target);
    const nome = event.target.nome.value;
    const img = event.target.img.value;
    const result = await fetch(
      "https://node-backend-nuvem.herokuapp.com/filmes/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome,
          img,
        }),
      }
    );
    const dados = await result.json();
    console.log({ dados });
    window.location.href = `/view/` + id;
  };

  return (
    <div className="EditItem">
      <Item item={item} />
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="nome" className="form__label">
          Nome
        </label>
        <input
          type="text"
          name="nome"
          id="nome"
          className="form__input"
          placeholder={item.nome}
          defaultValue={item.nome}
        />
        <br />
        <label htmlFor="img" className="form__label">
          Imagem
        </label>
        <input
          type="text"
          name="img"
          id="img"
          className="form__input"
          placeholder={item.img}
          defaultValue={item.img}
        />
        <br />
        <input type="submit" value="Editar" className="form__submit" />
      </form>
    </div>
  );
}
function Header() {
  return (
    <div className="Header">
      <h1>Lista de Dognídeos</h1>
      <nav className="Header__menu">
        <Link to="/add">Criar</Link>
      </nav>
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
        <Route path="/add" component={AdicionarItem} />
        <Route path="/delete/:id" component={DeleteItem} />
        <Route path="/edit/:id" component={EditItem} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
