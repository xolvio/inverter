Inverter
========
A tiny Inversion of Control (IoC) container for Meteor. This package will help you write
decoupled code which means reusable and testable code.

# Get the Book
To learn more about testing with Meteor, consider purchasing our book [The Meteor Testing Manual](http://www.meteortesting.com/?utm_source=inverter&utm_medium=banner&utm_campaign=inverter).

[![](http://www.meteortesting.com/img/tmtm.gif)](http://www.meteortesting.com/?utm_source=inverter&utm_medium=banner&utm_campaign=inverter)

Your support helps us continue our work on Velocity and related frameworks.

## Installation

`meteor add xolvio:inverter`

## Use Inverter for Code Reuse

### Using `register`/`set` and `get`

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

Note that `set` is an alias for `register`.

### Inline `get`

The `register` method returns the object you registered so you can use it inline like this:

```javascript
Template.myTemplate.helpers(Inverter.register('common.helpers', {
  buttonName : function () {
    return 'buttonz'
  }
}));

// reuse common helpers in another template
Template.anotherTemplate.helpers(Inverter.get('common.helpers'));
```

### Passing a context using `getWith`

You can also pass in a context to use in the common code using the `getWith` call:

```javascript
Inverter.register('common.events', {
  'click button': function (e) {
    $('#log').html('Clicked: ' + this.logVar);
  }
});

Template.myTemplate.events(Inverter.getWith('common.events', {'logVar': 'log1'}));
Template.anotherTemplate.events(Inverter.getWith('common.events', {'logVar': 'log2'}));
```

## Use Inverter for Testing
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

## Use Your Namespace

```javascript
MyApp.container = Inverter;

var clickButtonEvent = MyApp.container.get(...);
```


## Multiple Containers
You may want to do this

```javascript
MyApp.developmentContainer = new Inverter.Container();
MyApp.productionContainer = new Inverter.Container();

// Now you can set the main app container to be dependant on an environment variable

var env = process.env.NODE_ENV;
MyApp.container = MyApp[env + 'Container'];

```

This allows you have a different configuration for a different environments.

## That's it

These are some uses of Inverter. There can be many more cases where you need a pattern for reuse or isolation.

All feedback welcome!
