import { defineManifest } from '@crxjs/vite-plugin'

import packageJson from './package.json'
const { version } = packageJson

const [major, minor, patch, label = '0'] = version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: 'Yippee',
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  content_scripts:[
    {
      "matches": ["https://*.google.com/*"],
      "js": ["src/content.ts"],
    }
  ],
}))
