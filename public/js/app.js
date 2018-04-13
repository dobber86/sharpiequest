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
    })
    .when("/loot", {
        templateUrl : "views/loot.html",
        controller: "lootController"
    })
    .when("/dead", {
        templateUrl : "views/dead.html",
        controller: "deadController"
    })
    .when("/shop", {
        templateUrl: "views/shop.html",
        controller: "shopController"
    });
});