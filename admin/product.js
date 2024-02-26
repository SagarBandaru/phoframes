document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const pname = form.querySelector('[name="pname"]').value.trim();
      const price = form.querySelector('[name="price"]').value.trim();
      const sdesc = form.querySelector('[name="sdesc"]').value.trim();
      const ldesc = form.querySelector('[name="ldesc"]').value.trim();
      const category = form.querySelector('[name="category"]').value.trim();
      const image = form.querySelector('[name="image"]').files;
  
      if (!pname || !price || !sdesc || !ldesc || category === '---Select a Category---' || image.length === 0) {
        alert('All fields are required');
        return;
      }
  
      if (isNaN(parseFloat(price))) {
        alert('Price must be a valid number');
        return;
      }
  
      
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const imageExtension = image[0].name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(imageExtension)) {
        alert('Please select a valid image file');
        return;
      }
  
     
      const formData = new FormData(form);
  
      try {
        const response = await fetch('http://localhost:3000/api/product', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          alert('Product added successfully');
          
        } else {
          alert('Failed to add product');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during form submission');
      }
    });


    const contentDetail = document.querySelector('.content-detail tbody');

    
    fetch('http://localhost:3000/api/product')
      .then(response => response.json())
      .then(products => {
      
        contentDetail.innerHTML = '';
  
      
        products.forEach(product => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${product.product_name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td><button onclick="editProduct(${product.id})">Edit</button></td>
            <td><button onclick="deleteProduct(${product.id})">Delete</button></td>
          `;
          contentDetail.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  
    window.editProduct = function(productId) {
   
      console.log('Editing product with ID:', productId);
    };
  

    window.deleteProduct = function(productId) {
      
      console.log('Deleting product with ID:', productId);
    };
  });

  
  
  