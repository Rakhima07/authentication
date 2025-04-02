import axios from 'axios';
import {auth} from './firebase.ts';
const BASE_URL = 'https://authentication-61117-default-rtdb.firebaseio.com/';
export const axiosApi = axios.create({
baseURL: BASE_URL,
});
axiosApi.interceptors.request.use(async (config) => {
if (config.url?.startsWith('/') && auth.currentUser) {
try {
const token = await auth.currentUser.getIdToken();
config.params = {
...config.params,
auth: token
};
} catch (error) {
console.error('Token refresh failed:', error);
throw error;
}
}
return config;
});