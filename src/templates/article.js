import React from 'react'
import { graphql } from 'gatsby'
import Menu from '../components/menu'
import Footer from '../components/footer'
import Image from 'gatsby-image'
import ReactMarkdown from 'react-markdown'

export default ({ data }) => {
  const article = data.storyblokEntry
  console.log(article)
  return (
    <div id="article-page">
      <Menu />
      <main>
        <h1>{article.field_title_string}</h1>
        <div className="image-container">
          <Image
            fixed={article.mainImage.childImageSharp.fixed}
            alt="Main article image"
          />
        </div>
        <div className="content">
          <ReactMarkdown source={article.field_content_string} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    storyblokEntry(slug: { eq: $slug }) {
      field_title_string
      field_content_string
      slug
      name
      mainImage {
          childImageSharp {
          fixed(width: 1000) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`