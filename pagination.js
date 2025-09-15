window.addEventListener("DOMContentLoaded", async () => {
  const renderData = document.querySelector(".renderData");
  const addToCartItems = document.querySelector(".addToCartItems");
  const categories = document.querySelector(".categories");
  let countDynamically = document.querySelector(".count-dynamically");
  let searchInput = document.querySelector(".searchInput");
  let array = [];
  let priceArray = [];
  // registerationDAta starts here
  let registeredData = JSON.parse(localStorage.getItem("registeredData"));
  let registerationData = registeredData || [];
  function registeredSavedData() {
    localStorage.setItem("registeredData", JSON.stringify(registerationData));
  }
  function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
  }
  function redirectToLogin() {
    if (!isLoggedIn()) {
      window.location.href = "login.html";
    }
  }

  // localStorage.clear();
  let registerName = document.getElementById("reg-name");
  let registerPassword = document.getElementById("reg-password");
  let registerEmail = document.getElementById("reg-email");

  let registrationForm = document.getElementById("registration-form");
  let loginForm = document.getElementById("login-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        registerName.value === "" ||
        registerPassword.value === "" ||
        registerEmail.value === ""
      ) {
        alert("Please fill in all fields");
      } else {
        let user = {
          name: registerName.value,
          email: registerEmail.value,
          password: registerPassword.value,
        };
        registerationData.push(user);
        registeredSavedData();
        console.log(registerationData);
        window.location.href = "login.html";
      }
      registrationForm.reset();
    });
  }
  // registerationData ends here
  // loginData starts here

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let email = document.getElementById("login-email").value;
      let password = document.getElementById("login-password").value;
      if (email === "" || password === "") {
        alert("Please fill in all fields");
        return;
      } else {
        if (registerationData.length > 0) {
          for (let i = 0; i < registerationData.length; i++) {
            if (
              email === registerationData[i].email &&
              password === registerationData[i].password
            ) {
              alert("Login Successful");
              loginForm.reset();
              localStorage.setItem("loggedIn", "true");
              localStorage.setItem(
                "loggedInUser",
                JSON.stringify(registeredData[i].name)
              );
              window.location.href = "index.html";

              return;
            }
          }
          loginForm.reset();
          alert("Login Failed");
        } else {
          loginForm.reset();
          alert("Login Failed");
        }
      }
    });
  }
  // localStorage.clear();
  // loginData ends here

  let loginClass = document.querySelector(".login-class");
  let logoutClass = document.querySelector(".logout");

  let logoutButton = document.querySelector(".logoutBtn");
  if (isLoggedIn()) {
    loginClass.style.display = "none";
    logoutClass.style.display = "flex";
  }
  if (!isLoggedIn()) {
    logoutClass.style.display = "none";
    loginClass.style.display = "flex";
  }
  let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (currentUser) {
    let loggedInUserName = document.getElementById("userName");
    loggedInUserName.textContent = `Welcome ${currentUser.toLocaleUpperCase()}`;
  }

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("loggedIn", "true");
    window.location.href = "login.html";
    console.log("Logout Button Clicked");
  });

  function disiplayProducts(data) {
    data.map((product) => {
      let createCard = document.createElement("div");
      createCard.setAttribute("class", "card");
      let createLink = document.createElement("a");
      createLink.setAttribute("href", `#${product.id}`);
      let createImgElemtn = document.createElement("img");
      createImgElemtn.setAttribute("src", product.image);
      createImgElemtn.setAttribute("class", "productImage");
      let createTitleEle = document.createElement("h3");
      createTitleEle.textContent =
        product.title.length > 15
          ? product.title.substring(0, 15) + "..."
          : product.title;
      let createDescriptionEle = document.createElement("p");
      createDescriptionEle.textContent =
        product.description.length > 45
          ? product.description.substring(0, 45) + "..."
          : product.description;
      let createPriceEle = document.createElement("h5");
      createPriceEle.textContent = `Price: $${product.price}`;
      let createButtonsClass = document.createElement("div");
      createButtonsClass.setAttribute("class", "buttonsClass");
      let createButton = document.createElement("button");
      createButton.textContent = "Add To Cart";
      createButton.setAttribute("class", "addToCart");
      let createShowButton = document.createElement("button");
      createShowButton.textContent = "ShowDetails";
      createShowButton.setAttribute("class", "showDetails");
      renderData.appendChild(createCard);
      createCard.appendChild(createImgElemtn);
      createCard.appendChild(createTitleEle);
      createCard.appendChild(createDescriptionEle);
      createCard.appendChild(createPriceEle);
      createCard.appendChild(createButtonsClass);
      createButtonsClass.appendChild(createButton);
      createButtonsClass.appendChild(createShowButton);

      function addToCart(id, img, price) {
        if (!isLoggedIn()) {
          redirectToLogin();
          return;
        }

        array.push({
          id,
          img,
          price,
          quantity: 1,
        });

        priceArray.push(price);
        let sum = 0;
        function sumOfPrice() {
          for (let i = 0; i < priceArray.length; i++) {
            sum += priceArray[i];
          }
        }
        sumOfPrice();
        console.log(priceArray);
        console.log(sum);
        document.querySelector(".price-total").textContent = `$${Math.round(
          sum
        )}`;
        // savedArray();

        // countDynamically.innerHTML = array.length;
        countDynamically.textContent++;
        console.log("Product Added To Cart", img, price);

        let cartDisplay = document.createElement("div");
        cartDisplay.setAttribute("class", "cartDisplay");
        let addedImage = document.createElement("img");
        addedImage.setAttribute("src", img);
        addedImage.setAttribute("class", "productImage");
        let addedPrice = document.createElement("h4");
        addedPrice.textContent = `Price: $${price}`;
        let trashAdded = document.createElement("i");
        trashAdded.setAttribute("class", "fas fa-trash");
        trashAdded.style.cursor = "pointer";
        trashAdded.addEventListener("click", (current) => {
          cartDisplay.remove();
          let index = array.findIndex(
            (item) => item.price === price && item.img === img
          );
          if (index > -1) {
            let splicedArray = array.splice(index, 1);
            console.log(splicedArray.indexOf(index));
          }
          // console.log(index);

          let splicedArray = priceArray.splice(priceArray.indexOf(price), 1); // Removes the price from the priceArray
          console.log(splicedArray);
          console.log(priceArray);
          let totalSum = 0;
          if (priceArray.length === 0) {
            document.querySelector(".price-total").textContent = `$${totalSum}`;
          } else {
            for (let i = 0; i < priceArray.length; i++) {
              totalSum += priceArray[i];
            }
            document.querySelector(".price-total").textContent = `$${Math.round(
              totalSum
            )}`;
          }
          if (array.length === 0) {
            document.querySelector(".cartItems").textContent =
              "Your Empty Cart";
          }
          // savedArray();
          countDynamically.textContent--;
        });
        addToCartItems.appendChild(cartDisplay);
        cartDisplay.appendChild(addedImage);
        cartDisplay.appendChild(addedPrice);
        cartDisplay.appendChild(trashAdded);
      }

      createButton.addEventListener("click", () =>
        addToCart(product.id, product.image, product.price)
      );

      createShowButton.addEventListener("click", () => {
        console.log("Product Clicked", product.id);
        renderData.innerHTML = "";
        let createElement = document.createElement("div");
        // createElement.setAttribute("class", "card");
        createElement.setAttribute("id", "detailedCart");
        let createImage = document.createElement("img");
        createImage.setAttribute("src", product.image);
        createImage.setAttribute("class", "detailedProductImage");
        let createTitle = document.createElement("h3");
        createTitle.textContent =
          product.title.length > 20
            ? product.title.slice(0, 20).concat("...")
            : product.title;
        let createDescription = document.createElement("p");
        createDescription.textContent =
          product.description.length > 45
            ? product.description.slice(0, 45).concat("...")
            : product.description;
        let createPrice = document.createElement("h5");
        createPrice.textContent = `Price: $${product.price}`;
        createButtonsClass = document.createElement("div");
        createButtonsClass.setAttribute("class", "buttonsClass");
        let createButton = document.createElement("button");
        createButton.textContent = "Add To Cart";
        createButton.setAttribute("class", "addToCart");
        let createCloseButton = document.createElement("button");
        createCloseButton.textContent = "Close";
        createCloseButton.setAttribute("class", "closeDetails");
        renderData.appendChild(createElement);
        createElement.appendChild(createImage);
        createElement.appendChild(createTitle);
        createElement.appendChild(createDescription);
        createElement.appendChild(createPrice);
        createElement.appendChild(createButtonsClass);
        createButtonsClass.appendChild(createButton);
        createButtonsClass.appendChild(createCloseButton);
        createButton.addEventListener("click", () =>
          addToCart(product.image, product.price)
        );
        createCloseButton.addEventListener("click", () => {
          renderData.innerHTML = "";
          disiplayProducts(data);
        });
      });
    });
  }

  async function fetchProducts(url) {
    renderData.innerHTML = "";
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      console.log(data);

      disiplayProducts(data);

      searchInput.addEventListener("input", () => {
        let searchValue = searchInput.value;
        let filteredData = data.filter(
          (product) =>
            product.title.toLowerCase().includes(searchValue) ||
            product.description.toLowerCase().includes(searchValue)
        );
        if (filteredData.length === 0) {
          renderData.innerHTML = `<h1 style="text-align: center; margin-top: 50px">No Product Found</h1>`;
        } else {
          renderData.innerHTML = "";
          disiplayProducts(filteredData);
        }
      });
    } catch (error) {
      console.error("Product Fetching Error", error);
    }
  }
  async function fetchCategories(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      let createCategory = document.createElement("button");
      createCategory.textContent = "all".toLocaleUpperCase();
      createCategory.setAttribute("class", "category");
      categories.appendChild(createCategory);
      createCategory.addEventListener("click", () => {
        console.log("Category Clicked", "all");
        renderData.innerHTML = "";
        fetchProducts("https://fakestoreapi.com/products");
      });
      data.map((category) => {
        let createCategory = document.createElement("button");
        createCategory.textContent = category.toLocaleUpperCase();
        createCategory.setAttribute("class", "category");
        categories.appendChild(createCategory);
        createCategory.addEventListener("click", () => {
          console.log("Category Clicked", category);
          renderData.innerHTML = "";
          fetchProducts(
            `https://fakestoreapi.com/products/category/${category}`
          );
        });
      });
    } catch (error) {
      console.error("Categories Fetching Error", error);
    }
  }

  async function fetchProductsBySorting(order) {
    try {
      const url = `https://fakestoreapi.com/products?sort=${order}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      renderData.innerHTML = "";
      // addProducts();
      disiplayProducts(data);
    } catch (error) {
      console.error("Product Fetching Error", error);
    }
  }

  let dropDownSorting = document.querySelector("#dropDownSorting");
  dropDownSorting.addEventListener("change", () => {
    let selectedValue = dropDownSorting.value;
    console.log("Selected Value", selectedValue);
    fetchProductsBySorting(selectedValue);
  });

  fetchCategories("https://fakestoreapi.com/products/categories");
  fetchProducts("https://fakestoreapi.com/products");
});

