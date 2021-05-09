## 1.node是什么
  - nodejs是一个基于Chrome V8引擎的javascript运行环境
  - 它不包括js全集，因为在服务端中不包含DOM和BOM
  - 它也提供了一些新的模块：http、fs等
  - 它使用事件驱动、非阻塞I/O模型
    - 事件驱动：比如文件完成后通过一个事件告诉你，读取已经完成
    - I/O：比如文件读写(可以同时读取多个文件)

## 2.Buffer
  - 原来前端是无法直接读取文件 操作文件的 所以对文件和前端传递的数据都是使用二进制磊储存的
  - 我们以字节为单位来储存数据 一个字节由8个位组成
  - node中使用Buffer来标识内存数据 将内容转换成16进制显示(因为16进制短)
  - buffer代表的是内存 内存一段固定空间 不能随意添加

## 3.Stream
  - 用来解决大文件读取问题，客户端发送给服务端的数据都是一段一段的，接收的数据也是，都是使用流的方式
  - 流的模式
    - 可读流：on('data') on('end') push(数据|null)
    - 可写流：ws.write(string|buffer) ws.end
    - 双工流：可读可写
    - pipe管道：将读取的内容发送给写入，主要靠的是发布订阅

## 4.栈 队列 链表 树
  - 链表：单向链表 链表反转
  - 树：二叉搜索树 树的遍历（先序、中序、后序、层序） 二叉树反转

## 5.文件操作
  - fs.mkdir fs.rmdir fs.stat stateObj.isFile() stateObj.isDirectory()
  - fs.readdir fs.unlink fs.access(文件是否能访问)

## 6.网络
  - OSI 七层模型(物数网传会表应)
    - 物理层：网线、光纤、如何传递(0和1这些二进制数据)
    - 数据链路层：两个设备之间如何传递数据(交换机)MAC地址 建立逻辑链接 数据帧
    - 网络层：寻址、通过IP找到对应得MAC地址(路由器) IP协议(寻找IP地址) ARP协议(从IP地址获取MAC地址)
    - 传输层：因为网络不可靠、所以要保证可靠传输、需要TCP(对数据的完整性保护) TCP UDP
    - 会话层：建立会话
    - 表示层：数据的表示形式、安全性等
    - 应用层：用户最终访问的接口(浏览器) HTTP DNS FTP
  - DNS服务器
    - 去根服务器上查找顶级域名
    - 查找IP
    - 找到后缓存IP
  - TCP
    - 可靠
    - 传输效率低
    - 提供全双工服务(能同一时间双向传输数据)
    - HTTP1/2基于TCP
    - 三次握手
      - 1.客户端链接服务器时，首先随机开一个随机端口去访问，请求确认链接(SYN)
      - 2.服务端确认可以(ACK)，然后向客户端请求确认链接(SYN)(实际上将两次合并成了一次)
      - 3.客户端确认可以(ACK)
    - 四次挥手
      - 1.客户端希望断开链接(FIN)
      - 2.服务端确认可以(ACK)(因为有可能数据没有传输完毕 所以无法合并)
      - 3.服务端希望断开链接(FIN)
      - 4.客户端确认可以(ACK)
    - 一个TCP包传递的最大数据---数据帧的最大长度1500(20个字节) ip协议头(20个字节) tcp头(20个字节) 所以最大传输的时1460个字节
    - 并发http请求 chrome最多是6个(同一个域名) 需要开辟6个tcp通道 队头阻塞 tcp竞争带宽
    - HTTP2为了减少tcp创建 每个域名只建立一个链接 还会有阻塞问题
    - 滑动窗口
      - 发送方窗口
      - 接收方窗口
      - 在建立链接的时候 会将接收方的窗口大小(WIN)传递过去
      - 如果发送方的数据大于接收方的数据 当接收方的数据满了且数据被消耗掉 发送方窗口就要滑动 然后继续传输数据
      - 发送方会发送tcp探测包探测是否还能接收数据
      - `Nagle`算法的基本定义是**任意时刻，最多只能有一个未被确认的小段**  (TCP内部控制)
      - `Cork算法`当达到`MSS`(Maximum Segment Size)值时统一进行发送（此值就是帧的大小 - `ip`头 - `tcp`头 = 1460个字节）
    - 拥塞处理
      - 慢启动 拥塞避免 快重传 快恢复
      - TCP维护一个拥塞窗口(cwnd)变量 在传输过程中就将此值增大 如果出现拥塞(超时重传RTO) 就将窗口值减少
  - UDP
    - 不可靠
    - DNS、HTTP3基于UDP
  - 最大端口号
    - 因为端口号是16位表示的 所以最大是 2**16 - 1 = 65535
  - HTTP
    - 发展历程
      - HTTP/0.9：没有请求头和请求体，使用ASCII来传输HTML
      - HTTP/1.0：增加请求头和响应头，实现多类型数据传输
      - HTTP/1.1：默认开启持久链接，一个TCP上可以开启多个HTTP请求，一个域名最多维护6个TCP持久链接，解决队头阻塞问题(但是服务端要按顺序依次处理请求)，引入客户端cookie机制
      - HTTP/2.0：解决网络带宽使用低(多个TCP竞争带宽)，采用多路复用机制(一个域名使用一个TCP持久链接)，服务端推送
      - HTTP/3.0：解决TCP队头阻塞问题，采用QUIC协议，QUIC协议基于UDP协议
    - 状态码
      - 1xx
        - 101：websocket
      - 2xx：成功
        - 200：成功
        - 204：成功了但是没有返回具体内容
        - 206：分片传输(`curl --header "Range: bytes=0-10" -v http://www.baidu.com`)
      - 3xx：缓存和重定向
        - 301：永久重定向(一心一意)
        - 302：临时重定向(三心二意)
        - 304：缓存
      - 4xx：客户端错误
        - 400：参数错误 服务器不知道发送的是什么
        - 401：用户没有权限(没有登录)
        - 403：登录了但是还是没有权限(token过期)
        - 404：请求的url找不到
        - 405：请求的方法服务端不支持
      - 5xx：服务端错误
        - 500：服务器内部错误
        - 502：代理请求，无效响应
        - 504：网关错误 超时 无法获取响应
    - 请求方法
      - 大部分会遵循Restful风格，对资源的增删改查使用get post put delete来表示
      - get和post的区别：
        - get
          - 没有请求体，可以通过url携带参数，而且不安全
      - options请求：
        - 主要用于跨域的时候，而且只有‘复杂’请求的时候才会出现，默认get和post都是简单请求，但如果自定义了header信息，就会变成复杂请求
        - 为了避免发送的数据浪费，所以先发送一个预检请求，如果能访问，再发送数据
        - 预检请求的时间可以自己控制(可以控制发送options的间隔时间) 服务端控制
    - 常见的跨域方案
      - jsonp
      - iframe
      - cors后端配置
      - nginx反向代理
      - websocket
    - 报文
      - 
