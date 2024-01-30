import { useState } from 'react';
import MenuSection from "../components/Home/MenuSection/MenuSection";
import TableSection from "../components/Home/TableSection/TableSection";

function Home() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="homeWrapper">
            <MenuSection showMenu={showMenu} setShowMenu={setShowMenu}/>
            <TableSection showMenu={showMenu}/>
        </div>
    );
}

export default Home;
