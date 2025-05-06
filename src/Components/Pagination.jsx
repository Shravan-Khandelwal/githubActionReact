import React, { useState, useEffect } from "react";

function Pagination() {
  const [ProductsList, setProductsList] = useState([]);

  const [StartIdx, setStartIdx] = useState(0);
  const [EndIdx, setEndIdx] = useState(10);
  const [Fetch, setFetch] = useState(true);
  const [CrrBtn, setCrrBtn] = useState(1);

  useEffect(() => {
    async function FetchProducts() {
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();

      const SlicesArr = [];

      for (let i = StartIdx; i <= EndIdx; i++) {
        SlicesArr.push(result.products[i]);
      }

      setProductsList(SlicesArr);
    }

    setTimeout(() => {
      FetchProducts();
      console.log("RIP");
    }, 3000);
  }, [Fetch, StartIdx, EndIdx]);

  function handleBtnClick(BtnValue) {
    if (BtnValue == 1) {
      setCrrBtn(1);
      setStartIdx(0);
      setEndIdx(10);
      setProductsList([]);
      setFetch(!Fetch);
    } else if (BtnValue == 2) {
      setCrrBtn(2);
      setStartIdx(11);
      setEndIdx(20);
      setProductsList([]);
      setFetch(!Fetch);
    } else if (BtnValue == 3) {
      setCrrBtn(3);
      setStartIdx(21);
      setEndIdx(29);
      setProductsList([]);
      setFetch(!Fetch);
    }
  }

  return (
    <div className="bg-pink-200 w-full h-full overflow-y-scroll overflow-x-hidden p-10">
      <div className="TOP text-center text-4xl">ITEMS LIST</div>
      <div className="list relative top-[-4vh] text-4xl left-[80vw]">
        <button
          className={CrrBtn == 1 ? "text-blue-500" : "text-white"}
          onClick={() => handleBtnClick(1)}
        >
          1
        </button>
        <button
          className={CrrBtn == 2 ? "text-blue-500" : "text-white"}
          onClick={() => handleBtnClick(2)}
        >
          2
        </button>
        <button
          className={CrrBtn == 3 ? "text-blue-500" : "text-white"}
          onClick={() => handleBtnClick(3)}
        >
          3
        </button>
      </div>
      <div className="BOTTOM flex justify-center flex-wrap gap-5">
        {ProductsList.length > 0 ? (
          ProductsList.map((Prod) => {
            return (
              <div
                key={Prod.id}
                className="card max-w-[30vw]  flex flex-col flex-wrap justify-center gap-6 items-center min-h-[20vh] bg-gray-400 p-4"
              >
                <img src={Prod.thumbnail} alt="" />
                <div className="Top min-w-[100%] text-center">{Prod.title}</div>
                <div className="Bottom min-w-[100%] text-center">
                  {Prod.description}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-black w-[30vw] text-white h-[30vh]">LOADING</div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
