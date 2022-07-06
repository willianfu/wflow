/**
 * 构造表单绑定数据对象
 * @param formItems
 */
export function loadFormConf(formItems){
  console.log(formItems)
  let formConf = {
    data:{},
    rules:{}
  }
  formItems.forEach(item => {
    formConf.data[item.id] = null
    if(item.props.required){
      formConf.rules[item.id] = [{ required: true, message: `请设置${item.title}`, trigger: 'blur' }]
    }
  })
  return formConf;
}

/**
 * 构造表单数据字段校验规则
 * @param formItems
 */
export function getFormRule(item){

}

export default {
  loadFormConf
}
