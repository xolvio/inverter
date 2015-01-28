function Container () {
  this.objects = {};
  this.contextualizedObjects = {};
}

Container.prototype.register = function (name, object) {
  return this.objects[name] = object;
};
Container.prototype.set = function (name, object) {
  return this.objects[name] = object;
};
Container.prototype.get = function (name) {
  return this.objects[name];
};
Container.prototype.getWith = function (name, context) {

  var objects = this.objects;
  var contextualizedObjects = this.contextualizedObjects;

  // return cached or cache the contextualized objects
  var namePlusContextHash = name + HashCode.value(context);

  if (contextualizedObjects[namePlusContextHash]) {
    return contextualizedObjects[namePlusContextHash];
  }
  contextualizedObjects[namePlusContextHash] = _.extend({}, objects[name]);

  _.each(objects[name], function (obj, key) {
    if (typeof obj === 'function') {
      contextualizedObjects[namePlusContextHash][key] = function () {
        var self = this;
        _.each(context, function (v, k) {
          self[k] = v;
        });
        objects[name][key].apply(this, arguments);
      };
    }
  });

  return this.contextualizedObjects[namePlusContextHash];
};

String.prototype.hashCode = function () {
  for (var h = 0, i = 0; i < this.length; h &= h) {
    h = 31 * h + this.charCodeAt(i++);
  }
  return h;
};
var HashCode = function () {
  var serialize = function (o) {
    var t, s = "";
    t = typeof o;
    if (t === 'object') {
      var e;
      for (e in o) {
        s += "[" + t + ":" + e + serialize(o[e]) + "]";
      }
    } else if (t === 'function') {
      s += "[" + t + ":" + o.toString() + "]";
    } else {
      s += "[" + t + ":" + o + "]";
    }
    return s.replace(/\s/g, "");
  };
  return {
    value: function (o) { return serialize(o).hashCode(); }
  };
}();

Inverter = new Container();
Inverter.Container = Container;