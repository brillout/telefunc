export { objectAssignWithPropertyDescriptors }

function objectAssignWithPropertyDescriptors<Obj, ObjAddendum>(
  obj: Obj,
  objAddendum: ObjAddendum,
): asserts obj is Obj & ObjAddendum {
  Object.keys(objAddendum).forEach((key) => {
    Object.defineProperty(obj, key, Object.getOwnPropertyDescriptor(objAddendum, key)!)
  })
}
