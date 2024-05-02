import { useAuth } from "../../../../contexts/AuthContext";
import LoginButton from "./UserProfile/LogInButton/LogInButton";
import RegisterButton from "./UserProfile/RegisterButton/RegisterButton";
import UserProfile from "./UserProfile/UserProfile/UserProfile";

function Ui() {
  const { isAuthenticated, user, authIsLoading } = useAuth();

  if (authIsLoading) {
    return;
  }

  return (
    <>
      {!isAuthenticated && <RegisterButton />}
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <UserProfile user={user} />}
    </>
  );
}

export default Ui;
