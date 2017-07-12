// Admin controller

angular.module('fitman').controller('AdminController', ['$scope', '$http', 'sharedProperties', 
function($scope, $http, sharedProperties){
    $scope.isLoggedIn = sharedProperties.getLoginStatus();
    $scope.isAdminUser = sharedProperties.getAdminStatus();
   
}]);