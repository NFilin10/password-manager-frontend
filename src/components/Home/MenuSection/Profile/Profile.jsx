import Styles from "./Profile.module.css";
import ProfileLogo from "../../../../assets/profileLogo.png";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";

const Profile = () => {
    const [open, setOpen] = useState(false);

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
        <div className={Styles.profileWrapper}>
            <div className={Styles.logoWrapper}>
                <img src={ProfileLogo} alt="" />
            </div>
            <div className={Styles.content}>
                <h4>Name Surname</h4>
                <div className={Styles.options}>
                    <span ref={imgRef} onClick={() => setOpen(!open)} className={Styles.more}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </span>
                    {open && (
                        <div ref={menuRef} className={Styles.dropdown}>
                            <li>Log out</li>
                            <li>Change password</li>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
