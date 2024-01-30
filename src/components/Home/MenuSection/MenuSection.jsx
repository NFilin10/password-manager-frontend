import LogoButton from "./LogoButton/LogoButton";
import Styles from './MenuSection.module.css'


const MenuSection = () => {
    return (
        <div className={Styles.menuSectionWrapper}>
            <div className={Styles.menuSectionContainer}>
                <LogoButton/>
            </div>
        </div>
    )
}

export default MenuSection