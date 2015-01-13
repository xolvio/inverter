(function () {

  'use strict';

  function Container () {
    this.objects = {};
  }

  Container.prototype.register = function (name, object) {
    return this.objects[name] = object;
  };
  Container.prototype.get = function (name) {
    return this.objects[name];
  };

  window.Inverter = new Container();

})();
