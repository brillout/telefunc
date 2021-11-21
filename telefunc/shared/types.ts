export type TelefunctionName = string
export type TelefunctionResult = Promise<unknown>
export type BodyParsed = {
  name: TelefunctionName
  args: unknown[]
}
export type TelefunctionArgs = any[]
export type Telefunction = ((...args: TelefunctionArgs) => TelefunctionResult)

export type Telefunctions = Record<TelefunctionName, Telefunction>
