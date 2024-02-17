import Styles from "./SignupForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsAuthenticated }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [registered, setRegistered] = useState(null);
    const [formErrors, setFormErrors] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const validateForm = () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = "Name is required";
        }
        if (!surname.trim()) {
            errors.surname = "Surname is required";
        }
        if (!email.trim()) {
            errors.email = "Email is required";
        }
        if (!password.trim()) {
            errors.password = "Password is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const signup = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("surname", surname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        fetch("https://password-manager-ca92.onrender.com/auth/signup", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(error.error);
                    });
                }
                setIsAuthenticated(true);
            })
            .catch((error) => {
                console.error("Error:", error.message);
                setRegistered(error.message);
            });
    };

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.main}>
                <input className={Styles.input} type="checkbox" id={Styles.chk} aria-hidden="true" />
                <div className="signup">
                    <form>
                        <label className={Styles.label} htmlFor="chk" aria-hidden="true">
                            Sign up
                        </label>
                        <input className={Styles.input} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Name" />
                        {formErrors.name && <p className={Styles.error}>{formErrors.name}</p>}
                        <input className={Styles.input} onChange={(e) => setSurname(e.target.value)} type="text" name="surname" placeholder="Surname" />
                        {formErrors.surname && <p className={Styles.error}>{formErrors.surname}</p>}
                        <input className={Styles.input} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                        {formErrors.email && <p className={Styles.error}>{formErrors.email}</p>}
                        <input className={Styles.input} onChange={(e) => setPassword(e.target.value)} type="password" name="pswd" placeholder="Password" />
                        {formErrors.password && <p className={Styles.error}>{formErrors.password}</p>}
                        <input className={Styles.inputFile} onChange={handleImageChange} type="file" accept="image/*" name="image" placeholder="Profile Image" />
                        {registered && <h3>{registered}</h3>}
                        <button onClick={signup} className={Styles.button}>
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
