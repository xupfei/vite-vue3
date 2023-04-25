import axios from "axios";
// import { ElMessage } from 'element-plus';
import domain from "@/utils/envConfig.js";
let nodeEnv = import.meta.env.VITE_CUSTOM_ENV;

let service = axios.create({
    baseURL: domain[nodeEnv].api,
    timeout: 10000,
    headers: {
        OS: 3,
        "OS-VERSION": 3,
        "DEVICE-ID": "h5",
        "DEVICE-TYPE": "h5",
        "PUSH-ID": "10086",
        "APP-ID": "5be409168141a04078092200",
        "Content-Type": "application/json",
    }
});

//请求拦截器
service.interceptors.request.use(config => {
    config.headers['BIT-CID'] = "5af2db0fe4b081236a841849";
    config.headers['BIT-UID'] = "5ece23bad5dea3762f7e50c7";
    config.headers['COMPANY-ID'] = "5ece2103d5dea847ca7b19ff";
    if (localStorage.getItem("token")) {
        config.headers['BIT-TOKEN'] = localStorage.getItem("token");
    }
    return config
}, error => {
    ElMessage({ message: '链接错误,请联系管理员', type: 'error' })
    return Promise.reject(error)
})


service.interceptors.response.use(res => {
    if (res.data) {
        if (res.data.errorCode !== 0) {
            if (res.data.errorMsg) {
                console.log(555555);
                ElMessage({ message: res.data.errorMsg, type: 'error' })
            }

        }
    }
    return res.data || res;
}, error => {
    ElMessage({ message: '链接错误,请联系管理员', type: 'error' })
    return Promise.reject(error)
})

export default service