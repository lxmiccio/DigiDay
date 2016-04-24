angular.module("TakePartMdl", [])

    .controller("TakePartCtrl", function ($http) {

        var vm = this;

        vm.sessions = [];
        
        vm.getSessions = function(){
            $http.get("/StartUp/php/router.php/sessions/calendar")
                .success(function(data, status, headers, config) {
                    if (Array.isArray(data.sessions)) {
                        data.sessions.forEach(function (entry) {
                            vm.sessions.push(entry);
                        });
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.getSessions();

    });