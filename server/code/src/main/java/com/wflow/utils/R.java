package com.wflow.utils;

import com.wflow.bean.vo.ErrorRspVo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * @author : willian fu
 * @version : 1.0
 */
public class R {
    public static Object badRequest(Object msg){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
    }

    public static Object notFound(Object msg){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
    }

    public static Object serverError(Object msg){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(msg);
    }

    public static Object unAuthorized(Object msg){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(msg);
    }

    public static Object forbidden(Object msg){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(msg);
    }

    public static Object noContent(Object msg){
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(msg);
    }

    public static Object ok(Object msg){
        return ResponseEntity.ok(msg);
    }

    public static Object created(Object msg){
        return ResponseEntity.status(HttpStatus.CREATED).body(msg);
    }
}
