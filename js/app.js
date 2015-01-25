/**
 * Created by yana on 1/22/15.
 */

(function() {
    angular.module("todoMain", [])
        .controller('MainController', function($scope, $http) {
            $scope.todoList = [];
            $scope.checkAllState = "Check all tasks";
            $scope.showAll = 'active';

            $http.get('http://localhost:1337/todo-angular'). // Houston, we have a problem
                success(function(result) {
                    $scope.todoList = result.data || [];
                    angular.forEach($scope.todoList, function(task) {
                        task.visibility = true;
                    });
                }).
                error(function() {
                    console.log('server error, get');
                });

            doneTaskCount();

            $scope.addTask = function() {
                $scope.todoList.push({task: $scope.newTask, check: "", visibility: true});
                $scope.newTask = "";

            };

            $scope.checkTask = function(el) {
                var idx = $scope.todoList.indexOf(el);
                if (!$scope.todoList[idx].check) {
                    $scope.todoList[idx].check = "checked";
                }
                else {
                    $scope.todoList[idx].check = "";
                }

                doneTaskCount();
                checkAllTest()
            };
            $scope.deleteTask = function(el) {
                var idx = $scope.todoList.indexOf(el);
                $scope.todoList.splice(idx, 1);

                doneTaskCount();
                checkAllTest()
            };
            $scope.editTask = function(el) {
                var idx = $scope.todoList.indexOf(el),
                    editedTaskText = $scope.todoList[idx].task;
                $scope.todoList.splice(idx, 1);
                $scope.newTask = editedTaskText;

                doneTaskCount();
                checkAllTest()
            };

            $scope.checkAll = function() {
                if ($scope.todoList != 0) {
                    if ($scope.checkAllState == "Check all tasks") {
                        angular.forEach($scope.todoList, function(task) {
                            if (!task.check) {task.check = "checked"}
                        });
                        $scope.checkAllState = "UnCheck all tasks";
                    }
                    else {
                        angular.forEach($scope.todoList, function(task) {
                            if (task.check) {task.check = ""}
                        });
                        $scope.checkAllState = "Check all tasks";
                    }
                }
                else {
                    alert('You should enter your tasks first!');
                }
            };

            $scope.deleteAll = function() {
                if ($scope.todoList.length != 0) {
                    $scope.todoList = [];
                }
                else {
                    alert('You should enter your tasks first!');
                }
            };
            $scope.deleteDone = function() {
                angular.forEach($scope.todoList, function(task) {
                    if (task.check) {
                        var idx = $scope.todoList.indexOf(task);
                        $scope.todoList.splice(idx, 1);
                    }
                });
            };

            $scope.allActive = function() {
                angular.forEach($scope.todoList, function(task) {
                    task.visibility = true;
                });
                $scope.showAll = 'active';
                $scope.showDone = '';
                $scope.showNotDone = '';
            };
            $scope.doneActive = function() {
                angular.forEach($scope.todoList, function(task) {
                    if (task.check) {
                        task.visibility = true;
                    }
                    else {
                        task.visibility = false;
                    }
                });
                $scope.showAll = '';
                $scope.showDone = 'active';
                $scope.showNotDone = '';
            };
            $scope.notDoneActive = function() {
                angular.forEach($scope.todoList, function(task) {
                    if (task.check) {
                        task.visibility = false;
                    }
                    else {
                        task.visibility = true;
                    }
                });
                $scope.showAll = '';
                $scope.showDone = '';
                $scope.showNotDone = 'active';
            };

            $scope.saveTasks = function() { // Houston, we have a problem
                $http.post('http://localhost:1337/todo-angular', $scope.todoList).
                    success(function() {
                        console.log('everything ok, saved');
                    }).
                    error(function() {
                        console.log('server error, post');
                    });
            };

        //    Functions
            function doneTaskCount() {
                $scope.doneTasks = 0;
                angular.forEach($scope.todoList, function(task) {
                    if (task.check) {$scope.doneTasks++}
                });
            }

            function checkAllTest() {
                if ($scope.todoList.length == $scope.doneTasks) {
                    $scope.checkAllState = "UnCheck all tasks";
                }
                else {
                    $scope.checkAllState = "Check all tasks";
                }
            }
        })
})();
