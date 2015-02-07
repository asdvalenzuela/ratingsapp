$(function() {

	var TableModel = Backbone.Model.extend({
		defaults: {
			fields: [],
			rows: ratingsCollection,
		}
	});

	var Rating = Backbone.Model.extend({
		defaults: {
			_id: 'Unknown',
			restaurant_name: 'Unknown',
			rating: 'Unknown',
		},
		urlRoot: '/ratings',
		idAttribute: '_id',
	});

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
			var newRating = prompt("Enter a new rating between 1 and 5:");
			if (newRating >= 1 && newRating <= 5) {
				this.model.set({'rating': newRating});
				this.model.save();
			}
			else {
				alert('Please enter a rating between 1 and 5!');
			}
		},
		deleteRating: function(e) {
			var answer = confirm('Are you sure you want to delete?');
			if (answer) {
				this.model.destroy();
				this.remove();
			}
		},
	});

	var TableView = Backbone.View.extend({
		template: _.template($('#table-template').html()),
		initialize: function() {
			this.ratingsCollection = this.model.attributes.rows;
			this.render();
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

	var RatingsCollection = Backbone.Collection.extend({
		model: Rating,
		url: '/ratings',
	});

	var RatingsCollectionView = Backbone.View.extend({
		initialize: function() {
			this.collection.on('reset', this.addAll, this);
		},
		addAll: function() {
			this.collection.forEach(this.addOne, this);
		},
		render: function() {
			this.addAll();
		},
		addOne: function(rating) {
			var ratingView = new RatingView({model: rating});
			ratingView.render();
			this.$el.append(ratingView.el);
		}
	});

	var ratingsCollection = new RatingsCollection({});
	ratingsCollection.fetch({
		success: function() {
			var table = new TableView({
			el: $('#table-container'),
			model: new TableModel({
			fields: ['Restaurant Name', 'Rating', 'Edit', 'Delete'],
			rows: ratingsCollection,
			})
		});
		}
	});

});





