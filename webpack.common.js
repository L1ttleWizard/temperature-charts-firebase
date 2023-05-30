const path = require("path");
const loader = require("sass-loader");

module.exports = {
    entry: {
        main: "./src/main.js",
        vendor: "./src/vendor.js",
        jq:'./src/jq.js'
        
    },
    output:{
        assetModuleFilename: 'img/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
            
        ]
    }
};