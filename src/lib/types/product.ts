// Add to existing types
export interface ProductImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

// Update Product interface
export interface Product {
  // ... existing fields
  images: ProductImage[];
}