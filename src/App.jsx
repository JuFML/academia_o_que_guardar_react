import { Logo } from "./components/logo";
import { FormAddItem } from "./components/form-add-items";
import { ListOfItems } from "./components/list-of-items";
import { Filters } from "./components/filters";
import { Stats } from "./components/stats";
import { useListObjects } from "./hooks/use-list-objects";

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
