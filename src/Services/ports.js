import axios from 'axios';

const apiPath = 'http://localhost:5000';

function registerUser(body) {
    return axios.post(`${apiPath}/auth/sign-up`, body)
}

function login(body) {
    return axios.post(`${apiPath}/auth/sign-in`, body);
}

function createTransaction(body, config) {
    return axios.post(`${apiPath}/transactions`, body, config);
}

function catchUserTransactions(config) {
    return axios.get(`${apiPath}/transactions`, config);
}

export { registerUser, login, createTransaction, catchUserTransactions };