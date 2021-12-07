# 统一REST响应格式

## 格式

REST接口统一JSON响应数据格式：

``` json
{
    // 状态码
    "code": 0,
    // 状态消息
    "message": "OK",
    // 附加数据
    "data": {
		// 数据项
        "name": value
    }
}
```

## 格式封装

封装统一的JSON响应格式：

``` java
/**
 * REST响应统一格式类
 */
public class RestResponseFormat {
    /**
     * 正常的状态码
     */
    public static final int CODE_OK = 0;
    /**
     * 正常的消息
     */
    public static final String MESSAGE_OK = "OK";

    /**
     * 状态码
     */
    private int code;
    /**
     * 消息
     */
    private String message;
    /**
     * 附加数据
     */
    private Map<String, Object> data = new LinkedHashMap<>();

    /**
     * 获取成功响应格式
     *
     * @return 响应格式
     */
    public static RestResponseFormat success() {
        return new RestResponseFormat();
    }

    /**
     * 获取错误响应格式
     *
     * @param code 错误状态码
     * @param message 错误消息
     * @return 响应格式
     */
    public static RestResponseFormat error(int code, String message) {
        return new RestResponseFormat(code, message);
    }

    /**
     * 获取错误响应格式
     *
     * @param e 错误状态码与消息枚举值
     * @return 响应格式
     */
    public static RestResponseFormat error(ErrorCodeMessageEnum e) {
        return error(e.getCode(), e.getMessage());
    }

    public RestResponseFormat() {
        this.code = CODE_OK;
        this.message = MESSAGE_OK;
    }

    public RestResponseFormat(int code, String message) {
        this.code = code;
        this.message = message;
    }

    /**
     * 设置附加数据项
     *
     * @param key 键名
     * @param value 值
     * @return 当前实例，以便链式调用
     */
    public RestResponseFormat putData(String key, Object value) {
        this.data.put(key, value);
        return this;
    }

	// getter、setter
    // toString()
}

```

Spring MVC中，直接返回。

单独使用时，定义`toJson()`方法，输出字符串。

## 状态码与消息封装

封装错误状态码与消息组合。

``` java
/**
 * 错误状态码和消息枚举
 */
public enum ErrorCodeMessageEnum {
    USERNAME_EMPTY(     10000, "用户名不能空"),
    USERNAME_NOT_EXISTS(10001, "用户名不存在");

    private int httpStatusCode;
    private int code;
    private String message;

    ErrorCodeMessageEnum(int httpStatusCode, int code, String message) {
        this.httpStatusCode = httpStatusCode;
        this.code = code;
        this.message = message;
    }

	// getter、setter
    // toString
}
```

