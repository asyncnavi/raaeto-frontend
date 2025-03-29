export type CreateRating =  {
  organization_id: number;
  user_id: number;
  product_id: number;
  feature_id: number;
  rating_value: number;
  comment?: string;
}