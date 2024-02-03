

import Styles from "./SignupForm.module.css";



const LoginForm = () => {
    return (

        <div className={Styles.wrapper}>
            <div className={Styles.main}>
                <input className={Styles.input} type="checkbox" id={Styles.chk} aria-hidden="true"/>

                <div className="signup">
                    <form>
                        <label className={Styles.label} htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input className={Styles.input} type="text" name="txt" placeholder="User name" required=""/>
                        <input className={Styles.input} type="email" name="email" placeholder="Email" required=""/>
                        <input className={Styles.input} type="password" name="pswd" placeholder="Password" required=""/>
                        <button className={Styles.button}>Sign up</button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default LoginForm