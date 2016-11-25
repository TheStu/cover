// New books only by different author
// add each asin to seen books
// grab a book from starter_books (needs better name) if Unrelated called. look for category == category

var React = require('react');
var Reqwest = require('reqwest');
var Cover = require('../covers/Cover.jsx');
var MoreButton = require('../covers/MoreButton.jsx');
var LessButton = require('../covers/LessButton.jsx');
var ChooseGenre = require('../covers/ChooseGenre.jsx');

module.exports = React.createClass({
	getDefaultProps: function() {
		return { origin: process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : '' };
	},
	getInitialState: function() {
		return { 
			asin: 'B007J4T2G8', // initial book is Fifty Shades of Grey - Book#1
			category: '157057011', // erotica category (amazon node id -- see ChooseGenre.jsx)
			author: 'E L James', // saved so that books by the same author aren't shown again and again. Variety is better
		};
	},
	componentWillMount: function() { // since there's no point rerendering on these variables, define as instance variables rather than state
		this.seenBooks = ['B007J4T2G8']; // books seen by this user in this session, so they don't see the same book twice
		this.displayableBooks = []; // books from the initial API call on the genre. Store them to limit API calls
	},
	fetchNewCategory: function(newCategory) {
		this.setState({ category: newCategory })
		this.displayableBooks = []; // reset displayable books upon switching to a new category, otherwise might return unexpected starter_books
		var origin = this.props.origin;
		var cat = newCategory;
		Reqwest({
			url: origin + '/fetch_new_book/' + cat,
			type: 'json',
			method: 'get',
			contentType: 'application/json',
		})
		.then(response => this.handleBookData(response))
		.fail(err => console.log('error!'));
	},
	fetchRelatedBook: function() {
		var origin = this.props.origin;
		var asin = this.state.asin;
		var author = this.state.author;
		Reqwest({
			url: origin + '/fetch_related_book/' + asin + '/' + author,
			type: 'json',
			method: 'get',
			contentType: 'application/json',
		})
		.then(response => this.handleBookData(response))
		.fail(err => console.log('error!'));
	},
	handleBookData: function(data) {
		this.displayableBooks = this.displayableBooks.concat(data);
		this.changeBook();
	},
	changeBook: function() {
		var newAsin = '';
		var newAuthor = '';
		var newBook = {};
		do { // loop that finds a book that hasn't been shown yet
			newBook = this.displayableBooks.pop();
			newAsin = newBook['asin'];
			newAuthor = newBook['author'];
		} while (this.seenBooks.includes(newAsin) && this.displayableBooks.length > 0);
		this.seenBooks.push(this.state.asin);
		this.setState({ asin: newAsin, author: newAuthor });
	},
	render: function () {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4 col-lg-offset-2 text-right">		
						<div className="cover">
							<Cover asin={this.state.asin} />
						</div>
					</div>
					<div className="col-lg-3">
						<div className="buttons">
							<div className="feature-bg">
								<p className="read-text">Try judging a book by how good the first chapter is. Click on the cover to start reading!</p>
								<img className="arrow" src="arrow.png" />
							</div>
							<div className="feature-bg">
								<h4>Show Me...</h4>
								<MoreButton onChange={this.fetchRelatedBook} />
								<br/>
								<LessButton onChange={this.changeBook} displayableBookLength={this.displayableBooks.length} />
				      	<a className="btn btn-primary btn-lg btn-border btn-block" href={"http://www.amazon.com/dp/" + this.state.asin + "/?tag=scrowed-20"} target="_blank" rel="nofollow">
					      	<b><i className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></i> See it on Amazon</b>
				      	</a>
			      	</div>
			      	<div className="feature-bg">
								<h4>Or Explore a New Genre...</h4>
								<ChooseGenre onChange={this.fetchNewCategory} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});