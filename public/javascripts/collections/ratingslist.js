var RatingsList = Backbone.Collection.extend({
	model: Rating,
	url: '/ratings',
});