# Agent Note: 桌面客户端——web 运行时之上的 Electron 外壳

Status: implemented

[English](2026-08-15-desktop-client-electron-shell.md) | 中文

## 问题

产品没有桌面入口：web UI 需要浏览器，并且要手动启动 `dsh web` 服务。桌面客户端应当启动同一个 web 运行时，并把 GUI 承载在原生窗口中，而不是复制运行时或引入第二个 agent 循环。

## 决策

**桌面客户端是既有 web profile 之上的 Electron 外壳。** `apps/desktop`（`@deepseek-ai/dsh-desktop`）把运行时命令（默认为 `dsh web --port <p>`）作为受管子进程启动，轮询其 HTTP 端点直到返回 2xx，然后在单个 1280×800 的 `BrowserWindow` 中加载该端点。没有第二个运行时、没有内置 Chromium UI，也不改动 `agent-loop` 或任何能力缝。

**纯逻辑模块从不 import Electron。** `config.ts`、`ports.ts`、`ready.ts`、`launch.ts` 可无头测试；`main.ts`（Electron 主进程）与 `bin.ts`（启动器）是仅有的两个接触 Electron 的模块。`ports.ts` 探测回环地址（`127.0.0.1`），因为这是 `dsh web` profile 服务的权威地址；`ready.ts` 用可注入的 `fetch` 轮询；`launch.ts` 暴露可注入的 spawn 与 kill 缝。

**运行时是带进程组信号销毁的受管子进程。** 在 POSIX 上子进程以 detached 方式启动，以便对整个进程组发信号；Windows 回退到 `taskkill /T /F`。退出时恰好停止运行时一次：先向进程组发 SIGTERM，超过可配置宽限期后升级为 SIGKILL。`RuntimeProcess` 保留有界的 stderr 尾部用于崩溃诊断。spawn 失败、就绪超时与会话中途退出都会弹出 `dialog.showErrorBox` 并退出。

**所有随部署变化的选项都是环境配置。** `DSH_DESKTOP_COMMAND`、`DSH_DESKTOP_ARGS`、`DSH_DESKTOP_PORT`（默认 3080，占用时回退到空闲端口）、`DSH_DESKTOP_READY_TIMEOUT_MS`（默认 30000）、`DSH_DESKTOP_READY_INTERVAL_MS`（默认 250）、`DSH_DESKTOP_STOP_GRACE_MS`（默认 5000）都是经过校验的 `DesktopConfig` 字段；无效值在启动时大声失败。

**`ChildLike.pid` 的类型是 `pid?: number | undefined`。** `exactOptionalPropertyTypes` 编译选项要求可选属性显式带上 `undefined` 联合，才能与 `@types/node` 的 `pid?: number | undefined` 匹配；`pid?: number` 与 `pid: number | undefined` 都不满足。

**测试策略：纯模块单元测试加一个真实 smoke e2e。** 单元套件为 `spawn`、`killGroup`、`fetch`、`probe` 注入 fake；`launch.spec.ts` 还有两个真实子进程测试，端到端断言 SIGTERM→SIGKILL 阶梯。smoke e2e（`desktop-smoke.e2e.ts`，在 `vitest.e2e.config.ts` 下）从 `apps/cli/lib/bin.js` 与 `apps/web/dist/index.html` 启动真实运行时，在空闲端口上等待就绪、断言 HTML 响应并干净停止——不需要 Electron、显示服务器或凭据。

**子进程脚本必须先注册 signal handler、再写就绪行。** pipe 写入同步进入内核缓冲，父进程可能在子进程执行到后面的 handler 注册行之前就读到 `ready`；需要观察信号的测试把 `process.on(SIGTERM, ...)` 放在 `process.stdout.write('ready')` 之前。

## 曾考虑的替代方案

**重新实现 agent 循环的原生外壳。** 不采用：web profile 已经拥有会话、工具与循环；第二个循环会重复行为并产生漂移。

**在进程内嵌入 web 运行时。** 不采用：运行时是有自身生命周期的服务器进程；以带进程组信号的子进程方式持有它，能获得干净的停止语义，也让桌面包保持轻薄。

**带系统托盘的 app、自动更新与打包。** 推迟到后续迭代；v1 是带启动器脚本的单窗口，包可发布但尚不可分发。

## 结果

从源码检出运行过 `build:lib:host`、`build:lib:client`、`build:web` 之后，`pnpm dsh-desktop` 即可启动桌面客户端。客户端继承 web profile 的行为——包括其 `node-pty` 原生依赖；该依赖在 linux-x64 上必须用 `node-gyp` 编译，因为 npm 包不提供 linux 预编译产物。桌面包不引入 `agent-loop` 或能力缝改动，其 README 记录了配置面。
