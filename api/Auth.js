const BASE_URI = "https://sgi-user-service.herokuapp.com";

const Auth = {
    login: (email, password, thenFn, catchFn) => {
        fetch(`${BASE_URI}/usuario/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "userType": "mgmt",
            })
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
};

export default Auth;
