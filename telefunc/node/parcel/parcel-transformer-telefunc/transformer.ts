import {Transformer} from '@parcel/plugin';
import {transformTelefuncFile} from "telefunc/node/transformer/transformTelefuncFile"

export default new Transformer({
    async transform({asset}) {
        // Retrieve the asset's source code and source map.
        let source = await asset.getCode();
        let sourceMap = await asset.getMap();

        // Run it through some compiler, and set the results
        // on the asset.
        const { code } = await transformTelefuncFile(asset.filePath)

        asset.setCode(code);
        asset.setMap(null);

        // Return the asset
        return [asset];

    }
});