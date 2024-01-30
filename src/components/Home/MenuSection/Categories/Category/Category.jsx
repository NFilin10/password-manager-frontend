import Styles from "./Category.module.css";



const Category = ({categoryName}) => {
    return (
        <div className={Styles.categoryWrapper}>
            <div className={Styles.categoryName}>
                <h6>{ categoryName.name }</h6>
            </div>
            <span>{ categoryName.amount }</span>
        </div>
    )
}

export default Category