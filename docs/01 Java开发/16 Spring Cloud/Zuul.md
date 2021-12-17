# Zuul

做网关。

依赖：`org.springframework.cloud:spring-cloud-starter-netflix-zuul:版本号`

应用程序类：

``` java
@EnableZuulProxy
```

配置：

``` properties
spring.application.name=gateway
server.port=9000

eureka.client.service-url.defaultZone=http://localhost:8000/eureka/
```

