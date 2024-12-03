import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Faq() {
  const faqItems = [
    {
      question: 'What is your refund policy?',
      answer: "If you're unhappy with your purchase, we'll refund you in full.",
      defaultOpen: true,
    },
    {
      question: 'Do you offer technical support?',
      answer: 'No.',
      defaultOpen: false,
    },
    {
      question: 'How long does shipping take?',
      answer: 'Shipping typically takes 5-7 business days.',
      defaultOpen: false,
    },
    {
      question: 'Can I change my order?',
      answer: 'Yes, you can change your order within 24 hours of purchase.',
      defaultOpen: false,
    },
  ];

  return (
    <div className='mx-auto w-full max-w-[1210px] divide-y divide-black/5 rounded-xl'>
      <Accordion type='single' collapsible className='w-full'>
        {faqItems.map((item, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index}>
            <AccordionTrigger className='text-[#3C4043] font-medium text-lg dark:text-white'>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className='text-[#3C4043] text-base dark:text-white'>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
