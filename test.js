import test from 'ava'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

const appPath = path.join(__dirname, 'app')

test('generates expected files', async t => {
  await helpers.run(appPath)

  assert.file([
    '.editorconfig',
    '.gitignore',
    '.travis.yml',
    'LICENSE',
    'package.json'
  ])
})
