'use strict'

const Generator = require('yeoman-generator')
const readPkgUp = require('read-pkg-up')

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
    }, {
      name: 'emailAddress',
      message: 'Email Address',
      default: this.user.git.email(),
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

  install () {
    this.npmInstall()
  }

  end () {
    if (process.env.NODE_ENV === 'test') {
      return
    }

    const args = process.argv.slice(3)
    const pkg = readPkgUp.sync({ cwd: __dirname }).pkg
    const name = pkg.name
    const version = pkg.version

    process.stdout.write(`Generated using ${name} v${version} with `)

    if (args.length > 0) {
      process.stdout.write('`' + args.join(' ') + '` and ')
    }

    console.log('the following answers:\n')

    for (const name in this.answers) {
      const answer = this.answers[name]

      console.log(`- ${name}: ${answer}`)
    }
  }
}
