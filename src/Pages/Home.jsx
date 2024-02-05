import { useState } from 'react';
import MenuSection from "../components/Home/MenuSection/MenuSection";
import TableSection from "../components/Home/TableSection/TableSection";

function Home() {
    const [showMenu, setShowMenu] = useState(false);

    const [passwords, setPasswords] = useState([]);

    const fetchPasswords = () => {
        fetch(`http://localhost:8080/`)
            .then((res) => res.json())
            .then((data) => {
                setPasswords(data);
            })
            .catch(error => console.error('Error fetching passwords:', error));
    };

    return (
        <div className="homeWrapper">
            <MenuSection showMenu={showMenu} setShowMenu={setShowMenu} fetchPasswords={fetchPasswords}/>
            <TableSection showMenu={showMenu} fetchPasswords={fetchPasswords} passwords={passwords}/> {/* Pass passwords as a prop */}
        </div>
    );
}

export default Home;
