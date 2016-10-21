var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

var Resources = React.createClass({
	renderSubjectsDiv: function() {
		var mainColumns = this.props.metadata.subjects.map(function(result, i) {
			<div className="col-md-4">
	          <h2>{result}</h2>
	          {this.renderLevel(this.props.metadata.levels, result)}
	        </div>
		})
		return mainColumns;
	},

	renderLevel: function(levels, subject) {
		var levelTitles = levels.map(function(result, i) {
			<h3>{result}</h3>
			{this.renderResources(result, subject)}
		})

		return levelTitles;
	},

	renderResources: function(level, subject) {
		var elem = _.filter(this.props.resources, function(e) {
			return (e.level === level && e.subject === subject)
		});

		return _.map(elem, function(e) {
			return (
				<a href={e.link}>
					<p>{e.name}</p>
				</a>
			);
		})
	},



	render: function() {
		console.log(this.props.metadata);
		console.log(this.props.resources);

		return (
			<div>
				<div className="col-md-4">
		          <p>Hello</p>
		        </div>
		        <div className="col-md-4">
		          <p>Byebye</p>
		        </div>
		        <div className="col-md-4">
		          <p>Yup</p>
		        </div>
            </div>
		)
	}
})

module.exports = Resources;