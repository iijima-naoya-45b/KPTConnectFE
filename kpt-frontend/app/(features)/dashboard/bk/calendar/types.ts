export interface TodoItem {
    id: string;
    kpt_session_id: string;
    type: 'todo';
    content: string;
    priority: 'high' | 'medium' | 'low';
    status: 'open' | 'in_progress' | 'completed' | 'cancelled';
    due_date?: string;
    start_date?: string;
    end_date?: string;
    assigned_to?: string;
    emotion_score?: number;
    impact_score?: number;
    tags: string[];
    notes?: string;
    created_at: string;
    updated_at: string;
    completed_at?: string;
    session_title?: string;
    session_date?: string;
} 