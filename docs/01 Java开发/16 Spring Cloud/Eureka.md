# Eureka

功能：服务注册与发现。

## 服务器项目

依赖：`org.springframework.cloud:spring-cloud-starter-netflix-eureka-server`

配置：

``` properties
server.port=8000
# Eureka服务主机名
eureka.instance.hostname=localhost
# 是否获取注册表（多中心时）
eureka.client.fetch-registry=false
# 是否注册自身为一个服务（业务服务）
eureka.client.register-with-eureka=false
# 提供服务注册的地址
eureka.client.service-url.defaultZone=http://${eureka.instance.hostname}:${server.port}/eureka/
```

应用程序类：

``` java
@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {
    ……
}
```

## 客户端项目

依赖：`org.springframework.cloud:spring-cloud-starter-netflix-eureka-client`

配置：

``` properties
# Eureka服务器提供服务的地址
eureka.client.service-url.defaultZone=http://localhost:8000/eureka/
```

