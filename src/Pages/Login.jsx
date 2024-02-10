
import LoginForm from "../components/Login/LoginForm";

function Login({ setIsAuthenticated, isAuthenticated }) {

    return (
        <>
            <LoginForm setIsAuthenticated={setIsAuthenticated}/>
        </>
    );
}

export default Login;
