Inverter.register('common.events', {
  'click button': function (e) {
    $('#log').html('Clicked: ' + this.logVar);
  }
});

Template.myTemplate.events(Inverter.getWith('common.events', {'logVar': 'log1'}));
Template.anotherTemplate.events(Inverter.getWith('common.events', {'logVar': 'log2'}));
