export enum FeatureStatus {
    Active = 'active',
    Inactive = 'inactive',
    Pending = 'pending'
}


export type FeatureResponse =  {
    id: number;
    organization_id: number;
    product_id: number;
    name: string;
    description?: string;
    video_url?: string;
    thumbnail_url?: string;
    status?: string;
    created_at: string;
    updated_at: string;
}

export type Feature = FeatureResponse
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