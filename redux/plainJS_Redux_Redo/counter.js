// createStore
// getState
// dispatch
// subscribe

//REDUCER
function counterReducer(state, action) {
  if (typeof state === 'undefined') {
    return {count: 0}
  }
  var nextState = {
    count: state.count
  }
  switch (action.type) {
    case 'ADD':
      nextState.count = state.count + 1
      return nextState
      break;
    case 'MINUS':
      nextState.count = state.count - 1
      return nextState
      break;
    case 'RESET':
      nextState.count = 0
      return nextState
      break;

    default:
      return state
  }
}
function toDoReducer(state, action) {
  if (typeof state === 'undefined') {
    return {todos: []}
  }
console.log(state);

  var nextState = Object.assign({}, state);

  switch (action.type) {
    case 'NEW':
    nextState.todos.push(action.payload);
      return nextState
      break;
    case 'DELETE':
    nextState.todos.pop();
      return nextState
      break;
    case 'DELETE_ALL':
      nextState.todos = []
      return nextState
      break;
    default:
      return state

  }
}
//Store
var state = {
  count: 0
}
var store = Redux.createStore(Redux.combineReducers({toDoReducer: toDoReducer, counterReducer: counterReducer}));
var counterEl = document.getElementById('counter')
var todoInput = document.getElementById('todo')
var todosList = document.getElementById('todolist')

function render() {
  var state = store.getState();
  counterEl.innerHTML = state.counterReducer.count.toString();
  renderList(state)
}
function renderList(state) {
  console.log("state : ", state);

  todosList.innerHTML = '';
  for (var i = 0; i < state.toDoReducer.todos.length; i++) {
    var element = state.toDoReducer.todos[i];
    var li = document.createElement('li');
    var todo =  state.toDoReducer.todos[i];
    li.innerHTML = todo.toString();
    todosList.appendChild(li);
  }
}
render()
store.subscribe(render)

//ACTIONS
document.getElementById('add').addEventListener('click', function() {
  store.dispatch({type: 'ADD'})
});
document.getElementById('minus').addEventListener('click', function() {
  store.dispatch({type: 'MINUS'})
});
document.getElementById('reset').addEventListener('click', function() {
  store.dispatch({type: 'RESET'})
});

/**
 * TODOS
 */
document.getElementById('new')
  .addEventListener('click', function() {
    store.dispatch({type: 'NEW', payload: todoInput.value})
  })
document.getElementById('delete')
  .addEventListener('click', function() {
    store.dispatch({type: 'DELETE'})
  })
document.getElementById('delete_all')
  .addEventListener('click', function() {
    store.dispatch({type: 'DELETE_ALL'})
  })
