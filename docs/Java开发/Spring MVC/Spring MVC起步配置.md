# Spring MVC起步配置

## 配置请求转发

把Servlet请求交给Spring MVC处理：

`web.xml`：

``` xml
<web-app>
    <!--Spring MVC自带的Servlet，分发请求到Spring MVC的控制器中处理-->
    <servlet>
        <servlet-name>spring-mvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--Spring配置文件路径-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:applicationContext*.xml</param-value>
        </init-param>
        <!--启动时即加载-->
        <load-on-startup>0</load-on-startup>
    </servlet>

    <!--所有非JSP请求都走Spring MVC过-->
    <servlet-mapping>
        <servlet-name>spring-mvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

## Spring框架配置

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--开启Spring框架基础组件扫描，可注解开发-->
    <context:component-scan base-package="包名"/>
    <!--开启Spring MVC框架注解开发-->
    <mvc:annotation-driven/>
    <!--静态资源直接走静态响应-->
    <mvc:default-servlet-handler/>

</beans>

```
