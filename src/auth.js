
const auth = {
    user: { authenticated: false },
    authenticated: async function() {
        try {
            const response = await fetch("http://localhost:8080/auth/authenticate", {
                credentials: 'include',
            });
            const data = await response.json();
            this.user.authenticated = data.authenticated;
            console.log("DATA in auth.js", data);
            return this.user.authenticated;
        } catch (error) {
            console.error("ERROR", error);
            return false; // Assuming false means not authenticated in case of an error
        }
    }
};

export default auth;
