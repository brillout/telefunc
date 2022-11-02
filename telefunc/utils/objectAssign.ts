export { objectAssign }

// Same as `Object.assign()` but with type inference
function objectAssign<Obj extends Object, ObjAddendum>(
  obj: Obj,
  objAddendum: ObjAddendum
): asserts obj is Obj & ObjAddendum {
  Object.assign(obj, objAddendum)
}
