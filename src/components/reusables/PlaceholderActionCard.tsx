import { ReactNode } from "react";

type Props = { children: ReactNode };

const PlaceholderActionCard = ({ children }: Props) => {
  return (
    <div className="min-w-[240px] max-w-[320px] rounded-md shadow bg-white px-2 py-4">
      {children}
    </div>
  );
};

export default PlaceholderActionCard;
