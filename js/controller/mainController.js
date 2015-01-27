/**
 * Created by Yana on 1/27/15.
 */

(function(){
    function mainController($scope, $http) {
        $scope.todoList = todos.getTask;


        //$scope.checkAllState = "Check all tasks";
        //$scope.showAll = 'active';



        $scope.doneTasks = doneTaskCount($scope.todoList);

        $scope.addTask = function() {
            todoData.addTask($scope.newTask);
            $scope.newTask = '';
        };

        $scope.checkTask = function(el, idx) {
            $scope.todoList[idx].check = !$scope.todoList[idx].check;

            $scope.doneTasks = doneTaskCount($scope.todoList);
            $scope.checkAllState = checkAllTest($scope.todoList, $scope.doneTasks)
        };
        $scope.deleteTask =
        $scope.editTask = function(el, idx) {
            $scope.newTask = $scope.todoList[idx].task;
            $scope.todoList.splice(idx, 1);

            $scope.doneTasks = doneTaskCount($scope.todoList);
            $scope.checkAllState = checkAllTest($scope.todoList, $scope.doneTasks)
        };

        $scope.checkAll = function() {
            if ($scope.todoList != 0) {
                if ($scope.checkAllState == "Check all tasks") {
                    angular.forEach($scope.todoList, function(task) {
                        if (!task.check) {task.check = true}
                    });
                    $scope.checkAllState = "UnCheck all tasks";
                }
                else {
                    angular.forEach($scope.todoList, function(task) {
                        if (task.check) {task.check = false}
                    });
                    $scope.checkAllState = "Check all tasks";
                }
                $scope.doneTasks = doneTaskCount($scope.todoList);
            }
            else {
                alert('You should enter your tasks first!');
            }
        };

        $scope.deleteAll = function() {
            if ($scope.todoList.length != 0) {
                $scope.todoList = [];
                $scope.doneTasks = doneTaskCount($scope.todoList);
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
            $scope.doneTasks = doneTaskCount($scope.todoList);
        };

        //$scope.allActive = function() {
        //    angular.forEach($scope.todoList, function(task) {
        //        task.visibility = true;
        //    });
        //    $scope.showAll = 'active';
        //    $scope.showDone = '';
        //    $scope.showNotDone = '';
        //};
        //$scope.doneActive = function() {
        //    angular.forEach($scope.todoList, function(task) {
        //        if (task.check) {
        //            task.visibility = true;
        //        }
        //        else {
        //            task.visibility = false;
        //        }
        //    });
        //    $scope.showAll = '';
        //    $scope.showDone = 'active';
        //    $scope.showNotDone = '';
        //};
        //$scope.notDoneActive = function() {
        //    angular.forEach($scope.todoList, function(task) {
        //        if (task.check) {
        //            task.visibility = false;
        //        }
        //        else {
        //            task.visibility = true;
        //        }
        //    });
        //    $scope.showAll = '';
        //    $scope.showDone = '';
        //    $scope.showNotDone = 'active';
        //};

        $scope.saveTasks =

        //    Functions
        function doneTaskCount(list) {
            var count = 0;
            angular.forEach(list, function(task) {
                if (task.check) {count++}
            });
            return count
        };

        function checkAllTest(list, done) {
            if (list.length == done) {
                return "UnCheck all tasks";
            }
            else {
                return "Check all tasks";
            }
        }
    }

    angular
        .module("mainController", ['todoModel'])
        .controller('mainController', mainController)
})();