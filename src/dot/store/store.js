import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { callAPIMiddleware } from "./callAPIMiddleware";
import rootReducer from "./reducers/root";
import thunk from "redux-thunk";

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, callAPIMiddleware)));
