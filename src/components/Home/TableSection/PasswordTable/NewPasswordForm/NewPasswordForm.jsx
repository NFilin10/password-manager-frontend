// PasswordUpdateForm.js
import React, { useEffect, useState } from 'react';
import img from '../../../../../assets/instagramLogo.webp';
import Styles from './NewPasswordForm.module.css';
import formImg from '../../../../../assets/form.jpeg';
import {useCategoriesStore, usePasswordsStore} from "../../../../../store";


const NewPasswordForm = ({ onClose }) => {
    const [website, setWebsite] = useState('');
    const [link, setLink] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [logo, setLogo] = useState('');

    const fetchPasswords = usePasswordsStore(state => state.fetchPasswords)

    const fetchCategories = useCategoriesStore(state => state.fetchCategories)



    useEffect(() => {
        getCategories1();
    }, []);

    const getCategories1 = () => {
        fetch(`https://password-manager-ca92.onrender.com/categories`, {
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCategories(data);
            })
            .catch(error => console.error('Error fetching passwords:', error));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            .then(newPassword => {
                onClose(); // Close the form
                fetchPasswords();
                fetchCategories();

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