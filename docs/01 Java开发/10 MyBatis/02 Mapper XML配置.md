# Mapper XML配置

常用的增删改查：

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="mapper_package.EntityMapper">
    <!--根据ID选择-->
    <select id="selectById" parameterType="int" resultType="entity_package.Entity">
        select * from entity_table where entity_id = #{value}
    </select>

    <!--根据参数选择-->
    <select id="selectByParams" parameterType="map" resultType="entity_package.Entity">
        select * from entity_table
        <where>
            <if test="fieldName1 != null">
                and field_name1 = #{fieldName1}
            </if>
            <if test="fieldName2 != null">
                and field_name2 = #{fieldName2}
            </if>
        </where>
    </select>

    <!--选择全部-->
    <select id="selectAll" resultType="entity_package.Entity">
        select * from entity_table
    </select>

    <!--插入-->
    <insert id="insert" parameterType="entity_package.Entity" useGeneratedKeys="true" keyProperty="entityId" keyColumn="entity_id">
        insert into entity_table(field_name1, field_name2)
        values (#{fieldName1}, #{fieldName2})
    </insert>

    <!--更新-->
    <update id="update" parameterType="entity_package.Entity">
        update entity_table
        set field_name1 = #{fieldName1}, field_name2 = #{fieldName2}
        where entity_id = #{entityId}
    </update>

    <!--删除-->
    <delete id="delete" parameterType="entity_package.Entity">
        delete from entity_table
        where entity_id = #{entityId}
    </delete>
</mapper>
```
