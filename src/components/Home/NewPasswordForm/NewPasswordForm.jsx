// PasswordUpdateForm.js
import React, { useEffect, useState } from 'react';
import img from '../../../assets/instagramLogo.webp';
import Styles from './NewPasswordForm.module.css';
import formImg from '../../../assets/form.jpeg';
import {useCategoriesStore, usePasswordsStore} from "../../../store";


const NewPasswordForm = ({ onClose }) => {
    const [website, setWebsite] = useState('');
    const [link, setLink] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [logo, setLogo] = useState('');

    const [formError, setFormError] = useState({
        website: '',
        login: '',
        password: ''
    })

    function validateForm(){
        const errors = {};
        if (!website.trim()) {
            errors.website = "Website is required";
        }
        if (!login.trim()) {
            errors.login = "Login is required";
        }
        if (!password.trim()) {
            errors.password = "Password is required";
        }
        setFormError(errors);
    }


    const categories =  useCategoriesStore(state => state.categories)
    const fetchPasswords = usePasswordsStore(state => state.fetchPasswords)

    const fetchCategories = useCategoriesStore(state => state.fetchCategories)


    useEffect(() => {
        fetchCategories();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data = {
            website: website,
            webLink: link,
            login: login,
            password: password,
            logo: logo,
            categories: selectedCategories
        };

        fetch("https://password-manager-ca92.onrender.com/add", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(() => {
                onClose();
                fetchPasswords();
                fetchCategories();

            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            <div className={Styles.formWrapper}>
                <button className={Styles.closeButton} onClick={onClose}>Close</button>
                <div className={Styles.formImg}>
                    <img src={formImg} alt="" />
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
                                    {formError.website && <p className={Styles.error}>{formError.website}</p>}

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
                                    {formError.login && <p className={Styles.error}>{formError.login}</p>}
                                </div>
                                <div>
                                    <input
                                        className={Styles.formInput}
                                        placeholder={"Password"}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {formError.password && <p className={Styles.error}>{formError.password}</p>}
                                </div>
                            </div>

                            <div className={Styles.bottom}>
                                <div>
                                    <select
                                        className={Styles.selectLogo}
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
                                        className={Styles.selectCat}
                                        multiple
                                        value={selectedCategories}
                                        onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
                                    >
                                        <option value="">Select categories</option>
                                        {categories.map(category => <option key={category.category_name} value={category.category_name}>{category.category_name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={Styles.buttonWrapper}>
                            <button className={Styles.submitBtn} type="submit">Add Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewPasswordForm;