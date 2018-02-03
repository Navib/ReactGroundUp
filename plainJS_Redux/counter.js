//REDUCE
function counter(currentState, action) {
  var nexState = {
    count: currentState.count
  }
  switch (action.type) {
    case 'ADD':
      nexState.count =  currentState.count + 1
      return nexState
      break;
    case 'MINUS':
      nexState.count =  currentState.count - 1
      return nexState
      break;
      case 'RESET':
        nexState.count =  0
        return nexState
        break;
    default:
      return currentState
  }
}

var state = { count: 0 };
var store = Redux.createStore(counter, state);
var counterEl = document.getElementById('counter')
console.log(store);

function render() {
  console.log("in render");
  console.log(store.getState());
  var state = store.getState();
  counterEl.innerHTML = state.count.toString();
}
store.subscribe(render)

//ACTIONS -> Handler emits actions
document.getElementById('add')
.addEventListener('click', function() {
  store.dispatch({type: 'ADD'})
});

document.getElementById('minus')
.addEventListener('click', function() {
  store.dispatch({type: 'MINUS'})
});
document.getElementById('reset')
.addEventListener('click', function() {
  store.dispatch({type: 'RESET'})
});
