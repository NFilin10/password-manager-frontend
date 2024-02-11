import { create } from "zustand";


const usePasswordsStore = create((set) => ({
    passwords: [],

    fetchPasswords: () => {
        fetch(`https://password-manager-ca92.onrender.com`, {

            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                set({ passwords: data }); // Set the fetched passwords
            })
            .catch(error => console.error('Error fetching passwords:', error));
    }
}));


const useCategoriesStore = create((set) => ({

    categories: [],

    fetchCategories: () => {
        fetch(`https://password-manager-ca92.onrender.com/categories`, {
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("CAT DATA", data)
                set({ categories: data })
            })
            .catch(error => console.error('Error fetching passwords:', error));
    }


}))


export  {
    usePasswordsStore,
    useCategoriesStore
}
