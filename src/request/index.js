import axios from "axios";
import { ElMessage } from "element-plus";

// 创建一个独立的axios实例
const request = axios.create({
    // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
    baseURL: "https://erp.deepberry.cn",
    // 配置请求超时时间
    timeout: 10000,
});
//  // 请求拦截
//  request.interceptors.request.use(config => {
//      // 自定义header，可添加项目token
//      config.headers.token = 'token';
//      return config;
//  });
// 返回拦截
request.interceptors.response.use(
    (response) => {
        // 获取接口返回结果
        const res = response.data;
        return res;
    },
    () => {
        ElMessage.error("网络请求异常，请稍后重试!");
    }
);
export default request;
