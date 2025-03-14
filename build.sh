#!/bin/bash

# 安装依赖
npm install

# 构建项目
npm run build

# 将必要的文件复制到构建目录
cp -r .next/static .next/standalone/
cp -r public .next/standalone/
cp package.json .next/standalone/ 