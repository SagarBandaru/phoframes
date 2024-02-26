document.addEventListener('DOMContentLoaded', () => {
    const productContent = document.querySelector('.product-content');
  
  
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(products => {

        productContent.innerHTML = '';
  

        products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('product');
  

          productElement.innerHTML = `
            <a href="product.html">
              <img src="${product.image}">
            </a>    
            <div class="product-detail">
              <h3>${product.category} / ${product.subcategory}</h3>
              <h2>${product.product_name}</h2>
              <a href="#">Add to Cart</a>
              <p>Rs.${product.price}/-</p>
            </div>`;
  
          productContent.appendChild(productElement);
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  });
  