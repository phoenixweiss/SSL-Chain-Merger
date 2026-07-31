import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const versionFileUrl = new URL('../../VERSION', import.meta.url)
const packageFileUrl = new URL('../../package.json', import.meta.url)
const releaseTag = process.argv[2]

const version = (await readFile(versionFileUrl, 'utf8')).trim()
const packageMetadata = JSON.parse(await readFile(packageFileUrl, 'utf8'))

assert.match(version, /^\d+\.\d+\.\d+$/, 'VERSION must contain a semantic version')
assert.equal(packageMetadata.version, version, 'VERSION and package.json must match')

if (releaseTag) {
  assert.match(releaseTag, /^v\d+\.\d+\.\d+$/, 'Release tag must use the vMAJOR.MINOR.PATCH format')
  assert.equal(releaseTag, `v${version}`, 'Release tag must match VERSION and package.json')
}

console.log(
  releaseTag ? `Release ${releaseTag} is consistent.` : `Version ${version} is consistent.`
)
