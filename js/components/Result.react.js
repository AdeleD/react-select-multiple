'use strict';

var React = require('react');

var Result = React.createClass({

  propTypes: {
    results: React.PropTypes.array
  },

  render: function() {
    var style = {
      display: 'none',
    };

    var values = [];

    var options = this.props.results.map(function(result, index){
      values.push(result.value);

      return (
        <option key={index} value={result.value} title={result.title}>{result.title}</option>
      );
    });

    return (
      <select multiple={true} style={style} name="multiselect" value={values}>
        {options}
      </select>
    );
  }

});

module.exports = Result;
