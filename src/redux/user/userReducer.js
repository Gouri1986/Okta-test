import { USER } from "./userActionTypes";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;