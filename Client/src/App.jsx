import NavigateWithAlert from "./components/common/NavigateWithAlert/NavigateWithAlert";
import NotFoundPage from "./pages/errors/404/404";
import Register from "./pages/auth/RegisterPage/Register";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./contexts/AuthContext";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/ProfilePage/Profile";
import Login from "./pages/auth/LoginPage/Login";
import EditUserProfileHeader from "./pages/EditProfilePage/EditUserProfile";

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
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <NavigateWithAlert message={"You Are Already Logged In"} to="/" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/user/:id" element={<ProfilePage />} />
        <Route path="/user/:id/edit" element={<EditUserProfileHeader />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
