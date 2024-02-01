import React, { useState } from 'react';

import img from '../../../../../assets/instagramLogo.webp'

import Styles from './NewPasswordForm.module.css'

const NewPasswordForm = () => {
    const [website, setWebsite] = useState('');
    const [link, setLink] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('');
    const [logo, setLogo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., saving data or sending to server
        console.log({
            website,
            link,
            login,
            password,
            category,
            logo
        });
        // Reset form fields
        setWebsite('');
        setLink('');
        setLogin('');
        setPassword('');
        setCategory('');
        setLogo('');
    };

    return (
        <div className={Styles.formWrapper}>
            <div className={Styles.formImg}>
                test
            </div>
            <div className={Styles.formContainer}>
                <h1>Add new password</h1>
                <form onSubmit={handleSubmit}>
                    <div className={Styles.form}>
                        <div className={Styles.upper}>
                            <div>
                                <input
                                    placeholder={"Website"}
                                    type="text"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
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
                                    placeholder={"Login"}
                                    type="text"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder={"Password"}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={Styles.bottom}>
                            <div>
                                <label>Logo:</label>
                                <select
                                    value={logo}
                                    onChange={(e) => setLogo(e.target.value)}
                                >
                                    <option value="">Select logo</option>
                                    <option value="logo1"></option>
                                    <option value="logo2"></option>
                                    <option value="logo3"></option>
                                    {/* Add more options as needed */}
                                </select>
                                {/*{logo && <img src={img} alt="Logo" />}*/}
                            </div>

                            <div>
                                <label>Category:</label>
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



                    <button type="submit">Add Password</button>
                </form>
            </div>

        </div>

    );
};

export default NewPasswordForm;
