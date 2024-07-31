import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { setupInterceptors } from "./services/axios.ts";

const AppWrapper = () => {
  const navigate = useNavigate();
  setupInterceptors(navigate);
  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster
        position="top-center"
        containerStyle={{
          zIndex: 99999, // Very high z-index
          top: "1rem",
        }}
      />
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<AppWrapper />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
