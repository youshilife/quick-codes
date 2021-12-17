# Spring JDBC

## 配置

开启声明式事务支持。

`applicationContext.xml`：

``` xml
<beans>
    <!--事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!--管理的数据源-->
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--开启注解声明式事务-->
    <tx:annotation-driven transaction-manager="transactionManager"/>
</beans>
```

## 使用

- `@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)`：不使用事务，只读
- `@Transactional`：使用事务，RuntimeExcetion时自动回滚，其他异常不回滚
- `@Transactional(rollbackFor = Exception.class)`：使用事务，所有异常自动回滚

策略：控制器整个不使用事务，部分方法单独使用事务。
