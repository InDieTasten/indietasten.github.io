import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Terminal from './terminal/terminal';

let componentModule = angular.module('app.components', [
  Terminal,
  Home,
  About
])

.name;

export default componentModule;
