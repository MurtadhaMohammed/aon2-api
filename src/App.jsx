import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let resp = await fetch("https://fakestoreapi.com/products");
    let jsonResp = await resp.json();
    setLoading(false);
    setList(jsonResp);
  };

  const addProduct = async () => {
    let data ={
      title: "test product",
      price: 13.5,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronic",
    }

    setLoading(true);
    let resp = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
    let jsonResp = await resp.json();
    console.log(jsonResp)
    alert("Add Successfull")
    setLoading(false);
  };

  if (loading) return <h1>Loading....</h1>;

  return (
    <div>
      <button onClick={addProduct}>Save Product</button>
      <ul>
        {list?.map((el, i) => (
          <li key={i}>
            {el.id}-{el.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
