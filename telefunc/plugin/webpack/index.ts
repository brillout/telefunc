import { unpluginTransform } from './transform'
import { createUnplugin, UnpluginInstance } from 'unplugin'
import { unpluginBuild } from './build'

export default plugin

function plugin(): ReturnType<UnpluginInstance<{}>['webpack']> {
  return createUnplugin(() => ({
    ...unpluginTransform.raw(undefined, { framework: 'webpack' }),
    ...unpluginBuild.raw(undefined, { framework: 'webpack' }),
  })).webpack()
}
