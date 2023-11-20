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

export { Filters };
