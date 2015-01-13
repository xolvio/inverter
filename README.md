Inverter
========

A super simple and tiny client-side IoC (Inversion of Control) container for Meteor. This package will help you write
decoupled code which means reusable and testable.

##IoC for code reuse
You can reuse the same events in multiple templates. For example:

```javascript
Inverter.register('common.events', {
  'click button': function () {
    // do something
  }
});

Template.myTemplate.events(Inverter.get('common.events'));
Template.anotherTemplate.events(Inverter.get('common.events'));
```

##IoC for Testing
Consider the following snip:

```javascript
Template.myTemplate.events({
  'click button': function () {
    // do something
  }
});
```

When you write a test, it's difficult to grab the 'click button' event from a unit or integration
test. This is where Inverter comes in. The same code above can be written like this:

```javascript
Template.myTemplate.events(Inverter.register('myTemplate.events', {
  'click button': function () {
    // do something
  }
}));
```

And now in your test, you can access the events like this:

```javascript
var clickButtonEvent = Inverter.get('myTemplate.events')['click button'];
```
