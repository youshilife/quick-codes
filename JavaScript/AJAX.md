# AJAX

标准流程：

``` js
let xhr = new XMLHttpRequest();
xhr.addEEventListener("readystatechange", () => {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status <= 299) {
            // 处理成功响应
        } else {
            // 处理失败响应
        }
    }
});
xhr.open(请求方式, URL);
xhr.send();
```
