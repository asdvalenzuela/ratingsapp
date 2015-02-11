var Rating = Backbone.Model.extend({
	defaults: {
		restaurant_name: 'Unknown',
		rating: 'Unknown',
	},
	urlRoot: '/ratings',
	idAttribute: '_id',
});