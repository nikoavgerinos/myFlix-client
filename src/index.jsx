import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import "./index.scss";

const App = () => (
  <Container>
    <MainView />
  </Container>
);

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
