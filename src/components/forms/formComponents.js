import ElementUI from "element-ui";

//router.set("device-config", () => import("@/views/iot/device-config.vue"))

//设备界面元组件
const atom = new Map()
atom.set("switch", ElementUI.Switch) //开关
atom.set("button", ElementUI.Button) //按钮
atom.set("radio", ElementUI.Radio) //按钮
atom.set("checkbox", ElementUI.Checkbox) //滑动条
atom.set("slider", ElementUI.Slider) //滑动条
atom.set("upload", ElementUI.Upload) //滑动条
atom.set("colorPicker", ElementUI.ColorPicker) //颜色选择器
atom.set("progress", ElementUI.Progress) //进度条
atom.set("datePicker", ElementUI.DatePicker) //时间选择器
atom.set("timePicker", ElementUI.TimePicker) //时间选择器
atom.set("select", ElementUI.Select) //下拉选择器
atom.set("inputNumber", ElementUI.InputNumber) //计数器

export default atom;