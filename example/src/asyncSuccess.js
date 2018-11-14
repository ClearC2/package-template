const asyncSuccess = id => {
  return Promise.resolve({data: {name: 'jake', id: id}})
    .then(resp => resp.data)
}

export default asyncSuccess
