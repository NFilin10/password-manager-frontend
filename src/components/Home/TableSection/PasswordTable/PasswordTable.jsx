import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from "react-percent-bar";
import Styles from './PasswordTable.module.css';
import InstagramLogo from '../../../../assets/instagramLogo.webp';
import Category from "../../MenuSection/Categories/Category/Category";
import { useEffect, useRef } from "react";

const PasswordTable = () => {
    const perc = 90;
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [passwords, setPasswords] = useState([]);
    const [passwordVisibility, setPasswordVisibility] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPasswords(data);
            });
    }, []);

    const togglePasswordVisibility = (index) => {
        setPasswordVisibility(prevVisibility => ({
            ...prevVisibility,
            [index]: !prevVisibility[index]
        }));
    };

    const menuRef = useRef();

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

    const handleDropdownToggle = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
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
                                <img className={Styles.icon} src={InstagramLogo} alt="" />
                                <div className={Styles.content}>
                                    <h5>{password.service_name}</h5>
                                    <a href={password.link}>{password.link}</a>
                                </div>
                            </div>
                        </td>

                        <td className={Styles.categories}>
                            <div className={Styles.categoriesWrapper}>
                                <Category categoryName={{ name: "Art" }} />
                                <Category categoryName={{ name: "School" }} />
                                <Category categoryName={{ name: "Art" }} />
                                <Category categoryName={{ name: "Art" }} />
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
                                <p>{passwordVisibility[index] ? password.password : '*'.repeat(password.password.length)}</p>
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
                                    percent={perc}
                                    fillColor={perc > 50 ? "green" : perc < 20 ? "red" : "orange"}
                                    width="50px"
                                    height="15px"
                                />
                                {perc}%
                                <div className={Styles.options}>
                                        <span
                                            onClick={() => handleDropdownToggle(index)}
                                            className={Styles.more}
                                        >
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </span>
                                    {openDropdownIndex === index && (
                                        <div ref={menuRef} className={Styles.dropdown}>
                                            <li>Edit</li>
                                            <li>Delete</li>
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
    );
};

export default PasswordTable;
