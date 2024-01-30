
import Styles from './TableSection.module.css'
import PasswordTable from "./PasswordTable/PasswordTable";


const TableSection = () => {
    return (
        <div className={Styles.tableSectionWrapper}>
            <div className={Styles.tableSectionContainer}>
                <h1>All passwords</h1>
                <PasswordTable/>
            </div>
        </div>
    )
}

export default TableSection