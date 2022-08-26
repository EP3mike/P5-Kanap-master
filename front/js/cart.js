//retrieves our stored cart items from local storage, returns a parsed array
const recapTable = JSON.parse(localStorage.getItem('myCart'));

//function to create dom elements for item articles from myCart items
function createCartItemArticle(itemFromCart){
    let newArticleElement = document.createElement('article');
    newArticleElement.className = "cart__item";
    newArticleElement.setAttribute('data-id', itemFromCart.productId);
    newArticleElement.setAttribute('data-color', itemFromCart.color);

    let cartItemImgContainer = document.createElement('div');
    cartItemImgContainer.className = 'cart__item__img';
    let cartItemImg = document.createElement('img');
    //
    cartItemImg.setAttribute('src',itemFromCart.src);
    cartItemImg.setAttribute('alt', itemFromCart.alt);
    //
    cartItemImgContainer.appendChild(cartItemImg);
    newArticleElement.appendChild(cartItemImgContainer);

    let cartItemContentContainer = document.createElement('div')
    cartItemContentContainer.className = "cart__item__content"
    newArticleElement.appendChild(cartItemContentContainer);

    let cartItemContentDescription = document.createElement('div');
    cartItemContentDescription.className = 'cart__item__content__description';
    let contentTitle = document.createElement('h2');
    //
    contentTitle.innerHTML = itemFromCart.title;
    //
    let contentColor = document.createElement('p');
    contentColor.innerHTML = itemFromCart.color;
    let contentPrice = document.createElement('p');
    //
    contentPrice.innerHTML = `${itemFromCart.price}€`;
    //
    cartItemContentDescription.appendChild(contentTitle);
    cartItemContentDescription.appendChild(contentColor);
    cartItemContentDescription.appendChild(contentPrice);
    cartItemContentContainer.appendChild(cartItemContentDescription);

    let cartItemContentSettingsContainer = document.createElement('div');
    cartItemContentSettingsContainer.className = 'cart__item__content__settings';
    cartItemContentContainer.appendChild(cartItemContentSettingsContainer);

    let cartItemContentSettingsQuantityContainer = document.createElement('div');
    cartItemContentSettingsQuantityContainer.className = 'cart__item__content__settings__quantity';
    let itemQuantity = document.createElement('p');
    itemQuantity.innerHTML = 'Qté : ';
    let itemInput = document.createElement('input');
    itemInput.setAttribute('type', "number");
    itemInput.className = "itemQuantity";
    itemInput.setAttribute('name', 'itemQuantity');
    itemInput.setAttribute('min', '1');
    itemInput.setAttribute('max','100');
    itemInput.setAttribute('value', itemFromCart.quantity);
    cartItemContentSettingsQuantityContainer.appendChild(itemQuantity);
    cartItemContentSettingsQuantityContainer.appendChild(itemInput);
    cartItemContentSettingsContainer.appendChild(cartItemContentSettingsQuantityContainer);

    let cartItemCOntentSettingsDeleteContainer = document.createElement('div');
    cartItemCOntentSettingsDeleteContainer.className = 'cart__item__content__settings__delete';
    let deleteButton = document.createElement('p');
    deleteButton.className = 'deleteItem';
    deleteButton.innerHTML = 'Delete';
    cartItemCOntentSettingsDeleteContainer.appendChild(deleteButton);
    cartItemContentSettingsContainer.appendChild(cartItemCOntentSettingsDeleteContainer);

    return newArticleElement;

}


//function to count how many total item articles, returns a sum
function totalArticles(cartArray) {
    let articleCounter = 0;
    for(let x in cartArray) {
        articleCounter += cartArray[x].quantity;
    }
    return articleCounter;
}

//function to calculate total cost of items in cart, returns a product
function totalCartPrice(cartArray) {
    let totalProduct = 0;
    for(let x in cartArray) {
        let currentProduct = cartArray[x].quantity * cartArray[x].price;
        totalProduct += currentProduct;
    }
    return totalProduct;
}

// function to create new item articles for each item stored in the cart
function displayCartItems(domElementToInsertFromId, cartArray) {
    let domElementToInsertInto = document.getElementById(domElementToInsertFromId);
    for(let x of cartArray) {
        domElementToInsertInto.appendChild(createCartItemArticle(x));
    }
}

//function to insert total articles and total price into dom
function displayCartPrice(cartArray) {
    let totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.innerHTML = totalArticles(cartArray);
    let totalPrice = document.getElementById('totalPrice');
    totalPrice.innerHTML = totalCartPrice(cartArray);
}

// function call to display local stored cart items into specific dom element 
displayCartItems('cart__items' , recapTable);

//function call to display cart price and total articles
displayCartPrice(recapTable);

//add event listener to quantity selector, using node list of all itemQuantity classes
const itemInputSelectors = document.querySelectorAll(".itemQuantity");
itemInputSelectors.forEach(itemInputSelector => {
    itemInputSelector.addEventListener('change', function () {
        let updatedQuantity = parseInt(itemInputSelector.value);
        let targetArticle = itemInputSelector.closest(".cart__item");
        for(let x in recapTable) {
            if(recapTable[x].productId === targetArticle.dataset.id && recapTable[x].color === targetArticle.dataset.color) {
                recapTable[x].quantity = updatedQuantity;
            }
            let updatedRecapTable = JSON.stringify(recapTable);
            localStorage.setItem('myCart', updatedRecapTable);
        }
        displayCartPrice(recapTable);
    });
});


