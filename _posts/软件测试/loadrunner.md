---
title: LoadRunner
description:
date: 2025-01-13
slug:  LoadRunner
cover: https://gitee.com/lacsgf/img/raw/master/20250222142133327.webp
categories:
    - 软件测试
---



# 1. LoadRunner的概述

## LoadRunner是什么

- LoadRunner是一款性能测试工具，主要用于评估系统在高负载条件下的性能表现。
- 它通过模拟大量虚拟用户并发访问系统，帮助测试人员发现并优化性能瓶颈，确保系统的稳定性和可靠性。

## LoadRunner的构成

- LoadRunner由三个主要组件构成：
  - ***Virtual User Generator (VUG)***：用于录制和编辑测试脚本。
  - ***Controller***：用于设计测试场景、管理虚拟用户和监控测试过程。
  - ***Analysis***：用于分析测试结果并生成报告。
- 这些组件协同工作，使LoadRunner能够全面覆盖从脚本创建到结果分析的整个性能测试流程。

# 2.LoadRunner的使用

### **录制回放**

录制用户操作，生成测试脚本。

### **思考时间**

使用`lr_think_time(7);`函数模拟用户操作之间的思考时间。

![PixPin_2025-01-17_21-33-36](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-17_21-33-36.png)

### **检查点**

- 检查点帮助确保应用程序在性能测试过程中不仅能够响应请求，而且响应的内容也是正确的。

- 使用`web_reg_find("Text=个人中心", LAST);`验证应用程序在特定操作后的响应是否符合预期。

  ![image-20250117213450100](D:\kaifa\blog\content\post\LoadRunner\image-20250117213450100.png)

### **关联**

- 使用`web_reg_save_param_ex`函数动态获取并使用服务器响应中的数据，以替换录制时的静态数据。

- 这些动态数据通常包括会话标识符（如`JSESSIONID`）、令牌（如`CSRF Token`）、时间戳、用户生成的数据等。

  ![PixPin_2025-01-17_21-35-52](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-17_21-35-52.png)

### **参数化**

- 在脚本中使用变量来替换静态数据，使脚本能够模拟多个用户使用不同的数据进行操作，从而更真实地反映系统的性能表现。

- 规则![PixPin_2025-01-16_23-22-26](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-16_23-22-26.png)

- 迭代规则

  ![PixPin_2025-01-16_23-21-24](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-16_23-21-24.png)

- 当数值超过时

  ![PixPin_2025-01-16_23-23-37](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-16_23-23-37.png)

### **事务与集合点**

- **事务**：测量特定操作的性能，如登录、提交表单等。通过在脚本中插入事务开始和结束的标记，可以记录这些操作的响应时间。
- **集合点**：模拟多个用户同时执行某个操作，以测试系统的并发处理能力。

### **场景设计与运行**

- 在Controller中设置虚拟用户（VUsers）的数量、启动和停止策略、运行时的监控等，以模拟真实的用户负载。

- 设计方案

  ![PixPin_2025-01-16_20-23-23](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-16_20-23-23.png)

  - 初始化：每2秒启动一个用户，共10个用户。

    ![PixPin_2025-01-16_20-20-52](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-16_20-20-52.png)

  - 持续运行2分钟。

  - 新增5个用户，直接启动。

  - 持续运行2分钟。

  - 停止5个用户，立即。

  - 持续运行2分钟。

  - 停止所有用户，每隔2秒停止1个用户。

  #### 运行时

  - 监控测试过程中的系统性能。

    ![PixPin_2025-01-16_20-39-36](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-16_20-39-36.png)

    ![PixPin_2025-01-16_20-30-15](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-16_20-30-15.png)

### **结果分析**

在测试完成后，通过分析生成的报告和图表，评估系统的性能表现，找出性能瓶颈和问题。

#### Analysis打开后有一半**黑屏**该怎么办？

![黑屏](D:\kaifa\blog\content\post\LoadRunner\黑屏.jpg)

1. 调整分辨率和缩放比例

   系统设置>系统>屏幕-缩放比例

   ![PixPin_2025-01-17_21-07-41](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-17_21-07-41.png)

2. 以兼容模式运行这个程序

   AnalysisUI.exe属性>兼容性>以兼容模式运行这个程序

   <img src="D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-17_20-55-20.png" alt="PixPin_2025-01-17_20-55-20" style="zoom: 25%;" />



#### AnalysisUI的使用

- 总结报告页面

  ![结果分析-01](D:\kaifa\blog\content\post\LoadRunner\结果分析-01.png)

- 其他主要页面

  1. Running Vusers运行用户
  2. Hits per Second每秒命中率
  3. Throughput吞吐量
  4. Transaction Summary事物概要
  5. Average Transaction Response Time事物的平均响应时间

- 添加新的图表页面

  ![PixPin_2025-01-17_21-18-28](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-17_21-18-28.png)

  <img src="D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-17_21-20-19.png" alt="PixPin_2025-01-17_21-20-19" style="zoom:50%;" />

- 图表合并

  <img src="D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-17_21-24-21.png" alt="PixPin_2025-01-17_21-24-21" style="zoom:50%;" />

  <img src="D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-17_21-24-00.png" alt="PixPin_2025-01-17_21-24-00" style="zoom:50%;" />

- 生成新的报告

  ![PixPin_2025-01-17_21-25-09](D:\kaifa\blog\content\post\LoadRunner\PixPin_2025-01-17_21-25-09.png)

  

