Package.describe({
  name: 'xolvio:inverter',
  summary: 'A client-side mini Inversion of Control (IoC) container for Meteor.',
  version: '0.1.0'
});

Package.onUse(function (api) {
  api.addFiles('inverter.js', 'client');
});