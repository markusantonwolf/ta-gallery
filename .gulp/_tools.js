const fs = require('fs')

const getFiles = function(path) {
  files = Array()
  if (!fs.existsSync(path)) {
    console.info(path + ' does not exist')
    return files
  }
  folder = fs.readdirSync(path)
  folder.forEach(function(element, index) {
    file = fs.statSync(path + '/' + element)
    if (file.isFile()) {
      files.push({
        src: path + '/' + element,
        name: element,
      })
    }
  })
  return files
}

module.exports.getFiles = getFiles
