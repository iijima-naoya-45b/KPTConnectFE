export interface Issue {
    id: number;
    title: string;
    body: string;
    state: 'open' | 'closed';
    created_at: string;
    updated_at: string;
    html_url: string;
} 