import { useAuth } from "../../contexts/AuthContext";
import LoginButton from "./components/LogInButton/LogInButton";
import RegisterButton from "./components/RegisterButton/RegisterButton";
import UserProfile from "./components/UserProfile/UserProfile";
import styles from "./Header.module.css";

function Header() {
  const { isAuthenticated, user, authIsLoading } = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        
      </div>
      <div className={styles.right}>
        {!authIsLoading ? (
          <>
            {!isAuthenticated && <RegisterButton />}
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && <UserProfile user={user} />}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Header;
