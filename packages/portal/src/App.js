import logo from './logo.svg';
import './App.css';
import Index from './pages/Index.tsx';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Route path="/" component={Index} />
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
