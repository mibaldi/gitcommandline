var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    fs = require('fs'),
    Shell = require('shelljs'),
    path = require('path'),
    GitCommandLine = require('git-command-line'),
    url = require('url'),
    methodOverride = require("method-override");
mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var Git = require("nodegit");
var extractPath = '/Users/mikelbalducieldiaz/mlmdata';
var gitFolder = '/Users/mbalduciel/Develop/gitcommand/beacon';
var remoteName = 'remoteProyect';
var token = 'mibaldi'
var remoteUrl = 'https://github.com/mibaldi/beacons-distance.git';
var remoteUrl2= 'https://github.com/Pabjimcas/IOS_MIMO_Server';
var GitCommandLine = new GitCommandLine(gitFolder);
var router = express.Router();

router.get('/', function(req, res) {
    Git.Clone(remoteUrl, gitFolder).then(function(repository) {
        console.log("repository");

        Git.Repository.open(gitFolder).then(function(repository) {
            Shell.cd(gitFolder);
            repository.getReferenceNames(3).then(function(array) {
                var branchesArray = array.filter(function(item){
                    return !!~item.indexOf('remotes/');
                }).map(function(item){
                    return item.split('remotes/')[1];
                });
                console.log(branchesArray);
            }).catch(function (err){
                console.error("Error fetching branches");
            });
        });

    })/*
    var response = {};
    var parsedURL = url.parse(remoteUrl2);
    var credentialsURL = parsedURL.protocol
        + '//' + 'mibaldi'
        + ':' + 'PASS'
        + '@' + parsedURL.hostname
        + parsedURL.pathname;
    //Git.Clone(remoteUrl, gitFolder).then(function(repository) {
    //Shell.rm('-rf', gitFolder).then(function(){
        Git.Clone(credentialsURL, gitFolder).then(function(repository) {
            console.log("repository");
            repository.getReferenceNames(3).then(function(array) {
                var branchesArray = array.filter(function(item){
                    return !!~item.indexOf('remotes/origin/');
                }).map(function(item){
                    return item.split('remotes/origin/')[1];
                });

                console.log(branchesArray);
                res.setHeader('Content-Type', 'application/json');
                response.branchs = branchesArray;
                response.status = 'OK';
                res.send(response);

                Shell.rm('-rf', gitFolder)
            }).catch(function (err){
                console.error("Error fetching branches");
            });
        }).catch(function(err){
            console.log(err);
        });
    //});*/

    /*Branch.iteratorNew(remoteUrl,2).then(function(branchIterator) {
        console.log("branchiterator");
    });*/
   // res.send("Hello World!");
});
router.post('/cloneRepo', function(req, routeResponse) {
    var repo = req.body.url;
    var branchRepo = req.body.branch;
    var response = {};
    GitCommandLine.direct('clone -b '+ branchRepo + " "+repo + " "+ gitFolder).then(function(res){
        console.log(res);
        console.log("copiado");

        response.status = "200";
        routeResponse.send(response);
    }).catch(function(err){
        console.log(err);
        console.log("fail");
        response.status = "600";
        routeResponse.send(response);
    });
    console.log("hola");
});

router.get('/deleteFolders',function (req, res) {
    var dirs = fs.readdirSync(extractPath).filter(function (file) {
        return fs.statSync(path.join(extractPath, file));
        //return fs.statSync(path.join(extractPath, file)).isDirectory() && file.charAt(0) !== '.';
    });
    var mtime = dirs[0].mtime;
    console.log("directorios",mtime);
    res.send("ficheros borrados")
});

app.use(router);

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});
