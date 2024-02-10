

import Styles from "./SignupForm.module.css";
import {useState} from "react";
import { useNavigate } from "react-router-dom";




const LoginForm = ({ setIsAuthenticated }) => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, serPassword] = useState('')


    const signup = async (e) => {
        const data = { name: name, surname: surname, email: email, password: password };

        e.preventDefault();

        fetch("https://password-manager-ca92.onrender.com/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Unauthorized: Please check your credentials.");
                    } else {
                        throw new Error("Network response was not ok.");
                    }
                }
                setIsAuthenticated(true);
            })
            .catch(error => {
                console.error("Error:", error.message);
                // Handle the error appropriately, e.g., display an error message to the user
            });
    };



    return (

        <div className={Styles.wrapper}>
            <div className={Styles.main}>
                <input className={Styles.input} type="checkbox" id={Styles.chk} aria-hidden="true"/>

                <div className="signup">
                    <form>
                        <label className={Styles.label} htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input className={Styles.input} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Name" required=""/>
                        <input className={Styles.input} onChange={(e) => setSurname(e.target.value)} type="text" name="surname" placeholder="Surname" required=""/>
                        <input className={Styles.input} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required=""/>
                        <input className={Styles.input} onChange={(e) => serPassword(e.target.value)} type="password" name="pswd" placeholder="Password" required=""/>
                        <button onClick={signup} className={Styles.button}>Sign up</button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default LoginForm