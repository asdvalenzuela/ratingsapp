var RatingsCollection = Backbone.Collection.extend({
	model: Rating,
	url: '/ratings',
});