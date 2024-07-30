<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { Link } from "svelte-routing";
    
    export let id;
    let product = writable(null);
    let loading = writable(true);
    let error = writable(null);
  
    const fetchProduct = async (id) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Data fetching failed, please check your network connection.");
        }
        const data = await response.json();
        product.set(data);
      } catch (err) {
        error.set(err.message);
      } finally {
        loading.set(false);
      }
    };
    
    onMount(() => {
      fetchProduct(id);
    });
  </script>
  
  <main>
    {#if $loading}
      <p>Loading...</p>
    {:else if $error}
      <p>Error: {$error}</p>
    {:else if $product}
      <div class="product-detail">
        <img src="{$product.image}" alt="{$product.title}" />
        <h1>{$product.title}</h1>
        <p>{$product.description}</p>
        <p>$ {$product.price}</p>
        <p>{$product.category}</p>
        <p>Rating: {$product.rating.rate}</p>
        <p>Number of Reviews: {$product.rating.count}</p>
      </div>
    {/if}
    <Link to="/">Back to products</Link>
  </main>
  
  <style>
    .product-detail {
      max-width: 300px;
      margin: 0 auto;
      text-align: center;
    }
    .product-detail img {
      max-width: 100%;
      height: auto;
    }
  </style>