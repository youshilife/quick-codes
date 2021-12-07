# MyBatisUtils工具类

``` java
/**
 * MyBatis工具类
 */
public class MyBatisUtils {
    /**
     * SqlSession工厂
     *
     * <p>全局唯一。</p>
     */
    private static final SqlSessionFactory FACTORY;

    // 初始化工厂
    static {
        try {
            Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
            FACTORY = new SqlSessionFactoryBuilder().build(reader);
        } catch (Exception e) {
            throw new ExceptionInInitializerError(e);
        }
    }

    /**
     * 执行数据库查询（读取）操作
     *
     * <p>每个数据库操作都会自动提交。</p>
     *
     * @param function 函数，执行数据库操作
     * @return 函数的返回值，通常是查询结果
     */
    public static Object executeQuery(Function<SqlSession, Object> function) {
        SqlSession session = openSession();
        try {
            return function.apply(session);
        } finally {
            closeSession(session);
        }
    }

    /**
     * 执行数据库更新（写入）操作
     *
     * <p>所有的数据库操作都在同一个事务中，执行成功则提交，有异常则回滚。</p>
     *
     * @param function 函数，执行数据库操作
     * @return 函数的返回值，通常是影响行数
     */
    public static Object executeUpdate(Function<SqlSession, Object> function) {
        SqlSession session = openSession(false);
        try {
            Object returned = function.apply(session);
            session.commit();
            return returned;
        } catch (Exception e) {
            session.rollback();
            throw e;
        } finally {
            closeSession(session);
        }
    }

    /**
     * 打开一个SqlSession会话
     *
     * @param autoCommit 是否自动提交事务
     * @return SqlSession会话
     */
    public static SqlSession openSession(boolean autoCommit) {
        return FACTORY.openSession(autoCommit);
    }

    /**
     * 打开一个SqlSession会话（自动提交事务）
     *
     * @return SqlSession会话
     */
    public static SqlSession openSession() {
        return FACTORY.openSession();
    }

    /**
     * 关闭一个SqlSession会话
     *
     * @param session SqlSession会话
     */
    public static void closeSession(SqlSession session) {
        if (session != null) {
            session.close();
        }
    }
}
```

使用：

``` java
Entity entity = (Entity) MyBatisUtils.executeQuery(
    sqlSession -> sqlSession.select("xxx.selectById", id)
);

int rows = (int) MyBatisUtils.executeUpdate(
    sqlSession -> sqlSession.insert("xxx.insert", entity)
);
```
