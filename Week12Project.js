// Create a CRD application (CRUD without update) using json-server or another API
// Use fetch and async/await to interact with the API
// Use a form to create/post new entities
// Build a way for users to delete entities
// Include a way to get entities from the API and display them
// You do NOT need update, but you can add it if you'd like
// Use Bootstrap and/or CSS to style your project

let PORT = 3000;
let URL = `http://localhost:${PORT}/`;
//let lastCreatedItem
const bookContainer = document.getElementById("books-container");

async function onFetchBooksClick() {
  const response = await fetch(`${URL}books`); //needs URL
  const bookList = await response.json();
  console.log(bookList);

  let tempBooks = "";

  bookList.map((book) => {
    tempBooks = `<div class="bg-light rounded mt-5">
        <h3>${book.title}</h3>
        <p>${defineGenre(book.genreId)}</p>
    </div>`;

    bookContainer.innerHTML += tempBooks;
  });
}

function defineGenre(num) {
  switch (num) {
    case 1:
      return "Romance";
      break;
    case 2:
      return "Thriller";
      break;
    case 3:
      return "Fantasy";
      break;
    default:
      return "Not Assigned";
      break;
  }
}

async function onCreateBookClick() {
  const testBook = { title: "Test", genreId: 1 };
  const response = await fetch("http://localhost:3000/books", {
    method: "POST", //create
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testBook),
  });

  const newlyCreatedItem = await response.json();
  //lastCreatedItem = newlyCreatedItem
}

async function onUpdateBookClick() {
  // if(lastCreatedItem === null) {
  //     console.log("No item created yet to update")
  //     return
  // }
}

// fetch("URL" + lastCreatedItem.id, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title: "Test Updated", genreId: 2 })
// })

async function onDeleteBookClick() {
  if (lastCreatedItem === null) {
    console.log("No item created yet to delete");
    return;
  }
  fetch("http://localhost:3000/books" + lastCreatedItem.id, {
    method: "DELETE", //delete
  });
}

//**********Genres**********

const genreContainer = document.getElementById("genres-container");
const genreIdTextbox = document.getElementById("genre-id-textbox");

async function onFetchGenreClick() {
  const response = await fetch("http://localhost:3000/genres");
  const genreList = await response.json();

  genreContainer.innerHTML = genreList
    .map(
      (genre) => `<div class="bg-light rounded mt-5">
        <h3>${genre.title}</h3>
        <p>id: ${genre.id}</p>
    </div>`
    )
    .join("");
}

async function onCreateGenreClick() {
  const newGenre = { title: "New Genre" };
}

async function onUpdateGenreClick() {
  const idToUpdate = genreIdTextBox.value;
  const updatedGenreData = { title: "Updated Genre" };

  genreIdTextbox.value = "";
}

async function onDeleteGenreClick() {
  const idToDelete = genreIdTextBox.value;

  genreIdTextbox.value = "";
}


        document.getElementById('entityForm').addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevent the default form submission
            
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;

            try {
                const response = await fetch('/api/entities', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, description })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const result = await response.json();
                document.getElementById('responseMessage').innerText = 'Entity created successfully: ' + result.id;
                document.getElementById('entityForm').reset(); // Reset the form
            } catch (error) {
                document.getElementById('responseMessage').innerText = 'Error: ' + error.message;
            }
        });
  
</body>
</html>
