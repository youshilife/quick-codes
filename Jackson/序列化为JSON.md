# 序列化为JSON

``` java
ObjectMapper objectMapper = new ObjectMapper();
objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL); // 值为null的字段被忽略
String json = objectMapper.writeValueAsString(对象);
```
