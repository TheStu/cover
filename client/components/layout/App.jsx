var React = require('react');
var Reqwest = require('reqwest');
var Cover = require('../covers/Cover.jsx');
var MoreButton = require('../covers/MoreButton.jsx');
var LessButton = require('../covers/LessButton.jsx');
var NewCategory = require('../covers/NewCategory.jsx');

module.exports = React.createClass({
	getDefaultProps: function () {
		return { origin: process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : '' };
	},
	getInitialState: function () {
		return { 
			asin: 'B007J4T2G8', // initial book is Fifty Shades of Grey - Book#1
			category: '',
			seen_books: [], // books seen by this user in this session, so they don't see the same book twice
			starter_books: [] // books from the initial API call on the genre. Store them to limit API calls
		};
	},
	fetchUnrelatedBook: function(category) {
		var setable_category = category || this.state.category
		Reqwest({
			url: '/fetch_new_book/' + {setable_category},
			type: 'json',
			method: 'get',
			contentType: 'application/json',
			suceess: this.handleNewBook,
			error: function(error) {
				console.error('fetch_new', error['response']);
				location = '/';
			}
		});
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
		.then(response => this.setState({ asin: 'B00GEEB9YC' }))
		.fail(err => console.log('error!'));
	},
	changeBook: function(data) {
		this.setState({ asin: 'B00GEEB9YC' });
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
						<MoreButton onChange={this.fetchRelatedBook} />
						<LessButton onChange={this.fetchUnrelatedBook} />
						<NewCategory onChange={this.fetchUnrelatedBook} />
		      	<a className="btn btn-primary btn-lg btn-border btn-block" href={"http://www.amazon.com/dp/" + this.props.asin + "/?tag=scrowed-20"} target="_blank" rel="nofollow">
			      	<b><i className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></i> See it on Amazon</b>
		      	</a>
					</div>
				</div>
			</div>
		);
	}
});