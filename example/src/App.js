import React from 'react'
import dataProvider from 'c2-data-provider'
import asyncSuccess from './asyncSuccess'
import asyncFail from './asyncFail'

function App (props) {
  const {propname, oopsie} = props
  return (
    <div className='page-container '>
      <div className='page-section'>
        <code>
          this.prop.propname = {JSON.stringify(propname)}
        </code>
      </div>
      <div className='page-section'>
        <code>
          this.prop.oopsie = {JSON.stringify(oopsie)}
        </code>
      </div>
    </div>
  )
}

export default dataProvider(
  props => ({
    propname: {
      api: asyncSuccess,
      args: ['ABCDEFGHIJKLMNOPQRSTUVWXYZ123456']
    },
    oopsie: {
      api: asyncFail,
      args: [props.name]
    }
  })
)(App)
