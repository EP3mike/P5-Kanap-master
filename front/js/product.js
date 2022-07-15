const apiUrl = 'http://localhost:3000/api/products/'

//function to collect product id using URLSearch params, returns product id
function collectProductId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('id');
    // console.log(productId);
    return productId;
}

const uniqueId = collectProductId();

//GET product id request using fetch, expects to only request product specific info by unique id var
async function fetchProductPage() {
    try {
        const response = await fetch(`${apiUrl}${uniqueId}`);

        if(!response.ok) {
            throw new Error('Failed to fetch Kanap product page:', response.status)
        }
        
        return await response.json();
    }   catch(e) {
        console.log(e);
    }
}

// function to insert requested product info into dom
function listProductPage(productPageContainerElementClass) {
    const productPageContainerElement = document.querySelector(productPageContainerElementClass);

    fetchProductPage()
    .then(productPage => {
        if(!productPage) {
            productPageContainerElement.innerHTML = 'No products fetched!';
            return 0;
        }

        createProductPage(productPage);

    })
    .catch(e => {
        console.log(e);
    });
}

//function to create html elements for product page info to be inserted into
function createProductPage(productPage) { 
    const itemImgContainer = document.querySelector('.item__img');
    const itemImgElement = document.createElement('img');
    itemImgElement.setAttribute('src', productPage.imageUrl);
    itemImgElement.setAttribute('alt', productPage.altTxt);
    itemImgContainer.appendChild(itemImgElement);

    const itemTitle = document.getElementById('title');
    itemTitle.innerHTML = productPage.name;

    const itemPrice = document.getElementById('price');
    itemPrice.innerHTML = productPage.price;

    const itemDescription = document.getElementById('description');
    itemDescription.innerHTML = productPage.description;

    const itemColorsAvailableButton = document.getElementById('colors');
    for(const color in productPage.colors) {
        const newColorOption = document.createElement('option');
        newColorOption.setAttribute('value',productPage.colors[color]);
        newColorOption.innerHTML = productPage.colors[color];
        itemColorsAvailableButton.appendChild(newColorOption);
    }
    
}

//function call to insert specific product info onto dom
listProductPage('.item');


////// code below to deal with adding products to local storage(cart)

// class to create cartItems obj
class cartItem {
  constructor(productId, quantity, color) {
    this.productId = productId;
    this.quantity = quantity;
    this.color = color;
  }
}

//function to create cart Item to be stored, returns a cartItem obj with quantity, color and product id
function createCartItem() {
  const itemColor = document.getElementById("colors").value;
  const itemQuantity = parseInt(document.getElementById("quantity").value);
  if (itemColor !== "--Please, select a color --" && itemQuantity !== 0) {
    let newCartItem = new cartItem(uniqueId, itemQuantity, itemColor);
    return newCartItem;
  }
}

//function to retrieve key of stored cart from local storage, returns cart info already parsed
function retrieveCart(keyToFetch) {
  let cartArray = JSON.parse(localStorage.getItem(keyToFetch));
  return cartArray;
}

//function to stringify array to be passed into local storage
function stringifyArray(arrayToStringify) {
  let stringifiedArray = JSON.stringify(arrayToStringify);
  return stringifiedArray;
}

// event listener to add cart button, assumes that color and quantity already chosen so can be properly added to cart
document.getElementById("addToCart").addEventListener("click", () => {
  let currentCart = retrieveCart("myCart");
  let currentCartItem = createCartItem();

  if (currentCart === null) {
    let myCart = [];
    myCart.push(currentCartItem);
    localStorage.setItem("myCart", stringifyArray(myCart));
  }

  if (currentCart !== null) {
    var productMatchIndex = currentCart.findIndex(
      currentCart => currentCart.color === currentCartItem.color
    );
    console.log(productMatchIndex);
    if (productMatchIndex === -1) {
      // case that current color+ product id do not exist in array
      currentCart.push(currentCartItem);
    } else {
      //case that current color is already in array
      if (currentCart[productMatchIndex].color === currentCartItem.color) {
        // if same color exists add to existing quantity
        currentCart[productMatchIndex].quantity += currentCartItem.quantity;
      } else {
        //
        currentCart.push(currentCartItem);
      }
    }
    localStorage.setItem("myCart", stringifyArray(currentCart));
  }

  console.log(localStorage.getItem("myCart"));
});


localStorage.clear();

