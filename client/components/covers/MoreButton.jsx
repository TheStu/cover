var React = require('react');

module.exports = React.createClass({
  handleChange: function() {
    this.props.onChange();
  },
  render: function() {
    return (
    	<div>
	      <button className="btn btn-success btn-lg btn-border btn-block" onClick={this.handleChange}>
	      	<b><i className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></i> More Like This</b>
      	</button>
    	</div>
    );
  }
});