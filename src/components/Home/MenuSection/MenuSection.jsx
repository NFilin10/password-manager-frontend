import LogoButton from "./LogoButton/LogoButton";
import Categories from "./Categories/Categories";
import Profile from "./Profile/Profile";
import Styles from './MenuSection.module.css'



const MenuSection = ({ setIsAuthenticated }) => {
    return (
        <div className="menuSectionWrapper">
            <div className={Styles.menuSectionContainer}>
                <LogoButton />
                <Categories/>
                <Profile setIsAuthenticated={setIsAuthenticated}/>
            </div>
        </div>
    )
}

export default MenuSection