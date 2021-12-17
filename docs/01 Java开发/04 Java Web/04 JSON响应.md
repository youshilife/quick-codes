# JSON响应

过滤器，设置响应内容类型为JSON。

URL Pattern：`/api/*`

``` java
/**
 * JSON响应内容类型过滤器类
 */
public class JsonContentTypeFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        response.setContentType("application/json");

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }
}
```
