# 常用SQL

## 查询

简单查询：

``` sql
select * from 表名 where 条件;
```

连接查询：

``` sql
select *
from 表A a, 表B b
where a.id = b.a_id and 其他条件;
```

统计查询：

分组查询：

子查询：

## 增改删

插入：

``` sql
insert into 表名(字段1, 字段2)
values (值1, 值2), (值1, 值2);
```

更新：

``` sql
update 表名
set 字段1 = 值1, 字段2 = 值2
where 条件;
```

删除：

``` sql
delete from 表名
where 条件;
```

## 数据库

列出：

``` sql
show databases;
```

使用：

``` sql
use 数据库名;
```

创建：

``` sql
create database [if not exists] 数据库名
charset utf8mb4
collate utf8mb4_unicode_ci;
```

删除：

``` sql
drop database [if exists] 数据库名;
```

## 表

列出：

``` sql
show table;
```

创建：

``` sql
create table 表名(
    id int auto_increment primary key comment 'ID',
    name varchar(50) not null comment '姓名',
    xxx_id int not null comment 'XXX ID',
    create_time timestamp not null default now() comment '创建时间',
    update_time timestamp not null default now() comment '更新时间',
    foreign key (xxx_id) references XXX表名(id)
) comment '某某表';
```

删除：

``` sql
drop table [if exists] 表名;
```

查看结构：

``` sql
desc 表名;
```

## 用户与权限

创建用户：

``` sql
create user 用户名@主机名 identified by '密码';
```

授权数据库：

``` sql
grant all on 数据库名.* to 用户名@主机名;
```

授权特定前缀的数据库：

``` sql
grant all on `数据库名前缀_%`.* to 用户名@主机名;
```

## 其他

执行SQL文件：

``` sql
source SQL文件路径;
```
