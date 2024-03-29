// PasswordUpdateForm.js
import React, { useEffect, useState } from 'react';
import img from '../../../assets/instagramLogo.webp';
import Styles from './PasswordUpdateForm.module.css';
import formImg from '../../../assets/form.jpeg';
import {useCategoriesStore} from "../../../store";

const PasswordUpdateForm = ({ onClose, fetchPasswords, passwordData }) => {
    const [website, setWebsite] = useState(passwordData.service_name);
    const [link, setLink] = useState(passwordData.link);
    const [login, setLogin] = useState(passwordData.login);
    const [password, setPassword] = useState(passwordData.decryptedPass);
    const [selectedCategories, setSelectedCategories] = useState(passwordData.categories);
    const [logo, setLogo] = useState(passwordData.logo);

    const categories = useCategoriesStore(state => state.categories)
    const fetchCategories = useCategoriesStore(state => state.fetchCategories)


    const firstLetter = logo.charAt(0)

    const firstLetterCap = firstLetter.toUpperCase()

    const remainingLetters = logo.slice(1)

    const capitalizedWord = firstLetterCap + remainingLetters

    const selectedCats = []

    selectedCategories.map((cat) => {
        selectedCats.push(cat.category_name)
    })

    useEffect(() => {
        fetchCategories();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const passID = passwordData.id

        const data = {
            website: website,
            webLink: link,
            login: login,
            password: password,
            logo: logo,
            categories: selectedCategories
        };

        fetch(`https://password-manager-ca92.onrender.com/update/${passID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(() => {
                onClose();
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
                    <img src={formImg} alt="" />
                </div>
                <div className={Styles.formContainer}>
                    <h1>Update password</h1>
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

                                        value={capitalizedWord}
                                        onChange={(e) => setLogo(e.target.value)}
                                    >
                                        <option value="">Select logo</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Facebook">Facebook</option>
                                    </select>
                                </div>

                                <div>
                                    <select
                                        className={Styles.selectCat}
                                        multiple={true}
                                        value={selectedCats}
                                        onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
                                    >
                                        <option value="">Select categories</option>
                                        {categories.map(category => <option key={category.category_name} value={category.category_name}>{category.category_name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={Styles.buttonWrapper}>
                            <button className={Styles.submitBtn} type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PasswordUpdateForm;