# 整合MyBatis

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
