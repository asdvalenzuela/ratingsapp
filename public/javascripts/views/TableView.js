var TableView = Backbone.View.extend({
	template: _.template($('#table-template').html()),
	initialize: function() {
		this.ratingsCollection = this.model.attributes.rows;
		this.render();
		this.ratingsCollection.on('add', this.render, this);
		this.ratingsCollection.on('remove', this.render, this);
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		var $table = $('#table');
		this.ratingsCollection.each(function(model){
			var ratingView = new RatingView({model:model});
			$table.append(ratingView.el);
		});
		return this;
	},
});