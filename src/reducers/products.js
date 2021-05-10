const initialState = [];

const products = (state = initialState, action) => {
  switch (action.type) {
    // Create a whole array of products. This dispatch action will only be use when charging the website homepage.
    case "CREATE":
      const { array } = action;

      if (array) {
        const newArray = [];
        array.forEach((item) => {
          const { _id, name, brand, price, quantity } = item;
          newArray.push({ id: _id, name, brand, price, quantity });
        });
        return [...newArray];
      } else {
        return [...state];
      }

    // Add a new product in the state.
    case "ADD":
      // Check wether every necessary data have been given.
      if (action.id && action.name && action.brand && action.price) {
        // If no quantity has been specified, put this property on 0.
        if (action.quantity) {
          return [
            ...state,
            {
              id: action.id,
              name: action.name,
              brand: action.brand,
              price: action.price,
              quantity: action.quantity,
            },
          ];
        } else {
          return [
            ...state,
            {
              id: action.id,
              name: action.name,
              brand: action.brand,
              price: action.price,
              quantity: 0,
            },
          ];
        }
      } else {
        return [...state];
      }

    // Edit an existing product.
    case "EDIT":
      // Create a new array in order to update the store.
      const newArray = [];

      // We're going to build that new array while iterating through the current state.
      for (let i = 0; i < state.length; i++) {
        // Check if there's an id.
        if (action.id) {
          // Check if the current object matches the specified ID.
          if (state[i].id === action.id) {
            // If it does, we're going to iterate through each update property.
            const newObject = {};
            const keysArray = [
              { name: action.name },
              { brand: action.brand },
              { price: action.price },
              { quantity: action.quantity },
            ];
            keysArray.forEach((item) => {
              // Extract the current property to check
              const key = Object.keys(item)[0];
              // If this property exists, it means the user has specified it and the value must be updated.
              if (item[key]) {
                newObject[key] = item[key];
              } else {
                // If this property doesn't exists, we simply push the current one.
                newObject[key] = state[i][key];
              }
            });
          } else {
            newArray.push(state[i]);
          }
        } else {
          // If the product does not match the id, simply push it inside the new array.
          return [...state];
        }
      }
      return newArray;

    case "DELETE":
      // Checks wether an ID has been given.
      if (action.id) {
        const newArray = [];
        for (let i = 0; i < state.length; i++) {
          if (state[i].id !== action.id) {
            newArray.push(state[i]);
          }
        }
        return newArray;
      } else {
        return [...state];
      }

    default:
      return [...state];
  }
};

export default products;
