
// setup routing
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider
    .when ('/', {
        templateUrl: 'pages/home/home.html',
        controller : 'homeController'
    })
    .when ('/view/:id', {
        templateUrl: 'pages/view/view.html',
        controller : 'viewController'
    })
    .otherwise({
        redirectTo: '/'
    })
}]);