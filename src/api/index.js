/* eslint-disable eol-last */
/* eslint-disable indent */
// 配置一个符合项目需要的axios  导出去进行全局的配置
import axios from 'axios';
import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

// 修改配置  加token
// 请求拦截器（在每一次请求前）
// axios.interceptors.request.use((config) => {
//     // 修改配置  加token
//     let token = store.getUser().token;
//     // let bossid = store.getUser().BSid;
//     if (token) {
//         config.headers.token = token; // 将token放到请求头发送给服务器
//         // config.headers.bossId = bossid; // 将token放到请求头发送给服务器
//         return config;
//     }
// }, (err) => Promise.reject(err));


// 响应拦截器(每一次响应后)


export default axios;