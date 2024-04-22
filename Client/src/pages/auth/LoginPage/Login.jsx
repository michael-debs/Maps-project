import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import GoHomeButton from "../components/GoHomeButton/GoHomeButton";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import Form from "../../../components/common/FormComponents/Form/Form"

const serverURL = import.meta.env.VITE_BASE_URL;

function Login() {
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      const promise = axios.post(serverURL + "/auth/login", formData);
      toast.promise(promise, {
        pending: "Loading",
        success: "You Are Now Logged In",
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      });
      const response = await promise;
      register(response.data);
      navigate("/");
    } catch (error) {
      if (error.request.status == 409) {
        return;
      }
      console.error("Error: ", error);
    }
  }
  return (
    <>
      <GoHomeButton />
      <main className={styles.main}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <div className={styles.skew}></div>
          <h1 className={styles.title}>Sign In</h1>
          <Form
            fields={[
              {
                name: "email",
                label: "Email",
                type: "email",
                required: true,
                validation: (email) => {
                  if (!email) {
                    return;
                  }
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(email)) {
                    return "Invalid email address";
                  }
                },
              },
              {
                name: "password",
                label: "Password",
                type: "password",
                required: true,
              },
            ]}
            onSubmit={handleSubmit}
            className={styles.form}
            submitButtonProps={{ children: "Sign In", variant: "gradient" }}
          />
          <p className={styles.register}>
            Don&apos;t have an account? <Link to={"/register"}>Register</Link>{" "}
          </p>
        </div>
      </main>
    </>
  );
}

export default Login;
