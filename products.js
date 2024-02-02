document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('product-container');
    let products;

    // Fetch product data from your server or an API
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });

    // Function to display products in the product-container
    function displayProducts(products) {
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productImg = document.createElement('img');
            productImg.src = product.image;
            productCard.appendChild(productImg);

            const productPrice = document.createElement('p');
            productPrice.classList.add('price');
            productPrice.textContent = `$${product.price.toFixed(2)}`;
            productCard.appendChild(productPrice);

            const productInfo = document.createElement('div');
            productInfo.classList.add('product-info');
            productInfo.innerHTML = `
                <p class="name">Product name: ${product.name}</p>
                <p class="dimensions">Dimensions: ${product.dimensions}</p>
                <p class="color">Color: ${product.color}</p>
                <p class="material">Material: ${product.material}</p>
            `;
            productCard.appendChild(productInfo);

            productContainer.appendChild(productCard);
        });
    }

  // Function to filter products based on category
  function filterItems(category) {
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

// Event listener for category filtering
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const category = this.dataset.category;
        filterItems(category);
    });
});
});