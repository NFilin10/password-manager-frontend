import LogoButton from "./LogoButton/LogoButton";
import Categories from "./Categories/Categories";
import Profile from "./Profile/Profile";
import Styles from './MenuSection.module.css'



const MenuSection = () => {
    return (
        <div className={Styles.menuSectionWrapper}>
            <div className={Styles.menuSectionContainer}>
                <LogoButton/>
                <Categories/>
                <Profile/>
            </div>
        </div>
    )
}

export default MenuSection