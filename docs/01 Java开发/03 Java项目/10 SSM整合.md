# SSM整合

## 搭建开发环境

1. [创建基本Java Web项目](/Java%20Web/通过IDE开发项目)
    1. 创建空白Maven项目
    1. 转为Java Web项目
1. 引入Spring MVC和Jackson依赖，[配置基本的Spring MVC项目结构](/Spring%20MVC/Spring%20MVC起步配置)
    1. DispatcherServlet请求转发
    1. 创建`applicationContext.xml`配置文件，配置：
        1. Spring组件扫描
        1. Spring MVC注解开发
        1. 静态资源直通
1. [解决字符编码问题](/Spring%20MVC/字符编码问题)
    1. 请求体的（Filter）
    1. 响应体的（MessageConverter）
1. [整合MyBatis](/SSM整合/整合MyBatis)
    1. 数据源Bean
    1. SqlSessionFactoryBean
    1. Mapper扫描配置
1. [开启声明式事务](/Spring/Spring%20JDBC)
1. [整合测试](/Spring/Spring%20Test)

## 开发流程

1. 数据库设计，建表，填充测试数据
2. 编写所有实体类
3. 编写Mapper XML文件，Mapper接口，测试调用
4. 编写Service接口、ServiceImpl类，注意声明式事务，测试调用
5. 编写Controller类，测试Web API
6. 编写前端基本结构，样式
7. 前端逐步填入程序逻辑

## 整合MyBatis

原理：让MyBatis的各种对象由Spring来管理。

- 由Spring IoC创建数据源实例
- 由Spring IoC创建SqlSessionFactory实例
- 编写Mapper XML配置文件和Mapper接口，自动扫描并创建Mapper接口实例，放在Spring IoC中

`applicationContext.xml`：

``` xml
<beans>
    <!--数据源，提供给MyBatis-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/数据库名"/>
        <property name="username" value="用户名"/>
        <property name="password" value="密码"/>
        <property name="initialSize" value="10"/>
        <property name="maxActive" value="20"/>
    </bean>
    <!--SqlSessionFactory实例-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--使用上面的数据源-->
        <property name="dataSource" ref="dataSource"/>
        <!--Mapper XML配置文件路径-->
        <property name="mapperLocations" value="classpath:mappers/*.xml"/>
        <!--MyBatis主配置文件路径-->
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
    </bean>
    <!--配置Mapper接口扫描-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!--Mapper接口包-->
        <property name="basePackage" value="mapper包"/>
    </bean>
</beans>
```

`mybatis-config.xml`：

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
    PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
</configuration>
```

Mapper XML：

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="package.mapper.XxxMapper">
    ……
</mapper>
```

Mapper接口：

``` java
public interface XxxMapper {
    Xxx selectById(Integer id);
    int insert(Xxx xxx);
    int update(Xxx xxx);
    int delete(Xxx xxx);
}
```

Service类：

``` java
public class XxxService {
    @Resource
    private XxxMapper xxxMapper;

    ……
}
```

## 组件依赖

| 大块    | 功能                         | 组件                      | 依赖                                          | 说明                                        |
| ------- | ---------------------------- | ------------------------- | --------------------------------------------- | ------------------------------------------- |
| Web应用 | MVC框架                      | Spring MVC                | `org.springframework:spring-webmvc`           | 自动关联依赖**Spring框架**                  |
| Web应用 | JSON序列化                   | Jackson                   | `com.fasterxml.jackson.core:jackson-databind` | 实现Spring MVC控制器返回对象的自动JSON化    |
| Web应用 |                              | Servlet API               | `javax.servlet:javax.servlet-api`             | Spring MVC基于Servlet，其某些功能编译时需要 |
| Web应用 | 文件上传                     | Apache Commons Fileupload | `commons-fileupload:commons-fileupload`       | Spring MVC内建支持                          |
| 数据库  | 声明式事务                   | Spring JDBC               | `org.springframework:spring-jdbc`             |                                             |
| 数据库  | 数据持久层框架               | MyBatis                   | `org.mybatis:mybatis`                         |                                             |
| 数据库  | 整合MyBatis与Spring框架      | MyBatis-Spring            | `org.mybatis:mybatis-spring`                  |                                             |
| 数据库  | 方便MyBatis使用              | MyBatis-Plus              | `com.baomidou:mybatis-plus`                   | 自动关联依赖mybatis和mybatis-spring         |
| 数据库  | 数据库连接池                 | Alibaba Druid             | `com.alibaba:druid`                           |                                             |
| 数据库  | 数据库驱动                   | MySQL Connector Java      | `mysql:mysql-connector-java`                  |                                             |
| 测试    | 单元测试                     | JUnit                     | `junit:junit`                                 |                                             |
| 测试    | 整合单元测试组件与Spring框架 | Spring Test               | `org.springframework:spring-test`             |                                             |
| 日志    | 打印日志                     | Logback                   | `ch.qos.logback:logback-classic`              | 各种组件都预先整合了Logback，详细打印       |
