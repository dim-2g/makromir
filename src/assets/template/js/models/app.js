'use strict';

define(['backbone'], function(Backbone) {
    var AppModel = Backbone.Model.extend({
        defaults: {
            title: 'Webdevkin • Backbone.js + RequireJS',
            username: 'Webdevkin'
        }
    });

    // singleton
    var instance;
    return function() {
        if (!instance) {
            instance = new AppModel();
        }
        return instance
    };
});