import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import './App.css';
import { AuthProvider } from "./context/AuthContext.js";

import Routing from './routing/Routing';
function App() {
  return (
    <>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </>
  );
}

export default App;
