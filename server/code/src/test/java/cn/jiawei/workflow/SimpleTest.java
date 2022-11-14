package cn.jiawei.workflow;

import cn.hutool.core.lang.Validator;
import cn.hutool.core.util.PinyinUtil;

/**
 * @author : willian fu
 * @version : 1.0
 */
public class SimpleTest {
    public static void main(String[] args) {
        System.out.println(Validator.isChinese("ni你的"));
        System.out.println(PinyinUtil.getAllFirstLetter("付Pei佳威你好啊"));
        System.out.println(PinyinUtil.getPinYin("付佳威pei你好啊"));
    }
}
