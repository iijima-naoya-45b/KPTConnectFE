export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface SubmitResult {
    success: boolean;
    message: string;
}

export interface ContactFormState {
    isSubmitting: boolean;
    submitResult: SubmitResult | null;
} 