#! /usr/bin/env node

// 这里需要有一个帮助文档 命令行的帮助文档
const program = require('commander')
const usages = new Set()

// 配置选项参数
const options = require('./config')
Object.entries(options).forEach(([key, value]) => {
  program.option(value.option, value.message, value.default)
  usages.add(value.usage)
})
// 如果输入help命令会触发
program.on('--help', function () {
  console.log('Examples:');
  usages.forEach(item => {
    console.log(`  ${item}`);
  })
})

// 设置 ws --help 的Usage描述
program.name('ws')
program.usage('[option]')

// 解析当前运行传递的参数
program.parse(process.argv)

// 获取用户参数
const uoptions = program.opts()

const Server = require('../src/index')
let server = new Server(uoptions)
server.start()
// console.log(uoptions);