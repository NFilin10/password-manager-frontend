import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import ProgressBar from "react-percent-bar";
import Styles from './PasswordTable.module.css'
import InstagramLogo from '../../../../assets/instagramLogo.webp'
import Category from "../../MenuSection/Categories/Category/Category";
import {useEffect, useRef, useState} from "react";

const PasswordTable = () => {

    const perc = 90;
    const [open, setOpen] = useState(false)


    const menuRef = useRef();
    const imgRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                imgRef.current &&
                !imgRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


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
                <tr>
                    <td className={Styles.website}>
                        <div className={Styles.websiteContainer}>
                            <img className={Styles.icon} src={InstagramLogo} alt=""/>
                            <div className={Styles.content}>
                                <h5>Instagram</h5>
                                <a href="http://instagram.com">http://instagram.com</a>
                            </div>
                        </div>


                    </td>
                    <td className={Styles.categories}>
                        <div className={Styles.categoriesWrapper}>
                            <Category categoryName={{name:"Art"}}/>
                            <Category categoryName={{name:"School"}}/>
                            <Category categoryName={{name:"Art"}}/>
                            <Category categoryName={{name:"Art"}}/>

                        </div>
                    </td>
                    <td className={Styles.username}>
                        <div className={Styles.usernameWrapper}>
                            <p>username@usaer</p>
                            <FontAwesomeIcon icon={faCopy} className={Styles.helper} />
                        </div>

                    </td>
                    <td className={Styles.password}>
                        <div className={Styles.passwordWrapper}>
                            <p>*********</p>
                            <FontAwesomeIcon icon={faEye} className={Styles.helper}/>
                            <FontAwesomeIcon icon={faCopy} className={Styles.helper}/>
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
                                <span ref={imgRef} onClick={() => setOpen(!open)} className={Styles.more}><FontAwesomeIcon icon={faEllipsisVertical} /></span>
                                {open && (
                                    <div ref={menuRef} className={Styles.dropdown}>
                                        <li>Edit</li>
                                        <li>Delete</li>
                                    </div>
                                )}
                            </div>


                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PasswordTable

