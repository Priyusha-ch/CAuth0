import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import {Route, Routes} from "react-router-dom";
import Home from './Home';


function App() {

  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <p>isLoading...</p>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
