// LogoButton.js
import React, { useState } from 'react';
import Styles from './LogoButton.module.css';
import AppLogo from '../../../../assets/logo.png';
import NewPasswordForm from './NewPasswordForm/NewPasswordForm';

const LogoButton = () => {
    const [showForm, setShowForm] = useState(false);

    const handleForm = () => {
        setShowForm(true);
    };

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
                <button onClick={handleForm}>add password</button>
            </div>

            {showForm && <NewPasswordForm onClose={() => setShowForm(false)} />}
            {showForm && <div className={Styles.backdrop}></div>}
        </div>
    );
};

export default LogoButton;
