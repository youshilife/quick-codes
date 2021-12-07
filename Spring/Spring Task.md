# Spring Task

定时任务。

Cron表达式。

``` java
@component
public class XxxTask {
    @Scheduled(cron = "Cron表达式")
    public void doSomething() {
        
    }
}
```

`applicationContext.xml`：

``` xml
<beans>
    <!-- 注解开发 -->
    <task:annotation-driven/>
</beans>
```

