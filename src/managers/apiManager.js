// import fetch from 'cross-fetch'


export const getAllData = () => {
    console.log(' calling get data')
    return fetch('http://localhost:3100/userdata')
        .then(res => res.json());
};
