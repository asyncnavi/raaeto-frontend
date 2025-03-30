import {Card, CardBody, CardFooter, CardHeader, Divider, Link} from "@heroui/react";
import {Feature} from "@/types/feature.ts";


type FeatureCardProps = {
    feature: Feature
    onClick?: () => void

}

export default function FeatureCard({
                                        feature: {name, description},
                                        onClick,
                                    }: FeatureCardProps) {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md font-bold">{name}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p className="text-sm">{description}</p>
            </CardBody>
            <Divider/>
            <CardFooter className="flex justify-between">
                <Link onPress={onClick}>
                    View Details
                </Link>
            </CardFooter>
        </Card>
    );
}
