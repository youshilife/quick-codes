# Mapper类

``` java
public class EntityMapper {
    // 命名空间
    private static final String NAMESPACE = EntityMapper.class.getName();

    // 根据ID选择
    public Entity selectById(Integer entityId) {
        return (Entity) MyBatisUtils.executeQuery(
            session -> session.selectOne(NAMESPACE + ".selectById", entityId)
        );
    }

    // 根据参数选择
    public List<Entity> selectByParams(Map<String, Object> params) {
        return (List<Entity>) MyBatisUtils.executeQuery(
            session -> session.selectList(NAMESPACE + ".selectByParams", params)
        );
    }

    // 选择全部
    public List<Entity> selectAll() {
        return (List<Entity>) MyBatisUtils.executeQuery(
            session -> session.selectList(NAMESPACE + ".selectAll")
        );
    }

    // 插入
    public int insert(Entity entity) {
        return (int) MyBatisUtils.executeUpdate(
            session -> session.insert(NAMESPACE + ".insert", entity)
        );
    }

    // 更新
    public int update(Entity entity) {
        return (int) MyBatisUtils.executeUpdate(
            session -> session.update(NAMESPACE + ".update", entity)
        );
    }

    // 删除
    public int delete(Entity entity) {
        return (int) MyBatisUtils.executeUpdate(
            session -> session.delete(NAMESPACE + ".delete", entity)
        );
    }
}
```
