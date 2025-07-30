#!/bin/bash

echo "🚀 启动规则引擎前端项目..."

# 检查 Node.js 版本
node_version=$(node -v)
echo "Node.js 版本: $node_version"

# 检查 npm 版本
npm_version=$(npm -v)
echo "npm 版本: $npm_version"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 启动开发服务器
echo "🌐 启动开发服务器..."
npm run dev 