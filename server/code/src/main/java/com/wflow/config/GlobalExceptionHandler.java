package com.wflow.config;

import com.wflow.bean.vo.ErrorRspVo;
import com.wflow.config.exception.BusinessException;
import com.wflow.utils.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author : willian fu
 * @date : 2022/6/27
 */
@Slf4j
@Component
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public Object businessExceptionHandler(BusinessException e){
        log.error("BusinessException：",e);
        return R.badRequest(new ErrorRspVo(e.getCode(), e.getMessage(),e.getDescription()));
    }

    @ExceptionHandler(RuntimeException.class)
    public Object runtimeExceptionHandler(RuntimeException e){
        log.error("RuntimeException：",e);
        return R.serverError(e.getMessage());
    }
}
