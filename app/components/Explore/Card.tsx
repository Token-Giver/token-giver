import { SVGProps } from "react";

type CardType = {
  categoryName: string;
  Icon: React.FC<SVGProps<SVGSVGElement>>;
};

const CategoryCard = ({ Icon, categoryName }: CardType) => {
  return (
    <div>
      <div className="bg-frosting-cream w-44 h-[10rem] rounded-xl flex flex-col gap-3 items-center justify-center">
        <Icon />
        <p className="text-pantone-green text-md">{categoryName}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
