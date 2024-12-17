import { SVGProps } from "react";

type CardType = {
  categoryName: string;
  icon: React.ComponentType;
};

const CategoryCard = ({ icon: Icon, categoryName }: CardType) => {
  return (
    <div>
      <div className="border border-red">
        <Icon />
        <p>{categoryName}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
