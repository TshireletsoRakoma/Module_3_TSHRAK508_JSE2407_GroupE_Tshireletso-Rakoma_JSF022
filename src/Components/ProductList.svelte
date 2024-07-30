<script>
    import { onMount } from 'svelte';
    import { writable, derived } from 'svelte/store';
    import ProductCard from './ProductCard.svelte';
  
    let products = writable([]);
    let loading = writable(true);
    let error = writable(null);
    let categories = writable([]);
    let searchTerm = writable('');
    let sorting = writable('default');
    let filterItem = writable('All categories');
  
    const fetchProducts = async () => {
      loading.set(true);
      error.set(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        products.set(data);
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        categories.set(uniqueCategories);
      } catch (err) {
        error.set(err.message);
      } finally {
        loading.set(false);
      }
    };
  
    const filteredProducts = derived(
      [products, searchTerm, sorting, filterItem],
      ([$products, $searchTerm, $sorting, $filterItem]) => {
        let filtered = $products.filter(product =>
          product.title.toLowerCase().includes($searchTerm.toLowerCase()) &&
          ($filterItem === 'All categories' || product.category === $filterItem)
        );
  
        if ($sorting === 'low') {
          filtered.sort((a, b) => a.price - b.price);
        } else if ($sorting === 'high') {
          filtered.sort((a, b) => b.price - a.price);
        }
  
        return filtered;
      }
    );
  
    onMount(() => {
      fetchProducts();
    });
  </script>
  
  <div class="p-6">
    <div class="mb-4 flex space-x-4">
      <select bind:value={$sorting} class="p-2 border rounded">
        <option value="default">Default</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
  
      <input
        type="text"
        bind:value={$searchTerm}
        placeholder="Search products..."
        class="p-2 border rounded"
      />
  
      <select bind:value={$filterItem} class="p-2 border rounded">
        <option value="All categories">All categories</option>
        {#each $categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </div>
  
    {#if $loading}
      <p>Loading...</p>
    {:else if $error}
      <p class="text-red-500">{$error}</p>
    {:else if $filteredProducts.length === 0}
      <p>No products available.</p>
    {:else}
      <div class="grid-container">
        {#each $filteredProducts as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>
    {/if}
  </div>
  
  <style>
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
  </style>
  