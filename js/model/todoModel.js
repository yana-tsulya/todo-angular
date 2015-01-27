/**
 * Created by Yana on 1/27/15.
 */

(function(){

    function todoModel() {
        var tasks;
        tasks = api.getTasks(tasks);

        var todoData = {
            getTasks: function () {
                return tasks
            },
            addTask: function(newTask) {
                tasks.push({task: newTask, check: false, visibility: true});
            },
            deleteTask: function(el, idx) {
                tasks.splice(idx, 1);
            }
        };
        return todoData
    }

    angular
        .module("todoModel", [
            'apiModel'
        ])
        .factory("todos", todoModel)

})();