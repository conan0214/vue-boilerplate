import OSS from "ali-oss";
import { getStsTokenApi } from "../request/api";
// 获取URL中的参数
const getQueryString = function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substring(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
};

/**
 * 文件上传到ali-oss
 * @param {File | Blob} file 文件对象
 * @returns
 */
const uploadToOss = function (file) {
    const originalName = file.name;
    const nameArr = originalName.split(".");
    const fileName = `${nameArr[0]}_${Date.now()}.${nameArr[1]}`;
    return getStsTokenApi({}).then((res) => {
        const token = res.data;
        if (token) {
            const client = new OSS({
                accessKeyId: token.AccessKeyId,
                accessKeySecret: token.AccessKeySecret,
                stsToken: token.SecurityToken,
                region: token.region,
                bucket: token.bucket,
                refreshSTSToken: async () => {
                    const res = await getStsTokenApi({});
                    const token = res.data;
                    return {
                        accessKeyId: token.AccessKeyId,
                        accessKeySecret: token.AccessKeySecret,
                        stsToken: token.SecurityToken,
                    };
                },
                refreshSTSTokenInterval: 3600000,
            });
            //自行添加headers
            return client.put(`upload/${fileName}`, file);
        }
    });
};

export { getQueryString, uploadToOss };
