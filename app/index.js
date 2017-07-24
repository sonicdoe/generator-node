'use strict'

const Generator = require('yeoman-generator')

const splitComma = require('./split-comma')

module.exports = class extends Generator {
  prompting () {
    const prompts = [{
      name: 'name',
      message: 'Package Name:'
    }, {
      name: 'description',
      message: 'Description:'
    }, {
      name: 'keywords',
      message: 'Keywords:',
      filter: words => splitComma(words)
    }, {
      name: 'githubUsername',
      message: 'GitHub Username:',
      store: true
    }, {
      name: 'userName',
      message: 'Name:',
      default: this.user.git.name(),
      store: true
    }]

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
