import Styles from "./Profile.module.css"
import ProfileLogo from "../../../../assets/profileLogo.png"



const Profile = () => {
    return (
        <div className={Styles.profileWrapper}>
            <div className={Styles.logoWrapper}>
                <img src={ProfileLogo} alt=""/>
            </div>
            <div className={Styles.content}>
                <h4>Name Surname</h4>
                <span>:</span>
            </div>
        </div>
    )
}

export default Profile