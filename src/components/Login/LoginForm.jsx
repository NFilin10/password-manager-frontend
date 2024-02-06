

import Styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import {useState} from "react";



const LoginForm = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate();

    const routeChangeSignUp = () =>{
        let path = `/signup`;
        navigate(path);
    }


    const routeChange = () =>{
        let path = `/`;
        navigate(path);
    }

    const LoginIn = async (e) => {
        var data = {email: login, password: password };

        e.preventDefault();

        fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 401) {
                    throw new Error('Incorrect login or password');
                }
                routeChange();

            })
            .catch(e => {
                console.log(e);
                console.log("error");
            });
    };

    return (

        <div className={Styles.wrapper}>
            <div className={Styles.main}>
                <input className={Styles.input} type="checkbox" id={Styles.chk} aria-hidden="true"/>

                <div className="login">
                    <form>
                        <label className={Styles.label} htmlFor="chk" aria-hidden="true">Login</label>
                        <input className={Styles.input} onChange={(e) => setLogin(e.target.value)} type="email" name="email" placeholder="Email" required=""/>
                        <input className={Styles.input} onChange={(e) => setPassword(e.target.value)} type="password" name="pswd" placeholder="Password" required=""/>
                        <button onClick={LoginIn} className={Styles.button}>Login</button>
                        <button onClick={routeChangeSignUp} className={Styles.button}>Signup</button>

                    </form>
                </div>
            </div>
        </div>


    )
}

export default LoginForm