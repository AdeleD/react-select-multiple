'use strict';

var React              = require('react');
var AppDispatcher      = require('../dispatcher/Dispatcher');
var MultiselectActions = require('../actions/MultiselectActions');
var Selectors          = require('./Selectors.react');
var _                  = require('underscore');

var Selector = React.createClass({

  propTypes: {
    list: React.PropTypes.array.isRequired,
    initialList: React.PropTypes.array.isRequired,
    selectors: React.PropTypes.bool,
    results: React.PropTypes.array,
    selectAllLabel: React.PropTypes.string,
    selectNoneLabel: React.PropTypes.string
  },

  render: function() {
    var selectors;
    if (this.props.selectors === true) {
      selectors = <Selectors initialList={this.props.initialList}
                             selectAllLabel={this.props.selectAllLabel}
                             selectNoneLabel={this.props.selectNoneLabel} />;
    }

    var values = _.pluck(this.props.results, 'value');

    var options = this.props.list.map(function(option, index){
      var name = 'option-' + index;

      return (
        <div key={index}>
          <input type="checkbox" id={name} className="checkbox-inline ff" value={option.value} title={option.title} onChange={this._onToggleOption} checked={_.contains(values, option.value) ? 'checked' : false} />
          <label htmlFor={name}>{option.title}</label>
        </div>
      );
    }.bind(this));

    return (
      <div>
        <input type="text" name="filter" onChange={this._onFilter} placeholder={this.props.filterPlaceholder} />
        {selectors}
        <div className="multiple">
          {options}
        </div>
      </div>
    );
  },

  _onFilter: function(evt) {
    MultiselectActions.filter(evt.currentTarget.value);
  },

  _onToggleOption: function(evt) {
    if (evt.currentTarget.checked) {
      this._onAddOption(evt.currentTarget);
    } else {
      this._onRemoveOption(evt.currentTarget);
    }
  },

  _onAddOption: function(option) {
    MultiselectActions.addOption({title: option.getAttribute('title'), value: option.value});
  },

  _onRemoveOption: function(option) {
    MultiselectActions.removeOption({title: option.getAttribute('title'), value: option.value});
  }

});

module.exports = Selector;
