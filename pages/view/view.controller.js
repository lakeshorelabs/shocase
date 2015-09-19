// view personal profile controller
app.controller("viewController",['$scope','$routeParams','$log','peopleService','projectService',function($scope,$routeParams,$log,peopleService,projectService) {

    // user id
    var id=$routeParams.id;

    $scope.id=id; // user id
    $scope.person=null; // person stack
    $scope.projects=null; // projects stack
    $scope.showView="projects"; // mode for viewing

    // fetch person data
    peopleService.queryPerson(id);

    // fetch project data
    projectService.queryProjects(id);

    // return month
    $scope.setMonth=function(m) {
        var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
        return months[(m-1)];
    }

    // set current view
    $scope.setView=function(m) {
        $scope.showView=m;
    }

    // watch personResult broadcast for updates
    $scope.$on("personResult",function(e) {
        $scope.person=peopleService.getPerson();
        $scope.personLoaded=true;
    });

    // watch projectResult broadcast for updates
    $scope.$on("projectResult",function(e) {
        $scope.projects=projectService.getProjectList();
    });

}]);