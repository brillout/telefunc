import 'telefunc'
import type { User } from '#root/db'

declare module 'telefunc' {
  namespace Telefunc {
    interface Context {
      user: null | User
    }
  }
}
