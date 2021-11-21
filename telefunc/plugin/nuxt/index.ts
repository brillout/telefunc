export default telefuncModule


function telefuncModule(moduleOptions: any) {
  console.log(moduleOptions, this)

}


module.exports.meta = require('../../../../package.json')
