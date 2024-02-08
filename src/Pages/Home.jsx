import { useState } from 'react';
import MenuSection from "../components/Home/MenuSection/MenuSection";
import TableSection from "../components/Home/TableSection/TableSection";
import Styles from './Home.module.css'

function Home() {
    const [showMenu, setShowMenu] = useState(false);

    const [passwords, setPasswords] = useState([]);
    const [categories, setCategories] = useState([]);


    const fetchPasswords = () => {
        fetch(`https://password-manager-ca92.onrender.com`,{
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPasswords(data);
            })
            .catch(error => console.error('Error fetching passwords:', error));
    };


    const getCategories = () => {
        console.log("FETCHING")
        fetch(`https://password-manager-ca92.onrender.com/categories`, {
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("CAT DATA", data)
                setCategories(data);
            })
            .catch(error => console.error('Error fetching passwords:', error));
    };


    return (
        <div className={Styles.homeWrapper}>
            <MenuSection showMenu={showMenu} setShowMenu={setShowMenu} fetchPasswords={fetchPasswords} getCategories={getCategories} categories={categories}/>
            <TableSection showMenu={showMenu} fetchPasswords={fetchPasswords} passwords={passwords} getCategories={getCategories}/> {/* Pass passwords as a prop */}
        </div>
    );
}

export default Home;
