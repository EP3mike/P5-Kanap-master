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

//add event listener to quantity selector
// document.getElementsByClassName('').addEventListener('change', function() {
//     let selectedQuantity = '';
// }
// , true);