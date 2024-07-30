import { writable } from 'svelte/store';

export const selectedProduct = writable(null);
export const isModalOpen = writable(false);
