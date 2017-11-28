let express = require('express'),
	app = express();

const port = 5000;
app.set('port', port);


// Serve static files from the directories called 'assets' or 'dist'
app.use('/res', express.static(__dirname + '/res'));
app.use('/', express.static(__dirname + '/'));

//////////////// ROUTES ///////////////////

// Show index.html file as the home page
app.get('/', (request, response) => {
	console.log("User connected at " + Date.now());
	response.sendFile(__dirname + '/index.html');
});

////////////////////////////////////////////

// Start the web server
let server = app.listen(port, () => {
	console.log('Listening on port ' + server.address().port);
});
