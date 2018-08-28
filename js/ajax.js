var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function Ajax() {
  var xhr = new XMLHttpRequest();
  var time;

  function getJSON(url, callback) {
    xhr.open('GET', url);
    console.log('GET ' + url);
    time = Date.now();
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(`Status ${xhr.status} after ${Date.now() - time} ms
        `);
        callback(JSON.parse(xhr.responseText));
      } else {
        console.log('Request failed. Returned status of ' + xhr.status);
      }
    }
    xhr.send();
  }

  function postJSON(url, data, callback) {
    xhr.open('POST', url);
    xhr.setHeader();
    xhr.onload = function() {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        console.log('Request failed. Returned status of ' + xhr.status);
      }
    }
    xhr.send(data);
  }

  return {
    getJSON: getJSON,
    postJSON: postJSON
  }
}





module.exports = new Ajax();
