const { createStore, applyMiddleware } = require("redux");
const { todosFetch } = require("./functions");
const thunk = require("redux-thunk");
// const { fetchAsyncMiddleware } = require("./middlewares");
//initial
const initialState = {
  todos: [],
};

//reducer
const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/todoAdded":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.payload,
          },
        ],
      };
    case "todos/todoLoaded":
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    default:
      break;
  }
};

//store

const store = createStore(todosReducer, applyMiddleware(thunk.default));

// subscribe to state change
store.subscribe(() => {
  console.log(store.getState());
});

//dispatch actions

// store.dispatch({
//     type: "todos/todoAdded",
//     payload: "learn with sumit in redux"
// })

store.dispatch(todosFetch);
