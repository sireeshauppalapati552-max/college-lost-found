// Get existing items from localStorage

let items = JSON.parse(
    localStorage.getItem("campusItems")
) || [];


// -------------------------------------
// REPORT ITEM
// -------------------------------------

const itemForm = document.getElementById("itemForm");


if (itemForm) {

    itemForm.addEventListener("submit", function(event) {

        event.preventDefault();


        // Get values

        const type =
            document.getElementById("type").value;

        const itemName =
            document.getElementById("itemName").value;

        const category =
            document.getElementById("category").value;

        const location =
            document.getElementById("location").value;

        const date =
            document.getElementById("date").value;

        const description =
            document.getElementById("description").value;

        const contact =
            document.getElementById("contact").value;


        // Create item object

        const newItem = {

            id: Date.now(),

            type: type,

            itemName: itemName,

            category: category,

            location: location,

            date: date,

            description: description,

            contact: contact

        };


        // Add item

        items.push(newItem);


        // Save to browser

        localStorage.setItem(
            "campusItems",
            JSON.stringify(items)
        );


        alert(
            "Your item has been reported successfully!"
        );


        // Clear form

        itemForm.reset();

    });

}



// -------------------------------------
// DISPLAY ITEMS
// -------------------------------------

const itemsContainer =
    document.getElementById("itemsContainer");


function displayItems(filteredItems) {

    if (!itemsContainer) {
        return;
    }


    itemsContainer.innerHTML = "";


    if (filteredItems.length === 0) {

        itemsContainer.innerHTML = `
            <div class="item-card">
                <h3>No items found</h3>
                <p>
                    Try another search or report a new item.
                </p>
            </div>
        `;

        return;
    }


    filteredItems.forEach(function(item) {


        const card =
            document.createElement("div");


        card.className = "item-card";


        const statusClass =
            item.type === "Lost"
                ? "status-lost"
                : "status-found";


        card.innerHTML = `

            <span class="status ${statusClass}">
                ${item.type}
            </span>

            <h3>
                ${item.itemName}
            </h3>

            <p>
                <strong>Category:</strong>
                ${item.category}
            </p>

            <p>
                <strong>Location:</strong>
                ${item.location}
            </p>

            <p>
                <strong>Date:</strong>
                ${item.date}
            </p>

            <p>
                <strong>Description:</strong>
                ${item.description}
            </p>

            <p>
                <strong>Contact:</strong>
                ${item.contact}
            </p>

            <button
                class="delete-btn"
                onclick="deleteItem(${item.id})">

                Delete

            </button>

        `;


        itemsContainer.appendChild(card);

    });

}


displayItems(items);



// -------------------------------------
// DELETE ITEM
// -------------------------------------

function deleteItem(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this item?"
        );


    if (!confirmDelete) {
        return;
    }


    items =
        items.filter(function(item) {

            return item.id !== id;

        });


    localStorage.setItem(
        "campusItems",
        JSON.stringify(items)
    );


    displayItems(items);

}



// -------------------------------------
// SEARCH
// -------------------------------------

const searchInput =
    document.getElementById("searchInput");

const filterCategory =
    document.getElementById("filterCategory");

const filterType =
    document.getElementById("filterType");


function filterItems() {

    const searchText =
        searchInput.value.toLowerCase();


    const category =
        filterCategory.value;


    const type =
        filterType.value;


    const filtered =
        items.filter(function(item) {


            const matchesSearch =

                item.itemName
                    .toLowerCase()
                    .includes(searchText)

                ||

                item.description
                    .toLowerCase()
                    .includes(searchText)

                ||

                item.location
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =

                category === "All"
                ||
                item.category === category;


            const matchesType =

                type === "All"
                ||
                item.type === type;


            return (
                matchesSearch
                &&
                matchesCategory
                &&
                matchesType
            );

        });


    displayItems(filtered);

}



// Search event

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterItems
    );

}


if (filterCategory) {

    filterCategory.addEventListener(
        "change",
        filterItems
    );

}


if (filterType) {

    filterType.addEventListener(
        "change",
        filterItems
    );

}