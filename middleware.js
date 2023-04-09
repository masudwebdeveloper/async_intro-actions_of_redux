const fetch = require("node-fetch");
const delayActionMiddleware = (store) => (next) => (action) => {
  if (action.type === "todos/todoAdded") {
    console.log("i am delaying function");
    setTimeout(() => {
      next(action);
    }, 2000);
    return;
  }
  return next(action);
};

const fetchTodosMiddleware = (store) => (next) => async (action) => {
  if (action.type === "todos/todoFetch") {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );
    const todos = await res.json();
    store.dispatch({
      type: "todos/todoLoaded",
      payload: todos,
    });

    console.log(`number of update: ${store.getState().todos.length}`);
    return;
  }
  return next(action);
};

module.exports = {
  delayActionMiddleware,
  fetchTodosMiddleware,
};
