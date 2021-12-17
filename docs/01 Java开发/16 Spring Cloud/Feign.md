# Feign

依赖：`org.springframework.cloud:spring-cloud-starter-openfeign`

应用程序类：

``` java
@SpringBootApplication
@EnableFeignClients
public class Application {
}
```

客户端：

``` java
@FeignClient("目标服务名称")
public interface XxxFeignClient {
    // 跟目标服务项目的控制器同URL Mapping和返回值
    @GetMapping("/entities")
    List<Entity> list();
}
```

使用：

``` java
@Resource
XxxFeignClient client;

client.list()
```

