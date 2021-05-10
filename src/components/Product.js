import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = (props) => {
  const { id, name, brand, price, quantity } = props;
  const dispatch = useDispatch();
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  // Define handler for product removal.
  const handleDelete = () => {
    const dataSubmit = (fetchCallback) => {
      fetchCallback(id);
      dispatch({ type: "DELETE", id });
    };

    dataSubmit(async (value) => {
      await axios.delete(`${backendURL}/product/delete?id=${id}`);
    });
  };

  return (
    <div className="Product">
      <div className="productHeader">
        <h2>{brand}</h2>
        <h3>{name}</h3>
      </div>
      <p>{price} €</p>
      <p>Currently {quantity} available</p>
      <div className="editAndRemove">
        <Link to={`/edit/${id}`}>
          <FontAwesomeIcon icon="sticky-note" />
        </Link>
        <button onClick={handleDelete}>
          <FontAwesomeIcon icon="dumpster" />
        </button>
      </div>
    </div>
  );
};

export default Product;
