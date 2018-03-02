import React from 'react'
import PackageComponent, {PackageSubcomponent} from '../../src'

export default function App () {
  return (
    <div>
      <h1>{'C2 <Package>'}</h1>
      <PackageComponent />
      <PackageSubcomponent />
    </div>
  )
}
