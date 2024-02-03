

import Styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/signup`;
        navigate(path);
    }

    return (

        <div className={Styles.wrapper}>
            <div className={Styles.main}>
                <input className={Styles.input} type="checkbox" id={Styles.chk} aria-hidden="true"/>

                <div className="login">
                    <form>
                        <label className={Styles.label} htmlFor="chk" aria-hidden="true">Login</label>
                        <input className={Styles.input} type="email" name="email" placeholder="Email" required=""/>
                        <input className={Styles.input} type="password" name="pswd" placeholder="Password" required=""/>
                        <button className={Styles.button}>Login</button>
                        <button onClick={routeChange} className={Styles.button}>Signup</button>

                    </form>
                </div>
            </div>
        </div>


    )
}

export default LoginForm