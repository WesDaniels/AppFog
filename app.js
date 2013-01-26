/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , request = require('request')
  , jsdom = require('jsdom')

/*
 *  Setup Express
 */
var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/:view', function(req, res){
	loadView(req.params.view.split(".")[0], res);
});

app.get('*', function(req,res)
{
	console.log('called');
//	loadView('home', res);
});

app.listen(3000)
