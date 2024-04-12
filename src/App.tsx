import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages";
import { AuthType } from "./enums/Auth";
import "./index.css"
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Landing />} /> */}
        <Route path="/login" element={<Auth authRoute={AuthType.LOGIN} />} />
        <Route
          path="/register"
          element={<Auth authRoute={AuthType.REGISTER} />}
        />
        {/* <Route element={<ProtectedRoute />}> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
