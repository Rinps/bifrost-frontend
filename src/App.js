import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

// Import redux reducer
import products from "./reducers/products";

// Import style and icons from FontAwesome
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDumpster, faStickyNote } from "@fortawesome/free-solid-svg-icons";
library.add(faDumpster, faStickyNote);

// Create redux store
const store = createStore(products);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <header>
            <Link to="/">Homepage</Link>
            <Link to="/new" className="toCreationPage">
              Add a new product
            </Link>
          </header>
          <Switch>
            <Route path="/new">
              <CreatePage />
            </Route>
            <Route path="/edit/:id">
              <EditPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
