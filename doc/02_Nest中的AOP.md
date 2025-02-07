+ Nest 实现 AOP 的方式更多，一共有五种，包括 Middleware、Guard、Pipe、Interceptor、ExceptionFilter
+ 在 NestJS 应用中，Middleware、Guard、Pipe、Interceptor 和 ExceptionFilter 的执行顺序如下：
  + Middleware：NestJS 中的中间件按照注册的顺序依次执行。每个中间件可以在请求被处理之前或之后执行一些操作。在请求到达控制器之前，中间件按照注册的顺序依次执行。在请求处理完成后，中间件按照相反的顺序依次执行。
  + Guard：守卫层在中间件执行之后，控制器处理之前运行。它可以根据一些条件决定是否允许请求通过。守卫可以是同步的也可以是异步的，可以影响请求的生命周期。
  + Pipe：管道用于处理请求数据的转换和验证。管道可以在请求到达控制器之前或之后应用。在控制器处理请求之前，NestJS 会将请求数据传递给所有注册的管道并进行处理。
  + Interceptor：拦截器在控制器处理请求之前和之后运行。拦截器可以用于对请求和响应做一些处理，比如在处理前添加、修改或删除一些数据，或在处理后进行日志记录。
  + ExceptionFilter：异常过滤器用于处理控制器中出现的异常。它可以捕获并处理控制器中抛出的异常，然后返回适当的响应。
+ 总结起来，NestJS 应用中这些组件的执行顺序是：Middleware -> Guard -> Pipe -> Interceptor -> Controller -> Interceptor -> Pipe -> ExceptionFilter。