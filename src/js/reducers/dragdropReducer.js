const initialState = {
  dragging: false,
  dragTop: 0,
  dragLeft: 0,
  dropTop: 0,
  dropLeft: 0,
  cursorX: 0,
  cursorY: 0
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "TOGGLE_DRAGGING": {
      return Object.assign({}, state, {dragging: action.dragging});
    }
    case "SET_DRAG_POS": {
      return Object.assign({}, state, {dragTop: action.pos.top, dragLeft: action.pos.left});
    }
    case "SET_DROP_POS": {
      return Object.assign({}, state, {dropTop: action.pos.top, dropLeft: action.pos.left});
    }
  }

  return state;
}