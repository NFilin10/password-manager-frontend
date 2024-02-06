

import Styles from "./SignupForm.module.css";
import {useState} from "react";
import { useNavigate } from "react-router-dom";




const LoginForm = () => {

    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, serPassword] = useState('')

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/`;
        navigate(path);
    }

    const signup = async (e) => {
        var data = {login: login, email: email, password: password };

        e.preventDefault();

        fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => {
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

                <div className="signup">
                    <form>
                        <label className={Styles.label} htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input className={Styles.input} onChange={(e) => setLogin(e.target.value)} type="text" name="txt" placeholder="User name" required=""/>
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