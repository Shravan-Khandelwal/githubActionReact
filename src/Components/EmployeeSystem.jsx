import React, { useState } from "react";

function EmployeeSystem() {
  const [ListOfEmp, setListOfEmp] = useState([]);

  const [AddEmp, setAddEmp] = useState(false);

  const [EmpName, setEmpName] = useState("");
  const [EmpAge, setEmpAge] = useState("");
  const [EmpCompany, setEmpCompany] = useState("");
  const [EmpEmail, setEmpEmail] = useState("");
  const [EmpId, setEmpId] = useState("");

  const [EmpDetails, setEmpDetails] = useState({});

  const [SearchText, setSearchText] = useState("");
  const [SearchedList, setSearchedList] = useState([]);
  const [isSearch, setisSearch] = useState(false);

  function AddEmploye() {
    setEmpId(Date.now());
    if (EmpName && EmpEmail && EmpCompany && EmpAge) {
      const EmpDetails = {
        EmpName,
        EmpEmail,
        EmpCompany,
        EmpAge,
        EmpId,
      };

      setListOfEmp((prev) => [...prev, EmpDetails]);
      console.log(ListOfEmp);
      setAddEmp(false);
    } else {
      console.log("null");
    }
  }

  function ToggleAddEmploye() {
    setAddEmp(!AddEmp);
  }

  function getDetailsById(id) {
    const Details = ListOfEmp.find((emp) => emp.EmpId == id);

    if (Details) {
      setEmpDetails(Details);
    }
  }

  function DeleteById(id) {
    const Filtered = ListOfEmp.filter((Emp) => Emp.EmpId != id);

    setListOfEmp(Filtered);
  }

  function SearchByName() {
    setisSearch(!isSearch);

    
    const Searched = ListOfEmp.filter((emp) => emp.EmpName == SearchText);

    
    if (Searched) {
      setSearchedList(Searched);
    }
    console.log("isSearch is ");
    
    console.log(SearchedList);
    
  }

  return (
    <div className="bg-slate-600 p-5 w-[80vw] flex flex-col h-[80vh]">
      <div className="Top flex w-full justify-center items-center">
        <h1 className="text-center text-4xl p-2">Employee Managment System</h1>
        <button
          onClick={() => ToggleAddEmploye()}
          className="relative bg-blue-300 left-[15vw]"
        >
          Add Employee
        </button>
      </div>

      <div className="w-100 h-full flex justify-around bg-pink-200">
        <div className="left flex flex-col p-4 min-w-[50%]">
          <div className="flex">
            <h1 className="text-2xl"> List Of Employess</h1>
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search here"
            />
            <button onClick={() => SearchByName()}>Search</button>
          </div>
          <div className="list w-fit pl-2 flex flex-col list-none items-center">
            {isSearch == true
              ? ListOfEmp.map((emp) => {
                  return (
                    <div key={emp.EmpId} className="flex">
                      <li
                        className="hover:cursor-pointer"
                        onClick={() => getDetailsById(emp.EmpId)}
                        key={emp.EmpId}
                      >
                        {emp.EmpName}
                      </li>
                      <button
                        onClick={() => DeleteById(emp.EmpId)}
                        className="ml-10"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })
              : SearchedList.map((Emp) => {
                  return (
                    <li
                      className="hover:cursor-pointer"
                      onClick={() => getDetailsById(Emp.EmpId)}
                      key={Emp.EmpId}
                    >
                      {Emp.EmpName}
                    </li>
                  );
                })}
          </div>
        </div>
        <div className="Rigt p-4 flex flex-col items-center gap-8 min-w-[50%]">
          <h1 className="text-4xl"> Employe Details</h1>
          <div className="details w-[20vw] flex flex-col justify-start">
            <h1>{EmpDetails.EmpName}</h1>
            <p>{EmpDetails.EmpAge}</p>
            <p>{EmpDetails.EmpCompany}</p>
            <p>{EmpDetails.EmpEmail}</p>
          </div>
        </div>
      </div>

      {AddEmp && (
        <div className="EmpForm w-[20vw] h-[20vh] p-3 bg-gray-500 absolute top-[40vh] left-[90vh] flex flex-col items-center">
          <input
            className="w-full"
            type="text"
            placeholder="Name"
            name=""
            id=""
            onChange={(e) => setEmpName(e.target.value)}
            value={EmpName}
          />
          <input
            className="w-full"
            type="text"
            placeholder="Email"
            name=""
            id=""
            onChange={(e) => setEmpEmail(e.target.value)}
            value={EmpEmail}
          />
          <input
            className="w-full"
            type="text"
            placeholder="Company"
            name=""
            id=""
            onChange={(e) => setEmpCompany(e.target.value)}
            value={EmpCompany}
          />
          <input
            className="w-full"
            type="text"
            placeholder="Age"
            name=""
            id=""
            onChange={(e) => setEmpAge(e.target.value)}
            value={EmpAge}
          />
          <button onClick={() => AddEmploye()}>Add</button>
        </div>
      )}
    </div>
  );
}

export default EmployeeSystem;
