const friends = require("../data/friends.js");

module.exports = function(app){

    app.get("/api/friends", function (req, res){
        res.json(friends);
    });

    app.post("/api/friends", function (req, res){
        let totalDifference = 0;
        const goodMatch = {
            name: "",
            photo: "",
            friendDif: 100
        };

        let userInput = req.body;
        let userName = userInput.name;
        let userScore = userInput.scores;

        let scoreNum = userScore.map(function(number){
            return parseInt(number,10);
        });

        userInput = {
            "name":req.body.name,
            "photo": req.body.photo,
            "scores": scoreNum
        };

        const sum = scoreNum.reduce ((a, b) => a + b, 0);

        for (let i=0; i<friends.length; i++){
            totalDifference = 0;
            const otherFriendScore = friends[i].scores.reduce ((a, b) => a + b, 0);
            totalDifference += Math.abs (sum - otherFriendScore);

            if (totalDifference <= goodMatch.friendDif){
                goodMatch.name = friends[i].name;
                goodMatch.photo = friends[i].photo;
                goodMatch.friendDif = totalDifference;
            }
        }

        friends.push(userInput);
        res.json(goodMatch);

    });

};