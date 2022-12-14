import axios from "axios";
const baseUrl = '/api/persons'

export const getAllPersons = () => {
    return axios.get(baseUrl);
}

export const createPerson = newObject => {
    return axios.post(baseUrl, newObject);
}

export const updatePerson = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject);
}

export const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`);
}

