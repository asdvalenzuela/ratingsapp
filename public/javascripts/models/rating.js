var Rating = Backbone.Model.extend({
	defaults: {
		restaurantName: 'Unknown',
		rating: 'Unknown',
	},
	urlRoot: '/ratings',
});