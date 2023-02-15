var shoppingFormEl = $('#shopping-form');
var shoppingListEl = $('#shopping-list');

function handleFormSubmit(event) {
  event.preventDefault();

  var inputEl = $("#shopping-input");
  var text = inputEl.val();

  // Check if the input is empty
  if (text.trim() === '') {
    alert('Please enter an item to add to the list!!');
    return;
  }

  var newListItem = $("<li>").text(text);

  // Assign a unique ID to the new list item
  var itemId = "item-" + Date.now();
  newListItem.attr("id", itemId);

  // Add a "Remove" button to the new list item
  var deleteButton = $("<button>").text("Remove").addClass("delete-item-btn btn btn-danger btn-small");
  newListItem.append(deleteButton);

  shoppingListEl.append(newListItem);

  // Saving to Local Storage
  localStorage.setItem(itemId, text);

  // Clear the text input
  inputEl.val("");

  // Update the shopping list with the new item
  updateShoppingList();
}

function updateShoppingList() {
  // Clear the shopping list
  shoppingListEl.empty();

  // Retrieve all items from Local Storage and add them to the shopping list
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    var newListItem = $("<li>").text(value);
    newListItem.attr("id", key);

    // Add a "Remove" button to the list item
    var deleteButton = $("<button>").text("Remove").addClass("delete-item-btn btn btn-danger btn-small");
    newListItem.append(deleteButton);
    shoppingListEl.append(newListItem);
  }
}

$(document).ready(function() {
  // Update the shopping list with the items in localStorage
  updateShoppingList();

  // Add event listener to the form submit event
  shoppingFormEl.submit(handleFormSubmit);

  // Add event listener to the click event of the shopping list
  shoppingListEl.on("click", function(event) {
    if ($(event.target).is(".delete-item-btn")) {
      // If the clicked element is a delete button, remove the item
      var listItem = $(event.target).closest("li");
      var itemId = listItem.attr("id");
      listItem.remove();
      localStorage.removeItem(itemId);
    }
    // If the clicked element is not a delete button, do nothing
  });
});