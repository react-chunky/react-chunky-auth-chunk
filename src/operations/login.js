import { Core, Data, Operations } from 'react-chunky'

export default class LoginOperation extends Operations.Default {

  onResponse(json) {
    if (json.status > 400) {
      // This means the request was rejected remotely, so let's fail this operation
      return Promise.reject(new Error(json.data.message || 'Access denied'))
    }

    // Let's parse the basic auth token key
    const tokenHashKey = this.headers.Authorization.split(" ")[1]

    // Let's inject the hash in the main token value
    const token = Object.assign({}, json.data, { tokenHashKey })

    // Save the token
    return Data.Cache.cacheAuthToken(token)
  }

  onError(error) {
    console.log("Login - Got Error", error)
  }

  onTimeout() {
    console.log("Login - Timed Out")
  }

}
