const path = require(`path`)
const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({ node, getNode, actions, store, cache, createNodeId }) => {
  createNodes(node, getNode, actions)
}

exports.createPages = async ({ graphql, actions }) => {
  createStoryblokPages(actions, graphql)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (
    node.internal.type === "StoryblokEntry" &&
    node.field_main_image_string !== null
  ) {
    console.log(node.field_component)
    let fileNode = await createRemoteFileNode({
      url: node.field_main_image_string, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })
    if (fileNode) {
      node.mainImage___NODE = fileNode.id
    }
  }

  if (
    node.internal.type === "StoryblokEntry" &&
    node.field_selection_image_string !== null &&
    node.field_component === 'article'
  ) {
    let fileNode = await createRemoteFileNode({
      url: node.field_selection_image_string, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })
    if (fileNode) {
      node.selectionImage___NODE = fileNode.id
    }
  }

}

// const createNodes = (node, getNode, actions) => {
//   const { createNodeField } = actions
//   if (
//     node.internal.type === `StoryBlokEntry`
//     && node.field_content_string === 'Article'
//   ) {
//     const slug = createFilePath({ node, getNode, basePath: `pages` })
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     })
//   }
// }

const createStoryblokPages = async (actions, graphql) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allStoryblokEntry {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  result.data.allStoryblokEntry.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/article.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
      },
    })
  })
}
