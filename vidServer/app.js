
var http = require('http');

var fs = require('fs');

var path = require('path');

var globalSQL = "hello!";

//  var exp = require('express');


http.createServer(function (req, res) {
    // res.writeHead(200, 'Content-Type');


    var filePath = path.join(__dirname, "myfile.mp3");

    var songFilesPath = "C:\\Users\\Admin\\Desktop\\youtubeVidyabot\\youtubeVidyabot\\bin\\Debug\\mp3s";

    //login, request user id from server. 
    if (req.url.includes("login")) {
        var urldata = req.url;
        var parts = urldata.split("&");
        var uname = parts[1];
        var pw = parts[2];
        uname = uname.split("=").pop(); //trim everything before the = sign 
        pw = pw.split("=").pop(); //trim everything before the = sign 

        //now they just contain data. 

        //look up some db stuff in here or something MAKE SURE UNAME AND PW ARE VALID LOL 

        //finally send a user_name 
        res.write("leo_");
        res.end();


    }

    //first requets - user requests to see if any songs have been downloaded for them. FIRST 
    if (req.url.includes("check")) {
        //SECOND 
        //get data from url about user
        //check their song list on file. 
        var urldata = req.url;
        var parts = urldata.split("&");
        var uid = parts[1];

        fs.readFile(uid + ".txt", "utf8", function (err, data) {
            //there should just be 1 number 
            res.write(data);
            res.end();
        });


        //THIRD
        //send song ids or 0 response if there are no songs for the user 
    }

    //FOURTH 
    //user requests for a song, check if it exists and send it to them else nothing 
    if (req.url.includes("some_songID")) {
        //FIFTH 
        //read the song from the file and pipe it to the user if it exists , so nor swlwrw ir. 

    }

    if (req.url.includes("getsonglist")) {//send the user their song list from the file 
        var urldata = req.url;
        var parts = urldata.split("&");
        var uid = parts[1];

        var songListPath = path.join(__dirname + "songlists" + uid + ".txt");


        fs.readFile(songListPath, "utf8", function (err, data) {

            if (data.length > 1) {
                res.write(data);
                res.end();
            } else {
                res.write("NO_NEW_SONGS");
                res.end();
            }
        });


    }

    if (req.url.includes("gotsongs_OK")) {//response code from the client meaning songlist is received, once this is ok, delete their songlist 
        var urldata = req.url;
        var parts = urldata.split("&");
        var uid = parts[1];

        var songlists_path = path.join(__dirname + "songlists" + uid + ".txt");

        fs.unlink(songlists_path, function (err) {
            if (err) {

            }
        });

    }


    if (req.url.includes("read")) {                         //this could be data about what songs are new or the total song list. 
        fs.readFile("fname.txt", "utf8", function (err, data) {
            //lets say this file contains some text data needed to send stuff to the user just try reading it 
            var splitdata = data.split(';');

            //res.writeHead(200, { 'Content-Type': 'text/html' });
            //res.setHeader("content-type", "some/type");

            for (var i = 0; i < splitdata.length; i++) {
                //res.write(splitdata[i]);
                //the url will also contain the song name since the client has already obtained a song list. 
                fs.createReadStream(filePath).pipe(res);
            }


            res.end();
        });
    }


    if (req.url.includes("getsongs")) {             //in this case here getsongs is an indicator of a particular song, since songs wont be deleted, just downloaded this can be reused. 
        var urldata = req.url;
        var parts = urldata.split("&");
        var songname = parts[1];

        //  var songPath = songFilesPath + "\\" + songname + ".mp3";
        var songPath = path.join(__dirname, songname + ".mp3");     //notice here that the song has to be in the same directory as the server, otherwise it cant read it or something 

        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': 343434343,
            'Content-Disposition': 'attachment; filename=your_file_name'
        });

        //res.setHeader("content-type", "some/type"); //the url will also contain the song name since the client has already obtained a song list. 

        fs.createReadStream(songPath).pipe(res);

        //        res.setHeader('Content-Disposition', 'filename="'+songname + '".mp3"');
    } else {
        // next(); // not our concern, pass along to next middleware function

    }

    if (req.url.includes("website")) {
        fs.readFile("index.html", "utf8", function (err, data) {
            //res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });


    }
    //res.end();

}).listen(1337);