import React, { useState, useEffect } from "react";

function ToDo() {
  const [ToDoName, setToDoName] = useState("");
  const [ToDoId, setToDoId] = useState("");

  const [ToDoList, setToDoList] = useState([{}]);

  const [Update, setUpdate] = useState(false);
  const [EditId, setEditId] = useState("");
  const [UpdateVal, setUpdateVal] = useState("");

  const [Data, setData] = useState({});

  function AddToDo() {
    setToDoId(Date.now());

    if (ToDoName && ToDoId) {
      const NewToDo = {
        Name: ToDoName,
        Id: ToDoId,
      };

      setToDoList((prev) => [...prev, NewToDo]);
    }

    setToDoName("");
  }

  function DeleteToDo(id) {
    console.log(id);

    const UpdateList = ToDoList.filter((ToDo) => ToDo.Id != id);
    console.log(UpdateList);
    setToDoList(UpdateList);
  }

  function UpdateName(id) {
    setUpdate(!Update);
    setEditId(id);

    if (UpdateVal && id) {
      const FindObjById = ToDoList.find((ToDo) => ToDo.Id == id);
      console.log(FindObjById);
      FindObjById.Name = UpdateVal;
      console.log(FindObjById);
    }
  }

  useEffect(() => {
    async function Fetchdata() {
      const res = await fetch("https://dummyjson.com/products");

      const data = await res.json();
      // console.log(data);

      setData(data);
      console.log(Data);
    }

    Fetchdata();
  }, []);

  return (
    <div>
      <input
        value={ToDoName}
        type="text"
        onChange={(e) => {
          setToDoName(e.target.value);
        }}
        placeholder="ADD A TO DO"
      />
      <button onClick={() => AddToDo()}>Add To Do</button>
      {ToDoList.map((ToDo) => {
        return (
          <div key={ToDo.Id} className="flex justify-around">
            {Update && EditId == ToDo.Id ? (
              <input
                value={UpdateVal}
                type="text"
                onChange={(e) => {
                  setUpdateVal(e.target.value);
                }}
                placeholder="ADD A TO DO"
              />
            ) : (
              <li key={ToDo.Id} className="text-purple-400 text-xl">
                {ToDo.Name}
              </li>
            )}

            {!Update && (
              <button onClick={() => DeleteToDo(ToDo.Id)}>Delete</button>
            )}
            <button onClick={() => UpdateName(ToDo.Id)}>Update</button>
          </div>
        );
      })}

      {Data && Data.products?.length > 0 ? (
        Data.products.map((D) => {
          return <li key={D.id}>{D.title}</li>;
        })
      ) : (
        <li>LOADING</li>
      )}
    </div>
  );
}

export default ToDo;
