var app = angular.module('fitman', ["ngRoute", "angularMoment"])
    .service("sharedProperties", function () {
        var isLoggedIn = false;
        var isAdminUser = false;
        var username = "";

        return {
            getLoginStatus: function () {
                return isLoggedIn;
            },
            setLoginStatus: function (value) {
                isLoggedIn = value;
            },
            getAdminStatus: function () {
                return isAdminUser;
            },
            setAdminStatus: function (value) {
                isAdminUser = value;
            },
             getUsername: function () {
                return username;
            },
            setUsername: function (value) {
                username = value;
            }
        };
    });

// Router config
app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "../views/login.html"
        })
        .when("/", {
            templateUrl: "../views/wall.html"
        })
        .when("/wall", {
            templateUrl: "../views/wall.html"
        })
        .when("/register", {
            templateUrl: "../views/register.html"
        })
        .when("/activity", {
            templateUrl: "../views/activity.html"
        })
        .when("/admin", {
            templateUrl: "../views/admin.html"
        })
        .when("/logout", {
            templateUrl: "../views/wall.html"
        })
});

angular.module('fitman').controller('AppController', ['$scope', '$http', '$route', 'sharedProperties',
    function ($scope, $http, $route, sharedProperties) {
        sharedProperties.setUsername("");

        $scope.$on("login", function (e, args) {           
            $scope.isLoggedIn = args.loggedIn;
            $scope.isAdminUser = args.isAdmin;
            $scope.username = args.username;
        });

        $scope.$on("logout", function (e, args) {
            sessionStorage.removeItem("username");
            $scope.isLoggedIn = args.loggedIn;
            $scope.isAdminUser = args.isAdmin;
            $scope.username = args.username;
        });
    }]);