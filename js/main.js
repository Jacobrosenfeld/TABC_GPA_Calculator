var weightApp = angular.module('weightApp', []);

weightApp.controller('CalcController', function ($scope) {

	var base_units = [
		{
			unit_name: 'Unit',
			assignments: [
				{ assignment_name: 'Gemara', assignment_grade: '', overall_percentage: '10'},
                { assignment_name: 'Chumash', assignment_grade: '', overall_percentage: '4'},
                { assignment_name: 'Mishna/Navi', assignment_grade: '', overall_percentage: '4'},
                { assignment_name: 'Hebrew', assignment_grade: '', overall_percentage: '4'},
                { assignment_name: 'Math', assignment_grade: '', overall_percentage: '5'},
                { assignment_name: 'Science', assignment_grade: '', overall_percentage: '5'},
                { assignment_name: 'English', assignment_grade: '', overall_percentage: '5'},
                { assignment_name: 'History', assignment_grade: '', overall_percentage: '5'},
                { assignment_name: 'Judaic Studies Elective', assignment_grade: '', overall_percentage: '2'},
                { assignment_name: 'Tefillah', assignment_grade: '', overall_percentage: '5'},
                { assignment_name: 'Music/Art', assignment_grade: '', overall_percentage: '3'},
                { assignment_name: 'Writing', assignment_grade: '', overall_percentage: '4'}


			]
            
		}
	];

	if (localStorage.units === '' || localStorage.units === null || localStorage.units === undefined) {
		$scope.units = base_units;
	}
	else {
		$scope.units = angular.fromJson(localStorage.units);
	}

	// $scope.confirmReset = function() {
	// 	var confirmReset = confirm("Are you sure?");
	// 	if (confirmReset) {
	// 		$scope.reset();
	// 	}
	// };

	// $scope.reset = function() {
	// 	localStorage.clear();
	// 	$scope.units = base_units;
	// };

	$scope.addUnit = function() {
		$scope.units.push({
			unit_name: 'Unit',
			assignments: [
				{ assignment_name: '', assignment_grade: '', overall_percentage: '' }
			]
		});
	};
	
	$scope.addAssignment = function(unit) {
		unit.assignments.push({assignment_name: '', assignment_grade: '', overall_percentage: ''});
	};

	$scope.storeGrades = function () {
		localStorage.units = angular.toJson($scope.units);
	};
	$scope.calculateGPA = function (unit) {
		var GPA = 0;
        var sumGrade=0, sumWeight=0;
		angular.forEach(unit.assignments, function (assignment, key) {
			if(assignment.assignment_grade !== '') {
            sumGrade += assignment.assignment_grade * assignment.overall_percentage;
            sumWeight += parseInt(assignment.overall_percentage);
            }
		});
        if(sumGrade == '')
            return 0
            else
            
		return Math.round(sumGrade / sumWeight*100)/100;
	};

	$scope.deleteAssignment = function(unit, index) {
		unit.assignments.splice(index, 1);
	};

	$scope.deleteUnit = function(index) {
		var confirmReset = confirm("Are you sure?");
		if (confirmReset) {
			$scope.units.splice(index, 1);
		}
	};

});