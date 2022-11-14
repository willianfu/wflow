package com.wflow.service.impl;

import cn.hutool.core.lang.Validator;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.wflow.bean.entity.OaDepartments;
import com.wflow.bean.vo.OrgTreeVo;
import com.wflow.mapper.OaDepartmentsMapper;
import com.wflow.mapper.OaUsersMapper;
import com.wflow.service.OrgUserAndDeptService;
import com.wflow.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.*;

/**
 * @author : willian fu
 * @version : 1.0
 */
@Service
public class OrgUserAndDeptServiceImpl implements OrgUserAndDeptService {

    @Autowired
    private OaDepartmentsMapper departsMapper;

    @Autowired
    private OaUsersMapper usersMapper;

    /**
     * 查询组织架构树
     *
     * @param deptId    部门id
     * @param isDept    只查询部门架构
     * @param showLeave 是否显示离职员工
     * @return 组织架构树数据
     */
    @Override
    public Object getOrgTreeData(Integer deptId, Boolean isDept, Boolean showLeave) {
        //查询所有部门及员工
        List<OrgTreeVo> orgs = new LinkedList<>();
        orgs.addAll(departsMapper.selectByDept(deptId));
        if (!isDept){
            usersMapper.selectUsersByDept(deptId).forEach(us -> orgs.add(us));
        }
        return R.ok(orgs);
    }

    /**
     * 模糊搜索用户
     *
     * @param userName 用户名/拼音/首字母
     * @return 匹配到的用户
     */
    @Override
    public Object getOrgTreeUser(String userName) {
        return R.ok(usersMapper.selectUsersByPy(userName));
    }
}
