const fetch = require("node-fetch");
const todosFetch = async (dispatch, getState) => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const todos = await res.json();
  dispatch({
    type: "todos/todoLoaded",
    payload: todos,
  });

  console.log(`number of update: ${getState().todos.length}`);
};

module.exports = {
  todosFetch,
};
