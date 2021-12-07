# Service类

``` java
public class EntityService {
    private EntityMapper entityMapper;
    
    // ===================================================================
    // 具体业务方法
    // ===================================================================
    
    // 调用下面的数据库操作方法
    
    // 创建新实体
    public Entity createEntity(String field1, Integer field2) {
        Entity entity = new Entity();
        entity.setField1(field1);
        entity.setField2(field2);
        return insertEntity(entity);
    }
    
    // 更新实体
    public Entity updateEntity(Entity entity, String field1, Integer field2) {
        entity.setField1(field1);
        entity.setField2(field2);
        return updateEntity(entity);
    }
    
    // 更新部分字段
    public Entity updateField(Entity entity, String field) {
        entity.setField(field);
        return updateEntity(entity);
    }
    
    // ===================================================================
    // 数据库操作方法
    // ===================================================================
    
    // 根据ID获取实体
    public Entity getEntityById(Integer id) {
        return entityMapper.selectById(id);
    }
    
    // 插入实体到数据库
    public Entity insertEntity(Entity entity) {
        // 设置创建时间和更新时间
        entity.setCreateTimeNow();
        entity.setUpdateTimeNow();
        
        int rows = entityMapper.insert(entity);
        if (rows != 1) {
            throw new RuntimeException("插入失败");
        }
        
        return entity;
    }
    
    // 更新数据库中的实体
    public Entity updateEntity(Entity entity) {
        // 设置更新时间
        entity.setUpdateTimeNow();
        
        int rows = entityMapper.updateById(entity);
        if (rows != 1) {
            throw new RuntimeException("更新失败");
        }
        
        return entity;
    }
    
    // 删除数据库中的实体
    public void deleteEntity(Entity entity) {
        int rows = entityMapper.deleteById(entity);
        if (rows != 1) {
            throw new RuntimeException("删除失败");
        }
    }
}
```

