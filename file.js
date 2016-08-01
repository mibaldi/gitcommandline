/**
 * Created by mikelbalducieldiaz on 29/7/16.
 */

var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    fs = require('fs'),
    Shell = require('shelljs'),
    path = require('path'),
    url = require('url'),
    methodOverride = require("method-override");
mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var extractPath = '/Users/mikelbalducieldiaz/mlmdata';
/*var gitFolder = '/Users/mbalduciel/Develop/gitcommand/beacon';
var remoteName = 'remoteProyect';
var token = 'mibaldi'
var remoteUrl = 'https://github.com/mibaldi/beacons-distance.git';
var remoteUrl2= 'https://github.com/Pabjimcas/IOS_MIMO_Server';*/
var router = express.Router();


router.get('/deleteFolders',function (req, res) {
    /*var dirs = fs.readdirSync(extractPath).filter(function (file) {
        return fs.statSync(path.join(extractPath, file));
        //return fs.statSync(path.join(extractPath, file)).isDirectory() && file.charAt(0) !== '.';
    });*/
    var now = new Date();
    var semanapasada = new Date(now.getTime() - (24*60*60*1000)*7);
    var yesterday = new Date(now.getTime() - (24*60*60*1000));
    var dirs = fs.readdirSync(extractPath);
    var dirValidos = {}
    for (var i in dirs) {
        var name = dirs[i];
        fs.statSync(path.join(extractPath,name));
        /*fs.statSync(path.join(extractPath,name), function(err, stats) {
            if (stats.mtime < yesterday){
                console.log("anterior a la semana pasada semana pasada",name);
            }else{
                console.log("posterior a la semana pasada",name);
            }
        });*/
    }
    res.send("ficheros borrados")
});

app.use(router);

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});