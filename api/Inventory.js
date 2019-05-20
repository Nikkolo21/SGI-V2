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
    },
    inventoryIn: (data, thenFn, catchFn) => {
        fetch(`${BASE_URI}/entrada/buscar`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    inventoryOut: (data, thenFn, catchFn) => {
        fetch(`${BASE_URI}/salida/buscar`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    saveInventory: (type, data, thenFn, catchFn) => {
        fetch(`${BASE_URI}/${ type === 'in' ? 'entrada' : 'salida'}/registrar`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    getCategoriesIn: (thenFn, catchFn) => {
        fetch(`${BASE_URI}/entrada/categorias`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    getCategoriesOut: (thenFn, catchFn) => {
        fetch(`${BASE_URI}/salida/categorias`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
};

export default Inventory;
