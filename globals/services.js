// service to manage access to people data
app.service("peopleService",['$resource','$rootScope','$http','$window','$location','navService',function($resource,$rootScope,$http,$window,$location,navService) {

    var peopleList=null; // people stack
    var peopleListMax=0; // max count
    var personData=null; // person profile data

    // do query for people
    this.queryPeople=function(query) {

        if (!!query) {

             var q_json_data={
                keywords:query,
                category:"people",
                sortType:"RD",
                resultsPerPage: navService.getMaxPP(),
                maxFacets: 10000000,
                start: navService.getStart()
             }

             var q_json={
                search_query: JSON.stringify(q_json_data)
             }

             $http.post("http://www.shocase.com/s/search", q_json, {})
                 .success(function(responseData) {
                     try {
                         if (responseData.response.rows>0) {
                             peopleList=responseData.response.docs.user;
                             peopleListMax=parseInt(responseData.response.numFound);
                         } else {
                             peopleList=null;
                         }
                         $rootScope.$broadcast("peopleResult");
                     } catch (e) {
                         // unknown response syntax
                     }
             }).error(function() {
                     $window.alert("Error searching people.\n\nPlease try again.");
                     $location.path('#/')
                 });


        }
    }

    // return people list stack
    this.getPeopleList=function() {
        return peopleList;
    }

    // return people list max count
    this.getPeopleListMax=function() {
        return peopleListMax;
    }

    // resource details for one person
    var Person=$resource(
        "https://www.shocase.com/marketing/v1/user/:user",
        {profile:"true"}
    );

    // query personal profile
    this.queryPerson=function(id) {
        var people=Person.get({user:id},function(result) {
            //$log.log(result);
            if (id&&result.id==id) {
                personData=result;
                $rootScope.$broadcast("personResult");
            } else {
                personData=null;
            }
        },function(e) {
            $window.alert("Error fetching personal profile.\n\nPlease try again.");
            $location.path('#/')
        })
    }

    // return personal profile data
    this.getPerson=function() {
        return personData;
    }

}]);

// service to manage access to project data
app.service("projectService",['$resource','$rootScope','$window','$location',function($resource,$rootScope,$window,$location) {

    var projectList=null; // project stack

    // resource to pull list of projects
    var ProjectList=$resource(
        "https://www.shocase.com/marketing/v1/project/user/:user",
        {pageNum:"0",setSize:"50"}
    );

    // query projects for a user
    this.queryProjects=function(id) {
        if (!!id) {
            var projects=ProjectList.query({user:id},function(result) {
                //$log.log(result);
                try {
                    if (result.length>0) {
                        projectList=result;
                    } else {
                        projectList=null;
                    }
                    $rootScope.$broadcast("projectResult");
                } catch (e) {
                    // unknown response syntax
                }
            },function(e) {
                $window.alert("Error fetching projects.\n\nPlease try again.");
                $location.path('#/')
            })
        }
    }

    // return project stack
    this.getProjectList=function() {
        return projectList;
    }

}]);

// service to manage navigation data
app.service("navService",[function() {

    var lastKeyword=""; // last keyword used
    var start=0; // start index
    var count=0; // count of all results
    var maxpp=60; // per page count - it appears that the system will not accept less than 60
    var nextmax=0;  // next block of records count

    // determine next block of records
    var calcNextMax=function() {
        if (start<(count-maxpp)) {
            nextmax=maxpp;
        } else if (start>0) {
            nextmax=count-start;
        } else {
            nextmax=maxpp;
        }
        if (nextmax>count) {nextmax=count;}
        return nextmax;
    }

    // set last keyword used
    this.setLastKeyword=function(k) {
        lastKeyword=k;
    }

    // set count of records found
    this.setCount=function(c) {
        count=c;
    }

    // get last keyword used
    this.getLastKeyword=function() {
        return lastKeyword;
    }

    // determine next block of records
    this.calcNextMax=function() {
        return calcNextMax();
    }

    // set new start point - true is forward false back otherwise reset for start
    this.setStart=function(m) {
        if (m===true) {
            start+=calcNextMax();
        } else if (m===false) {
            start-=maxpp;
            if (start<0) {start=0}
        } else {
            start=0;
        }
        calcNextMax();
    }

    // get current start index
    this.getStart=function() {
        return start;
    }

    // get max per page
    this.getMaxPP=function() {
        return maxpp;
    }

    // get max for next page
    this.getNextMax=function() {
        return nextmax;
    }

    // is start at minimum?
    this.isMin=function() {
        return start===0;
    }

    // is start at max?
    this.isMax=function() {
        return (start+maxpp)>count;
   }

}]);