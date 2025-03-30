export type OrganizationResponse =  {
    id: number;
    name: string;
    description?: string;
    user_id: number;
    logo_url?: string;
    created_at: string;
    updated_at: string;
}
export type CreateOrganization = {
    name: string;
    description?: string;
    logo_url?: string;
};

export type Organization = OrganizationResponse