var React = require('react');

module.exports = React.createClass({
	handleChange: function(e) {
    this.props.onChange;
  },
	render: function() {
		return (
        <button className="btn btn-warning btn-lg btn-block btn-border" onChange={this.handleChange} >
        	<b><i className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></i> Something Else</b>
      	</button>
		);
	}
});