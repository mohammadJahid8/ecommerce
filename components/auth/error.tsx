import { CircleAlert } from 'lucide-react';

const Error = ({ error }: { error: string }) => {
  return (
    <div className='flex items-start gap-2 mt-2 text-red-600 dark:text-red-400 text-sm'>
      <CircleAlert className='w-4 h-4 mt-0.5 shrink-0' />
      <p>{error}</p>
    </div>
  );
};

export default Error;
