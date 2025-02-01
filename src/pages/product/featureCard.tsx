import {Card, CardBody, CardFooter, CardHeader, Divider, Link} from "@heroui/react";


type FeatureCardProps = {
    name: string;
    description: string;
    websiteURL?: string;
    id: string

}
// TODO : create Option to add Website URL

export default function FeatureCard({
                                        name,
                                        description,
                                        id
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
                <Link href={`/feature/${id}`}>
                    View Details
                </Link>
            </CardFooter>
        </Card>
    );
}
