

import Styles from './LogoButton.module.css'
import AppLogo from "../../../../assets/logo.png"


const LogoButton = () => {
    return (
        <div className={Styles.logoButtonWrapper}>
            <div className={Styles.logoBox}>
                <div className={Styles.logoWrapper}>
                    <img src={AppLogo} alt=""/>
                </div>
                <div className={Styles.content}>
                    <h3>Qwerty</h3>
                    <h6>Password manager</h6>
                </div>
            </div>

            <div className={Styles.buttonWrapper}>
                <button>add password</button>
            </div>
        </div>
    )
}

export default LogoButton