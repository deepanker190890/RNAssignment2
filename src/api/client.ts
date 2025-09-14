import axios from 'axios';
import Interceptors from './intercepters';

const createClient = (baseURL:string) => {
const client = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

Interceptors.attach(client);
return client;
}

export default createClient;
