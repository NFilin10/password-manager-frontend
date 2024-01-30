import Styles from "./Profile.module.css"
import ProfileLogo from "../../../../assets/profileLogo.png"
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";



const Profile = () => {

    const [open, setOpen] = useState(false)


    return (
        <div className={Styles.profileWrapper}>
            <div className={Styles.logoWrapper}>
                <img src={ProfileLogo} alt=""/>
            </div>
            <div className={Styles.content}>
                <h4>Name Surname</h4>
                <div className={Styles.options}>
                    <span onClick={() => setOpen(!open)} className={Styles.more}><FontAwesomeIcon icon={faEllipsisVertical} /></span>
                    {open && (
                        <div className={Styles.dropdown}>
                            <ul>
                                <li>Log out</li>
                                <li>Change password</li>
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Profile