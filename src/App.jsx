import { useState } from "react";

const Logo = () => {
  return (
    <header>
      <img src="img/logo-espaco-mulher.png" alt="logo" />
      <h1>Espaço Mulher</h1>
    </header>
  );
};

const FormAddItem = ({ setListObjects }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("1");

  const handleClickAddObjct = (e) => {
    e.preventDefault();

    setListObjects((l) => [
      ...l,
      {
        qtde: +selectValue,
        objeto: inputValue,
        id: crypto.randomUUID(),
        stored: false,
      },
    ]);

    setInputValue("");
    setSelectValue("1");
  };

  return (
    <form onSubmit={handleClickAddObjct}>
      <label>O que você precisa guardar?</label>
      <select
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
        id=""
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Manda aqui"
        autoFocus
      />
      <button>Adicionar</button>
    </form>
  );
};

const ListOfItems = ({ onChecked, onDelete, orderBy, listObjects }) => {
  const sortedItems =
    orderBy === "guardados"
      ? listObjects.filter((item) => item.stored)
      : orderBy === "alfabetica"
      ? listObjects.toSorted((a, b) =>
          a.objeto > b.objeto ? 1 : b.objeto > a.objeto ? -1 : 0
        )
      : listObjects;

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

const Filters = ({ orderBy, onChangeOrder, onClearButton }) => {
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
      <button onClick={onClearButton}>Limpar lista</button>
    </div>
  );
};

const Stats = ({ listObjects }) => {
  const singularPlural = listObjects.length === 1 ? "item" : "itens";
  const storedItems = listObjects.reduce(
    (acc, item) => (item.stored ? acc + 1 : acc),
    0
  );
  const storedPercentage =
    storedItems.length === 0
      ? 0
      : ((storedItems / listObjects.length) * 100).toFixed(0);

  return (
    <footer>
      <p>
        Você tem {listObjects.length} {singularPlural} na lista
        {listObjects.length > 0 && (
          <span>
            {" "}
            e já guardou {storedItems} ({storedPercentage}%)
          </span>
        )}
      </p>
    </footer>
  );
};

const useListObjects = () => {
  const [listObjects, setListObjects] = useState([]);
  const [orderBy, setOrderBy] = useState("recentes");

  const handleDelete = (id) => {
    const newListObject = listObjects.filter((obj) => obj.id !== id);
    setListObjects(() => newListObject);
  };

  const handleClearList = () => setListObjects([]);

  const handleChecked = (id) => {
    setListObjects((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stored: !item.stored } : item
      )
    );
  };

  return {
    listObjects,
    orderBy,
    setListObjects,
    setOrderBy,
    handleDelete,
    handleClearList,
    handleChecked,
  };
};

const App = () => {
  const {
    listObjects,
    orderBy,
    setOrderBy,
    handleDelete,
    handleClearList,
    handleChecked,
    setListObjects,
  } = useListObjects();
  return (
    <>
      <Logo />

      <main>
        <div className="upList">
          <FormAddItem setListObjects={setListObjects} />

          <ListOfItems
            orderBy={orderBy}
            listObjects={listObjects}
            onChecked={handleChecked}
            onDelete={handleDelete}
          />
        </div>

        <Filters
          orderBy={orderBy}
          onChangeOrder={setOrderBy}
          onClearButton={handleClearList}
        />
      </main>

      <Stats listObjects={listObjects} />
    </>
  );
};

export default App;
