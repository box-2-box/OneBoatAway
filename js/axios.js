var axios = require('axios');

function Axios() {

  function getJSON(url, callback)
  {
    axios.get(url)
      .then(response => {
        callback(response.data, response.status);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return {
    getJSON: getJSON
  }
}

module.exports = new Axios();
