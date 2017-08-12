

# TravelMark



## Usage



## Developing



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.

## 目录结构
router:只做请求分发，没有业务逻辑 
err:是统一的错误处理位置，记录错误，统一err页面。 
middlewares:业务中间件，如用户权限控制 
proxy:数据层的连接工作,proxy能被controller和service访问。 
model:只能由它的proxy访问
controller主要逻辑处理 
service作为项目的业务组件。如：redis连接服务，缓存组件，日志组件等，他可以减少controller的负担。 
app:放一次性脚本