var app = angular.module("sharpieQuest", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/home.html",
        controller: "homeController"
    })
    .when("/combat", {
        templateUrl : "views/combat.html",
        controller: "combatController"
    });
});