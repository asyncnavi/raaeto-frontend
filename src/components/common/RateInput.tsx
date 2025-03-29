import {FC, useState} from "react";
import {IconStar, IconStarFilled} from "@tabler/icons-react";

type RateInputProps = {
    onSelect: (rating: number) => void;
}

const RateInput: FC<RateInputProps> = ({onSelect}) => {
    const [selectedValue, setSelectedValue] = useState<number>(0);
    const [hoverValue, setHoverValue] = useState<number | null>(null);


    const handleClick = (rating: number) => {
        setSelectedValue(rating);
        onSelect(rating);
    };

    return (
        <div>
            <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <button
                        key={i}
                        className="focus:outline-none"
                        onMouseEnter={() => setHoverValue(i)}
                        onMouseLeave={() => setHoverValue(null)}
                        onClick={() => handleClick(i)}
                    >
                        {hoverValue !== null ? (hoverValue >= i ? <IconStarFilled className="text-yellow-400"/> :
                                <IconStar/>)
                            : (selectedValue >= i ? <IconStarFilled className="text-yellow-400"/> : <IconStar/>)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RateInput;