'use strict';

var React              = require('react');
var MultiselectStore   = require('../stores/MultiselectStore');
var MultiselectActions = require('../actions/MultiselectActions');
var Selector           = require('./Selector.react');
var Result             = require('./Result.react');
var AppDispatcher      = require('../dispatcher/Dispatcher');
var _                  = require('underscore');

function getMultiselectState() {
  return {
    filter: '',
    list: MultiselectStore.getList(),
    results: MultiselectStore.getResults()
  };
}

var ReactMultiselect = React.createClass({

  propTypes: {
    filter: React.PropTypes.string,
    filterPlaceholder: React.PropTypes.string,
    list: React.PropTypes.array.isRequired,
    initialList: React.PropTypes.array,
    selectors: React.PropTypes.bool,
    results: React.PropTypes.array,
    selectAllLabel: React.PropTypes.string,
    selectNoneLabel: React.PropTypes.string,
    checkedByDefault: React.PropTypes.array
  },

  getInitialState: function() {
    return getMultiselectState();
  },

  componentDidMount: function() {
    MultiselectStore.addListChangeListener(this._onChange);
    MultiselectStore.addResultsChangeListener(this._onChange);

    this.initializeList();
    if (typeof(this.props.checkedByDefault) !== 'undefined') {
      this.checkByDefault();
    }
  },

  componentWillUnmount: function() {
    MultiselectStore.removeListChangeListener(this._onChange);
    MultiselectStore.addResultsChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Selector filter={this.state.filter}
                  filterPlaceholder={this.props.filterPlaceholder}
                  list={this.state.list}
                  initialList={this.props.list}
                  selectors={this.props.selectors}
                  results={this.state.results}
                  selectAllLabel={this.props.selectAllLabel}
                  selectNoneLabel={this.props.selectNoneLabel} />
        <Result results={this.state.results} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMultiselectState());
  },

  initializeList: function() {
    MultiselectActions.initializeList(this.props.list);
  },

  checkByDefault: function() {
    var values = _.pluck(this.props.checkedByDefault, 'value');

    var checkedObjects = [];

    var checkboxes = document.querySelectorAll('.multiple input[type=checkbox]');
    _.each(checkboxes, function(checkbox, index) {
      if (checkbox.getAttribute('value') in values) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });

    MultiselectActions.addOption(this.props.checkedByDefault);
  }

});

module.exports = ReactMultiselect;
