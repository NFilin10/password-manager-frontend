import { useState } from 'react';
import MenuSection from "../components/Home/MenuSection/MenuSection";
import TableSection from "../components/Home/TableSection/TableSection";
import Styles from './Home.module.css'

function Home({setIsAuthenticated}) {

    return (
        <div className={Styles.homeWrapper}>
            <MenuSection setIsAuthenticated={setIsAuthenticated} />
            <TableSection />
        </div>
    );
}

export default Home;
