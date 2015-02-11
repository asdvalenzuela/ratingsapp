var RatingView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($('#row-template').html()),
	initialize: function() {
		this.render();
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.render, this);
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	events: {
		'click #edit': 'updateRating',
		'click #delete': 'deleteRating',
	},
	updateRating: function(e) {
		var newRating = prompt('Enter a new rating between 1 and 5:');
		if (newRating >= 1 && newRating <= 5) {
			e.preventDefault();
			this.model.set({'rating': newRating});
			this.model.save();
		}
		else {
			e.preventDefault();
			alert('Please enter a rating between 1 and 5!');
		}
	},
	deleteRating: function(e) {
		var answer = confirm('Are you sure you want to delete?');
		if (answer) {
			e.preventDefault();
			this.model.destroy();
			this.remove();
		}
	},
});