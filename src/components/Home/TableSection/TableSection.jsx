import React, { useState } from 'react';
import Styles from './TableSection.module.css';
import PasswordTable from './PasswordTable/PasswordTable';
import {faBars, faEye} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const TableSection = ({ fetchPasswords, passwords }) => {
    const [clickCount, setClickCount] = useState(0);

    function openMenu() {
        const menu = document.querySelector('.menuSectionWrapper');
        if (clickCount % 2 === 0) {
            // For even clicks, show the menu
            menu.style.display = 'block';
            menu.style.width = '85%';
            menu.style.position = 'absolute';
        } else {
            // For odd clicks, hide the menu
            menu.style.display = 'none';
        }

        // Increment the click count
        setClickCount((prevCount) => prevCount + 1);
    }

    return (
        <div className={Styles.tableSectionWrapper}>
            <div className={Styles.toggle}>
                <FontAwesomeIcon icon={faBars} onClick={openMenu} className={Styles.open} />
            </div>
            <div className={Styles.tableSectionContainer}>
                <h1>All passwords</h1>
                <PasswordTable fetchPasswords={fetchPasswords} passwords={passwords}/>
            </div>
        </div>
    );
};

export default TableSection;
