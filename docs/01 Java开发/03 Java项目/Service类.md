# Service类

基本模式：

- 业务方法
    - `Entity createEntity(参数)`：创建实体
    - `Entity updateEntity(Entity entity, 参数)`：更新实体
    - `void deleteEntity(Entity entity)`：删除实体
    - `IPage<Entity> listEntityInPage(Integer pageNo, Integer pageSize)`：分页列表
    - `Entity createEntityByParams(CreateParams params)`：根据参数（已基本校验）创建新实体
    - `Entity updateEntityByParams(Entity entity, UpdateParams params)`：用参数（已基本校验）更新指定实体
    - `void deleteEntityWithRelation(Entity entity)`：删除实体，并解决相关的关联关系
- 辅助方法
    - `boolean isEntityExists(Integer id)`：判断指定ID的实体是否存在
    - `boolean isXxxExists(type xxx, Integer exceptId)`：判断指定唯一字段值是否存在，可排除指定ID
    - `Entity getEntityById(Integer id)`：获取指定ID的实体
    - `Entity getEntityByXxx(type xxx)`：获取指定唯一字段值的实体
    - `List<Entity> listEntity()`：获取全部实体
    - `Entity insertEntityToDb(Entity entity)`：插入实体到数据库
    - `Entity updateEntityInDb(Entity entity)`：更新数据库中的实体
    - `void deleteEntityFromDb(Enttiy entity)`：删除数据库中的实体



暴露接口最小化：业务方法全`public`（全部被控制器层调用）；辅助方法能`private`就`private`（部分要被其他Service调用的`public`）

语义化，独立编写

数据库转调方法还是要，但是尽量private

实体由ID唯一标识，可重载实体类和实体ID



``` java
@Service
public class EntityService {
    @Resource
    private EntityMapper entityMapper;
    
    // ===================================================================
    // 具体业务方法
    // ===================================================================
    // 调用下面的数据库操作方法实现业务逻辑
    
    // 创建新实体（直接参数）
    public Entity createEntityByParams(String field1, Integer field2) {
        // 进一步检查参数
        
        // 创建实体
        Entity entity = new Entity();
        // 复制参数到实体
        entity.setField1(field1);
        entity.setField2(field2);
        // 保存
        return insertEntity(entity);
    }
    
    // 创建新实体（参数类）
    public Entity createEntityByParams(CreateParams params) {
        // 进一步检查参数
        
        // 创建实体
        Entity entity = new Entity();
        // 复制参数到实体
        BeanUtils.copyProperties(params);
        // 保存
        return entity;
    }
    
    // 更新实体（直接参数）
    public Entity updateEntityByParams(Entity entity, String field1, Integer field2) {
        // 进一步检查参数
        
        // 覆盖参数到实体
        entity.setField1(field1);
        entity.setField2(field2);
        // 保存
        return updateEntity(entity);
    }
    
    // 更新实体（参数类）
    public Entity updateEntityByParams(Entity entity, UpdateParams params) {
        // 进一步检查参数
        
        // 覆盖参数到实体
        BeanUtils.copyProperties(params, entity);
        // 保存
        return updateEntity(entity);
    }
    
    // 删除实体，并处理关联
    public void deleteEntityWithRelation(Entity entity) {
        // 删除前解决关联关系
        deleteEntity(entity);
        // 删除后解决关联关系
    }
    
    // ===================================================================
    // 数据库操作方法
    // ===================================================================
    // 纯粹与数据库相关的方法
    
    // 判断指定ID的实体是否存在
    public boolean isEntityExists(Integer id) {
        return getEntityById(id) != null;
    }
    
    // 判断指定唯一字段值是否存在
    public boolean isNameExists(String name, Integer exceptId) {
        Entity entity = getEntityByName(name);
        return entity != null && !Objects.equals(entity.getId(), exceptId);
    }
    
    // 根据ID获取实体
    public Entity getEntityById(Integer id) {
        return entityMapper.selectById(id);
    }
    
    // 根据唯一字段值获取实体
    public Entity getEntityByName(String name) {
        return entityMapper.selectByName(name);
    }
    
    // 获取全部实体
    public List<Entity> listAllEntity() {
        return entityMapper.selectAll();
    }
    
    // 插入实体到数据库
    public Entity insertEntity(Entity entity) {
        // 设置创建时间和更新时间
        entity.setCreateTimeNow();
        entity.setUpdateTimeNow();
        
        int rows = entityMapper.insert(entity);
        if (rows != 1) {
            throw new RuntimeException("插入失败"); // 统一异常
        }
        
        return entity;
    }
    
    // 更新数据库中的实体
    public Entity updateEntity(Entity entity) {
        // 设置更新时间
        entity.setUpdateTimeNow();
        
        int rows = entityMapper.updateById(entity);
        if (rows != 1) {
            throw new RuntimeException("更新失败"); // 统一异常
        }
        
        return entity;
    }
    
    // 删除数据库中的实体
    public void deleteEntity(Entity entity) {
        int rows = entityMapper.deleteById(entity);
        if (rows != 1) {
            throw new RuntimeException("删除失败"); // 统一异常
        }
    }
}
```

