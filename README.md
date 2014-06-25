rocket-fuel-server
==================

drinks api




UPDATE fra jonas -- 25.06.14:


har lavet en auth route som kan validere at app'en er the real deal.

---- 

URL: /auth 
Methods: POST, GET 
Response: JSON
● (string) token

Parameters: 
● authorization: 'rocketFuelConsole'

----

flowet bliver så:

1) at app init:
    post 'rocketFuelConsole' to /auth and store (localstorage/session/webSQL) response token

2) use interceptor to add the request header:
    Authorization: Bearer <token>


example angular interceptor


// Authorization interceptor - checks session storage for token before requests

.factory('authInterceptor', function ($rootScope, $q, $window) {

  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
      }
      return $q.reject(rejection);
    }
  };
})

// sets up the interceptor to http requests

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })


