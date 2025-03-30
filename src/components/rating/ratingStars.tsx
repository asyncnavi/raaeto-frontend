import { FC } from "react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

type RatingStarsProps = {
    ratingValue: number;
};

const RatingStars: FC<RatingStarsProps> = ({ ratingValue }) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                    {ratingValue >= i ? (
                        <IconStarFilled size={18} className="text-yellow-400" />
                    ) : (
                        <IconStar size={18} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default RatingStars;