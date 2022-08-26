const apiUrl = 'http://localhost:3000/api/products'
const productPageLink = "./product.html"
//GET request function using fetch, will request all products contained by api
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);

        if(!response.ok) {
            throw new Error('Failed to fetch Kanap products:', response.status);
        }

        return await response.json();
    }   catch(e) {
        console.log(e);
    }

}

//function to list products from api into dom, takes html element id parameter to insert into

function listProducts(productContainerElementId) {
    const productContainerElement = document.getElementById(productContainerElementId);

    if(!productContainerElement ) {
        return 0;
    }

    fetchProducts()
    .then(products => {
        if(!products) {
            productContainerElement.innerHTML = 'No products fetched!';
            return 0;
        }

        for( const product of products) {
            productContainerElement.appendChild(createProductElement(product));
        }


    })
    .catch(e => {
        console.log(e);
    });
}

//function to create a new product dom element for the returned info from api, ie new img,title,description
function createProductElement(product) {
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute('href', `${productPageLink}?id=${product._id}`);
    // anchorElement.setAttribute('target', '_blank');


    const articleElement = document.createElement('article');
    anchorElement.appendChild(articleElement);

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', product.imageUrl);
    imageElement.setAttribute('alt', product.altTxt);
    articleElement.appendChild(imageElement);


    const titleElement = document.createElement('h3');
    titleElement.innerHTML = product.name;
    titleElement.className = "productName";
    articleElement.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = product.description;
    descriptionElement.className = "productDescription";
    articleElement.appendChild(descriptionElement);

    return anchorElement;
}

// function call to insert products into items div on homepage
listProducts('items');

