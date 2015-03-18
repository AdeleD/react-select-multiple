'use strict';

var AppDispatcher        = require('../dispatcher/Dispatcher');
var EventEmitter         = require('events').EventEmitter;
var assign               = require('object-assign');
var _                    = require('underscore');
var MultiselectConstants = require('../constants/MultiselectConstants');

var initialList = [];

var _filter = '';
var _list = [];
var _results = [];

var FILTER_CHANGE = 'filter-change';
var LIST_CHANGE = 'list-change';
var RESULTS_CHANGE = 'results-change';

var MultiselectStore = assign({}, EventEmitter.prototype, {
  getFilter: function() {
    return _filter;
  },

  emitFilterChange: function() {
    this.emit(FILTER_CHANGE);
  },

  addFilterChangeListener: function(callback) {
    this.on(FILTER_CHANGE, callback);
  },

  removeFilterListener: function(callback) {
    this.removeListener(FILTER_CHANGE, callback);
  },

  getList: function() {
    return _list;
  },

  emitListChange: function() {
    this.emit(LIST_CHANGE);
  },

  addListChangeListener: function(callback) {
    this.on(LIST_CHANGE, callback);
  },

  removeListListener: function(callback) {
    this.removeListener(LIST_CHANGE, callback);
  },

  getResults: function() {
    return _results;
  },

  emitResultsChange: function() {
    this.emit(RESULTS_CHANGE);
  },

  addResultsChangeListener: function(callback) {
    this.on(RESULTS_CHANGE, callback);
  },

  removeResultsListener: function(callback) {
    this.removeListener(RESULTS_CHANGE, callback);
  }
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case MultiselectConstants.FILTER:
      var list = [];
      _.each(initialList, function(option) {
        if (option.title.toLowerCase().substring(0, action.filter.length) === action.filter.toLowerCase()) {
          list.push(option);
        }
      });

      _list = list;

      MultiselectStore.emitFilterChange();
      MultiselectStore.emitListChange();
      break;

    case MultiselectConstants.ADD_OPTION:
      if (action.option instanceof Array) {
        _results = action.option;
      } else {
        _results.push(action.option);
      }

      MultiselectStore.emitResultsChange();
      break;

    case MultiselectConstants.REMOVE_OPTION:
      if (action.option instanceof Array) {
        _results = [];
      } else {
        _results = _.without(_results, _.findWhere(_results, action.option));
      }

      MultiselectStore.emitResultsChange();
      break;

    case MultiselectConstants.INITIALIZE_LIST:
      initialList = action.list;
      _list = action.list;
      MultiselectStore.emitListChange();
      break;

    default:
      // no op
  }
});

module.exports = MultiselectStore;
