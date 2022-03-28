Use the [example](../examples/express-and-parcel)
 - Add devDependencies to it's [package.json](../examples/express-and-parcel/package.json):
   ```json
   "devDependencies": {
      ...
      "telefunc": "file:../../telefunc"
   }
 - Add devDependencies to it's [**client**/package.json](../examples/express-and-parcel/client/package.json):
   ```json
   "devDependencies": {
      ...
      "parcel-transformer-telefunc": "file:../../../parcel-transformer-telefunc"
   }
- Run package.json#scripts#dev to watch for file changes and recompile automatically in the backround. 
- Run (debug) ../examples/express-and-parcel/package.json#scripts#build and it should execute/debug this transformers code