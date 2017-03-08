const initialState = {
  dragActive: false,
  dragOrder: 0,
  dragTop: 0,
  dragLeft: 0,
  dropOrder: 0,
  dropTop: 0,
  dropLeft: 0,
  cursorPos: {x: 0, y: 0},
  swapTransition: false
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "TOGGLE_DRAGGING": {
      return Object.assign({}, state, {dragActive: action.dragActive});
    }
    case "SET_DRAG_POS": {
      return Object.assign({}, state, {dragTop: action.pos.top, dragLeft: action.pos.left, dragOrder: action.order});
    }
    case "SET_DROP_POS": {
      return Object.assign({}, state, {dropTop: action.pos.top, dropLeft: action.pos.left, dropOrder: action.order});
    }
    case "SET_CURSOR_POS": {
      return Object.assign({}, state, {cursorPos: action.pos});
    }
    case "SET_TRANSITION": {
      return Object.assign({}, state, {swapTransition: action.transition});
    }
  }

  return state;
}