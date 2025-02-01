import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Skeleton} from "@heroui/react";


type ProductCardProps = {
    name: string;
    description: string;
    websiteURL?: string;
    productId: string

}
// TODO : create Option to add Website URL

export default function ProductCard({
                                        name,
                                        description,
                                        websiteURL = "https://github.com/heroui-inc/heroui",
                                        productId
                                    }: ProductCardProps) {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <Image
                    alt="heroui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">{name}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p>{description}</p>
            </CardBody>
            <Divider/>
            <CardFooter className="flex justify-between">
                <Link href={`/product/${productId}`}>
                    View Details
                </Link>
                <Link isExternal showAnchorIcon color="success" href={websiteURL}>
                    Website
                </Link>
            </CardFooter>
        </Card>
    );
}


export const ProductCardSkeleton = () => {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="w-full flex gap-3">
                <Skeleton className="h-[50px] w-[20%] bg-default-300 rounded-md"></Skeleton>
                <Skeleton className="flex-1 h-[50px] w-[80%] bg-default-300 rounded-md"></Skeleton>
            </CardHeader>
            <Divider/>
            <CardBody>
                <Skeleton className="h-[100px] w-[full] bg-default-300 rounded-md"></Skeleton>
            </CardBody>
            <Divider/>
            <CardFooter className="flex justify-between gap-2">
                <Skeleton className="flex-1 h-[50px] w-[full] bg-default-300 rounded-md"></Skeleton>
                <Skeleton className="flex-1 h-[50px] w-[full] bg-default-300 rounded-md"></Skeleton>
            </CardFooter>
        </Card>
    )
}