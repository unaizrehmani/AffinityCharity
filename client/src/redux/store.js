import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import reducer from "./reducers/index";

const middleware = applyMiddleware(logger);

const store = createStore(reducer, composeWithDevTools(middleware));
export default store;
