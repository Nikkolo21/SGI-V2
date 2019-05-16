const BASE_URI = "https://sgi-inventory-service.herokuapp.com";

const Inventory = {
    list: (query = " ", thenFn, catchFn) => {
        fetch(`${BASE_URI}/inventario/buscar?query=${query}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    types: (thenFn, catchFn) => {
        fetch(`${BASE_URI}/inventario/getTipos`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    category: (query, thenFn, catchFn) => {
        fetch(`${BASE_URI}/inventario/getCategorias`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "tipo": query
            })
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    }
};

export default Inventory;
