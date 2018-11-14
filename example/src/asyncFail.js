const asyncFail = arg => {
  return Promise.reject({errors: [{
    code: 777,
    message: `This is a mock failure and here is the arg you passed in - ${arg}`
  }]})
}

export default asyncFail
