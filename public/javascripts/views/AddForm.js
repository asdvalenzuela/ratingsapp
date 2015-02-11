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
			number: 1,
			sum: restaurantRating,
		}, { success: function(model) {
			if (model.attributes.msg === 'duplicate found') {
				model.destroy();
				ratingsCollection.fetch();
			}
			}
		});
		this.clearForm();
	},
});