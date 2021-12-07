# Mapper接口

## 定义

``` java
public interface EntityMapper {
    // 根据ID选择
    Entity selectById(Integer entityId);
    // 根据参数选择
    List<Entity> selectByParams(Map<String, Object> params);
    // 选择全部
    List<Entity> selectAll();
    // 插入
    int insert(Entity entity);
    // 更新
    int update(Entity entity);
    // 删除
    int delete(Entity entity);
}
```

## 使用

``` java
// 根据ID选择
Entity entity = sqlSession.getMapper(EntityMapper.class).selectById(id);

// 根据参数选择
Map<String, Object> params = new LinkedHashMap<>();
params.put("fieldName1", value1);
params.put("fieldName2", value2);
Entity entity = sqlSession.getMapper(EntityMapper.class).selectByParams(params);

// 选择全部
List<Entity> entityList = sqlSession.getMapper(EntityMapper.class).selectAll();

// 插入
int rows = sqlSession.getMapper(EntityMapper.class).insert(entity);

// 更新
int rows = sqlSession.getMapper(EntityMapper.class).update(entity);
// 删除
int rows = sqlSession.getMapper(EntityMapper.class).delete(entity);
```
