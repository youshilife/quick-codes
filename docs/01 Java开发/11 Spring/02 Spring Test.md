# Spring Test

## 整合JUnit

测试用例类：

``` java
// 开始执行试之前，先初始化Spring环境
@RunWith(SpringJUnit4ClassRunner.class)
// 初始化时加载的Spring配置文件路径
@ContextConfiguration("classpath:applicationContext.xml")
public class XxxTest {
    // 可依赖注入
    @Resource
    private XxxMapper xxxMapper;

    @Test
    public void test() {
        xxxMapper.insert();
    }
}
```
