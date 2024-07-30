<!-- src/App.svelte -->
<script>
  import { Router, Route } from 'svelte-routing';
  import Header from './Components/Header.svelte';
  import ProductList from './Components/ProductList.svelte';
  import ProductDetails from './Components/ProductDetails.svelte';
</script>

<main>
  <Header />
  <Router>
    <Route path="/" component={ProductList} />
    <Route path="product/:id" component={ProductDetails} />
  </Router>
</main>

<style>
  main {
    padding: 1rem;
  }
</style>



