Inverter
========
A tiny client-side Inversion of Control (IoC) container for Meteor. This package will help you write
decoupled code which means reusable and testable.

##For Code Reuse
You can reuse the same events in multiple templates. For example:

```javascript
Inverter.register('common.events', {
  'click button': function (e) {
    $('#log').html('Clicked: ' + e.target.nodeName);
  }
});

Template.myTemplate.events(Inverter.get('common.helpers'));
Template.anotherTemplate.events(Inverter.get('common.helpers'));
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
