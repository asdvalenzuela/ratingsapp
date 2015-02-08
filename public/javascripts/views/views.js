var AddForm = Backbone.View.extend({
	template: _.template($('#add-form-template').html()),
	render: function(){
		this.$el.html(this.template);
		return this;
	},
	events:  {
		'click #save' : 'validateSubmission',
	},
	clearForm: function() {
		$('#inputRestaurantName').val(null);
		$('#inputRating').val(null);
	},
	validateSubmission: function(e) {
		var rating = new Rating();
		restaurantRating = this.$('#inputRating').val();
		restaurantName = this.$('#inputRestaurantName').val();
		var re = /[12345]/;
		if (!re.test(restaurantRating)) {
			alert('Please enter a number between 1 and 5.');
			this.clearForm();
			return;
		}
		else if (restaurantName === '') {
			alert('Please enter a restaurant name.');
			this.clearForm();
			return;
		}
		else {
			this.saveSubmission();
		}
	},
	saveSubmission: function() {
		var ratingsCollection = this.collection;
		ratingsCollection.create({
			restaurant_name: restaurantName,
			rating: restaurantRating,
		});
		this.clearForm();
	},
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

var TableView = Backbone.View.extend({
	template: _.template($('#table-template').html()),
	initialize: function() {
		this.ratingsCollection = this.model.attributes.rows;
		this.render();
		this.ratingsCollection.on('add', this.render, this);
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