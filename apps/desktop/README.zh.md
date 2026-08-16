# `@deepseek-ai/dsh-desktop`

[English](README.md) | 中文

DeepSeek Harness 的桌面客户端：将 `dsh web` 运行时作为受管子进程启动，并在一个 Electron 窗口中承载其 GUI。[`src/main.ts`](src/main.ts) 负责编排启动流程；纯逻辑模块（[`config.ts`](src/config.ts)、[`ports.ts`](src/ports.ts)、[`ready.ts`](src/ready.ts)、[`launch.ts`](src/launch.ts)）从不 import Electron，因此启动路径可以在无头环境下做单元测试。

## 运行

从仓库检出，且运行时与 Web 前端已构建后：

```sh
pnpm --filter @deepseek-ai/dsh-desktop run build:lib:host
pnpm dsh-desktop
```

启动器 [`src/bin.ts`](src/bin.ts) 以已安装的 Electron 二进制启动主入口并原样转发参数；SIGINT/SIGTERM 转发给 Electron，使运行时销毁阶梯得以执行。也可以直接用 `electron apps/desktop/lib/main.js` 启动 Electron。

## 启动流程

1. 从 `DSH_DESKTOP_*` 环境变量解析[桌面端配置](#configuration)。
2. 探测首选端口；若被占用，`pickFreePort` 选取一个内核分配的临时回环端口。
3. 在 POSIX 上以 detached 方式启动运行时命令（默认为 `dsh web --port <p>`），以便对其整个进程组发信号。
4. 轮询运行时 HTTP 端点，直到返回 2xx 或就绪期限超时。
5. 打开一个指向 `http://127.0.0.1:<port>` 的 1280×800 `BrowserWindow`。

退出时恰好停止运行时一次：先向进程组发 SIGTERM，超过停止宽限期后升级为 SIGKILL。运行时启动失败、始终未就绪或会话中途退出时，会弹出错误对话框并退出。`RuntimeProcess` 会保留运行时 stderr 的有界尾部，用于崩溃诊断。

<a id="configuration"></a>

## 配置

| 变量 | 默认值 | 含义 |
|---|---|---|
| `DSH_DESKTOP_COMMAND` | `dsh` | 启动 harness web 运行时的命令。 |
| `DSH_DESKTOP_ARGS` | `web` | 运行时自身 flag 之前传递的参数（`--port` 会追加在后面）。 |
| `DSH_DESKTOP_PORT` | `3080` | 首选 HTTP 端口；被占用时改用空闲端口。 |
| `DSH_DESKTOP_READY_TIMEOUT_MS` | `30000` | GUI 等待运行时 HTTP 端点就绪的超时时间。 |
| `DSH_DESKTOP_READY_INTERVAL_MS` | `250` | 就绪探测的轮询间隔。 |
| `DSH_DESKTOP_STOP_GRACE_MS` | `5000` | SIGTERM 在 SIGKILL 之前获得的多长时间。 |

无效值会在启动时大声失败，而不是静默降级运行时启动。随部署变化的选项都可配置；没有硬编码的可调参数。

## 开发

单元测试覆盖纯逻辑模块（[`tests/config.spec.ts`](tests/config.spec.ts)、[`tests/ports.spec.ts`](tests/ports.spec.ts)、[`tests/ready.spec.ts`](tests/ready.spec.ts)、[`tests/launch.spec.ts`](tests/launch.spec.ts)）；smoke e2e（[`tests/desktop-smoke.e2e.ts`](tests/desktop-smoke.e2e.ts)）从构建产物启动真实运行时，并断言 HTTP 端点变为就绪。smoke 测试在 `vitest.e2e.config.ts` 下运行，需要已构建的 `apps/cli/lib/bin.js` 和 `apps/web/dist/index.html`。
