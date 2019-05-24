const BASE_URI = "https://sgi-user-service.herokuapp.com";

const User = {
    getData: (id, thenFn, catchFn) => {
        fetch(`${BASE_URI}/usuario/${id}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
};

export default User;
