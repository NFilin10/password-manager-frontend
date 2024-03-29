import Styles from "./Profile.module.css";
import ProfileLogo from "../../../../assets/profileLogo.png";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ setIsAuthenticated }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const imgRef = useRef();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // State to store the URL of the profile image

    useEffect(() => {
        getUser();
    }, []);

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

    const logout = async () => {
        fetch("https://password-manager-ca92.onrender.com/auth/logout", {
        // fetch("http://localhost:8080/auth/logout", {

            credentials: 'include',
        })
            .then((response) => response.json())
            .then(() => {
                setIsAuthenticated(false);
            })
            .catch((e) => {
                console.log("error logout", e);
            });
    };

    const getUser = async () => {
        fetch("https://password-manager-ca92.onrender.com/user", {
        // fetch("http://localhost:8080/user", {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data);
                setName(data[0].name);
                setSurname(data[0].surname);
                setImageUrl(data[0].image)
            })
            .catch((e) => {
                console.log("error fetching user", e);
            });
    };


    return (
        <div className={Styles.profileWrapper}>
            <div className={Styles.logoWrapper}>
                {imageUrl ? (
                <img src={"https://password-manager-ca92.onrender.com/"+imageUrl} alt="Profile" />
                //     <img src={"http://localhost:8080/"+imageUrl} alt="Profile" />

                ) : (
                    <img src={ProfileLogo} alt="Profile" />
                )}
            </div>
            <div className={Styles.content}>
                <h4>{name} {surname}</h4>
                <div className={Styles.options}>
                    <span ref={imgRef} onClick={() => setOpen(!open)} className={Styles.more}>
                        <FontAwesomeIcon className={Styles.moreButton} icon={faEllipsisVertical} />
                    </span>
                    {open && (
                        <div ref={menuRef} className={Styles.dropdown}>
                            <li className={"logoutOption"} onClick={logout}>Logout</li>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
