import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import {Provider} from "react-redux";
import store from "./app/store";

//ReactDOM.render(<App/>,document.getElementById('root'));
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
)
