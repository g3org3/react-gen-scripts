#! /usr/bin/env node

const _gen = require('yagg')(__dirname)

// My Custom Generator
const context = {
  image: {
    ask: true,
    required: true
  },
  port: 8081
}

// clone app
_gen.cloneTemplateStructure(context)
