interface ContactSubmitButtonProps {
  isSubmitting: boolean;
  submitLabel?: string;
  loadingLabel?: string;
  className?: string;
}

const ContactSubmitButton: React.FC<ContactSubmitButtonProps> = ({
  isSubmitting,
  submitLabel = '送信する',
  loadingLabel = '送信中...',
  className = '',
}) => {
  return (
    <div className={className}>
      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSubmitting ? loadingLabel : submitLabel}
      </button>
    </div>
  );
};

export default ContactSubmitButton; 