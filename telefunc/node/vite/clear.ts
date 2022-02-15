import { distLinkOff } from './distLink'
import { importGlobOff } from './importGlob'

// Remove `import.meta.glob()` (otherwise bundlers like webpack will complain)
importGlobOff()

// Remove `dist/` link
distLinkOff()
