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

export { ListOfItems };
