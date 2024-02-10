import { useState } from 'react';
import MenuSection from "../components/Home/MenuSection/MenuSection";
import TableSection from "../components/Home/TableSection/TableSection";
import Styles from './Home.module.css'

function Home({setIsAuthenticated}) {
    const [showMenu, setShowMenu] = useState(false);


    return (
        <div className={Styles.homeWrapper}>
            <MenuSection setIsAuthenticated={setIsAuthenticated} showMenu={showMenu} setShowMenu={setShowMenu}/>
            <TableSection showMenu={showMenu}/> {/* Pass passwords as a prop */}
        </div>
    );
}

export default Home;
