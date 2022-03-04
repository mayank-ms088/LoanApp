// scroll bar
import "simplebar/src/simplebar.css";

import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

//
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "./store";
import { Provider } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// ----------------------------------------------------------------------
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <HashRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </HashRouter>
    </HelmetProvider>{" "}
  </Provider>,

  document.getElementById("root")
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
