import React from 'react'
import Provider from './Provider'

export default (data = props => ({
  data: {
    api: () => Promise.error(new Error('No provider function was given to the data provider.')),
    args: [props.id]
  }})) => Child => p => {
  return <Provider {...p} render={Child} data={data} />
}
