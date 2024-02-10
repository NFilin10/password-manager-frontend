


import SignupForm from "../components/Signup/SignupForm";
function Signup({ setIsAuthenticated }) {

    return (
        <>
            <SignupForm setIsAuthenticated={setIsAuthenticated}/>
        </>
    );
}

export default Signup;
