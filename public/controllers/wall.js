// Wall controller

angular.module('fitman').controller('WallController', ['$scope', '$http', 'sharedProperties', 
function ($scope, $http, sharedProperties) {

    // Toastr notification settings
    $scope.toastrOpts = {
        positionClass: "toast-top-center",
        closeMethod: 'fadeOut',
        closeDuration: 300,
        closeButton: true
    };

    // Variables
    $scope.wallActivities = {};
    $scope.activeWallComments = {};
    $scope.activeWallActivity = {};

    // Display variables
    $scope.wallDisplay = true;
    $scope.activityWallDetailsDisplay = false;
    $scope.activityWallErrorDisplay = false;

    // Show/ Hide functions
    $scope.showActivitiesWallPanel = function () {
        $scope.wallDisplay = true;
        $scope.activityWallDetailsDisplay = false;
        $scope.activityWallErrorDisplay = false;
    };

    $scope.showActivityWallDetails = function (id) {
        $scope.wallDisplay = false;
        $scope.activityWallDetailsDisplay = true;
        $scope.activityWallErrorDisplay = false;

        $scope.setActiveWallActivity(id);
    };

    $scope.setActiveWallActivity = function (id) {
        // Call api
        $http({
            method: "GET",
            url: "http://localhost:9999/api/activity/" + id
        }).then(function mySuccess(response) {
            // Set active activity if exists
            if (response.data.result === "No records found") {
                console.log("error");
            } else {
                $scope.activityWallErrorDisplay = false;
                $scope.activeWallActivity = response.data.result;
            }
        }, function myError(response) {
            console.log(response);
        });
    };

    $scope.showWallComments = function (id) {
        // Call api
        $http({
            method: "GET",
            url: "http://localhost:9999/api/comment/activity/" + id
        }).then(function mySuccess(response) {
            // Set comments if any comments exist
            if (response.data.result === "No records found") {
                $scope.commentsWallExists = false;
            } else {
                $scope.commentsWallExists = true;
                $scope.activeWallComments = response.data.result;
            }

        }, function myError(response) {
            console.log(response);
        });
    };

    $scope.validateNewCommentFormAndSubmit = function (id) {
        var comment = $("#addCommentForm #textAreaComment").val();

        // Validate
        if (!comment) {
            $("#addCommentForm #textAreaComment").val("Comment cannot be empty!!!");

            return;
        }

        let model = {            
            message: comment,
            author: sessionStorage.getItem("username"), 
            deleted: false,
            activityId: id
        };

        console.log(model);

        model.id = Math.floor($scope.generateId(30, 1000)).toString();
        model.created = new Date();

        // Save comment
        $http({
            method: "POST",
            url: "http://localhost:9999/api/comment",
            data: model
        }).then(function mySuccess(response) {

            console.log(model);

            // Add comment
            if (response.data.result === "No records found") {
                console.log("error inserting comment");
            } else {
                toastr.options = $scope.toastrOpts;
                toastr.info('Comment created');

                $("#addCommentWall-" + id).modal("hide");

                //$scope.init();
            }

        }, function myError(response) {
            console.log(response);
        });
    }

    $scope.generateId = function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Initialise data
    $scope.init = function () {        
        $scope.isLoggedIn = sharedProperties.getLoginStatus();
        // Call api
        $http({
            method: "GET",
            url: "http://localhost:9999/api/activity/shared"
        }).then(function mySuccess(response) {
            // Set activities if any comments exist
            if (response.data.result === "No records found") {
                $scope.activitiesWallExists = false;
            } else {
                $scope.activitiesWallExists = true;
                $scope.wallActivities = response.data.result;
            }
        }, function myError(response) {
            console.log(response);
        });
    };

    $scope.init();


}]);