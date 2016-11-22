var React = require('react');

module.exports = React.createClass({
	handleChange: function(e) {
		this.props.onChange(e.target.value);
	},
	render: function() {
		return (
			<div className="form-group">
        <select className="form-control btn-border" onChange={this.handleChange} >
        	<option value="">Select a Category...</option>
        	<optgroup label='Mysteries, Thrillers, Action'>
        		<option value='157055011'>Action and Adventure</option>
        		<option value='6190476011'>Cozy Mysteries</option>
        		<option value='6361460011'>Crime Fiction</option>
        		<option value='157313011'>Historical Mysteries</option> 
        		<option value='157323011'>Suspense</option> 
        		<option value='157319011'>Thrillers</option> 
        	</optgroup>
        	<optgroup label='Romance'>
        		<option value='158568011'>Contemporary Romance</option> 
        		<option value='157057011'>Erotica</option> 
        		<option value='158571011'>Historical Romance</option> 
        		<option value='6487838011'>New Adult Romance</option> 
        		<option value='6190484011'>Paranormal Romance</option>
        		<option value='6487839011'>Romantic Suspense</option> 
        		<option value='6190487011'>Time Travel Romance</option> 
        		<option value='6190489011'>Western Romance</option>
        	</optgroup>
        	<optgroup label='Fiction'>
        		<option value='157108011'>African American Interest</option>
        		<option value='6190467011'>Christian Fiction</option> 
        		<option value='157059011'>Historical Fiction</option>
        		<option value='156424011'>LGBT</option> 
        		<option value='157053011'>Literary Fiction</option> 
        		<option value='6190492011'>Women&#39;s Fiction</option> 
        	</optgroup>
        	<optgroup label='Fantasy, Science Fiction, Horror'>
        		<option value='158576011'>Fantasy</option> 
        		<option value='157060011'>Horror</option>
        		<option value='158591011'>Science Fiction</option> 
        	</optgroup>
        	<optgroup label="Teen and Young Readers">
        		<option value='155009011'>Children&#39;s</option>
        		<option value='3511261011'>Teen and Young Adult</option>
        	</optgroup>
        	<optgroup label='Nonfiction'>
        		<option value='156563011'>Advice and How-To</option> 
        		<option value='154754011'>Biographies and Memoirs</option> 
        		<option value='154821011'>Business</option> 
        		<option value='158296011'>Christian Nonfiction</option> 
        		<option value='156154011'>Cooking</option> 
        		<option value='157325011'>General Nonfiction</option> 
        		<option value='156576011'>History</option> 
        		<option value='156279011'>Humor</option>
        		<option value='157584011'>Parenting</option> 
        		<option value='305951011'>Politics and Current Events</option> 
        		<option value='158280011'>Religion and Spirituality</option> 
        		<option value='158597011'>Science</option> 
        		<option value='157554011'>True Crime</option> 
        	</optgroup>
        </select>
      </div>
		);
	}
})