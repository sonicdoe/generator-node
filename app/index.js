'use strict'

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    const prompts = []

    return this.prompt(prompts).then(answers => {
      this.answers = answers
    })
  }

  writing () {
    this.fs.copyTpl(
      this.templatePath('*'),
      this.destinationPath(),
      this.answers,
      {},
      {
        globOptions: {
          dot: true
        }
      }
    )
  }
}
