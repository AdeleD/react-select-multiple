var AppDispatcher        = require('../dispatcher/Dispatcher');
var MultiselectConstants = require('../constants/MultiselectConstants');

var MultiselectActions = {
  /**
   * Initialize the multiselect options
   * @param  {Array} list
   */
  initializeList: function(list) {
    AppDispatcher.dispatch({
      actionType: MultiselectConstants.INITIALIZE_LIST,
      list: list
    });
  },

  /**
   * Filter options starting with {value}
   * @param  {string} value The value entered by the user
   */
  filter: function(value) {
    AppDispatcher.dispatch({
      actionType: MultiselectConstants.FILTER,
      filter: value
    });
  },

  /**
   * Select an option
   * @param  {object|Array} option
   */
  addOption: function(option) {
    AppDispatcher.dispatch({
      actionType: MultiselectConstants.ADD_OPTION,
      option: option
    });
  },

  /**
   * Deselect an option
   * @param  {object|Array} option
   */
  removeOption: function(option) {
    AppDispatcher.dispatch({
      actionType: MultiselectConstants.REMOVE_OPTION,
      option: option
    });
  },
};

module.exports = MultiselectActions;
