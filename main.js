const api_key = "xHx2Nr5Ujl0IbVhu7YVQhxDZHhsU6qfGj4fyQbQF";
const api_url = "https://api.nasa.gov/planetary/apod";

const form = document.querySelector(".main__form");
const inputField = document.querySelector(".main__input");
const title = document.querySelector(".main__hero");

const image = document.getElementById("background__image");
const imageDate = document.querySelector(".main__date");
const imageTitle = document.querySelector(".main__title");
const imageDescription = document.querySelector(".main__description");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const dateFilled = inputField.value;
  if (dateFilled) {
    GetData(dateFilled);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Date was empty!",
    });
  }
});

window.addEventListener("load", () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const maxDate = yyyy + "-" + mm + "-" + dd;

  inputField.max = maxDate;

  imageDescription.style.display = "none";
});

async function GetData(date) {
  try {
    const response_data = await fetch(
      `${api_url}?date=${date}&api_key=${api_key}`
    );
    const data = await response_data.json();
    const [year, month, day] = data.date.split("-");

    image.src = `${data.url}`;
    imageTitle.innerHTML = `${data.title}`;
    imageDate.innerHTML = `Clicked on: ${day}-${month}-${year}`;

    imageDescription.style.display = "flex";
    form.style.display = "none";
    title.style.display = "none";
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
}
