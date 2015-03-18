'use strict';

var React                = require('react');
var AppDispatcher        = require('../dispatcher/Dispatcher');
var _                    = require('underscore');
var MultiselectActions   = require('../actions/MultiselectActions');

var Selectors = React.createClass({

  propTypes: {
    initialList: React.PropTypes.array.isRequired,
    selectAllLabel: React.PropTypes.string,
    selectNoneLabel: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="selectors">
        <a href="" onClick={this._selectAll}>{this.props.selectAllLabel ? this.props.selectAllLabel : 'Select all'}</a>
        <a href="" onClick={this._unSelectAll}>{this.props.selectNoneLabel ? this.props.selectNoneLabel : 'Select none'}</a>
      </div>
    );
  },

  _selectAll: function(evt) {
    evt.preventDefault();

    var checkboxes = document.querySelectorAll('.multiple input[type=checkbox]');
    _.each(checkboxes, function(checkbox, index) {
      checkbox.checked = true;
    });

    MultiselectActions.addOption(this.props.initialList);
  },

  _unSelectAll: function(evt) {
    evt.preventDefault();

    var checkboxes = document.querySelectorAll('.multiple input[type=checkbox]');
    _.each(checkboxes, function(checkbox, index) {
      checkbox.checked = false;
    });

    MultiselectActions.removeOption(this.props.initialList);
  }

});

module.exports = Selectors;
