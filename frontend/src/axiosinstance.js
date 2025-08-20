import axios from 'axios'

const axiosinstance=axios.create({
    baseURL:"http://localhost:3000"
})
axiosinstance.interceptors.request.use((config)=>{
    const accessToken=localStorage.getItem("token")
    if(accessToken){
        if(config){
            config.headers.token=accessToken;
        }
    }
    return config;

},(error)=>{
    return  Promise.reject(error)
})

export default axiosinstance