package com.wflow.controller;

import com.wflow.bean.entity.OaForms;
import com.wflow.service.FormGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author : willian fu
 * @date : 2020/9/17
 */
@RestController
@RequestMapping("admin/form")
public class FormGroupController {

    @Autowired
    private FormGroupService formGroupService;


    /**
     * 查询所有表单分组
     * @return
     */
    @GetMapping("group")
    public Object getFormGroups(){
        return formGroupService.getFormGroups(null, null);
    }

    /**
     * 查询所有表单分组
     * @return
     */
    @GetMapping("group/list")
    public Object getFormGroupList(){
        return formGroupService.getFormGroupList();
    }

    /**
     * 表单分组排序
     * @param groups 分组数据
     * @return 排序结果
     */
    @PutMapping("group/sort")
    public Object formGroupsSort(@RequestBody List<Integer> groups){
        return formGroupService.formGroupsSort(groups);
    }

    /**
     * 表单排序
     * @param groupId 分组数据
     * @param fromIds 表单ID
     * @return 排序结果
     */
    @PutMapping("sort/{groupId}")
    public Object formsSort(@PathVariable Integer groupId,
                            @RequestBody List<String> fromIds){
        return formGroupService.formsSort(groupId, fromIds);
    }

    /**
     * 修改分组
     * @param id 分组ID
     * @param name 分组名
     * @return 修改结果
     */
    @PutMapping("group")
    public Object updateFormGroupName(@RequestParam Integer id,
                                       @RequestParam String name){
        return formGroupService.updateFormGroupName(id, name);
    }

    /**
     * 新增表单分组
     * @param name 分组名
     * @return 添加结果
     */
    @PostMapping("group")
    public Object createFormGroup(@RequestParam String name){
        return formGroupService.createFormGroup(name);
    }

    /**
     * 删除分组
     * @param groupId 分组ID
     * @return 删除结果
     */
    @DeleteMapping("group/{groupId}")
    public Object deleteFormGroup(@PathVariable Integer groupId){
        return formGroupService.deleteFormGroup(groupId);
    }

    @PostMapping
    public Object createForm(@RequestBody OaForms form){
        return formGroupService.createForm(form);
    }

    /**
     * 查询表单模板数据
     * @param formId 模板id
     * @return 模板详情数据
     */
    @GetMapping("detail/{formId}")
    public Object getFormById(@PathVariable String formId){
        return formGroupService.getFormById(formId);
    }

    /**
     * 编辑表单
     * @param formId 摸板ID
     * @param type 类型 stop using delete
     * @return 操作结果
     */
    @PutMapping("{formId}")
    public Object updateForm(@PathVariable String formId,
                             @RequestParam String type,
                             @RequestParam(required = false) Integer groupId){
        return formGroupService.updateForm(formId, type, groupId);
    }

    /**
     * 编辑表单详情
     * @param template 表单模板信息
     * @return 修改结果
     */
    @PutMapping("detail")
    public Object updateFormDetail(@RequestBody OaForms template){
        return formGroupService.updateFormDetail(template);
    }
}
