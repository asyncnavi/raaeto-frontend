export enum FeatureStatus {
    Active = 'active',
    Inactive = 'inactive',
    Pending = 'pending'
}


export type Feature = {
    id  :string ,
    organization_id: string;
    product_id: string;
    name: string;
    description?: string;
    videoUrl?: string;
    thumbnail_url?: string;
    status: FeatureStatus;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
};


export type FeatureCreateFields = {
    name: string
    description: string
    video_url?: string
    thumbnail_url?: string
    status?: FeatureStatus
}

export type FeatureCreate = {
    organization_id: string;
    product_id: string;
    name: string;
    description?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    status?: FeatureStatus;
}