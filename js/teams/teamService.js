var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {

    // service code
    this.addNewGame = function(gameObj) {
      var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
      if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
        gameObj.won = true;
      } else {
        gameObj.won = false;
      }
        return $http({
        method: 'POST',
        url: url,
        data: gameObj,
      });
    };

    this.getTeamData = function(team) {
      var deferred = $q.defer();
      console.log('team', team)
      var url = 'https://api.parse.com/1/classes/' + team + '?order=-createdAt';
      $http({
        method: 'GET',
        url: url,
      }).then(function(data) {
        console.log('data:', data)
        var results = data.data.results;
        var wins = 0;
        var losses = 0;
        for (var i = 0; i < results.length; i++) {
          if (results[i].won === true) {
            wins++;
          } else {
            losses++;
          }
        }
        var responseObj = {
          gamesArray: results,
          wins: wins,
          losses: losses,
        };
        deferred.resolve(responseObj);
      })
        return deferred.promise;
    }
});
