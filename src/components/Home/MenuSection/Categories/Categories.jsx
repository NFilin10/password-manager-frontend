import React, { useState } from 'react';
import Styles from './Categories.module.css';
import Category from './Category/Category';

const Categories = () => {
    const [showInput, setShowInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categories, setCategories] = useState([
        {
            name: 'Design',
            amount: 12
        },
        {
            name: 'Art',
            amount: 63
        },
        {
            name: 'School',
            amount: 6
        },
        {
            name: 'Uni',
            amount: 60
        },
    ]);

    const handleToggleInput = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (e) => {
        setNewCategoryName(e.target.value);
    };

    const handleAddCategory = () => {
        if (newCategoryName.trim() !== '') {
            const newCategory = {
                name: newCategoryName,
                amount: 0 // Assuming newly added category has 0 amount initially
            };
            setCategories([...categories, newCategory]);
            setNewCategoryName('');
            setShowInput(false);
        }
    };

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
                            <button onClick={handleAddCategory}>Add</button>
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
