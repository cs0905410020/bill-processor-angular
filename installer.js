const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'bill-processor-app-win32-x64/'),
    authors: 'Techbotz Solutions',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'bill-processor-app.exe',
    setupExe: 'BillProcessorAppInstaller.exe',
	description: 'This app will be used for saving,viewing different kinds of bills.'
    //setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  })
}