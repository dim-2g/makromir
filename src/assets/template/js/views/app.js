'use strict';

define([
    'lodash',
    'backbone',
    '../models/app',
    'text!tpl/app.html'
], function(
    _,
    Backbone,
    AppModel,
    appTpl
) {
    var AppView = Backbone.View.extend({
        el: '#app',
        template: _.template(appTpl),
        model: new AppModel,

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    // singleton
    var instance;
    return function() {
        if (!instance) {
            instance = new AppView();
        }
        return instance
    };
});