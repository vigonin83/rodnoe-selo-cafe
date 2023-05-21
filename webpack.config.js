import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import postcssPreset from 'postcss-preset-env'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

const __dirname = path.resolve();
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development'
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

// const optimise = () => {
//    const
//    if(devMode)
//          return   [
//          new CssMinimizerPlugin(),
//          new TerserPlugin()
//     ],

// };

const giveFileName = (ext) => (devMode ? `[name].${ext}` : `[name].[contenthash].${ext}` )

export default {
   mode,
   target,
   devtool,
   context: path.resolve(__dirname, 'src'),
   entry: {
      main: './index.js',
      apparts: './apparts.js',
      notFound: './notFoundPage.js',
      developmentPage: './developmentPage.js'

   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: giveFileName('js'),
      clean: true
   },
   devServer: {
      port: 3008,
      open: true,
      hot: devMode
   },

   module: {
      rules: [
         {
            test: /\.html$/i,
            loader: 'html-loader'
         },
         {
            test: /\.(c|sa|sc)ss$/i,
            use: [
               devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
               'css-loader',
               {
                  loader: 'postcss-loader',
                  options: {
                     postcssOptions: {
                        plugins: [postcssPreset]
                     }
                  }
               },
               "sass-loader",
             ],
         },
         {
            test: /\.(png|jpe?g|svg|gif|webp)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'img/[name][ext]'
            }
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[name][ext]'
            }
         },
         {
            test: /\.m?js$/i,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
      ]
   },
   optimization: {
      minimizer:
         [
         new CssMinimizerPlugin(),
         new TerserPlugin(),
         new ImageMinimizerPlugin({
        minimizer: {
               implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
             plugins: [
               ["gifsicle", { optimizationLevel: 2, interlaced: true }],
               ["mozjpeg", {quality: 75}],
               ["pngquant", { quality: [0.5, 0.7] }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
      ],
  },

   plugins: [
      new HtmlWebpackPlugin({
         template: './index.html',
      }),
      new CopyPlugin({
         patterns: [
         {
            from: path.resolve(__dirname, 'src', 'favicon.png'),
            to: path.resolve(__dirname, 'dist')
          },
         ]
      }),
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css'
      })
   ],
};