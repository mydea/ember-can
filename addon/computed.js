import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

const { get, set } = Ember;

export default {
  ability: function(type, resourceName) {
    if (arguments.length === 1) {
      resourceName = type;
    }

    return Ember.computed(resourceName, function() {
      const container = getOwner(this);
      const ability   = container.lookup("ability:"+type);

      Ember.assert("No ability class found for "+type, ability);

      const resource = get(this, resourceName);
      set(ability, "model", resource);
      return ability;
    });
  }
};
