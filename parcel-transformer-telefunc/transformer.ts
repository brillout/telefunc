import {Transformer} from '@parcel/plugin';

//import {transformTelefuncFile} from "telefunc/transformer";
const {transformTelefuncFile} = require("telefunc/transformer");

export default new Transformer({
    async transform({asset}) {

        let sourceCode = await asset.getCode();

        // Run it through some compiler, and set the results
        // on the asset.
        const { code } = await transformTelefuncFile(sourceCode)

        asset.setCode(code);
        asset.setMap(null);

        // Return the asset
        return [asset];

    }
});