package com.wflow.bean.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author : willian fu
 * @date   : 2022/7/4
 */
@Data
@AllArgsConstructor
public class ErrorRspVo {

    private Integer code;

    private String msg;

    private String desp;
}
