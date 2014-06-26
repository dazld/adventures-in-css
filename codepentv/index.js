
var noop = function() {};
var events = require('events');



function xhr(options) {

	options = options || {};

	var setup = {
		url: options.url || '',
		onload: options.onload || noop,
		type: options.type || 'GET',
		responseType: options.responseType || 'text'
	};

	console.log('xhring:',setup);

	var request = new XMLHttpRequest();
	request.open(setup.type, setup.url);
	request.onload = setup.onload;
	request.onerror = console.log.bind(console);
	request.responseType = setup.responseType;
	request.send();
	return request;
}

function getCP (options){
	var options = options || {};

	options.page = options.page || 1;
	options.tag = options.tag || '';
	options.done = options.done || noop;

	var feed = 'http://corsify.appspot.com/http://codepen.io/picks/feed/';

	
	return xhr({
		url: feed,
		onload: options.done
	});
}

getCP({
	done: function(xhr){
		alert();
		console.log(xhr.responseText)
	}
})

