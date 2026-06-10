# Xiaobai Review Prompt Bank

Use these prompts at the end of the report. Adapt module names and paths to the current project.

## Full Review Prompt

```text
请以“非技术用户验收版 + 工程证据分级”的方式审查这个后端。
请按 14 个方向输出：方向、具体检查地方、检查方式、验收标准、通过标准、输出内容。
每个结论必须标注风险等级 P0-P3 和证据等级 L0-L6。
没有证据的地方写“未验证”，不要写“已完成”。
最后请给出上线建议、P0/P1 阻断项、最小修复清单，以及我可以复制给 AI 开发工具的修复提示词。
```

## Repair Prompt for Missing Evidence

```text
请不要只解释架构，请补充工程证据。
对每个“已完成”的结论，请提供对应的文件路径、函数/路由/表结构、测试用例或可执行验证命令。
无法提供证据的项目请改为“未验证”，并说明需要怎样验证。
```

## Repair Prompt for Business Flow Gaps

```text
请按“用户动作 -> 后端接口 -> 数据变化 -> 返回结果”的格式补齐核心业务流程。
找出当前后端缺失的接口、数据字段、状态流转和异常处理。
只修复 MVP 必须闭环的流程，不要新增未要求的功能。
```

## Repair Prompt for Database and Ownership

```text
请审查并修复数据库设计中的数据归属问题。
每张核心业务表必须说明归属用户、团队或租户字段。
所有查询、修改、删除接口都必须加入数据归属过滤，防止用户访问别人的数据。
请补充迁移脚本和测试证据。
```

## Repair Prompt for Permissions and Security

```text
请从权限和安全角度修复后端。
列出所有需要登录的接口、需要角色权限的接口、涉及敏感数据的接口。
修复越权访问、输入未校验、密钥暴露、错误信息泄露等问题。
请添加对应测试，并提供测试通过结果。
```

## Repair Prompt for State, Transaction, and Idempotency

```text
请检查所有会改变业务状态的接口。
为订单、支付、提交、生成、回调、通知等操作补充状态机规则、事务保护和幂等设计。
重复请求不能造成重复扣费、重复创建、重复发送或重复生成。
请提供代码位置和测试证据。
```

## Repair Prompt for Deployment Readiness

```text
请补齐后端部署验收所需内容。
列出环境变量、启动命令、数据库迁移命令、健康检查接口、日志位置、备份恢复方式。
请提供本地启动验证或部署环境验证证据。
```
