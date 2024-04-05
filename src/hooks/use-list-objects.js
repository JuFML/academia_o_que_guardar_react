import localforage from "localforage";
import { useState, useEffect } from "react";

const useListObjects = () => {
  const [listObjects, setListObjects] = useState([]);
  const [orderBy, setOrderBy] = useState("recentes");

  useEffect(() => {
    localforage.setItem("guardaCoisas", listObjects)
      .catch((error) => alert(error.message))
  }, [listObjects])

  useEffect(() => {
    localforage.getItem("guardaCoisas")
      .then((value) => {
        if (value) {
          setListObjects(value)
        }
      })
      .catch(error => alert(error.message))
  }, [])

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

export { useListObjects };
