const BASE_URI = "https:/sgi-institution-service.herokuapp.com/api";

const Institution = {
    get: (thenFn, catchFn) => {
        fetch(`${BASE_URI}/sede/lista`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    getFaculty: (id, thenFn, catchFn) => {
        fetch(`${BASE_URI}/facultad/lista`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "sedeId": id
            })
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    getSchool: (id, thenFn, catchFn) => {
        fetch(`${BASE_URI}/escuela/lista`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "FacultadId": id
            })
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    getDepartment: (id, thenFn, catchFn) => {
        fetch(`${BASE_URI}/departamento/lista`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "EscuelaId": id
            })
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
    getLaboratory: (id, thenFn, catchFn) => {
        fetch(`${BASE_URI}/laboratorio/lista`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "DepartamentoId": id
            })
        }).then(response => response.json())
            .then(thenFn)
            .catch(catchFn);
    },
};

export default Institution;
