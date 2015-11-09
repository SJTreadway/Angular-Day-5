var app = angular.module('nbaRoutes');
// the resolved data from the router needs to be injected into the controller
app.controller('teamCtrl', function ($scope, $stateParams, teamData, teamService) {
  $scope.teamData = teamData;
  console.log($scope.teamData)
  $scope.newGame = {};
  $scope.showNewGameForm = false;
  $scope.toggleNewGameForm = function() {
    $scope.showNewGameForm = !$scope.showNewGameForm;
  };

  if ($stateParams.team === 'utahjazz') {
    $scope.homeTeam = 'utahjazz';
    $scope.logoPath = 'images/jazz-logo.png';
  } else if ($stateParams.team === 'losangeleslakers') {
    $scope.homeTeam = 'losangeleslakers';
    $scope.logoPath = 'images/lakers-logo.png';
  } else if ($stateParams.team === 'miamiheat') {
    $scope.homeTeam = 'miamiheat';
    $scope.logoPath = 'images/heat-logo.png';
  }

  $scope.submitGame = function() {
    $scope.newGame.homeTeam = $scope.homeTeam.split('').join('').toLowerCase();
    teamService.addNewGame($scope.newGame)
      .then(function(res) {
        return teamService.getTeamData($stateParams.team)
      })
      .then(function(data) {
        console.log(data)
        $scope.teamData = data;
        console.log($scope.teamData);
        $scope.newGame = {};
        $scope.showNewGameForm = false;
      });
  }

});
