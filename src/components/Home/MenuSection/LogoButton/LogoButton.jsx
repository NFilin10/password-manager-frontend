import React, { useState, useEffect } from 'react';
import Styles from './LogoButton.module.css';
import AppLogo from '../../../../assets/logo.png';
import NewPasswordForm from "../../NewPasswordForm/NewPasswordForm";

const LogoButton = () => {
    const [showForm, setShowForm] = useState(false);

    const handleForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };


    return (
        <div className={Styles.logoButtonWrapper}>
            {showForm && <div className={Styles.activeModalOverlay}></div>}

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

            <div className={Styles.modalContent}>
                {showForm && <NewPasswordForm onClose={handleCloseForm}/>}
            </div>
        </div>
    );
};

export default LogoButton;
