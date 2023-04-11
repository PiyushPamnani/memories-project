import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, naviagte) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    naviagte("/memories-project");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, naviagte) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    naviagte("/memories-project");
  } catch (error) {
    console.log(error);
  }
};
