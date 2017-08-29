/**
 * @jsx React.DOM
 */
var React                   = require('react')
var getRadioOrCheckboxValue = require('../lib/radiobox-value')

var SurveyFields = React.createClass({

  renderOptions: function(type, name, value, index) {
    var isChecked = function() {
      if (type == 'radio') return value == this.props.fieldValues[name]

      if (type == 'checkbox') return this.props.fieldValues[name].indexOf(value) >= 0

      return false
    }.bind(this)

    return (
      <label key={index}>
        <input type={type} name={name} value={value} defaultChecked={isChecked()} /> {value}
      </label>
    )
  },

  render: function() {
    return (
      <div>
        <h2>Survey Question</h2>
        <ul className="form-fields">
          <li className="radio">
            <span className="label">Age</span>
            {['Harness the power of the hybrid cloud', 'Modernize storage through data management',  'Build a next generation data center', 'Modernize storage through data management'].map(this.renderOptions.bind(this, 'radio', 'focus'))}
          </li>
          <li className="checkbox">
            <span className="label">Favorite Colors</span>
            {['Blue', 'Red', 'Orange', 'Green'].map(this.renderOptions.bind(this, 'checkbox', 'colors'))}
          </li>
          <li className="form-footer">
            <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
            <button className="btn -primary pull-right" onClick={this.nextStep}>Save &amp; Continue</button>
          </li>
        </ul>
      </div>
    )
  },

  nextStep: function() {
    // Get values via querySelector
    var focus    = document.querySelector('input[name="focus"]:checked')
    var colors = document.querySelectorAll('input[name="colors"]')

    var data = {
      focus    : getRadioOrCheckboxValue(focus),
      colors : getRadioOrCheckboxValue(colors)
    }

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

module.exports = SurveyFields