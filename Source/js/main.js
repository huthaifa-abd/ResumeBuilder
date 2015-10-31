//Clean Json Templates Using this link http://bernhardhaeussner.de/odd/json-escape/

var app = angular.module('StarterApp', ['xml', 'ngMaterial', 'wysiwyg.module', 'colorpicker.module']);

app.config(function ($mdIconProvider) {
  $mdIconProvider
    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
    .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
    .defaultIconSet('img/icons/sets/core-icons.svg', 24);
});

app.factory('Service', function() {
  var Service = {
    tempSummary: '',
    tempProjects: '',
    tempHeader:'',
    tempFooter:''
  };
  return Service;
});

app.controller('TemplateCustomizationController', function ($scope, $http, $mdSidenav, $mdDialog,Service) {
  angular.element(document).ready(function () {
    //Load Tempaltes
    //Load Summary Templates
    $http.get('templates/SummaryTemplates.json').success(function (data) {
      $scope.summaryTemplates = [];
      angular.forEach(data.Templates, function (value, key) {
        $scope.summaryTemplates.push(value);
      });
    });
    
    $scope.UpdateSelectedSummartTemplate = function (position, summaryTemplates) {
    angular.forEach(summaryTemplates, function (template, index) {
      if (position != index) {
        template.checked = false;
      }
      else {
        template.checked = true;
        Service.tempSummary = summaryTemplates[index].data;
      }
    });
  };
  
    //Load Project Templates
     $http.get('templates/ProjectsTemplates.json').success(function (data) {
      $scope.projectsTemplates = [];
      angular.forEach(data.Templates, function (value, key) {
        $scope.projectsTemplates.push(value);
      });
    });

  });
  
  
    $scope.UpdateSelectedProjectTemplate = function (position, projectsTemplates) {
    angular.forEach(projectsTemplates, function (template, index) {
      if (position != index) {
        template.checked = false;
      }
      else {
        template.checked = true;
        Service.tempProjects = projectsTemplates[index].data;
      }
    });
  };
  
  
  
  //Load Header Templates
     $http.get('templates/HeaderTemplates.json?id=1').success(function (data) {
      $scope.headerTemplates = [];
      angular.forEach(data.Templates, function (value, key) {
        $scope.headerTemplates.push(value);
      });
    });

    $scope.UpdateSelectedHeaderTemplate = function (position, headerTemplates) {
    angular.forEach(headerTemplates, function (template, index) {
      if (position != index) {
        template.checked = false;
      }
      else {
        template.checked = true;
        Service.tempHeader = headerTemplates[index].data;
      }
    });
  };
  
  //Load Footer Templates
     $http.get('templates/FooterTemplates.json?d=1').success(function (data) {
      $scope.FooterTemplates = [];
      angular.forEach(data.Templates, function (value, key) {
        $scope.FooterTemplates.push(value);
      });
    });

    $scope.UpdateSelectedFooterTemplate = function (position, FooterTemplates) {
    angular.forEach(FooterTemplates, function (template, index) {
      if (position != index) {
        template.checked = false;
      }
      else {
        template.checked = true;
        Service.tempFooter = FooterTemplates[index].data;
      }
    });
  };
  
  
  
});
app.controller('AppCtrl', function ($scope, $http, $mdSidenav, $mdDialog,Service) {
  var templateFile = '';
console.log('ReloadData');
  


  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.showAdvanced = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'customizesummary.tmpl.html?d=1',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
      .then(function (answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
  };

  $scope.showCustomizeSummaryControls = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'customizesummary.tmpl.html?d=1',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
      .then(function (answer) {
        $scope.UpdateInformation('SummaryData',Service.tempSummary);
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
  };

  $scope.showCustomizeProjectsControls = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'customizeprojects.tmpl.html?d=1',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
      .then(function (answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
  };
  
   $scope.showCustomizeHeaderControls = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'customizeheader.tmpl.html?d=1',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
      .then(function (answer) {
         $scope.UpdateInformation('HeaderData',Service.tempHeader);
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
  };
  
  $scope.showCustomizeFooterControls = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'customizefooter.tmpl.html?d=2',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
      .then(function (answer) {
         $scope.UpdateInformation('FooterData',Service.tempFooter);
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
      $mdDialog.hide();
    };
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  };



  $scope.disabled = false;
  $scope.menu = [
    ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
    ['format-block'],
    ['font'],
    ['font-size'],
    ['font-color', 'hilite-color'],
    ['remove-format'],
    ['ordered-list', 'unordered-list', 'outdent', 'indent'],
    ['left-justify', 'center-justify', 'right-justify'],
    ['code', 'quote'],
    ['link', 'image'],
    ['css-class']
  ];


  $scope.doctypes = [
    { name: 'Resume', checked: false },
    { name: 'Cover Letter', checked: false }
  ];

  $scope.UpdateInformation = function (infoType, userdata) {
    //Load Data
    
    $http.get(templateFile).success(function (data) {

      var resumeTemplate = data;
      if (typeof $scope.company != 'undefined') {

        if (typeof $scope.company.name != 'undefined')
          resumeTemplate = resumeTemplate.replace(/--CompanyName--/g, $scope.company.name);
        if (typeof $scope.company.address != 'undefined')
          resumeTemplate = resumeTemplate.replace(/--CompanyAddress--/g, $scope.company.address);
        if (typeof $scope.company.jobtitle != 'undefined')
          resumeTemplate = resumeTemplate.replace(/--JobTitle--/g, $scope.company.jobtitle);

      }

      if (infoType == 'SummaryData')
        resumeTemplate = resumeTemplate.replace(/--SummaryData--/g, userdata);
      if (infoType == 'ProjectData')
        resumeTemplate = resumeTemplate.replace(/--ProjectsData--/g, userdata);
        if (infoType == 'HeaderData')
        resumeTemplate = resumeTemplate.replace(/--Header--/g, userdata);
        if (infoType == 'FooterData')
        resumeTemplate = resumeTemplate.replace(/--Footer--/g, userdata);

      $scope.data = {
        text: resumeTemplate
      }
    });
  }

  $scope.updateSelection = function (position, doctypes) {
    angular.forEach(doctypes, function (doctype, index) {
      if (position != index) {
        doctype.checked = false;
      }
      else {
        doctype.checked = true;
        if (doctype.name == 'Resume') {
          templateFile = 'templates/resumetemplate.txt';
          $http.get('templates/resumetemplate.txt').success(function (data) {
            $scope.data = {
              text: data
            }
            $scope.UpdateInformation();
          });
        }
        if (doctype.name == 'Cover Letter') {
          templateFile = 'templates/covertemplate.txt?d=1';
          $http.get('templates/covertemplate.txt?d=1').success(function (data) {
            $scope.data = {
              text: data
            }
            $scope.UpdateInformation();
          });
        }
      }
    });
  }


  $scope.settings = [
    { name: 'Customize Header', extraScreen: 'CustomizeHeaderControls', icon: 'subject', enabled: true },
    { name: 'Customize Summary', extraScreen: 'CustomizeSummaryControls', icon: 'subject', enabled: true },
    { name: 'Customize Projects', extraScreen: 'CustomizeProjectsControls', icon: 'subject', enabled: false },
    { name: 'Customize Footer', extraScreen: 'CustomizeFooterControls', icon: 'subject', enabled: false },
  ];
  $scope.messages = [
    { id: 1, title: "Message A", selected: false },
    { id: 2, title: "Message B", selected: true },
    { id: 3, title: "Message C", selected: true },
  ];
  $scope.people = [
    { name: 'Janet Perkins', img: 'img/100-0.jpeg', newMessage: true },
    { name: 'Mary Johnson', img: 'img/100-1.jpeg', newMessage: false },
    { name: 'Peter Carlsson', img: 'img/100-2.jpeg', newMessage: false }
  ];
  $scope.goToPerson = function (person, event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Navigating')
        .content('Inspect ' + person)
        .ariaLabel('Person inspect demo')
        .ok('Neat!')
        .targetEvent(event)
      );
  };
  $scope.navigateTo = function (to, event) {
    // $mdDialog.show(
    //   $mdDialog.alert()
    //     .title('Navigating')
    //     .content('Imagine being taken to ' + to)
    //     .ariaLabel('Navigation demo')
    //     .ok('Neat!')
    //     .targetEvent(event)
    //   );
    
    if (to == "CustomizeSummaryControls")
      $scope.showCustomizeSummaryControls(event);

    if (to == "CustomizeProjectsControls")
      $scope.showCustomizeProjectsControls(event);
      
       if (to == "CustomizeHeaderControls")
      $scope.showCustomizeHeaderControls(event);
      
       if (to == "CustomizeFooterControls")
      $scope.showCustomizeFooterControls(event);

  };
  $scope.doSecondaryAction = function (event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Secondary Action')
        .content('Secondary actions can be used for one click actions')
        .ariaLabel('Secondary click demo')
        .ok('Neat!')
        .targetEvent(event)
      );
  };


});
  
  
