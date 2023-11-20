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

export { Stats };
