import Styles from './Categories.module.css';
import Category from "./Category/Category";

const Categories = () => {

    // const categories = ["Design", "Art", "School", "Uni"]

    const categories = [
        {
            name: "Design",
            amount: 12
        },
        {
            name: "Art",
            amount: 63
        },
        {
            name: "School",
            amount: 6
        },
        {
            name: "Uni",
            amount: 60
        },
    ]


    let categoryEl = categories.map(category =>
        <Category categoryName={category} key={category}/>
    )

    return (
        <div className={Styles.categoriesWrapper}>
            <div className={Styles.categoryAdd}>
                <h4>Categories</h4>
                <div className={Styles.addCategory}>
                    <span>+</span>
                </div>
            </div>
            {categoryEl}
        </div>
    )
}

export default Categories