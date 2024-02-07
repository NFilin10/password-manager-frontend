import { useState } from 'react';
import MenuSection from "../components/Home/MenuSection/MenuSection";
import TableSection from "../components/Home/TableSection/TableSection";
import Styles from './Home.module.css'

function Home() {
    const [showMenu, setShowMenu] = useState(false);

    const [passwords, setPasswords] = useState([]);

    const fetchPasswords = () => {
        fetch(`http://localhost:8080/`,{
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPasswords(data);
            })
            .catch(error => console.error('Error fetching passwords:', error));
    };

    return (
        <div className={Styles.homeWrapper}>
            <MenuSection showMenu={showMenu} setShowMenu={setShowMenu} fetchPasswords={fetchPasswords}/>
            <TableSection showMenu={showMenu} fetchPasswords={fetchPasswords} passwords={passwords}/> {/* Pass passwords as a prop */}
        </div>
    );
}

export default Home;
