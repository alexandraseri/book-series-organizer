var app = angular.module('books-app', []);
app.controller('books-controller', function($scope, $http, $location, $window){
    $scope.seriesName = '';

    $scope.addSeries = function(){
        var url = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/addSeries';
        $window.location.href = url;
    };

    $scope.createSeries = function(){
        console.log($scope.seriesName);
        $http.post('/series/save', {name: $scope.seriesName}, {headers: {'Content-Type': 'application/json'}}).then(function(response){
            if(response.data.errors){
                console.log('Errors!');
            } else {
                var url = $location.protocol() + '://' + $location.host() + ':' + $location.port();
                $window.location.href = url;
            }
        }).catch(function(){
            console.log('Server Error!');
        });
    }
});