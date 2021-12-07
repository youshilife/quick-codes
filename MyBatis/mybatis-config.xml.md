# 主配置文件mybatis-config.xml

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
    PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <!--开启驼峰命名转换-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>

    <environments default="dev">
        <!--开发环境-->
        <environment id="dev">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/数据库名?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=Asia/Shanghai&amp;allowPublicRetrieval=true"/>
                <property name="username" value="用户名"/>
                <property name="password" value="密码"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <mapper resource="mappers/xxx.xml"/>
    </mappers>
</configuration>
```
