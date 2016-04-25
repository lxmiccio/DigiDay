angular.module("UserProfileMdl", [])

    .controller("UserProfileCtrl", function ($http) {

        var vm = this;

        vm.user = {};

        vm.getUser = function () {
            $http.get("/StartUp/php/router.php/user/me")
                .success(function(data, status, headers, config) {
                    if(data.error) {
                        console.log(data);
                    } else {
                        vm.user.fresher = data.user.fresher;
                        vm.user.firstName = data.user.firstName;
                        vm.user.lastName = data.user.lastName;
                        vm.user.email = data.user.email;
                        vm.user.birthdate = data.user.birthdate;
                        vm.user.role = data.user.role;
                        vm.user.sex = data.user.sex;
                        vm.user.photo = data.user.photo;
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

        vm.getUser();

        vm.session = [];
        
        vm.sessions = [];
        
        vm.getSessions = function(){
            $http.get("/StartUp/php/router.php/user/sessions")
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

        vm.stringToDate = function (stringDate){
            var date = new Date(stringDate);
            date.setDate(date.getDate() + 1);
            return date;
        };

    });