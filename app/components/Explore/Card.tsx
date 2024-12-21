import { SVGProps } from "react";

type CardType = {
  categoryName: string;
  Icon: React.FC<SVGProps<SVGSVGElement>>;
};

const CategoryCard = ({ Icon, categoryName }: CardType) => {
  return (
    <div className="bg-frosting-cream rounded-xl px-12 py-16 lg:py-6 lg:px-5 flex flex-col gap-3 items-center justify-center">
      <Icon />
      <p className="text-pantone-green text-md">{categoryName}</p>
    </div>
  );
};

export default CategoryCard;
