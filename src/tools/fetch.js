import fetch from 'node-fetch';
// 后端服务地址
const localServer = 'http://127.0.0.1:3000';
// 没有参数的get请求
const api = (url) => {
    return fetch(localServer + url).then((response) => { response.json() })
}
// 有参数的get请求
// 请求地址localServer + url
const getApi = (url, data) => {
    const querString = Object.entries(data).map(i => `${i[0]}=${i[1]}`);
    return fetch(`${localServer + url}${querString}`).then(response => {
        response.json();
    });
};
// post请求
const postApi = (url, data) => fetch(localServer + url, {
    method: 'post',
    body: JSON.stringify(data),
    // 传的是json
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
}).then(response => {
    response.json();
});
// 导出 api
export { api, getApi, postApi };

