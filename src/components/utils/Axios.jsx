import axios from 'axios';
import Cookies from 'js-cookie';

const Axios = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    withCredentials : true
});

Axios.interceptors.request.use((config)=>{
    const token = Cookies.get('_om_at');
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
});

Axios.interceptors.response.use(response=>{ return response; },error=>{ throw error; })

export default Axios