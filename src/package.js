Package.describe({
  name: 'xolvio:inverter',
  summary: 'A mini Inversion of Control (IoC) container for Meteor.',
  version: '0.4.0',
  git: 'https://github.com/xolvio/inverter.git'
});

Package.onUse(function (api) {
  api.addFiles('inverter.js', ['client', 'server']);
  api.export('Inverter', ['client', 'server']);
  api.export('Container', ['client', 'server']);
});
