import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./HomePage.css";

import Product from "../components/Product";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const products = useSelector((state) => state);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // The dispatch function will be passed as a callback in the fetchData to ensure the store is updated when the page content displays.
    const fetchData = async (dispatchCallback) => {
      const serverResponse = await axios.get(`${backendURL}/product/readAll`);
      const productsList = serverResponse.data;
      dispatchCallback(productsList);
      setIsLoading(false);

      return () => {
        console.log("Homepage demounted");
      };
    };

    // Only fetch the data if there's no product in the store.
    if (isLoading) {
      fetchData((array) => {
        dispatch({ type: "CREATE", array: array });
      });
    }
  }, [dispatch, backendURL, products, isLoading]);

  return isLoading ? (
    <div className="Page Loading">Is Loading</div>
  ) : (
    <div className="Page HomePage">
      {products.map((item, index) => {
        return (
          <Product
            key={index}
            id={item.id}
            name={item.name}
            brand={item.brand}
            price={item.price}
            quantity={item.quantity}
          />
        );
      })}
    </div>
  );
};

export default HomePage;
