import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Provider extends Component {
  static propTypes = {
    render: PropTypes.func,
    data: PropTypes.func
  }
  constructor (props) {
    super(props)
    let data = {}
    Object.keys(
      props.data(props)
    ).forEach(key => (
      data[key] = {
        response: null,
        loading: false,
        errors: null
      })
    )
    this.state = { // initialize defaults for all APIs
      ...data
    }
  }

  fetchData = (key, api, args) => {
    if (!this.state[key].loading) { // spam prevention (will also pad this request if a developer mistakenly uses a rapidly changing arg and this starts spamming)
      this.setState(s => {
        delete s[key] // this object is not primitive, destroy the ref so componentDidUpdate of child behaves properly
        s[key] = {loading: true}
        return s
      }, () => {
        api(...args)
          .then(resp => this.updateAPIResponse(key, resp))
          .catch(resp => this.updateAPIError(key, resp))
      })
    }
  }

  updateAPIResponse = (key, resp) => {
    this.setState(s => {
      delete s[key] // this object is not primitive, destroy the ref so componentDidUpdate of child behaves properly
      s[key] = {
        response: resp,
        loading: false,
        errors: null
      }
      return s
    })
    return resp
  }

  updateAPIError = (key, resp) => {
    this.setState(s => {
      delete s[key] // this object is not primitive, destroy the ref so componentDidUpdate of child behaves properly
      let errors = resp
      if (resp.data && resp.data.errors) errors = resp.data.errors
      else if (resp.data && resp.data.error) errors = resp.data.error
      else if (resp.data) errors = resp.data
      else if (resp.errors) errors = resp.errors
      else if (resp.error) errors = resp.error // just trying to catch pretty common rejection shapes
      s[key] = {
        response: null,
        loading: false,
        errors
      }
      return s
    })
    return resp
  }

  fetchAllData = () => {
    const {data} = this.props
    Object.keys(data(this.props)).map(key => {
      const {api = () => null, args = []} = data(this.props)[key]
      this.fetchData(key, api, args)
    })
  }

  determineAPIRefetch = last => { // if the args of any API have changed, refire the API and refresh the data
    const {data} = this.props
    const newAPIs = data(this.props)
    const oldAPIs = last.data(last)
    const calls = {}
    Object.keys(newAPIs).forEach(key => {
      if (oldAPIs[key]) {
        let {args: oldArgs = []} = oldAPIs[key]
        let {args: newArgs = []} = newAPIs[key]
        if (newArgs.some((arg, i) => arg !== oldArgs[i])) {
          calls[key] = newAPIs[key]
        }
      }
    })
    if (Object.keys(calls).length > 0) {
      Object.keys(calls).map(key => {
        const {api = () => null, args = []} = calls[key]
        this.fetchData(key, api, args)
      })
    }
  }

  componentDidUpdate = p => {
    this.determineAPIRefetch(p)
  }

  componentDidMount () {
    this.fetchAllData()
  }

  render () {
    const {render: C, data, ...rest} = this.props
    const loading = Object.keys(this.state).some(api => this.state[api].loading === true)
    return <C loading={loading} {...rest} {...this.state} refreshData={this.fetchAllData} />
  }
}
