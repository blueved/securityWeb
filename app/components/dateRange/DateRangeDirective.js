app.directive( "dateRange",  function(){
    return {
        restrict: 'EA',
        scope:{
            dateFrom: '=',
            dateTo  : '='
        },
        
        controller: function($scope){
            var self = this;
            
            self.setRange = function(item){
                switch (item){
                    case 'Last Month':
                        self.setPreviousMonth();
                        break;
                    case 'Last Week':
                        self.setPreviousWeek();
                        break;
                    case 'Today':
                        $scope.dateFrom = new Date();
                        $scope.dateFrom = new Date();
                        break;
                    case 'This Week':
                        self.setCurrentWeek();
                        break;
                    case 'This Month':
                        self.setCurrentMontMonth();
                        break;
                }
            };
            self.clear = function() {
                $scope.dateFrom = null;
                $scope.dateFrom = null;
            };
            self.setPreviousWeek = function(){
                  var from =  moment().subtract(1, 'weeks').startOf('isoWeek');
                  var to  = moment().subtract(1, 'weeks').endOf('isoWeek');
                  $scope.dateFrom = new Date(from);
                  $scope.dateFrom = new Date(to);
            };
            self.setPreviousMonth = function(){
                  var from =  moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD');
                  var to  = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');
                  $scope.dateFrom = new Date(from);
                  $scope.dateFrom = new Date(to);
              };
            self.setCurrentWeek = function(){
                    var from =  moment().startOf('week').format('YYYY-MM-DD');
                    var to  = moment().format('YYYY-MM-DD');
                    $scope.dateFrom = new Date(from);
                    $scope.dateFrom = new Date(to);
            };
            self.setCurrentMontMonth = function(){
                  var from =  moment().startOf('month').format('YYYY-MM-DD');
                  var to  = moment().format('YYYY-MM-DD');
                  $scope.dateFrom = new Date(from);
                  $scope.dateFrom = new Date(to);
              };
            
         // Disable weekend selection
          self.disabled = function(date, mode) {
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
          };

          self.toggleMin = function() {
            self.minDate = self.minDate ? null : new Date();
          };

          self.toggleMin();
          self.maxDate = new Date(2020, 5, 22);

          self.open1 = function() {
            self.popup1.opened = true;
          };

          self.open2 = function() {
            self.popup2.opened = true;
          };

         /* self.setDate = function(year, month, day) {
            self.dt = new Date(year, month, day);
          };         
          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          var afterTomorrow = new Date();
          afterTomorrow.setDate(tomorrow.getDate() + 1);
          self.events =
            [
              {
                date: tomorrow,
                status: 'full'
              },
              {
                date: afterTomorrow,
                status: 'partially'
              }
            ];

          self.getDayClass = function(date, mode) {
            if (mode === 'day') {
              var dayToCheck = new Date(date).setHours(0,0,0,0);

              for (var i = 0; i < self.events.length; i++) {
                var currentDay = new Date(self.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                  return self.events[i].status;
                }
              }
            }

            return '';
          };*/

          
            
            self.init = function(){ 
                self.dateRange = "Today";
                $scope.dateFrom   = $scope.dateTo;
                self.choicesDate = ['Last Month', 'Last Week', 'Today', 'This Week', 'This Month' ];
                self.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                  };

                self.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                self.format = self.formats[0];
                self.altInputFormats = ['M!/d!/yyyy'];

                self.popup1 = {   opened: false    };

                self.popup2 = {   opened: false    };
                console.log("Date range directive initialized");
            };
            self.init();
        },
        controllerAs:'vm',
        templateUrl: '/public/app/components/dateRange/dateRangeTemplate.html',
        link: function ($scope, element, attrs) { 
            
        } 
    };
    

          
    
    
});