package com.wflow.controller;

import com.wflow.service.OrgUserAndDeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : willian fu
 * @date : 2022/6/27
 */
@RestController
@RequestMapping("oa/org")
public class OaUserController {

    @Autowired
    private OrgUserAndDeptService orgService;

    /**
     * 查询组织架构树
     * @param deptId 部门id
     * @param isDept 只查询部门架构
     * @param showLeave 是否显示离职员工
     * @return 组织架构树数据
     */
    @GetMapping("tree")
    public Object getOrgTreeData(@RequestParam(defaultValue = "0") Integer deptId,
                                 @RequestParam(defaultValue = "false") Boolean isDept,
                                 @RequestParam(defaultValue = "false") Boolean showLeave){
        return orgService.getOrgTreeData(deptId, isDept, showLeave);
    }

    /**
     * 模糊搜索用户
     * @param userName 用户名/拼音/首字母
     * @return 匹配到的用户
     */
    @GetMapping("tree/user/search")
    public Object getOrgTreeUser(@RequestParam String userName){
        return orgService.getOrgTreeUser(userName.trim());
    }


}
