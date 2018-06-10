// @flow
import React from 'react'
import styled from 'react-emotion'

export const Title = styled('h2')`
  font-family: "adobe-caslon-pro";
`

export const Synopsis = styled('div')`
  font-family: "adobe-caslon-pro";
  font-size: 1.3em;
`

const ProductsPageSynopsis = ({ title, synopsis }) => (
  <div>
    <Title>{title}</Title>
    <Synopsis>{synopsis}</Synopsis>
  </div>
)

export default ProductsPageSynopsis
