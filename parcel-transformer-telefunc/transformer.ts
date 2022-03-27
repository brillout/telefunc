import {Transformer} from '@parcel/plugin';
import {dirname} from "path";

const findPkg = require("find-pkg");

//import {transformTelefuncFile} from "telefunc/transformer";
const {transformTelefuncFile} = require("telefunc/transformer");

export default new Transformer({
    async transform({asset}) {

        // Determine package path

        const packageJsonFile =await findPkg(dirname(asset.filePath));
        if(!packageJsonFile) {
            throw new Error("Cannot find package dir for file: " + asset.filePath + ". Make sure there's a package.json in one if its parent dirs.");
        }

        let packagePath = dirname(packageJsonFile);
        let sourceCode = await asset.getCode();


        // Run it through some compiler, and set the results
        // on the asset.
        const { code } = await transformTelefuncFile(sourceCode, asset.filePath, packagePath);

        asset.setCode(code);
        asset.setMap(null);

        // Return the asset
        return [asset];

    }
});