// add event listener to delete button, using node list of all delete btn classes
const itemDeleteButtons = document.querySelectorAll(".deleteItem");
itemDeleteButtons.forEach(itemDeleteButton => {
    itemDeleteButton.addEventListener('click' , function () {
        let targetArticle = itemDeleteButton.closest(".cart__item");
        for(let x in recapTable) {
            if(recapTable[x].productId === targetArticle.dataset.id && recapTable[x].color === targetArticle.dataset.color) {
                recapTable.splice(x,1);
            }
            let updatedRecapTable = JSON.stringify(recapTable);
            localStorage.setItem('myCart', updatedRecapTable);
        }
        targetArticle.remove();
        displayCartPrice(recapTable);
    });
});

// contact object holding all inputs from cart order form
class cartContact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName; 
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

// regular expression variable to check email inputs against 
const emailRegEx = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

//function to check if input follows email regEx, returns test value boolean
function isEmailRegEx (emailToTest) {
    let result = emailRegEx.test(emailToTest);
    return result;
}

//function to collect first name input, returns first name string or error message if empty input
function collectFirstName() {
    let firstName = document.getElementById('firstName').value;
    let errorMsg = document.getElementById('firstNameErrorMsg');
    if(firstName === undefined | firstName === "") {
        errorMsg.innerHTML = "Please input your first name!";
    }
    else {
        errorMsg.innerHTML = "";
        return firstName;
    }
}

//function to collect last name input, returns last name string or error message if empty input
function collectLastName() {
    let lastName = document.getElementById('lastName').value;
    let errorMsg = document.getElementById('lastNameErrorMsg');
    if(lastName === undefined | lastName === "") {
        errorMsg.innerHTML = "Please input your last name!";
    }
    else {
        errorMsg.innerHTML = "";
        return lastName;
    }
}

// function to collect address input, returns address string or error message if empty input
function collectAddress() {
    let address = document.getElementById('address').value;
    let errorMsg = document.getElementById('addressErrorMsg');
    if(address === undefined | address === "") {
        errorMsg.innerHTML = "Please input your address!";
    }
    else {
        errorMsg.innerHTML = "";
        return address;
    }
}

// function to collect city input, returns city string or error message if empty input
function collectCity() {
    let city = document.getElementById('city').value;
    let errorMsg = document.getElementById('cityErrorMsg');
    if(city === undefined | city === "") {
        errorMsg.innerHTML = "Please input your city!";
    }
    else {
        errorMsg.innerHTML = "";
        return city;
    }
}

// function to collect email input, returns email string after reg check or error message if empty/invalid input
function collectEmail() {
    let email = document.getElementById('email').value;
    let errorMsg = document.getElementById('emailErrorMsg');
    if(!isEmailRegEx(email)) {
        errorMsg.innerHTML = "Please input a valid email!";
    }
    else if(isEmailRegEx(email)) {
        errorMsg.innerHTML = "";
        return email;
    }
}

// function to create cartContact obj to send back to server, returns cartContact instance
function createCartContact() {
    let contactFirstName = collectFirstName();
    let contactLastName = collectLastName();
    let contactAddress = collectAddress();
    let contactCity = collectCity();
    let contactEmail = collectEmail();
    let newCartContact = new cartContact(contactFirstName , contactLastName , contactAddress, contactCity, contactEmail);
    return newCartContact;
}

//function to create product table from cart, returns an array of product id strings;
function createProductTable() {
    let tempArray = [];
    for(let x in recapTable) {
        tempArray.push(recapTable[x].productId);
    }
    return tempArray;
}   

const apiUrl = 'http://localhost:3000/api/products/order'
//fetch post request to send form data 
async function sendPostRequest(objectToSend, arrayToSend) {
    try {
        let newOrder = {
            contact: objectToSend,
            products: arrayToSend,
        };
        const response = await fetch(`${apiUrl}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json" 
            },
            body: JSON.stringify(newOrder)
        });
        const result = await response.json();
        // console.log(result);
        return result;
    }catch(e) {
        console.log(e);
    }
}

//function to redirect to confirmation page using location.href 
function redirectWindow(orderIdToAppend) {
   let searchParams = new URLSearchParams('orderId = ');
   searchParams.set("orderid", orderIdToAppend);
   let url = "./confirmation.html?"+`${searchParams}`;
   window.location.href = url;

}

// order button event listener to collect form data into contact obj and array of product ids
document.getElementById('order').addEventListener('click', async function(event) {
    event.preventDefault();
    const orderForm = createCartContact();  
    const productTable = createProductTable();
    console.log(productTable);
    console.log(orderForm);

    let postResult = await sendPostRequest(orderForm, productTable);
    console.log(postResult);

    redirectWindow(postResult.orderId);
    
});




