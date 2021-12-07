# LocalDateTime支持问题

问题：MyBatis 3.4.5+将数据库类型`datetime`默认转为Java类`LocalDateTime`，但Jackson默认不支持`LocalDateTime`的序列化。

解决方案1：引入`jackson-datatype-jsr310`依赖，注册相关模块，可使Jackson支持转换，但转换的结果是数组，不是`Date`一样的时间戳。

解决方案2：自己扩展`ObjectMapper`，自定义对`LocalDateTime`的序列化器，使`LocalDateTime`转为时间戳。

1. 定义处理`LocalDateTime`的序列化器类：
    ``` java
    public class CustomLocalDateTimeSerializer extends JsonSerializer<LocalDateTime> {
        @Override
        public void serialize(LocalDateTime localDateTime, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            long time = localDateTime.toInstant(ZoneOffset.of("+8")).toEpochMilli();
            jsonGenerator.writeNumber(time);
        }
    }
    ```
2. 扩展原生`ObjectMapper`，用扩展后的ObjectMapper就可支持了
    ``` java
    public class CustomObjectMapper extends ObjectMapper {
        public class JavaTimeModule extends SimpleModule {
            public JavaTimeModule() {
                super(PackageVersion.VERSION);
                // 添加自定义的序列化器
                this.addSerializer(LocalDateTime.class, new CustomLocalDateTimeSerializer());
            }
        }
    
        public CustomObjectMapper() {
            this.registerModule(new JavaTimeModule());
        }
    }
    ```
3. Spring中，配置消息转换器，不用原生的，而是用扩展后的
    ``` xml
    <beans>
        <mvc:annotation-driven>
            <!--消息转换器-->
            <mvc:message-converters>
                <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
                    <!--ObjectMapper用扩展后的-->
                    <property name="objectMapper">
                        <bean class="xxx_package.CustomObjectMapper"/>
                    </property>
                </bean>
            </mvc:message-converters>
        </mvc:annotation-driven>
    </beans>
    ```
