<!-- src/Components/ProductCard.svelte -->
<script>
    import { navigate } from 'svelte-routing';
    export let product;
  </script>
  
  <div class="product-card p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <img src={product.image} alt={product.title} class="product-image w-full h-48 object-contain mb-4 rounded">
    <div class="product-info">
      <h2 class="product-title text-lg font-semibold mb-2">{product.title}</h2>
      <p class="product-price text-gray-600 mb-2">${product.price}</p>
      <p class="product-category text-gray-500 text-sm mb-2">{product.category}</p>
      <button on:click={() => navigate(`/product/${product.id}`)} class="view-details-button bg-blue-500 text-white px-4 py-2 rounded">View Details</button>
    </div>
  </div>
  
  <style>
    .product-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      background-color: #b0eeff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
      cursor: pointer;
      height: 100%;
    }
  
    .product-card:hover {
      transform: scale(1.05);
    }
  
    .product-image {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 8px 8px 0 0;
    }
  
    .product-info {
      text-align: center;
      width: 100%;
    }
  
    .product-title {
      font-size: 1.2rem;
      margin: 0.5rem 0;
    }
  
    .product-price {
      color: #2c3e50;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  
    .view-details-button {
      margin-top: 0.5rem;
      background-color: #007BFF;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
  
    .view-details-button:hover {
      background-color: #0056b3;
    }
  
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
  </style>
  