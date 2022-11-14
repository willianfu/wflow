package com.wflow.config.exception;

import lombok.Getter;

/**
 * @author : willian fu
 * @date : 2022/6/27
 */
@Getter
public class BusinessException extends RuntimeException {
    private final int code;

    private final String description;

    public BusinessException(String message, int code, String description) {
        super(message);
        this.code = code;
        this.description=description;
    }
    public BusinessException(ResultCode resultCode, String description) {
        super(resultCode.getMsg());
        this.code = resultCode.getCode();
        this.description = description;
    }
}


