var path = require('path');

var friendsData = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        var userInput = req.body;

        var userAnswers = userInput.scores;
        console.log("User answers " + userAnswers);

        var matchName = " ";
        var matchPhoto = " ";
        var totalDifference = 1000;



        for (var i = 0; i < friendsData.length; i++) {
            var diff = 0;


            for (var x = 0; x < userAnswers.length; x++) {
                diff += Math.abs(friendsData[i].scores[x] - userAnswers[x]);

            }

            if (diff < totalDifference) {
                totalDifference = diff;
                console.log("total difference: " + totalDifference);
                matchName = friendsData[i].name;
                matchPhoto = friendsData[i].photo;
            } 

        }

        friendsData.push(userInput);
        res.json({ status: 'OK', matchName: matchName, matchPhoto: matchPhoto });

    });

}