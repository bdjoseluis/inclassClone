export interface ProductVariant {
  slug: string;
  reference: string;
  name: string;
  dimensions: string;
  weight?: string;
  image: string;
  stock: number; // random but stable
}

export interface CollectionDetail {
  slug: string;
  name: string;
  designer: string;
  designerImage: string;
  year: string;
  description: string;
  heroImages: string[];
  thumbnail: string;
  tipo: string;
  tags: string[];
  materials: string[];
  finishes: string[];
  spaces: string[];
  products: ProductVariant[];
  relatedSlugs: string[];
}
