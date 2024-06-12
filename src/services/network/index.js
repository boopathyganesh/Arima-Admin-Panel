import axios from 'axios'
import _ from 'lodash'
import { showSnackbar } from 'redux/snackbar/actions'

//PATH VARIABLE REPLACER - /:id - /123
// function bindPath(url, pathVal) {
//   var newUrl = url
//   var pathExpression = /:[a-z0-9]+/gi
//   var pathVar
//   while (((pathVar = pathExpression.exec(url)), pathVar != null)) {
//     let pathVarName = pathVar[0]
//     newUrl = newUrl.replace(
//       pathVarName,
//       pathVal[pathVarName.substring(1, pathVarName.length)]
//     )
//   }
//   return newUrl
// }

// Local bind path
function bindPath(url, pathVal) {
  // Process path variables
  var newUrl = url
  var pathExpression = /:[a-z0-9]+/gi
  var pathVar

  while (((pathVar = pathExpression.exec(url)), pathVar != null)) {
    let pathVarName = pathVar[0]
    newUrl = newUrl.replace(
      pathVarName,
      pathVal[pathVarName.substring(1, pathVarName.length)]
    )
  }

  // Replace only the prefix "http://192.168.2.132undefined"
  // if (newUrl.startsWith('http://192.168.6.47undefined')) {
  //   newUrl = newUrl.replace(
  //     'http://192.168.6.47undefined',
  //     'http://192.168.6.47:8011'
  //   )
  // }

  return newUrl // Return the modified URL
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setupInterceptors: (store) => {
    // intercepts outgoing requests before they are sent
    axios.interceptors.request.use(
      function (config) {
        //CHECK REQUEST NEED TO ADD AUTH TOKEN IN THE HEADER
        if (config.headers.isAuthRequired) {
          const token =
            typeof window !== 'undefined'
              ? localStorage.getItem('token')
              : store.getState()?.AuthReducer?.token
          if (token) config.headers.Authorization = `Bearer ${token}` //ADD AUTHORIZATION HEADER
        }
        //DELETE CUSTOM PROPERTY IN THE REQUEST HEADERS
        delete config.headers.isAuthRequired
        delete config.headers.authKey

        //PATH VARIABLES IS AVAILABLE IN HEADERS
        if (config.headers.path) {
          try {
            config.url = bindPath(config.url, config.headers.path)
          } catch (e) {
            console.log('ERROR OCCURED WHEN REPLACING PATH VARIABLES', e)
          }
        }

        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    // intercepts requests after they are received
    axios.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        //catches if the session ended!
        if (
          !axios.isCancel(error) &&
          (_.get(error, 'response.status', '') === 401 ||
            _.get(error, 'response.status', '') === 403)
        ) {
          // if (_.get(error, 'response.data.more_info.is_access_denied')) {
          //   //access denied error
          //   window.location = '/403'
          // } else {
          //   //session timeout error
          //   localStorage.clear()
          //   window.location = '/'
          // }
          localStorage.clear()
          window.location = '/'
          store.dispatch(
            showSnackbar({
              message: 'Session Expired Please login again', //text or html
              autoHideDuration: 3000, //ms
              anchorOrigin: {
                vertical: 'top', //top bottom
                horizontal: 'right', //left center right
              },
              variant: 'error', //success error info warning null
            })
          )
        }
        return Promise.reject(error)
      }
    )
  },
}
