# Xiaobai Review Intake Template

Use this template when the user has not provided enough project context. Ask only for fields that are missing and necessary for the requested review.

## Minimum Required Context

```text
项目名称：
一句话说明这个产品做什么：
目标用户：
当前要验收的后端路径或仓库：
验收目标：MVP / 准上线 / 安全审查 / 重构前审查 / 单个模块验收
```

## Useful Extra Context

```text
技术栈：
数据库：
已实现功能：
待验收模块：
是否已有前端：
是否已有部署环境：
是否能运行测试：
是否能启动本地后端：
用户最担心的问题：
```

## If the User Is Non-Technical

Ask in plain language:

```text
你可以只告诉我：项目文件夹在哪里、这个产品是给谁用的、你现在最想确认“能不能用/能不能上线/安不安全”哪一类问题。
其余技术信息我会从代码里找，找不到的地方会标注“未验证”。
```

## Review Scope Choices

Use one of these scopes:

- `Quick`: Only inspect architecture, API routes, database models, auth, and tests. Do not run services unless already simple.
- `Standard`: Inspect code, run available tests, and verify local API when practical.
- `Launch`: Include deployment config, environment variables, migrations, backup/recovery, observability, and end-to-end checks when available.

Default to `Standard` unless the user asks for fast review or launch readiness.
