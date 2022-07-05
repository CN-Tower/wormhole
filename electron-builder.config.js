/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  productName: '虫洞',
  directories: {
    output: 'dist/wormhole',
  },
  publish: null,
  npmRebuild: false,
  buildDependenciesFromSource: true,
  electronDownload: {
    mirror: 'https://npm.taobao.org/mirrors/electron/',
  },
  files: [
    'dist/main/**/*',
    'dist/preload/**/*',
    'dist/render/**/*',
  ],
  mac: {
    target: {
      target: 'default',
      arch: ['universal'],
    },
    icon: './build/icon.icns',
    artifactName: 'wormhole-v${version}.${ext}',
  },
  dmg: {
    title: '虫洞',
  },
  win: {
    target: {
      target: 'nsis',
      arch: ['x64']
    },
    icon: './build/logo.png',
    artifactName: 'wormhole-v${version}.${ext}',
  },
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: '虫洞',
  },
}

module.exports = config
