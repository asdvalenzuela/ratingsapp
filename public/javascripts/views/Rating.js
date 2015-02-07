var RatingView = Backbone.View.extend({
	tagName: 'tr',
	className: 'row',
	template: _.template($('#ratingRow').html()),

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	events: {
		'click .delete' : 'deleteRating'
	},

	deleteRating: function() {
		this.model.destroy();
		this.remove();
	},

});
