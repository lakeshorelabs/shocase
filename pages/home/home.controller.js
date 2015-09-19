// home page controller
app.controller("homeController",['$scope','peopleService','navService',function($scope,peopleService,navService) {

    $scope.personKeyword=null; // keyword for search
    $scope.personKeywordCopy=null; // dup of keyword
    $scope.people=null; // people stack
    $scope.finishedSearch=false; // real time search status

    // refresh contents
    $scope.refresh=function() {
        $scope.finishedSearch=false;
        $scope.personKeyword=navService.getLastKeyword();
        peopleService.queryPeople($scope.personKeyword);
    }

    // if we are returning from successful search use last keyword
    if (navService.getLastKeyword()) {
        $scope.refresh();
    }

    // return last keyword
    $scope.getLastKeyword=function() {
        return navService.getLastKeyword();
    }

    // control start index
    $scope.setStart=function(m) {
        navService.setStart(m);
        $scope.refresh();
    }

    // get start index
    $scope.getStart=function() {
        return navService.getStart();
    }

    // get max
    $scope.getMaxPP=function() {
        return navService.getMaxPP();
    }

    // get next max
    $scope.getNextMax=function() {
        return navService.getNextMax();
    }

    // is min reached
    $scope.isMin=function() {
        return navService.isMin();
    }

    // is max reached
    $scope.isMax=function() {
        return navService.isMax();
    }

    // run query for keyword
    $scope.doQuery=function () {
        $scope.finishedSearch=false;
        navService.setStart();
        $scope.personKeyword=$scope.personKeywordInput;
        peopleService.queryPeople($scope.personKeyword);
    }

    // any matches for keyword?
    $scope.peopleMatch=function() {
        return $scope.people!=null;
    }

    // matched peopleCount records
    $scope.peopleCount=function() {
        return peopleService.getPeopleListMax();
    }

    // show wait on refresh
    $scope.showWait=function() {
        return (!$scope.finishedSearch&&$scope.peopleCount());
    }

    // watch peopleResult broadcast for updates
    $scope.$on("peopleResult",function(e) {
        var people=peopleService.getPeopleList();

        $scope.people=people;
        $scope.personKeywordCopy=$scope.personKeyword;
        navService.setLastKeyword($scope.personKeyword);
        navService.setCount(peopleService.getPeopleListMax());
        if ($scope.isMin()) {
            navService.setStart();
        }

        $scope.personKeyword="";
        $scope.personKeywordCopy="";
        $scope.personKeywordInput="";
        $scope.finishedSearch=true;
    })

}]);