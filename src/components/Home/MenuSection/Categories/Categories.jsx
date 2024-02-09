import React, {useEffect, useState} from 'react';
import Styles from './Categories.module.css';
import Category from './Category/Category';
import {useCategoriesStore} from "../../../../store";

const Categories = () => {
    const [showInput, setShowInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const categories = useCategoriesStore(state => state.categories)

    const fetchCategories = useCategoriesStore(state => state.fetchCategories)

    const handleToggleInput = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (e) => {
        setNewCategoryName(e.target.value);
    };

    useEffect(() => {
        fetchCategories();

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

        fetch("https://password-manager-ca92.onrender.com/new-category", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            credentials: 'include',

            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(newPassword => {
                console.log("DONE")
                setShowInput(false);
                fetchCategories()

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
                        <span className={Styles.addNewCategory} onClick={handleToggleInput}>+</span>
                    )}
                </div>
            </div>
            {categoryEl}
        </div>
    );
};

export default Categories;
