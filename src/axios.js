import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-3e4e9.cloudfunctions.net/api'
    //'http://localhost:5001/clone-3e4e9/us-central1/api'
    // THE API (cloud function) UPI
});

export default instance;