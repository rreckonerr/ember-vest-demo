import EmberRouter from '@ember/routing/router';
import config from 'ember-vest-demo/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {});
