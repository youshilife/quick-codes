# JWT

Token。

依赖：`com.auth0:java-jwt`



生成令牌：

``` java
Date expiresAt = new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 365);
Algorithm algorithm = Algorithm.HMAC256("密钥（随机字符串）");
String token = JWT.create()
    // 设置载荷数据
    .withClaim("id", user.getId())
    .withClaim("username", user.getUsername())
    .withClaim("admin", user.getAdmin())
    // 设置过期时间
    .withExpiresAt(expiresAt)
    // 签名
    .sign(algorithm);
```



校验令牌：

``` java
// 从请求Header中取出token
String token = request.getHeader("Authorization");
if (token == null) {
    throw new RuntimeException("没有Token");
}

Algorithm algorithm = Algorithm.HMAC256(Consts.JWT_SECRET);
JWTVerifier jwtVerifier = JWT.require(algorithm).build();
try {
    // 校验并解码
    DecodedJWT decodedJWT = jwtVerifier.verify(token);
    
    // 获取载荷数据
    String username = decodedJWT.getClaim("username").asString();
    User user = new User();
    // 保存用户到ThreadLocal容器中
    userHolder.setUser(user);
} catch (TokenExpiredException e) {
    throw new RuntimeException("Token已过期");
} catch (JWTVerificationException e) {
    throw new RuntimeException("Token格式错误");
}
```

