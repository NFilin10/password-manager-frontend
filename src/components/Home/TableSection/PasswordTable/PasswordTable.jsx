import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from "react-percent-bar";
import Styles from './PasswordTable.module.css';
import InstagramLogo from '../../../../assets/instagramLogo.webp';
import Category from "../../MenuSection/Categories/Category/Category";
import { useEffect, useRef } from "react";
import facebookIcon from "../../../../assets/facebook.png"
import PasswordUpdateForm from "../../PasswordUpdateForm/PasswordUpdateForm";
import { usePasswordsStore, useCategoriesStore } from "../../../../store";


const PasswordTable = () => {

    const logos = {"facebook" : facebookIcon, "instagram" : InstagramLogo}

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [passwordVisibility, setPasswordVisibility] = useState({});

    const [selectedPassword, setSelectedPassword] = useState(null);

    const passwords = usePasswordsStore(state => state.passwords)
    const fetchPasswords = usePasswordsStore(state => state.fetchPasswords)

    const fetchCategories = useCategoriesStore(state => state.fetchCategories)


    useEffect(() => {
        fetchPasswords();

    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenDropdownIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    const handleEditPassword = (index) => {
        const password = passwords[index];
        console.log(password)
        setSelectedPassword(password);
    };


    const deletePassword = (id) => {
        fetch(`https://password-manager-ca92.onrender.com/delete/${id}`,{
            credentials: "include",
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                fetchPasswords()
                fetchCategories()
            })
            .catch(error => console.error('Error deleting password:', error));
    };



    const togglePasswordVisibility = (index) => {
        setPasswordVisibility(prevVisibility => ({
            ...prevVisibility,
            [index]: !prevVisibility[index]
        }));
    };

    const menuRef = useRef();


    const handleDropdownToggle = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (

        <>
            {selectedPassword && (
                <PasswordUpdateForm
                    onClose={() => setSelectedPassword(null)}
                    fetchPasswords={fetchPasswords}
                    passwordData={selectedPassword}
                />
            )}

            <div className={Styles.passwordTableWrapper}>
                <table>
                    <thead>
                    <tr>
                        <th>Website</th>
                        <th>Categories</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Vulnerability score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {passwords.map((password, index) => (
                        <tr key={index}>
                            <td className={Styles.website}>
                                <div className={Styles.websiteContainer}>
                                    {password.logo !== '' && <img className={Styles.icon} src={logos[password.logo]} alt="" />}
                                    <div className={Styles.content}>
                                        <h5>{password.service_name}</h5>
                                        <a href={password.link}>{password.link}</a>
                                    </div>
                                </div>

                            </td>

                            <td className={Styles.categories}>
                                <div className={Styles.categoriesWrapper}>
                                    {password.categories.map((category, index) => (
                                        <Category key={index} categoryName={category} />
                                    ))}
                                </div>
                            </td>


                            <td className={Styles.username}>
                                <div className={Styles.usernameWrapper}>
                                    <p>{password.login}</p>
                                    <FontAwesomeIcon icon={faCopy} className={Styles.helper} onClick={() => copyToClipboard(password.login)} />
                                </div>
                            </td>

                            <td className={Styles.password}>
                                <div className={Styles.passwordWrapper}>
                                    <p>{passwordVisibility[index] ? password.decryptedPass : '*'.repeat(password.decryptedPass.length)}</p>
                                    <FontAwesomeIcon
                                        icon={passwordVisibility[index] ? faEyeSlash : faEye}
                                        className={Styles.helper}
                                        onClick={() => togglePasswordVisibility(index)}
                                    />
                                    <FontAwesomeIcon icon={faCopy} className={Styles.helper} onClick={() => copyToClipboard(password.password)} />
                                </div>
                            </td>

                            <td className={Styles.vuln}>
                                <div className={Styles.vulnContainer}>
                                    <ProgressBar
                                        percent={password.score}
                                        fillColor={password.score > 50 ? "green" : password.score < 20 ? "red" : "orange"}
                                        width="50px"
                                        height="15px"
                                    />
                                    {password.score}%
                                    <div className={Styles.options}>
                                        <span
                                            onClick={() => handleDropdownToggle(index)}
                                            className={Styles.more}
                                        >
                                            <FontAwesomeIcon className={Styles.moreButton} icon={faEllipsisVertical} />
                                        </span>
                                        {openDropdownIndex === index && (
                                            <div ref={menuRef} className={Styles.dropdown}>
                                                <li onClick={() => handleEditPassword(index)}>Edit</li>
                                                <li onClick={() => deletePassword(password.id)}>Delete</li>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>


    );
};

export default PasswordTable;