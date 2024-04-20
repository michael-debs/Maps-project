import Form from "../../../components/common/FormComponents/Form/Form";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import GoHomeButton from "../components/GoHomeButton/GoHomeButton";

const serverURL = import.meta.env.VITE_BASE_URL;

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      const promise = axios.post(serverURL + "/user", formData);
      toast.promise(promise, {
        pending: "Loading",
        success: "You Are Now Logged In",
        error: {
          render({ data }) {
            if (data.request.status == 409) {
              return "User Already Exists!";
            }
            return data.message;
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
          <h1 className={styles.title}>Sign Up</h1>
          <Form
            fields={[
              {
                name: "firstName",
                label: "First Name",
                type: "text",
                required: true,
              },
              {
                name: "lastName",
                label: "Last Name",
                type: "text",
                required: true,
              },
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
                validation: (password) => {
                  if (!password) {
                    return;
                  }
                  if (password.length < 8) {
                    return "Password must be at least 8 characters long";
                  }
                },
              },
              {
                name: "passwordConfirmation",
                label: "Confirm Password",
                type: "password",
                required: true,
              },
            ]}
            onSubmit={handleSubmit}
            className={styles.form}
            submitButtonProps={{ children: "Sign Up", variant: "gradient" }}
            globalValidation={(formData, formError) => {
              if (!formData.password || !formData.passwordConfirmation) {
                return;
              }
              if (formData.password !== formData.passwordConfirmation) {
                const errorMessage = "Passwords do not match";
                formError.password = errorMessage;
                formError.passwordConfirmation = errorMessage;
              }
            }}
          />
          <p className={styles.login}>
            Already have an account? <Link to={"/login"}>Login</Link>{" "}
          </p>
        </div>
      </main>
    </>
  );
}

export default Register;
