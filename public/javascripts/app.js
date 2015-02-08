$(function() {

	var ratingsCollection = new RatingsCollection({});
	ratingsCollection.fetch({
		success: function() {
			var tableView = new TableView({
			el: $('#table-container'),
			model: new Table({
			fields: ['Restaurant Name', 'Rating', 'Edit', 'Delete'],
			rows: ratingsCollection,
			})
		});
		}
	});

	var addForm = new AddForm({collection:ratingsCollection});
	addForm.render();
	$('#add-form-container').append(addForm.$el);

});





