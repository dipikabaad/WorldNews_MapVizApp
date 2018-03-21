var webpack = require("webpack");
module.exports = {
	entry: "./src/index.js",
	output:{
		path: "dist/assets",
		filename: "bundle.js",
		publicPath: "assets"
	},
	devServer:{
		inline: false,
		contentBase: './dist',
		port: 4000,
		headers: {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
     "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   }
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: ["babel-loader"],
				query: {
					presets: ["latest", "stage-0", "react"]
				}
			},
			{
				test: /\.json/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!autoprefixer-loader'
			},
			{
				test: /\.scss/,
				loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
			}
		]
	},
	externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
}]
}
