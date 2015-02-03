// Userlist data array for filling in info box
var ratingslistData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    $('#btnAddRating').on('click', addRating);
    $('#ratingslist table tbody').on('click', 'td a.linkdeleterating', deleteRating);
    $('#ratingslist table tbody').on('click', 'td a.linkupdaterating', createUpdateForm);
    $('#btnUpdateRating').on('click', updateRating);
});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/ratingslist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowrating" rel="' + this.restaurant_name + '">' + this.restaurant_name + '</a></td>';
            tableContent += '<td>' + this.rating + '</td>';
            tableContent += '<td><a href="#" class="linkdeleterating" rel="' + this._id + '">delete</a></td>';
            tableContent += '<td><a href="#" class="linkupdaterating" rel="' + this._id + '">edit</a></td>';
        });

        // Inject the whole content string into our existing HTML table
        $('#ratingslist table tbody').html(tableContent);
    });
}

function addRating(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addRating input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newRating = {
            'restaurant_name': $('#addRating fieldset input#inputRestaurantName').val(),
            'rating': $('#addRating fieldset input#inputRating').val(),
        };

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newRating,
            url: '/users/addrating',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addRating fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
}

function deleteRating(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this rating?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleterating/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

}

function createUpdateForm(event) {
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: '/users/rating/' + $(this).attr('rel')
    }).done(function( response ) {
        $('#updateRating').toggle();
        $('#inputUpdateRestaurantName').val(response.restaurant_name);
        $('#inputUpdateRating').val(response.rating);
        $('#inputId').val(response._id);
        });
}

function updateRating(event) {
    event.preventDefault();

    var Rating = {
    'restaurant_name': $('#updateRating fieldset input#inputUpdateRestaurantName').val(),
    'rating': $('#updateRating fieldset input#inputUpdateRating').val(),
    'id': $('#updateRating fieldset input#inputId').val()
    };

    $.ajax({
        type: 'PUT',
        data: Rating,
        url: '/users/updaterating',
        dataType: 'JSON'
    }).done(function( response ) {
        if (response.msg === '') {
        }
        else {
            alert('Error: ' + response.msg);
        }
        $('#updateRating').toggle();
        populateTable();

    });
}





