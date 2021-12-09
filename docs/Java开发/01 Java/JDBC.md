# JDBC

## 基本过程

``` java
Connection connection;
Statement statement;
ResultSet resultSet;
try {
    Class.forName("com.mysql.cj.jdbc.Driver");
    connection = DriverManager.getConnection(url, username, password);
    statement = connection.createStatement();
    resultSet = statement.executeQuery(sql);
    while (resultSet.next()) {
        resultSet.getInt("字段名");
    }
} catch (Exception e) {
    e.printStackTrace();
}
```

## 工具类

封装读取与写入操作的基础逻辑。

``` java
/**
 * 数据库操作工具类
 */
public class DbTool {
    private static final String DB_DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String DB_URL = "jdbc:mysql://localhost:3306/youshilife_blog?serverTimezone=Asia/Shanghai";
    private static final String DB_USERNAME = "youshilife";
    private static final String DB_PASSWORD = "123456";

    /**
     * 执行数据库查询（读取）操作
     *
     * @param sql SQL语句
     * @param params SQL语句的填充参数列表
     * @param parseResultFunction 解析结果集中的数据到Map的函数
     * @return Map列表，一个Map表示一行
     */
    public static List<Map<String, Object>> executeQuery(
        String sql, List<Object> params, BiConsumer<ResultSet, Map<String, Object>> parseResultFunction
    ) {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            // 打开连接
            connection = openConnection();
            // 创建语句
            statement = connection.prepareStatement(sql);
            // 填充参数
            fillParams(statement, params);
            // 执行语句，获取结果集
            resultSet = statement.executeQuery();
            // 提取结果并返回
            return parseResultSet(resultSet, parseResultFunction);
        } catch (RuntimeException e) {
            throw e;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            close(connection, statement, resultSet);
        }
    }

    /**
     * 执行数据库更新（写入）操作
     *
     * @param sql SQL语句
     * @param params SQL语句的填充参数列表
     * @return 影响行数
     */
    public static int executeUpdate(String sql, List<Object> params) {
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            // 打开连接
            connection = openConnection();
            connection.setAutoCommit(false);
            // 创建语句
            statement = connection.prepareStatement(sql);
            // 填充参数
            fillParams(statement, params);
            // 执行语句，获取影响行数
            int rows = statement.executeUpdate();
            // 提交事务
            connection.commit();
            // 返回结果
            return rows;
        } catch (Exception e) {
            // 回滚事务
            rollback(connection);
            throw e instanceof RuntimeException
                ? (RuntimeException) e
                : new RuntimeException(e);
        } finally {
            close(connection, statement, null);
        }
    }

    /**
     * 填充参数
     *
     * @param statement 预备语句
     * @param params 参数列表
     */
    private static void fillParams(PreparedStatement statement, List<Object> params) {
        try {
            if (params != null) {
                int length = params.size();
                for (int i = 0; i < length; i++) {
                    Object value = params.get(i);
                    if (value instanceof String) {
                        statement.setString(i + 1, (String) value);
                    } else if (value instanceof Integer) {
                        statement.setInt(i + 1, (Integer) value);
                    } else if (value instanceof Date) {
                        java.sql.Timestamp timestamp = new Timestamp(((Date) value).getTime());
                        statement.setTimestamp(i + 1, timestamp);
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 解析结果集，提取数据
     *
     * @param resultSet 结果集
     * @param function 行数据解析函数
     * @return Map列表
     */
    private static List<Map<String, Object>> parseResultSet(
        ResultSet resultSet, BiConsumer<ResultSet, Map<String, Object>> function
    ) {
        try {
            List<Map<String, Object>> rowList = new ArrayList<>();
            while (resultSet.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                function.accept(resultSet, row);
                rowList.add(row);
            }
            return rowList;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 回滚事务
     *
     * @param connection 数据库连接
     */
    private static void rollback(Connection connection) {
        try {
            if (connection != null) {
                connection.rollback();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 打开数据库连接
     *
     * @return 数据库连接
     */
    private static Connection openConnection() {
        try {
            // 加载JDBC驱动
            Class.forName(DB_DRIVER);
            // 创建数据库连接
            return DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
        } catch (ClassNotFoundException | SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 关闭资源
     *
     * @param connection 数据库连接
     * @param statement 语句
     * @param resultSet 结果集
     */
    private static void close(Connection connection, Statement statement, ResultSet resultSet) {
        try {
            if (resultSet != null) {
                resultSet.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        try {
            if (statement != null) {
                statement.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        try {
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```
