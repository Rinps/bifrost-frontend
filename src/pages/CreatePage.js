import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./FormPage.css";

const CreatePage = () => {
  const history = useHistory();
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Define handlers
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // The API request will be made in a callback to ensure correct update of the database before going back to the homepage.
    const dataSubmit = (fetchCallback) => {
      const newProduct = { name, brand, price, quantity };
      fetchCallback(newProduct);
      history.push("/");
    };

    dataSubmit(async (object) => {
      await axios.post(`${backendURL}/product/create`, object);
    });
  };

  return (
    <form className="Page FormPage" onSubmit={handleSubmit}>
      <div className="field">
        <h2>Product's brand</h2>
        <input
          type="text"
          value={brand}
          onChange={handleBrandChange}
          placeholder="Enter product brand"
        />
      </div>
      <div className="field">
        <h2>Product's name</h2>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter product name"
        />
      </div>
      <div className="field">
        <h2>Product's price</h2>
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter product price"
        />
      </div>
      <div className="field">
        <h2>Quantity of product available</h2>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Enter product quantity"
        />
      </div>
      <input type="submit" className="submit" value="Submit new product" />
    </form>
  );
};

export default CreatePage;
