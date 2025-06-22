import { Textarea } from '@/components/ui/textarea';
import { ContactFormData } from './types';
import { Input } from '@/components/ui/input/input';

interface ContactFormProps {
  formData: ContactFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  onInputChange,
  isSubmitting,
}) => {
  return (
    <div className='space-y-6'>
      {/* お名前 */}
      <div>
        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
          お名前 <span className='text-red-500'>*</span>
        </label>
        <Input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500'
          placeholder='山田 太郎'
        />
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          メールアドレス <span className='text-red-500'>*</span>
        </label>
        <Input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500'
          placeholder='your@email.com'
        />
      </div>

      {/* 件名 */}
      <div>
        <label htmlFor='subject' className='block text-sm font-medium text-gray-700'>
          件名 <span className='text-red-500'>*</span>
        </label>
        <Input
          type='text'
          id='subject'
          name='subject'
          value={formData.subject}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500'
          placeholder='お問い合わせの件名'
        />
      </div>

      {/* お問い合わせ内容 */}
      <div>
        <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
          お問い合わせ内容 <span className='text-red-500'>*</span>
        </label>
        <Textarea
          id='message'
          name='message'
          value={formData.message}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          rows={6}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500'
          placeholder='お問い合わせの詳細を入力してください'
        />
      </div>
    </div>
  );
};

export default ContactForm; 