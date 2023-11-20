import { useState } from "react";

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

export { FormAddItem };
