// Activity controller

angular.module('fitman').controller('ActivityController', ['$scope', '$http', 'sharedProperties',
    function ($scope, $http, sharedProperties) {

        // Toastr notification settings
        $scope.toastrOpts = {
            positionClass: "toast-top-center",
            closeMethod: 'fadeOut',
            closeDuration: 300,
            closeButton: true
        };

        // Variables
        $scope.userActivities = {};
        $scope.activeComments = {};
        $scope.activeActivity = {};

        $scope.activityError = "";

        // Display variables
        $scope.activitiesDisplay = true;
        $scope.addActivityFormDisplay = false;
        $scope.activityDetailsDisplay = false;
        $scope.editActivityFormDisplay = false;
        $scope.activityErrorDisplay = false;

        // Show/ Hide functions
        $scope.showAddActivityForm = function () {
            $scope.activitiesDisplay = false;
            $scope.addActivityFormDisplay = true;
            $scope.activityDetailsDisplay = false;
            $scope.editActivityFormDisplay = false;
            $scope.activityErrorDisplay = false;

            $scope.clearActivityForm();
        };

        $scope.showEditActivityForm = function (id) {
            $scope.activitiesDisplay = false;
            $scope.addActivityFormDisplay = false;
            $scope.activityDetailsDisplay = false;
            $scope.editActivityFormDisplay = true;
            $scope.activityErrorDisplay = false;

            $scope.setActiveActivity(id);
        };

        $scope.showActivitiesPanel = function () {
            $scope.activitiesDisplay = true;
            $scope.addActivityFormDisplay = false;
            $scope.activityDetailsDisplay = false;
            $scope.editActivityFormDisplay = false;
            $scope.activityErrorDisplay = false;
        };

        $scope.showActivityDetails = function (id) {
            $scope.activitiesDisplay = false;
            $scope.addActivityFormDisplay = false;
            $scope.activityDetailsDisplay = true;
            $scope.editActivityFormDisplay = false;
            $scope.activityErrorDisplay = false;

            $scope.setActiveActivity(id);
        };

        // Action functions
        $scope.shareUnshareActivity = function (id) {

            toastr.options = $scope.toastrOpts;

            // Call api get activity to share
            $http({
                method: "GET",
                url: "http://localhost:9999/api/activity/" + id
            }).then(function mySuccess(response) {
                // Set active activity if exists
                if (response.data.result === "No records found") {
                    console.log("error");
                } else {
                    let activity = response.data.result[0];

                    // set shared flag
                    if (activity.shared) {
                        activity.shared = false;
                        toastr.info('Activity unshared');
                    } else {
                        activity.shared = true;
                        toastr.info('Activity shared');
                    }

                    // Call api update activity
                    $http({
                        method: "PUT",
                        url: "http://localhost:9999/api/activity",
                        data: activity
                    }).then(function mySuccess(response) {
                        // error occured
                        if (response.data.result === "No records found") {
                            console.log("error updating");
                        } else {
                            // get new data run init
                            $scope.init();
                            $scope.showActivitiesPanel();
                        }
                    }, function myError(response) {
                        console.log(response);
                    });
                }
            }, function myError(response) {
                console.log(response);
            });
        };

        $scope.setActiveActivity = function (id) {
            // Call api
            $http({
                method: "GET",
                url: "http://localhost:9999/api/activity/" + id
            }).then(function mySuccess(response) {
                // Set active activity if exists
                if (response.data.result === "No records found") {
                    console.log("error");
                } else {
                    $scope.activityErrorDisplay = false;
                    $scope.activeActivity = response.data.result;
                }
            }, function myError(response) {
                console.log(response);
            });
        };

        // Modals
        $scope.confirmDeletion = function (id) {
            // Call api
            $("#activityDelete" + id + " .close").click();

            $http({
                method: "POST",
                url: "http://localhost:9999/api/activity/" + id
            }).then(function mySuccess(response) {
                if (response.data.result === "No records found") {
                    console.log(response);
                } else {

                }
            }, function myError(response) {
                console.log(response);
            });
        };

        $scope.showComments = function (id) {
            // Call api
            $http({
                method: "GET",
                url: "http://localhost:9999/api/comment/activity/" + id
            }).then(function mySuccess(response) {
                // Set comments if any comments exist
                if (response.data.result === "No records found") {
                    $scope.commentsExists = false;
                } else {
                    $scope.commentsExists = true;
                    $scope.activeComments = response.data.result;
                }

            }, function myError(response) {
                console.log(response);
            });
        };

        // Validation
        $scope.validateActivityFormAndSubmit = function (formId) {
            // Get values and validate
            var name = $("#" + formId + " #inputName").val();
            var startDate = $("#" + formId + " #inputStart").val();
            var endDate = $("#" + formId + " #inputEnd").val();
            var calories = $("#" + formId + " #inputCalories").val();
            var shared = $("#" + formId + " #checkboxShare").is(":checked");

            if (!name) {
                $scope.activityError = "A name must be supplied";
                $scope.activityErrorDisplay = true;
            } else if (!startDate) {
                $scope.activityError = "A start date must be supplied";
                $scope.activityErrorDisplay = true;
            } else if (!endDate) {
                $scope.activityError = "A end date must be supplied";
                $scope.activityErrorDisplay = true;
            } else if (!calories) {
                $scope.activityError = "A calories count must be supplied";
                $scope.activityErrorDisplay = true;
            } else {
                // validation passed 
                $scope.activityError = "";
                $scope.activityErrorDisplay = false;

                // create model to update or insert
                let model = {
                    name: name,
                    start: startDate,
                    end: endDate,
                    shared: shared,
                    calories: calories
                };

                // Edit mode
                if (formId === "editActivityForm") {
                    model.id = $scope.activeActivity[0].id,
                        model.created = $scope.activeActivity[0].created,
                        model.deleted = $scope.activeActivity[0].deleted,
                        model.comments = $scope.activeActivity[0].comments

                    // Call api
                    $http({
                        method: "PUT",
                        url: "http://localhost:9999/api/activity",
                        data: model
                    }).then(function mySuccess(response) {
                        // error occured
                        if (response.data.result === "No records found") {
                            console.log("error updating");
                        } else {
                            toastr.options = $scope.toastrOpts;
                            toastr.info('Activity updated');
                            // get new data run init
                            $scope.init();
                            $scope.showActivitiesPanel();
                        }
                    }, function myError(response) {
                        console.log(response);
                    });
                } else {

                    // insert new
                    model.id = Math.floor($scope.generateId(1, 1000));
                    model.created = new Date().toLocaleString();
                    model.deleted = false;
                    model.comments = null;

                    // Call api
                    $http({
                        method: "POST",
                        url: "http://localhost:9999/api/activity",
                        data: model
                    }).then(function mySuccess(response) {
                        // error occured
                        if (response.data.result === "No records found") {
                            console.log("error updating");
                        } else {
                            toastr.options = $scope.toastrOpts;
                            toastr.info('Activity created');
                            // get new data run init
                            $scope.init();
                            $scope.showActivitiesPanel();
                        }
                    }, function myError(response) {
                        console.log(response);
                    });
                }
            }
        };

        $scope.clearActivityForm = function () {
            $("#addActivityForm #inputName").val("");
            $("#addActivityForm #inputStart").val("");
            $("#addActivityForm #inputEnd").val("");
            $("#addActivityForm #inputCalories").val("");
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
                url: "http://localhost:9999/api/activity"
            }).then(function mySuccess(response) {
                // Set activities if any comments exist
                if (response.data.result === "No records found") {
                    $scope.activitiesExists = false;
                } else {
                    $scope.activitiesExists = true;
                    $scope.userActivities = response.data.result;
                }
            }, function myError(response) {
                console.log(response);
            });

            // set up datepickers
            $("#editActivityForm #inputStart").datetimepicker();
            $("#editActivityForm #inputEnd").datetimepicker();
            $("#addActivityForm #inputStart").datetimepicker();
            $("#addActivityForm #inputEnd").datetimepicker();
        };

        $scope.init();
    }]);

