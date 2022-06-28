async function loginAsync(email, password, callback) {
  //should be updated as new versions of axios are made available (https://auth0-extensions.github.io/canirequire/#axios)
  const axios = require("axios@0.22.0");

  let response;

  try {
    response = await axios.post(
      //store API url in connection settings to better support SDLC environments
      configuration.baseAPIUrl + "/login",
      //user credentials passed as request body
      {
        email: email,
        password: password,
      },
      {
        timeout: 10000, //end call gracefully if request times out so script can do necessary callback
        headers: {
          //securing api call with apiKey stored in connection settings.
          //quick and easy approach however using M2M tokens is more secure as
          // a secret must not be shared between client and API.
          "x-api-key": configuration.apiKey,
        },
      }
    );
  } catch (e) {
    if (e.response.status === 404) {
      //assuming api returns 404 when email/username/password invalid
      return callback(
        new WrongUsernameOrPasswordError(email, "Invalid credentials provided.")
      );
    }
    //callback for any other error type
    return callback(new Error(e.message));
  }

  try {
    let user = response.data;

    //if using multiple custom db connections in your tenant prefix the
    //user_id with a connection specific key ex: "connName|" + user.user_id
    //this ensures unique user ids across all db connections
    return callback(null, {
      user_id: user.user_id,
      email: user.email,
    });
  } catch (e) {
    return callback(new Error(e.message));
  }
}
