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
public class OaUserLabels implements Serializable {
    private static final long serialVersionUID = -92769780427810877L;

    @TableId(type = IdType.AUTO)

    private Integer id;
    /**
    * 用户ID
    */
    private Integer userId;
    /**
    * 标签ID
    */
    private Integer labelId;

    private Date created;


}
