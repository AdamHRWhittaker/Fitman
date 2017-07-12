// Register controller

angular.module('fitman').controller('RegisterController', ['$scope', '$http', '$route', '$location', 'sharedProperties',
    function ($scope, $http, $route, $location, sharedProperties) {
        $scope.registerError = "";
        $scope.registerErrorDisplay = false;
        $scope.userRepo = [];

        // Toastr notification settings
        $scope.toastrOpts = {
            positionClass: "toast-top-center",
            closeMethod: 'fadeOut',
            closeDuration: 300,
            closeButton: true
        };

        $scope.generateId = function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }


        $scope.init = function () {

            $scope.registerErrorDisplay = false;

            // Call api
            $http({
                method: "GET",
                url: "http://localhost:9999/api/user"
            }).then(function mySuccess(response) {
                // Set active activity if exists
                if (response.data.result === "No records found") {
                    console.log("error");
                } else {
                    $scope.userRepo = response.data.result;
                }
            }, function myError(response) {
                console.log(response);
            });

        }


        $scope.registerUser = function () {

            console.log("hit");

            let username = $("#inputUsername").val();
            let password = $("#inputPassword").val();

            // validate inputs
            if (!username) {
                $scope.registerError = "Username required";
                $scope.registerErrorDisplay = true;

                return;
            } else if (!password) {
                $scope.registerError = "Password required";
                $scope.registerErrorDisplay = true;

                return;
            } else {
                // find user from repo
                let selectedUser = $scope.userRepo.find(function (user) {
                    return user.username === username;
                });

                if (selectedUser) {
                    $scope.registerError = "Username taken, try again";
                    $scope.registerErrorDisplay = true;

                    return;
                } else {
                    //insert user

                    let user = {
                        id: Math.floor($scope.generateId(1, 1000)),
                        username: username,
                        password: password,
                        role: "user",
                        created: new Date(),
                        deleted: false
                    }

                    toastr.options = $scope.toastrOpts;

                    // Call api
                    $http({
                        method: "POST",
                        url: "http://localhost:9999/api/user",
                        data: user
                    }).then(function mySuccess(response) {
                        // error occured
                        if (response.data.result === "No records found") {
                            console.log("error inserting");
                        } else {
                            toastr.options = $scope.toastrOpts;
                            toastr.info('User created');
                            // get new data run init
                            $location.path("/login");
                        }
                    }, function myError(response) {
                        console.log(response);
                    });
                }
            }
        }

        $scope.init();
    }]);