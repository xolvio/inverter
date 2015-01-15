Inverter
========
A tiny client-side Inversion of Control (IoC) container for Meteor. This package will help you write
decoupled code which means reusable and testable code.

##Installation

`meteor add xolvio:inverter`

##For Reuse
You can reuse the same events in multiple templates. For example:

```javascript
Inverter.register('common.events', {
  'click button': function (e) {
    $('#log').html('Clicked: ' + e.target.nodeName);
  }
});

Template.myTemplate.events(Inverter.get('common.events'));
Template.anotherTemplate.events(Inverter.get('common.events'));
```

The `register` method returns the object you registered so you can use it inline also like this:

```javascript
Template.myTemplate.helpers(Inverter.register('common.helpers', {
  buttonName : function () {
    return 'buttonz'
  }
}));

// reuse common helpers in another template
Template.anotherTemplate.helpers(Inverter.get('common.helpers'));
```

##For Testing
When you write a test, it's difficult to grab the 'click button' event from a unit or integration
test. This is where Inverter comes in. You isolate events like this:

```javascript
Template.myTemplate.events(Inverter.register('myTemplate.events', {
  'click button': function (e) {
    $('#log').html('Clicked: ' + e.target.nodeName);
  }
}));
```

And now in your test, you can access the events like this:

```javascript
describe('MyTemplate events', function() {
  it('should do something when the button is clicked', function() {
    
    // SETUP
    $('#log').html('');
    
    // EXCECUTE
    var clickButtonEvent = Inverter.get('myTemplate.events')['click button'];
    var event = { target : { nodeName: 'hello' } };
    clickButtonEvent(event);
  
    // VERIFY
    var logText = $('#log').text();
    expect(logText).toBe('Clicked: BUTTON');
  });
});

```

These are some uses of Inverter. There can be many more cases where you need a pattern for reuse or isolation.

All feedback welcome!
