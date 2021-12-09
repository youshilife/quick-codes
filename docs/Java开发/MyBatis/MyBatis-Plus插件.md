# MyBatis-Plus插件

## 配置

1. 引入依赖，`mybatis`和`mybatis-spring`可以不用
2. 更换MyBatis原生`SqlSessionFactory`为MyBatis-Plus提供的
3. 配置引入分页插件

``` xml
<!--MyBatis-Plus提供的SqlSessionFactory-->
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
    <!--使用上面的数据源-->
    <property name="dataSource" ref="dataSource"/>
    <!--Mapper XML配置文件路径-->
    <property name="mapperLocations" value="classpath:mappers/*.xml"/>
    <!--MyBatis主配置文件路径-->
    <property name="configLocation" value="classpath:mybatis-config.xml"/>
    <!--MyBatis-Plus插件配置-->
    <property name="plugins">
        <array>
            <!--插件容器-->
            <bean class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
                <property name="interceptors">
                    <list>
                        <!--分页插件-->
                        <bean class="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor"/>
                    </list>
                </property>
            </bean>
        </array>
    </property>
</bean>
```

## 开发结构

1. 创建实体类，用`@TableName`、`@TableId`、`@TableField`注解
2. 创建实体的Mapper接口，继承`BaseMapper<实体类>`，只写特殊的方法
3. 创建Mapper XML配置文件，namespace到Mapper接口，只写特殊的SQL

``` java
@TableName("表名")
public class Entity {
    @TableId(type = IdType.AUTO)
    private Integer id;
    @TableField("字段名") // 不用写，自动驼峰命名转换
    private type field;

    // getter、setter
}
```

``` java
public interface EntityMapper extends BaseMapper<Entity> {
    // 自定义支持分页的查询
	IPage<Entity> selectXxx(IPage<Entity> page);
}
```

``` xml
<mapper namespace="mapper_package.EntityMapper">
    <select id="selectXxx">
        ……
    </select>
</mapper>
```

## 执行

常用增删改查方法。

``` java
mapper.selectById(id);
mapper.insert(entity);
mapper.updateById(entity);
mapper.deleteById(entity);
```

条件查询：

``` java
QueryWrapper<Entity> queryWrapper = new QueryWrapper<>();
// 各种构建查询条件的方法，AND关系
queryWrapper.eq("表字段名", 值);
// 执行查询
List<Entity> list = entityMapper.selectList(queryWrapper);
```

分页：

``` java
IPage<Entity> page = new Page<>(第几页, 每页数量);
page = entityMapper.selectList(page, queryWrapper);
// 当前页记录
page.getRecords();
// 当前页的各种信息
page.getTotal();
```

