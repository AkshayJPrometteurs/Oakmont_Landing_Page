import axios from 'axios';

const Axios = axios.create({ baseURL : process.env.NEXT_PUBLIC_BASE_URL, withCredentials : true });

Axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

Axios.interceptors.response.use(response=>{ return response; }, error=>{ throw error; })

export default Axios