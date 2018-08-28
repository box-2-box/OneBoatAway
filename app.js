var 
  axios = require('./js/axios'),
  app = require('express')(),
  serveStatic = require('serve-static'),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  open = require('open'),
  boat = require('./js/boat'),
  payload = {
    get: '',
    res: '',
    datetime: '',
    boat: []
  };


function get(url) {
  console.log("GET " + url)
  var time = Date.now();
  
  axios.getJSON(
    url,
    function(res, status) {
      
      var now = new Date(),
      hour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
      ampm = now.getHours() < 12 ? 'AM' : 'PM'; 
      
      payload.get = url;
      payload.res = `Status ${status} after ${Date.now() - time} ms`;
      payload.datetime = `${hour}:${('0'+now.getMinutes()).slice(-2)}:${('0'+now.getSeconds()).slice(-2)} ${ampm}`;
      payload.boat = res.vessellist.filter(boat => boat.route == "MUK-CL");
    
      console.log(payload.res);
      send(payload);
    }
  );
}

io.on('connection', function (socket) {
  console.log('connected');
  get('http://www.wsdot.com/ferries/vesselwatch/Vessels.ashx?dojo.preventCache=' + Date.now());

  var interval = setInterval(function () {
    get('http://www.wsdot.com/ferries/vesselwatch/Vessels.ashx?dojo.preventCache=' + Date.now());
  }, 30000);

  socket.on('disconnect', function () {
    clearInterval(interval);
    console.log('diconnected');
    process.exit();
  });
});

function send(data) {
  io.emit('data', data);
}

app.use(serveStatic('public'));

http.listen(3000, function () {
  console.log('listening on port 3000');
  open('http://localhost:3000');
});