import { useState } from "react";

const App = () => {
  const [listObjects, setListObjects] = useState([]);

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

  return (
    <>
      <header>
        <img src="img/logo-espaco-mulher.png" alt="logo" />
        <h1>Espaço Mulher</h1>
      </header>

      <main>
        <div className="upList">
          <form onSubmit={(e) => handleClickAddObjct(e)}>
            <label>O que você precisa guardar?</label>
            <select name="qtde" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <input
              name="objeto"
              type="text"
              placeholder="Manda aqui"
              autoFocus
            />
            <button>Adicionar</button>
          </form>

          <ul className="list">
            {listObjects.length > 0 &&
              listObjects.map(({ qtde, objeto, id, stored }) => (
                <li key={id}>
                  <input
                    type="checkbox"
                    name={objeto}
                    id={id}
                    checked={stored}
                    onChange={() => handleChecked(id)}
                  />
                  <p className={stored ? "line-throw" : ""}>
                    {qtde} {objeto}
                  </p>
                  <span onClick={() => handleDelete(id)}>❌</span>
                </li>
              ))}
          </ul>
        </div>

        <div className="filter">
          <select name="filtro" id="">
            <option value="Ordenar por mais recente">
              Ordenar por mais recente
            </option>
          </select>
          <button>Limpar lista</button>
        </div>
      </main>
      <footer>
        <p>Você tem 0 itens na lista</p>
      </footer>
    </>
  );
};

export default App;
