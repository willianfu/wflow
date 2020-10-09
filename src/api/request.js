import Vue from "vue";
import axios from "axios";

import { Notification, MessageBox, Message } from "element-ui";

// 第三方插件
import "element-ui/lib/theme-chalk/index.css";

Vue.prototype.$axios = axios;
// 字体图标

const service = axios.create({
	//baseURL: "http://localhost:10000",
	//baseURL: "http://192.168.50.13:10000",
	baseURL: "http://47.100.202.245:10000",
	timeout: 50000
});

service.defaults.withCredentials = true; // 让ajax携带cookie
service.interceptors.request.use(
	// 每次请求都自动携带Cookie
	config => {
		//config.headers.Cookie = document.cookie

		return config;
	},
	// eslint-disable-next-line handle-callback-err
	error => {
		return Promise.reject(error);
	}
);

service.interceptors.response.use(
	rsp => {

		return rsp;
	},
	// 拦截异常的响应
	err => {
		console.log("请求", err);
		switch (err.response.status) {
			case 401:
				MessageBox.alert("登陆已过期，请关闭当前窗口重新进入-能臣工作台");
				break;
			case 403:
				//Message.warning("抱歉，您无权访问！")
				break;
			case 500:
				Notification.error({ title: "提醒", message: "服务器出了点小错误" });
				break;
			case 404:
				Notification({
					title: "提醒",
					message: "未找到，检查参数",
					type: "warning"
				});
				break;
			default:
				//throw 'request error'
				return Promise.reject(err);
		}
		//throw 'request error'
		return Promise.reject(err);
	}
);

export default service;
