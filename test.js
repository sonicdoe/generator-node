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
      name: 'my-awesome-package',
      githubUsername: 'user'
    })

  assert.fileContent('package.json', '"repository": "user/my-awesome-package"')
})

test('uses prompt input for package.json’s `description` field', async t => {
  await helpers.run(appPath)
    .withPrompts({
      description: 'My short description of my awesome package'
    })

  assert.fileContent('package.json', '"description": "My short description of my awesome package"')
})

test('uses prompt input for package.json’s `keywords` field', async t => {
  await helpers.run(appPath)
    .withPrompts({
      keywords: [
        'short',
        'relevant'
      ]
    })

  assert.fileContent('package.json', '"keywords": [\n    "short",\n    "relevant"\n  ]')
})
