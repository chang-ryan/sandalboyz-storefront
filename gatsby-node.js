/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.modifyWebpackConfig = ({ config, stage }) => (
  config.merge({
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src')
      }
    }
  })
)
