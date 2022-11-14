package com.wflow.bean.entity;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OaUserDepartments implements Serializable {
    private static final long serialVersionUID = -45475579271153023L;

    @TableId(type = IdType.AUTO)

    private Integer id;
    /**
    * 用户ID
    */
    private String userId;
    /**
    * 部门ID
    */
    private Integer deptId;

    private Date created;


}
