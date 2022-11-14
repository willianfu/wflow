package com.wflow.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wflow.bean.entity.OaDepartments;
import com.wflow.bean.vo.OrgTreeVo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author : willian fu
 * @date : 2022/6/27
 */
public interface OaDepartmentsMapper extends BaseMapper<OaDepartments> {

    @Select("SELECT id, dept_name `name`, 'dept' AS 'type' FROM oa_departments WHERE parent_id=#{deptId}")
    List<OrgTreeVo> selectByDept(@Param("deptId") Integer deptId);
}
