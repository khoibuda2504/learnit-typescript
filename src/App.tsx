import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth, Dashboard, Landing } from "./pages";
import { AuthType } from "./enums/Auth";
import "./index.css";
import PostContextProvider from "./contexts/PostContext";
import AuthContextProvider from "./contexts/AuthContext";
import { ProtectedRoute } from "./components";
function App() {
  return (
    <PostContextProvider>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={<Auth authRoute={AuthType.LOGIN} />}
            />
            <Route
              path="/register"
              element={<Auth authRoute={AuthType.REGISTER} />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </PostContextProvider>
  );
}

export default App;
