import React, { useState } from 'react';
import Styles from './TableSection.module.css';
import PasswordTable from './PasswordTable/PasswordTable';
import {faBars, faEye} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const TableSection = () => {

    return (
        <div className={Styles.tableSectionWrapper}>
            <div className={Styles.tableSectionContainer}>
                <h1>All passwords</h1>
                <PasswordTable/>
            </div>
        </div>
    );
};

export default TableSection;
