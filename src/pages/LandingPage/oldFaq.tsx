import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <motion.div
        initial={false}
        // animate={{ rotate: isOpen ? 45 : 0 }}
        className="cursor-pointer flex justify-start gap-x-4 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.span className="ml-2 text-xl gradient-text">-</motion.span>
        <h4 className="text-lg font-medium">{question}</h4>
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 ml-10 overflow-hidden relative mb-2"
          >
            <div className="absolute left-0 h-full w-[2px] bg-gradient-text" />
            <p className="text-gray-500 pl-3">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const oldFAQ = () => {
  const faqData = [
    {
      question: "What Is Carbon-Adjust?",
      answer:
        "The world’s first one-stop marketplace for everything home energy efficiency improvement.",
    },
    {
      question: "Why Do I Need Carbon-Adjust?",
      answer:
        "Carbon-Adjust is not for everyone - sorry. You need Carbon-Adjust if you are a homeowner and are interested in improving your property value through investments in home energy efficiency improvements.",
    },
    {
      question: "Is This Any Different From What’s Out There?",
      answer:
        "We don’t have a competition and that’s why we’ve been funded with over £1m by the Department of Energy Security and Net Zero (DESNZ). We offer you opportunities to maximize your return on investments in home energy efficiency improvements but at your pace. No other entity comes this close.",
    },
    {
      question: "What Does My Membership Entail?",
      answer:
        "Are you signed up yet? Get signed up today and enjoy access to complimentary call sessions with our home retrofit experts. Other complimentary benefits include access to the Carbon Tracker, Climate Transition Score, and Optimal Decarbonization Scheduler. More value than you can imagine.",
    },
    {
      question: "What Is Kommunita? What Benefit Does It Offer Me?",
      answer:
        "Kommunita is a closed user group for all exclusive members on Carbon-Adjust. It is a relaxed community of homeowners on Carbon-Adjust that allows you to share your experiences in investing in home energy efficiency improvements, and also learn from others too.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 rounded-lg my-12 font-poppins">
      <p className="text-4xl text-center font-semibold gradient-text">
        Frequently Asked Questions
      </p>
      <p className="text-center mb-8 mt-4">
        Frequently Asked Questions By Users
      </p>
      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default oldFAQ;
