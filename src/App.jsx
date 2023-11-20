import { useState } from "react";

const initialValue = [
  {
    qtde: 6,
    objeto: "caneleiras",
    id: crypto.randomUUID(),
    stored: false,
  },
  {
    qtde: 3,
    objeto: "pesos",
    id: crypto.randomUUID(),
    stored: false,
  },
  {
    qtde: 1,
    objeto: "colchonete",
    id: crypto.randomUUID(),
    stored: false,
  },
];

const FormAddItem = ({ onHandleClickAddObjct }) => {
  return (
    <form onSubmit={onHandleClickAddObjct}>
      <label>O que você precisa guardar?</label>
      <select name="qtde" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <input name="objeto" type="text" placeholder="Manda aqui" autoFocus />
      <button>Adicionar</button>
    </form>
  );
};

const ListOfItems = ({ sortedItems, onChecked, onDelete }) => {
  return (
    <ul className="list">
      {sortedItems.length > 0 &&
        sortedItems.map(({ qtde, objeto, id, stored }) => (
          <li key={id}>
            <input
              type="checkbox"
              name={objeto}
              id={id}
              checked={stored}
              onChange={() => onChecked(id)}
            />
            <p className={stored ? "line-throw" : ""}>
              {qtde} {objeto}
            </p>
            <span onClick={() => onDelete(id)}>❌</span>
          </li>
        ))}
    </ul>
  );
};

const Filters = ({ orderBy, onChangeOrder }) => {
  return (
    <div className="filter">
      <select
        value={orderBy}
        name="filtro"
        id=""
        onChange={(e) => onChangeOrder(e.target.value)}
      >
        <option value="recentes">Ordenar por mais recentes</option>
        <option value="guardados">Ordenar por itens guardados</option>
        <option value="alfabetica">Ordenar por ordem alfabética</option>
      </select>
      <button>Limpar lista</button>
    </div>
  );
};

const App = () => {
  const [listObjects, setListObjects] = useState(initialValue);
  const [orderBy, setOrderBy] = useState("recentes");

  const handleClickAddObjct = (e) => {
    e.preventDefault();
    const { qtde, objeto } = e.target.elements;
    setListObjects((l) => [
      ...l,
      {
        qtde: +qtde.value,
        objeto: objeto.value,
        id: crypto.randomUUID(),
        stored: false,
      },
    ]);
  };

  const handleDelete = (id) => {
    const newListObject = listObjects.filter((obj) => obj.id !== id);
    setListObjects(() => newListObject);
  };

  const handleChecked = (id) => {
    setListObjects((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stored: !item.stored } : item
      )
    );
  };

  const sortedItems =
    orderBy === "guardados"
      ? listObjects.filter((item) => item.stored)
      : orderBy === "alfabetica"
      ? listObjects.toSorted((a, b) =>
          a.objeto > b.objeto ? 1 : b.objeto > a.objeto ? -1 : 0
        )
      : listObjects;

  return (
    <>
      <header>
        <img src="img/logo-espaco-mulher.png" alt="logo" />
        <h1>Espaço Mulher</h1>
      </header>

      <main>
        <div className="upList">
          <FormAddItem onHandleClickAddObjct={handleClickAddObjct} />

          <ListOfItems
            sortedItems={sortedItems}
            onChecked={handleChecked}
            onDelete={handleDelete}
          />
        </div>

        <Filters orderBy={orderBy} onChangeOrder={setOrderBy} />
      </main>
      <footer>
        <p>Você tem 0 itens na lista</p>
      </footer>
    </>
  );
};

export default App;
