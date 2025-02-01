export type Product = {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  logo_url?: string;
  thumbnail_url?: string;
  website_url?: string;
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
  website_url?: string;
};

export type UpdaterProductFields = {
    name?: string;
    description?: string;
    logo_url?: string;
    thumbnail_url?: string;
    website_url?: string;
}

export type UpdateProduct = {
    product_id : string;
    organization_id: string;
    product : UpdaterProductFields
}

export type CreateProductForm = Omit<CreateProduct, "organization_id">;

export type CreateProductResponse = {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  thumbnail_url?: string;
};
