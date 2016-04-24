angular.module("TakePartMdl", [])

    .controller("TakePartCtrl", function ($http) {

        var vm = this;

        vm.sessions = [];
        
        vm.getSessions = function(){
            $http.get("/StartUp/php/router.php/sessions")
                .success(function(data, status, headers, config) {
                    if (Array.isArray(data.sessions)) {
                        data.sessions.forEach(function (entry) {
                            vm.sessions.push(entry);
                        });
                    }
                    console.log(vm.sessions);
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.getSessions();

        vm.stringToDate = function (stringDate){
            var date = new Date(stringDate);
            date.setDate(date.getDate() + 1);
            return date;
        };
    });