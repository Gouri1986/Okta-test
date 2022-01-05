import { USER } from "./userActionTypes";

export const addUser = (user) => ({
  type: USER,
  payload: user,
});
