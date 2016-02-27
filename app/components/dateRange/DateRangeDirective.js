app.directive( "dateRange",  function(){
    return {
        restrict: 'EA',
        scope:{
            dateFrom:'@',
            dateTo :'@'
        },
        templateUrl: '/public/app/components/dateRange/dateRangeTemplate.html'
        
    };
    
});