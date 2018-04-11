app.controller('signinController',  function($scope, $http) {
    
    $scope.signin = {
        username: "",
        password: "",
        hp: 10,
        mp: 5,
        power: 1,
        resistance: 1,
        accuracy: 8,
        insight: 1,
        specialpower: 1,
        xp: 1,
        level: 1
    },

    $scope.doSignin = function () {
        console.log("in signin");
        if ($scope.signin.username === "") {
            $scope.signinResponse = "No username entered. I know, it's difficult.";
        } else if ($scope.signin.password === "") {
            $scope.signinResponse = "No password entered. It's better to enter one.";
        } else {
            $http.post('/checkUsername', angular.toJson($scope.signin))
            .then(function (response) {
                console.log("Checking Username");
                if (response.status == "204") {
                    $http.post('/signin', angular.toJson($scope.signin))
                    .then(function (response) {
                        console.log("Saving Sign In");
                    });
                    $scope.signinResponse = "Signing in succesful. Good job!";
                } else if (response.status == "200") {
                    $scope.signinResponse = "Accountname already exists. Someone already beat you!";
                } else {
                    $scope.signinResponse = "Not possible";
                }
            })

            
        };
    };
});