# akangAI 代码导航指南

> 最后更新时间: 2024年3月12日

本文档旨在帮助开发者快速了解项目代码结构和关键文件，以便高效地进行开发、调试和维护工作。

## 目录

- [项目结构概览](#项目结构概览)
- [核心模块](#核心模块)
  - [管理服务器](#管理服务器)
  - [Windows客户端](#windows客户端)
  - [管理前端](#管理前端)
- [关键文件指南](#关键文件指南)
- [代码阅读路径](#代码阅读路径)
- [常见修改场景](#常见修改场景)

## 项目结构概览

项目分为三个主要部分：管理服务器、Windows客户端和管理前端。

```
akangAI/
├── mgmt-server/              # 管理服务器 (Node.js/Express)
├── windows-client/           # Windows客户端 (Electron)
├── mgmt-frontend/            # 管理前端 (Vue.js)
├── server-implementation/    # 服务器实现文档
├── mgmt-server-implementation/ # 管理服务器实现文档
└── docs/                     # 项目文档
    └── features/             # 功能模块文档
```

## 核心模块

### 管理服务器

管理服务器是整个系统的核心，负责协调客户端与AI服务的通信，处理语音识别、文本生成和语音合成等功能。

#### 关键目录

```
mgmt-server/
├── app.js                    # 应用入口点
├── server/                   # 服务器核心逻辑
├── socket/                   # Socket.IO实时通信
│   └── index.js              # Socket事件处理
├── services/                 # 核心服务实现
│   ├── asr.js                # 语音识别服务
│   ├── llm.js                # 大语言模型服务
│   ├── tts.js                # 文本转语音服务
│   └── voice-clone.js        # 声音克隆服务
├── controllers/              # API路由控制器
├── models/                   # 数据模型
├── middleware/               # Express中间件
├── utils/                    # 工具函数
│   ├── api.js                # API请求封装
│   ├── audio.js              # 音频处理工具
│   └── error-handler.js      # 错误处理
├── config/                   # 配置文件
│   ├── api-keys.js           # API密钥配置
│   └── tts-providers.js      # TTS提供商配置
├── data/                     # 数据存储
│   ├── voice_samples/        # 语音样本
│   └── voice_models/         # 克隆声音模型
└── logs/                     # 日志文件
```

### Windows客户端

Windows客户端是基于Electron的桌面应用，负责录制用户语音、播放合成语音，以及与服务器进行实时通信。

#### 关键目录

```
windows-client/
├── main.js                   # Electron主进程
├── socket-client.js          # Socket.IO客户端
├── audio-recorder.js         # 音频录制模块
├── audio-player.js           # 音频播放模块
├── renderer/                 # 渲染进程
│   ├── index.html            # 主界面
│   ├── renderer.js           # 渲染逻辑
│   └── styles.css            # 界面样式
└── config/                   # 配置文件
    └── settings.js           # 客户端设置
```

### 管理前端

管理前端是基于Vue.js的Web应用，用于系统管理、配置和监控。

#### 关键目录

```
mgmt-frontend/
├── src/
│   ├── main.js               # 应用入口
│   ├── App.vue               # 根组件
│   ├── components/           # 组件
│   ├── views/                # 页面视图
│   ├── router/               # 路由配置
│   ├── store/                # 状态管理
│   └── api/                  # API请求
└── public/                   # 静态资源
```

## 关键文件指南

以下是项目中最重要的文件，建议优先阅读和理解：

### 管理服务器核心文件

| 文件路径 | 主要功能 | 重要性 |
|---------|---------|-------|
| `mgmt-server/app.js` | 应用入口，Express配置和路由 | ★★★★★ |
| `mgmt-server/socket/index.js` | Socket通信处理，关键事件 | ★★★★★ |
| `mgmt-server/services/asr.js` | 语音识别服务实现 | ★★★★☆ |
| `mgmt-server/services/llm.js` | 大语言模型调用 | ★★★★☆ |
| `mgmt-server/services/tts.js` | 文本转语音实现 | ★★★★☆ |
| `mgmt-server/services/voice-clone.js` | 声音克隆功能 | ★★★★☆ |
| `mgmt-server/utils/api.js` | API请求封装和错误处理 | ★★★★☆ |
| `mgmt-server/config/api-keys.js` | API密钥配置管理 | ★★★☆☆ |
| `mgmt-server/utils/error-handler.js` | 统一错误处理 | ★★★☆☆ |

### Windows客户端核心文件

| 文件路径 | 主要功能 | 重要性 |
|---------|---------|-------|
| `windows-client/main.js` | Electron主进程 | ★★★★★ |
| `windows-client/socket-client.js` | Socket客户端连接管理 | ★★★★★ |
| `windows-client/audio-recorder.js` | 音频录制功能 | ★★★★☆ |
| `windows-client/audio-player.js` | 音频播放功能 | ★★★★☆ |
| `windows-client/renderer/renderer.js` | 界面交互逻辑 | ★★★☆☆ |

## 代码阅读路径

为了快速理解项目，建议按照以下顺序阅读代码：

### 第一阶段：系统结构

1. 阅读 `mgmt-server/app.js` 了解服务器结构
2. 阅读 `windows-client/main.js` 了解客户端结构
3. 查看 `mgmt-server/socket/index.js` 理解双向通信

### 第二阶段：核心服务流程

4. 阅读 `mgmt-server/services/asr.js` → `llm.js` → `tts.js` 了解语音对话流程
5. 阅读 `mgmt-server/utils/api.js` 了解API调用封装
6. 查看 `windows-client/socket-client.js` 了解客户端通信

### 第三阶段：特殊功能

7. 研究 `mgmt-server/services/voice-clone.js` 了解声音克隆实现
8. 查看 `mgmt-server/controllers/` 下各控制器了解API路由

## 常见修改场景

### 场景1：添加新的TTS声音

涉及文件：
- `mgmt-server/config/tts-providers.js` - 添加新声音配置
- `mgmt-server/services/tts.js` - 更新声音列表和处理逻辑

### 场景2：修改LLM提示词

涉及文件：
- `mgmt-server/services/llm.js` - 更新提示词模板

### 场景3：调整ASR参数

涉及文件：
- `mgmt-server/services/asr.js` - 修改API参数配置

### 场景4：优化音频处理

涉及文件：
- `mgmt-server/utils/audio.js` - 修改音频处理逻辑
- `windows-client/audio-recorder.js` - 调整录音参数

### 场景5：处理API错误

涉及文件：
- `mgmt-server/utils/api.js` - 修改错误处理逻辑
- `mgmt-server/utils/error-handler.js` - 更新错误处理策略

### 场景6：添加新的API服务提供商

涉及文件：
- `mgmt-server/config/api-providers.js` - 添加新的API提供商配置
- `mgmt-server/services/` - 修改相关服务以支持新提供商

## 调试技巧

### 服务器日志

服务器日志位于 `mgmt-server/logs/` 目录，包含：
- `access.log` - HTTP请求日志
- `error.log` - 错误日志
- `app.log` - 应用日志

查看日志的便捷方式：
```bash
cd mgmt-server
node view-logs.js
```

### API测试工具

项目包含多个API测试脚本：
- `mgmt-server/test-api-connection.js` - 测试API连接
- `mgmt-server/test-tts.js` - 测试TTS功能
- `mgmt-server/test-llm.js` - 测试LLM功能

### Socket事件监控

在开发模式下，可以启用Socket事件日志：
```bash
cd mgmt-server
DEBUG=socket.io* node app.js
```