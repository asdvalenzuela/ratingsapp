var TableModel = Backbone.Model.extend({
	defaults: {
		fields: [],
		rows: new RatingsList()
	}
});

var TableView = Backbone.View.extend({
	template: _.template($('#table-template').html()),

	initialize: function() {
		this.ratingsListView = this.model.attributes.rows;
		this.render();
	},

	render:function() {
		this.$el.html(this.template(this.model.attributes));
		var $table = $('#table');
		this.ratingsListView.each(function(model) {
			var ratingView = new RatingView({model: model});
			$table.append(ratingView.el);
		});
		return this;
	},
});

var RatingsListView = Backbone.View.extend({
	el:'table',

	initialize: function() {
		this.collection = new app.RatingsList();
		this.collection.fetch({reset:true});
		this.render();
		this.listenTo(this.collection, 'add', this.renderRating);
		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function() {
		this.collection.each(function(item){
			this.renderRating(item);
		}, this);
	},

	renderRating: function(item) {
		var ratingView = new app.RatingView({
			model: item
		});
		this.$el.append(ratingView.render().el);
	},

	events: {
		'click #add': 'addRating'
	},

	addRating: function(e) {
		e.preventDefault();
		var formData = {};

		$('#addRating div').children('input').each(function(i, el){
			if($(el).val() !== '') {
				formData[el.id] = $(el).val();
			}
		});
		this.collection.add(new app.Rating(formData));
	},
});