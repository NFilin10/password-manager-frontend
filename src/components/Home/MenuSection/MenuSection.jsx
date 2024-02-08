import LogoButton from "./LogoButton/LogoButton";
import Categories from "./Categories/Categories";
import Profile from "./Profile/Profile";
import Styles from './MenuSection.module.css'



const MenuSection = ({ fetchPasswords, categories, getCategories }) => {
    return (
        <div className="menuSectionWrapper">
            <div className={Styles.menuSectionContainer}>
                <LogoButton fetchPasswords={fetchPasswords} getCategories={getCategories} />
                <Categories getCategories={getCategories} categories={categories}/>
                <Profile/>
            </div>
        </div>
    )
}

export default MenuSection