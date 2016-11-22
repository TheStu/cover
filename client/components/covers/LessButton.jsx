var React = require('react');

module.exports = React.createClass({
	handleClick: function() {
    this.props.onChange();
  },
	render: function() {
		return (
			<div>
	      <button className="btn btn-warning btn-lg btn-block btn-border" onClick={this.handleClick} >
	      	<b><i className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></i> Something Else</b>
	    	</button>
    	</div>
		);
	}
});