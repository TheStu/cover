var React = require('react');
var Reqwest = require('reqwest');
var Cover = require('../covers/Cover.jsx');
var MoreButton = require('../covers/MoreButton.jsx');
var LessButton = require('../covers/LessButton.jsx');
var ChooseCategory = require('../covers/ChooseCategory.jsx');

module.exports = React.createClass({
	getDefaultProps: function () {
		return { origin: process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : '' };
	},
	getInitialState: function () {
		return { 
			asin: 'B007J4T2G8', // initial book is Fifty Shades of Grey - Book#1
			category: '157319011',
			seen_books: [], // books seen by this user in this session, so they don't see the same book twice
			starter_books: [] // books from the initial API call on the genre. Store them to limit API calls
		};
	},
	fetchUnrelatedBook: function(newCategory) {
		var origin = this.props.origin;
		var cat = newCategory || this.state.category
		Reqwest({
			url: origin + '/fetch_new_book/' + cat,
			type: 'json',
			method: 'get',
			contentType: 'application/json',
		})
		.then(response => this.changeBook(response))
		.fail(err => console.log('error!'));
	},
	fetchRelatedBook: function() {
		var origin = this.props.origin;
		var asin = this.state.asin;
		Reqwest({
			url: origin + '/fetch_related_book/' + asin,
			type: 'json',
			method: 'get',
			contentType: 'application/json',
		})
		.then(response => this.changeBook(response))
		.fail(err => console.log('error!'));
	},
	changeBook: function(data) {
		this.setState({ asin: data['asin'] });
		// grab feed of books, set new state with first one that isn't seen yet. add this book to seen books
	},
	render: function () {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4 col-lg-offset-2 text-right">		
						<Cover asin={this.state.asin} />
					</div>
					<div className="col-lg-3">
						<p>Click on the cover to start reading!</p>
						<h4>Show Me...</h4>
						<MoreButton onChange={this.fetchRelatedBook} />
						<br/>
						<LessButton onChange={this.fetchUnrelatedBook} />
						<br/>
		      	<a className="btn btn-primary btn-lg btn-border btn-block" href={"http://www.amazon.com/dp/" + this.props.asin + "/?tag=scrowed-20"} target="_blank" rel="nofollow">
			      	<b><i className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></i> See it on Amazon</b>
		      	</a>
						<h4>Or Explore a New Category...</h4>
						<ChooseCategory onChange={this.fetchUnrelatedBook} />
					</div>
				</div>
			</div>
		);
	}
});