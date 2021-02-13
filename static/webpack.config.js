const path = require ('path');
const webpack = require('webpack')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const BundleTracker = require('webpack-bundle-tracker')

const OUTPUT_DIR = 'public'

module.exports = [
    // Compile SASS into CSS
    {
        entry: {
            styles : './css/stylesheet.scss',
            index : './js/index.js'
        },
        output: {
            path: path.resolve(__dirname, OUTPUT_DIR),
            filename: '[name].min.js',
        },
        plugins: [
            ////////////////////////
            // SASS
            new MiniCssExtractPlugin({ filename: "[name].min.css"}),
            
            ////////////////////////
            // JS
            // Global compile time constants
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"' + process.env.NODE_ENV + '"'
                }
            }),
            // Required for Vue's single file components
            new VueLoaderPlugin(),

            ////////////////////////
            // Cache-busting
            // Remove everything from output.path before build.
            // Make sure not to share output.path with any other exports!
            new CleanWebpackPlugin(),
            //new BundleTracker({filename: './webpack-stats.json'})
        ],
        resolve: { // For JS only
            alias: {
                vue: process.env.NODE_ENV == 'production' ? 
                    'vue/dist/vue.min.js' : 'vue/dist/vue.js'
            },
            extensions: [
                '*', 
                '.js', 
                '.json',
                '.vue', // Required for Vue's single file components
            ]
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [ 
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {   // Required for Vue's single file components
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {   // Older browser support
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        }
    },
];
/*
module.exports = [
    // Compile SASS into CSS
    {
        entry: './css/stylesheet.scss',
        output: {
          path: path.resolve(__dirname, OUTPUT_DIR, 'css')
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: "styles.min.css"}),
            // Remove everything from output.path before build.
            // Make sure not to share output.path with any other exports!
            new CleanWebpackPlugin(),
            new BundleTracker({filename: './webpack-stats.json'})
        ],
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [ 
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        }
    },
    // Compile scripts
    {
        entry: [
            './js/index.js'
        ],
        output: {
            filename: '[name].min.js',
            path: path.resolve(__dirname, OUTPUT_DIR, 'js')
        },
        resolve: {
            alias: {
                vue: process.env.NODE_ENV == 'production' ? 
                    'vue/dist/vue.min.js' : 'vue/dist/vue.js'
            },
            extensions: [
                '*', 
                '.js', 
                '.json',
                '.vue', // Required for Vue's single file components
            ]
        },
        module: {
            rules: [
                {   // Required for Vue's single file components
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {   // Older browser support
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins: [
            // Global compile time constants
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"' + process.env.NODE_ENV + '"'
                }
            }),
            // Required for Vue's single file components
            new VueLoaderPlugin(),
            // Remove everything from output.path before build.
            // Make sure not to share output.path with any other exports!
            new CleanWebpackPlugin(),
            new BundleTracker({filename: './webpack-stats.json'})
        ]
    }
];
*/