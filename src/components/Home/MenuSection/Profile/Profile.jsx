import Styles from "./Profile.module.css"
import ProfileLogo from "../../../../assets/profileLogo.png"
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



const Profile = () => {
    return (
        <div className={Styles.profileWrapper}>
            <div className={Styles.logoWrapper}>
                <img src={ProfileLogo} alt=""/>
            </div>
            <div className={Styles.content}>
                <h4>Name Surname</h4>
                <span className={Styles.more}><FontAwesomeIcon icon={faEllipsisVertical} /></span>
            </div>
        </div>
    )
}

export default Profile