

export type CreateProduct = {
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

export type ProductResponse  = {
    id: number;
    name: string;
    description?: string;
    logo_url?: string;
    thumbnail_url?: string;
    organization_id: number;
    website_url?: string;
    created_at: string;
    updated_at: string;
}
export type Product = ProductResponse

export type CreateProductResponse = {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  thumbnail_url?: string;
};


export type RatingResponse = {
    id : number;
    user_id : number;
    username : number;
    product_id: number;
    feature_id: number;
    rating_value: number;
    comment?: string;
};