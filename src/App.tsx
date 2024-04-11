import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages";
import { AUTH_TYPE } from "./constants";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Landing />} /> */}
        <Route path="/login" element={<Auth authRoute={AUTH_TYPE.LOGIN} />} />
        <Route path="/register" element={<Auth authRoute={AUTH_TYPE.REGISTER} />} />
        {/* <Route element={<ProtectedRoute />}> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
