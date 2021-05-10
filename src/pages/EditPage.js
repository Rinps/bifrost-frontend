import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./FormPage.css";

const EditPage = (props) => {
  // Set the variables that are need for the page to work.
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state;
  });
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);

  // We need to get the product properties when the page render.
  useEffect(() => {
    const getProductDatas = (statesCallback) => {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          statesCallback(products[i]);
        }
      }
    };
    getProductDatas((item) => {
      setProductName(item.name);
      setProductBrand(item.brand);
      setProductPrice(item.price);
      setProductQuantity(item.quantity);
    });
  }, [id, products]);

  // Define handlers for each input field, as well as the submit button.
  const handleNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleBrandChange = (event) => {
    setProductBrand(event.target.value);
  };

  const handlePriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setProductQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // The newObj will be use to send the newest data to the store and the backend.
    const newObj = {
      id,
      name: productName,
      brand: productBrand,
      price: productPrice,
      quantity: productQuantity,
    };

    // The dispatch and fetch are passed as callbacks to ensure correct data updating before returning to the home page.
    const updateProduct = (object, dispatchCallback, fetchCallback) => {
      dispatchCallback(object);
      fetchCallback(object);
      history.push("/");
    };

    updateProduct(
      newObj,
      () => {
        dispatch({ type: "EDIT", ...newObj });
      },
      async () => {
        await axios.put(`${backendURL}/product/update`, {
          ...newObj,
        });
      }
    );
  };

  return (
    <form className="Page FormPage" onSubmit={handleSubmit}>
      <div className="field">
        <h2>Product's brand</h2>
        <input type="text" value={productBrand} onChange={handleBrandChange} />
      </div>
      <div className="field">
        <h2>Product's name</h2>
        <input type="text" value={productName} onChange={handleNameChange} />
      </div>
      <div className="field">
        <h2>Product's price</h2>
        <input
          type="number"
          value={productPrice}
          onChange={handlePriceChange}
        />
      </div>
      <div className="field">
        <h2>Number of products available</h2>
        <input
          type="number"
          value={productQuantity}
          onChange={handleQuantityChange}
        />
      </div>
      <input type="submit" className="submit" value="Submit changes" />
    </form>
  );
};

export default EditPage;
