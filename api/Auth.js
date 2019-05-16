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
    sendEmailCode: (email, thenFn, catchFn) => {
        fetch(`${BASE_URI}/usuario/password/sendemail`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email
            })
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    recoverPassword: (data, thenFn, catchFn) => {
        fetch(`${BASE_URI}/usuario/password/recover`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "newPassword": data.newPassword,
                "repeatPassword": data.repeatPassword,
                "requestType": "id",
                "id": data.id

            })
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    }
};

export default Auth;
