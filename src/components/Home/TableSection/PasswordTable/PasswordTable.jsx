import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import ProgressBar from "react-percent-bar";


import Styles from './PasswordTable.module.css'
import InstagramLogo from '../../../../assets/instagramLogo.webp'
import Category from "../../MenuSection/Categories/Category/Category";

const PasswordTable = () => {

    const perc = 90;


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
                        <img className={Styles.icon} src={InstagramLogo} alt=""/>
                        <div className={Styles.content}>
                            <h5>Instagram</h5>
                            <a href="http://instagram.com">http://instagram.com</a>
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
                            <FontAwesomeIcon icon={faCopy} />
                        </div>

                    </td>
                    <td className={Styles.password}>
                        <div className={Styles.passwordWrapper}>
                            <p>*********</p>
                            <FontAwesomeIcon icon={faEye} />
                            <FontAwesomeIcon icon={faCopy} />
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
                            <span className={Styles.more}><FontAwesomeIcon icon={faEllipsisVertical} /></span>

                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PasswordTable

