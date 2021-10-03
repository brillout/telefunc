const path = require("path");
const telefunc = require("telefunc/webpack").default;

const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./client.ts",
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: path.resolve(__dirname),
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        telefunc(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: true,
        }),
    ],
};
