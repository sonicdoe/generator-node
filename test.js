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

test('uses prompt input for package.json’s `name` field', async t => {
  await helpers.run(appPath)
    .withPrompts({
      name: 'my-awesome-package'
    })

  assert.fileContent('package.json', '"name": "my-awesome-package"')
})

test('uses prompt input for package.json’s `repository` field', async t => {
  await helpers.run(appPath)
    .withPrompts({
      name: 'my-awesome-package'
    })

  assert.fileContent('package.json', '"repository": "sonicdoe/my-awesome-package"')
})
