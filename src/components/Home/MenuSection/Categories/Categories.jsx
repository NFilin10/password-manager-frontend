import React, {useEffect, useState} from 'react';
import Styles from './Categories.module.css';
import Category from './Category/Category';

const Categories = ({ getCategories, categories }) => {
    const [showInput, setShowInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    // const [categories, setCategories] = useState([]);

    const handleToggleInput = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (e) => {
        setNewCategoryName(e.target.value);
    };

    useEffect(() => {
        getCategories();

    }, []);


    // const getCategories = () => {
    //     fetch(`http://localhost:8080/categories`, {
    //         credentials: 'include'
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("CAT DATA", data)
    //             setCategories(data);
    //         })
    //         .catch(error => console.error('Error fetching passwords:', error));
    // }


    const addCategory = () => {

        const data = {category: newCategoryName}

        fetch("http://localhost:8080/new-category", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            credentials: 'include',

            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(newPassword => {
                console.log("DONE")
                setShowInput(false);

            })
            .catch(e => {
                console.log(e);
                console.log("error");
            });
    }


    let categoryEl = categories.map((category, index) => (
        <Category categoryName={category} key={index} />
    ));

    return (
        <div className={Styles.categoriesWrapper}>
            <div className={showInput ? Styles.categoryAdd : Styles.categoryAdd1}>
                <h4>Categories</h4>
                <div className={showInput ? Styles.addCategory : Styles.addCategory1}>
                    {showInput ? (
                        <div className={Styles.addCategoryForm}>
                            <input className={Styles.categoryInput}
                                type="text"
                                value={newCategoryName}
                                onChange={handleInputChange}
                                placeholder="New category name"
                            />
                            <button onClick={addCategory}>Add</button>
                        </div>
                    ) : (
                        <span onClick={handleToggleInput}>+</span>
                    )}
                </div>
            </div>
            {categoryEl}
        </div>
    );
};

export default Categories;
