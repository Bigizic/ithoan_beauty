import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

const faqData = [
  {
    id: "item-1",
    question: "How long is a session?",
    answer:
      "Sessions typically last between 45 to 90 minutes, depending on the specific service you choose. We'll provide you with the exact duration when you book your appointment. This ensures you have ample time to relax and enjoy your treatment.",
  },
  {
    id: "item-2",
    question: "What products do you use?",
    answer:
      "We utilize high-quality, skin-friendly, and cruelty-free products to ensure the best results for your skin. Our selection is based on effectiveness and safety, tailored to meet your individual needs. Expect only the finest ingredients during your treatment.",
  },
  {
    id: "item-3",
    question: "Can I combine facials?",
    answer:
      "Absolutely! Many clients choose to combine facials with other services, such as massages or body treatments. This creates a comprehensive relaxation experience tailored to your preferences.",
  },
  {
    id: "item-4",
    question: "Do I need to book?",
    answer:
      "We recommend booking in advance to secure your preferred time slot. However, we do welcome walk-ins when availability permits. This way, you can enjoy our services at your convenience.",
  },
  {
    id: "item-5",
    question: "What should I expect?",
    answer:
      "During your first visit, our team will conduct a brief consultation to understand your skincare needs. This allows us to customize your treatment for optimal results. We aim to make your experience as comfortable and enjoyable as possible.",
  },
];

export const FaqSection = () => {
  return (
    <section className="flex flex-col items-center gap-20 pd-default py-default relative self-stretch w-full flex-[0_0_auto] bg-white">
      <div className="flex flex-col max-w-screen-xl items-start gap-20 relative w-full flex-[0_0_auto]">
        <div className="flex-col md:flex-row items-start gap-20 flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-full md:w-[500px] items-start gap-8 relative">
            <div className="flex-col items-start gap-6 self-stretch w-full flex-[0_0_auto] flex relative">
              <h2 className="text-center md:text-left relative self-stretch mt-[-1.00px] font-heading-h2 font-[number:var(--heading-h2-font-weight)] text-[#1c1c1c] text-[length:var(--heading-h2-font-size)] tracking-[var(--heading-h2-letter-spacing)] leading-[var(--heading-h2-line-height)] [font-style:var(--heading-h2-font-style)]">
                FAQs
              </h2>

              <p className="text-center md:text-left w-full self-stretch font-text-medium-normal text-[length:var(--text-medium-normal-font-size)] leading-[var(--text-medium-normal-line-height)] relative font-[number:var(--text-medium-normal-font-weight)] text-[#1c1c1c] tracking-[var(--text-medium-normal-letter-spacing)] [font-style:var(--text-medium-normal-font-style)]">
                Have questions? We're here to provide clarity and help you
                choose the best service.
              </p>
            </div>
          </div>

          <div className="w-full flex-1 grow">
            <Accordion type="multiple" className="w-full">
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-b border-[#1c1c1c] border-t first:border-t"
                >
                  <AccordionTrigger className="flex items-center gap-6 px-0 py-5 relative self-stretch w-full flex-[0_0_auto] hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="relative flex-1 font-text-medium-bold font-[number:var(--text-medium-bold-font-weight)] text-[#1c1c1c] text-[length:var(--text-medium-bold-font-size)] tracking-[var(--text-medium-bold-letter-spacing)] leading-[var(--text-medium-bold-line-height)] [font-style:var(--text-medium-bold-font-style)] text-left">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="flex items-start gap-4 pt-0 pb-6 px-0 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex-1 mt-[-1.00px] font-text-regular-normal text-[length:var(--text-regular-normal-font-size)] leading-[var(--text-regular-normal-line-height)] relative font-[number:var(--text-regular-normal-font-weight)] text-[#1c1c1c] tracking-[var(--text-regular-normal-letter-spacing)] [font-style:var(--text-regular-normal-font-style)]">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
