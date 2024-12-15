export type Product = {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  logo_url?: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

export type CreateProduct = {
  organization_id: string;
  name: string;
  description?: string;
  logo_url?: string;
  thumbnail_url?: string;
};

export type CreateProductForm = Omit<CreateProduct, "organization_id">;

export type CreateProductResponse = {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  thumbnail_url?: string;
};
