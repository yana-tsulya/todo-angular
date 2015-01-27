/**
 * Created by Yana on 1/27/15.
 */

(function(){
    function apiModelFunc(server, $http){
        return serverFunc = {
            postTasks:
                function(list) { // Houston, we have a problem
                    $http.post(server, list)
                        .success(function() {
                            console.log('everything ok, saved');
                        })
                        .error(function() {
                            console.log('server error, post');
                        })
                },
            getTasks:
                function(list) {
                    $http.get('http://localhost:1337/todo-angular') // Houston, we have a problem
                        .success(function(result) {
                            list = result.data || [];
                            angular.forEach(list, function(task) {
                                task.visibility = true;
                            });
                    }).
                    error(function() {
                        console.log('server error, get');
                    });

                }
        }
    }

    angular
        .module("apiModel", [])
        .constant('server', 'http://localhost:1337')
        .factory('api', apiModelFunc);
})();