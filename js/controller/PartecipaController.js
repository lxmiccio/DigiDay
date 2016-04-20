angular.module("PartecipaMdl", [])

    .controller("PartecipaCtrl", function ($http) {

        var vm = this;

        var sessions = [];

        vm.getSessions = function () {
            $http.get("/StartUp/php/router.php/sessions")
                .then(
                    function (json) {
                        if (!json.error) {
                            json.data.sessions.forEach(function (entry) {
                                vm.sessions.push(entry);
                            });
                        } else {
                            console.log(json);
                        }
                    }, function (json){
                        console.log(json);
                    }
                );
        };

        vm.getSessions();

    });