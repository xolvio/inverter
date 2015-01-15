Package.describe({
  name: 'xolvio:inverter',
  summary: 'A client-side mini Inversion of Control (IoC) container for Meteor.',
  version: '0.2.0',
  git: 'https://github.com/xolvio/inverter.git'
});

Package.onUse(function (api) {
  api.addFiles('inverter.js', 'client');
});
