/**
 * Created by yana on 1/22/15.
 */

(function() {
    angular.module("todoMain", [])
        .controller('MainController', function($scope, $http) {
            $scope.todoList = [];
            $scope.checkAllState = "Check all tasks";

            function doneTaskCount() {
                var count = 0;
                angular.forEach($scope.todoList, function(task) {
                    if (task.check) {count++}
                });
                $scope.doneTasks = count;
            }

            doneTaskCount();

            function checkAllTest() {
                if ($scope.todoList.length == $scope.doneTasks) {
                    $scope.checkAllState = "UnCheck all tasks";
                }
                else {
                    $scope.checkAllState = "Check all tasks";
                }
            }

            $http.get('http://localhost:1337/todo-angular'). // Houston, we have a problem
                success(function(result) {
                    $scope.todoList = result.data || [];
                }).
                error(function() {
                    console.log('server error, get');
                });

            $scope.addTask = function() {
                $scope.todoList.push({task:$scope.newTask, check:""});
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


            $scope.saveTasks = function() { // Houston, we have a problem
                $http.post('http://localhost:1337/todo-angular', $scope.todoList).
                    success(function() {
                        console.log('everything ok, saved');
                    }).
                    error(function() {
                        console.log('server error, post');
                    });
            }

        })
})();
