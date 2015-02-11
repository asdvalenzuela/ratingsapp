var RatingsCollectionView = Backbone.View.extend({
	initialize: function() {
		this.collection.on('reset', this.render, this);
	},
	render: function() {
		this.collection.forEach(this.addOne, this);
	},
	addOne: function(rating) {
		var ratingView = new RatingView({model: rating});
		ratingView.render();
		this.$el.append(ratingView.el);
	}
});