// NewPasswordForm.js
import React, { useState } from 'react';
import img from '../../../../../assets/instagramLogo.webp';
import Styles from './NewPasswordForm.module.css';
import formImg from '../../../../../assets/form.jpeg';



const NewPasswordForm = ({ onClose, fetchPasswords }) => {
    const [website, setWebsite] = useState('');
    const [link, setLink] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('');
    const [logo, setLogo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            website: website,
            webLink: link,
            login: login,
            password: password,
            logo: logo
        };

        fetch("http://localhost:8080/add", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(newPassword => {
                onClose(); // Close the form
                fetchPasswords();

            })
            .catch(e => {
                console.log(e);
                console.log("error");
            });
    };


    return (
        <>
            <div className={Styles.formWrapper}>
                <button className={Styles.closeButton} onClick={onClose}>Close</button> {/* Close button */}
                <div className={Styles.formImg}>
                    <img src={formImg} alt=""/>
                </div>
                <div className={Styles.formContainer}>
                    <h1>Add new password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={Styles.form}>
                            <div className={Styles.upper}>
                                <div>
                                    <input
                                        className={Styles.formInput}
                                        placeholder={"Website"}
                                        type="text"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        className={Styles.formInput}
                                        placeholder={"Link"}
                                        type="text"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={Styles.mid}>
                                <div>
                                    <input
                                        className={Styles.formInput}
                                        placeholder={"Login"}
                                        type="text"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        className={Styles.formInput}
                                        placeholder={"Password"}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={Styles.bottom}>
                                <div>
                                    <select
                                        value={logo}
                                        onChange={(e) => setLogo(e.target.value)}
                                    >
                                        <option value="">Select logo</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Facebook">Facebook</option>
                                    </select>
                                    {/*{logo && <img src={img} alt="Logo" />}*/}
                                </div>

                                <div>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Select category</option>
                                        <option value="social">Social</option>
                                        <option value="finance">Finance</option>
                                        <option value="work">Work</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={Styles.buttonWrapper}>
                            <button className={Styles.submitBtn} onClick={handleSubmit} type="submit">Add Password</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewPasswordForm;
