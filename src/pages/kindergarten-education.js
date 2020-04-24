import React from "react"
import MainStructure from '../components/mainStructure'
import { graphql } from "gatsby"

const KindergartenEducationPage = ({ data }) => {
  const getArticles = () => {
    const articles = data.allStoryblokEntry.edges.map(article => article.node)
    return articles
  }
  return (
    <MainStructure type="kindergarten-education" articles={getArticles()} />
  )
}

export const query = graphql`
query KindergartenQuery {
  allStoryblokEntry(filter: {field_component: {eq: "article"}, tag_list: {in: "kindergarten-education"}}, sort: {fields: created_at, order: DESC}) {
    edges {
      node {
        field_content_string
        field_language_string
        field_main_image_string
        field_title_string
        tag_list
        id
        slug
        selectionImage {
          childImageSharp {
            fixed(width: 325, height:325 quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
}
`

export default KindergartenEducationPage
