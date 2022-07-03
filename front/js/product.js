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

//GET product id request using fetch, expects to only request product specific info
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

listProductPage('.item');