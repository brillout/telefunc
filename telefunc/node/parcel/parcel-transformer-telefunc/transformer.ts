import {Transformer} from '@parcel/plugin';

export default new Transformer({
    async transform({asset}) {
        // Retrieve the asset's source code and source map.
        let source = await asset.getCode();
        let sourceMap = await asset.getMap();

        // Run it through some compiler, and set the results
        // on the asset.
        throw "TODO";
        /*
        let {code, map} = null; // TODO
        asset.setCode(code);
        asset.setMap(map);

        // Return the asset
        return [asset];
        */
    }
});