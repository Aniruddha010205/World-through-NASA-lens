const api_key = "xHx2Nr5Ujl0IbVhu7YVQhxDZHhsU6qfGj4fyQbQF";

const api_url = "https://api.nasa.gov/planetary/apod";

const form = document.querySelector(".main__form");
const title = document.querySelector(".main__div");
const get_data = async (date) => {
  try {
    const response_data = await fetch(
      `${api_url}?date=${date}&api_key=${api_key}`
    );
    let data = await response_data.json();
    const image = document.getElementById("background__image");
    image.src = `${data.url}`;
    form.style.display = "none";
    title.style.display = "none";
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateFilled = form.querySelector(".main__input").value;
  if (dateFilled) {
    get_data(dateFilled);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Date was empty!",
    });
  }
});

function init() {
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var dd = String(today.getDate()).padStart(2, "0");

  var maxDate = yyyy + "-" + mm + "-" + dd;

  form.querySelector(".main__input").max = maxDate;
}

window.addEventListener("load", init);






