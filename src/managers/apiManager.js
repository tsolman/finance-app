// import fetch from 'cross-fetch'

const host = process.env.NODE_ENV === 'production' ? 'https://finance-gen-api.herokuapp.com' : 'http://localhost:3100';
export const getAllData = () => {
    console.log(' calling get data')
    return fetch(host + '/userdata')
        .then(res => res.json());
};
