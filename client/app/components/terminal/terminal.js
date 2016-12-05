import angular from 'angular';
import uiRouter from 'angular-ui-router';
import terminalComponent from './terminal.component';

let terminalModule = angular.module('terminal', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('terminal', {
      url: '/terminal',
      component: 'terminal'
    });
})

.component('terminal', terminalComponent)
  
.name;

export default terminalModule;
