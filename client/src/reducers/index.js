import { combineReducers } from "redux";

import ReducerPosts from "./ReducerPosts";
import authReducer from "./auth";

export default combineReducers({ ReducerPosts, authReducer });
