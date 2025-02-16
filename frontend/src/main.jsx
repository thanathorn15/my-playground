// import { Provider } from "react-redux";
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { store } from "./store/store.js";
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// )




import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from "./store/store.js";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
);
