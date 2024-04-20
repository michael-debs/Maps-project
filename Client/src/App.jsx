import NavigateWithAlert from "./components/common/NavigateWithAlert/NavigateWithAlert";
import NotFoundPage from "./pages/errors/404/404";
import Register from "./pages/auth/RegisterPage/Register";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./contexts/AuthContext";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <NavigateWithAlert
                message={"You Are Already Registered"}
                to="/"
              />
            ) : (
              <Register />
            )
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
