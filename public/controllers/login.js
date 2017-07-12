// Login controller

angular.module('fitman').controller('LoginController', ['$scope', '$http', '$route', '$location', 'sharedProperties',
    function ($scope, $http, $route, $location, sharedProperties) {
        $scope.loginError = "";
        $scope.loginErrorDisplay = false;
        $scope.userRepo = [];

        $scope.logoutUser = function () {

            sharedProperties.setLoginStatus(false);
            $scope.$emit("logout", {
                loggedIn: false,
                isAdmin: false,
                username: ""
            });

            $location.path("/login");
        };

        $scope.showLoginPage = function () {
            $location.path("/login");
        };

        $scope.login = function () {
            let username = $("#inputUsername").val();
            let password = $("#inputPassword").val();

            // validate inputs
            if (!username) {
                $scope.loginError = "Username required";
                $scope.loginErrorDisplay = true;
            } else if (!password) {
                $scope.loginError = "Password required";
                $scope.loginErrorDisplay = true;
            } else {
                // find user from repo
                let selectedUser = $scope.userRepo.find(function (user) {
                    return user.username === username;
                });

                // if user doesnt exist kick error message
                if (!selectedUser) {
                    $scope.loginError = "Invalid credentials, try again";
                    $scope.loginErrorDisplay = true;
                } else {
                    // check password
                    if (selectedUser.password !== password) {
                        // password failed kick error
                        $scope.loginError = "Invalid credentials, try again";
                        $scope.loginErrorDisplay = true;
                    } else {
                        //successful login
                        $scope.loginError = "";
                        $scope.loginErrorDisplay = false;

                        sharedProperties.setLoginStatus(true);

                        let isAdmin = false;

                        // check admin status
                        if (selectedUser.role === "admin") {
                            sharedProperties.setAdminStatus(true);
                            isAdmin = true;
                        } else {
                            sharedProperties.setAdminStatus(false);
                        }

                        $scope.$emit("login", {
                            loggedIn: true,
                            isAdmin: isAdmin,
                            username: selectedUser.username
                        });

                        // Save username in session
                        sessionStorage['username'] = selectedUser.username;

                        $location.path("/wall");
                    }
                }
            }
        }

        $scope.init = function () {

            $scope.isLoggedIn = sharedProperties.getLoginStatus();

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

        $scope.init();

    }]);