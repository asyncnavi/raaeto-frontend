import {Card, CardBody, CardFooter, CardHeader, Divider, Skeleton} from "@heroui/react";

const ProductCardSkeleton = () => {
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

export default ProductCardSkeleton