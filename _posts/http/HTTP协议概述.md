---
title: HTTP协议概述
description: HTTP协议简介, 以及http请求和响应消息的格式
date: 2025-02-22
slug: http-protocol-overview
cover: https://gitee.com/lacsgf/img/raw/master/20250222134259101.webp
categories:
    - 网络交互
tags:
    - HTTP协议
    - 网络交互
password: pwd
theme: up
abstract: 有东西被加密了, 请输入密码查看.
message: 您好, 这里需要密码.
wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
---
WEB API接口 大都是基于 HTTP 协议的，所以，要进行接口测试 首先要了解 HTTP 协议 的 基础知识。

# HTTP协议简介

- HTTP 协议 全称是 超文本传输协议， 英文是 Hypertext Transfer Protocol 。

- HTTP 有好几个版本，包括： `0.9` 、 `1.0` 、 `1.1` 、 `2` 、 `3` ，当前最广泛使用的是 `HTTP/1.1` 版本。

- HTTP 协议最大的特点是 通讯双方 分为 `客户端` 和 `服务端` 。

- HTTP 双方的信息交互，必须是这样一种方式：

    特别注意：HTTP协议中，服务端不能主动先发送信息给 客户端。

    - 客户端 先发送 http请求（request）给 服务端

    - 然后服务端 发送 http响应（response）给 客户端

    

> 而且在1.1 以前的版本， 服务端 返回响应给客户端后，连接就会 断开 ，下一次双方要进行信息交流，必须重复上面的过程，重新建立连接，客户端发送请求，服务返回响应。

> 到了 1.1 版本， 建立连接后，这个连接可以保持一段时间（keep alive）， 这段时间，双方可以多次进行 请求和响应， 无需重新建立连接。

---

# HTTP请求消息



```HTTP
GET http://192.168.56.101:8080/suthr/logon?username=hrteacher&password=12345  HTTP/1.1
User-Agent: "PostmanRuntime/7.43.0"
Accept:"*/*
Cache-Control:"no-cache'
Postman-Token: "0e9a9ecc-2701-4c93-9f5b-c302765bd409"
Host: "192.168.56.101:8080'
Accept-Encoding: "gzip, deflate, br"
Connection: "keep-alive"
```

http请求消息由下面几个部分组成

## 请求行 request line

- http请求的第一行的内容，表示要操作什么资源，使用的 http协议版本是什么。

    

    里面包含了3部分信息： 请求的方法，操作资源的地址， 协议的版本号

    例如

    ```HTTP
    GET http://192.168.56.101:8080/suthr/logon HTTP/1.1
    ```

    Get是请求方法，表示要 `获取` 资源；资源的 `地址` 是 `/mgr/login.html` ； 使用的 `协议` 是 `HTTP/1.1`

    [常见的HTTP 请求方法](HTTP%E5%8D%8F%E8%AE%AE%E6%A6%82%E8%BF%B0+69c40bda-b3b3-4e8e-bb13-935987e4c0bc/%E5%B8%B8%E8%A7%81%E7%9A%84HTTP+%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95+74e2e110-5961-41b1-a8b4-a33845eaa0d8.md)

- 请求行里面还包括了url，比如

    ```HTTP
    /suthr/logon?username=hrteacher&password=123456
    ```

    url表示要获取资源的具体路径

    url特别要注意的是 `url参数` ，英文叫 `url query String`

    什么是url参数？

    比如：

    ```HTTP
     GET http://192.168.56.101:8080/suthr/logon?username=hrteacher&password=123456
    ```

    问号后面的部分 `username=hrteacher&password=123456` 就是 url 参数，

    每个参数之间是用 `&` 隔开的。

## 请求头 request headers

- 请求头是http请求行下面的的内容，里面存放一些 信息。

    

    比如，请求发送的服务端域名是什么， 希望接收的响应消息使用什么语言，请求消息体的长度等等。

    通常请求头 都有好多个，一个请求头 占据一行

    单个请求头的 格式是： `key（键）: value（值）`

## 消息体 message body

- 请求的url、请求头中可以存放一些数据信息， 但是有些数据信息，往往需要存放在消息体中。

    

    特别是 POST、PUT等请求，添加、修改的数据信息 通常都是 存放在 请求消息体 中的。

    如果 HTTP 请求 有 消息体， 协议规定 需要在 消息头和消息体之间 插入一个空行， 隔开 它们。

    请求消息体中保存了要提交给服务端的数据信息。

    比如：客户端要上传一个文件给服务端，就可以通过HTTP请求发送文件数据给服务端。

    文件的数据 就应该在请求的消息体中。

    再比如：上面示例中 客户端要添加药品，药品的名称、编码、描述，就存放在请求消息体中。

    WEB API 请求消息体 通常是某种格式的文本，常见的有

    - Json

    - Xml

    - www-form-urlencoded

# HTTP响应消息

下面是1个http响应消息的示例

```HTTP
HTTP/1.1 200 OK
Date:"Sun, 09 Feb 2025 07:39:10 GMT"
Content-Length: 37
X-Frame-Options: SAMEORIGIN
Vary: Cookie
Content-Type:: "text/plain;charset=IS0-8859-1"
Keep-Alive:"timeout=20"
Connection:"keep-alive"
{"ret": 0, "retlist": [], "total": 0}
```

HTTP响应消息包含如下几个部分

### 状态行（Status Line）

状态行位于首行，涵盖三个部分：

- 协议版本

在上述示例中，即为 `HTTP/1.1`

- 状态码

在上述示例中，即为 `200`，请求成功

[常见状态码](HTTP%E5%8D%8F%E8%AE%AE%E6%A6%82%E8%BF%B0+69c40bda-b3b3-4e8e-bb13-935987e4c0bc/%E5%B8%B8%E8%A7%81%E7%8A%B6%E6%80%81%E7%A0%81+cf487115-001d-4467-8056-4ce840b09f84.md)

- 描述状态的短语

在上述示例中，即为 `OK`，表示请求成功

- 以下是一些常见的 HTTP 状态行中描述状态的短语：

    

    1. `Not Found` ：表示请求的资源未找到。

    2. `Bad Request` ：表明客户端发送的请求存在语法错误。

    3. `Internal Server Error` ：服务器内部发生错误。

    4. `Unauthorized` ：未经授权，需要用户进行身份验证。

    5. `Forbidden` ：表示客户端被禁止访问请求的资源。

    6. `Conflict` ：表示请求发生冲突。

    7. `Not Modified` ：资源未被修改，客户端可使用缓存版本。

    8. `Method Not Allowed` ：请求方法不被允许。

    9. `Service Unavailable` ：服务不可用，通常是服务器暂时过载或维护。

    10. `Gateway Timeout` ：网关超时。

## 响应头（Response Headers）

响应头处于响应状态行下方的内容区域，存储了部分信息。其作用与格式和请求头类似。

## 消息体（Message Body）

有时，HTTP 响应需要包含消息体。

同样，若 HTTP 响应具有消息体，依据协议规定，需在消息头与消息体之间插入一个空行，以将二者分隔开。

与请求消息体相同，WEB API 响应消息体通常也是某种格式的文本，常见的有：

- Json

- Xml

- www-form-urlencoded

