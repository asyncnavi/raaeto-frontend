import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";

type ProductCardProps = {
  name: string;
  description: string;
  websiteURL?: string;
  productId: string;
  onClick?: () => void;
};

export default function ProductCard({
  name,
  description,
  websiteURL = "https://github.com/heroui-inc/heroui",
  onClick,
}: ProductCardProps) {
  return (
    <Card className="max-w-[400px]" onPress={onClick}>
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
      <Divider />
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between">
        <div onClick={onClick} className="text-blue-500 cursor-pointer">Details</div>
        <Link isExternal showAnchorIcon color="success" href={websiteURL}>
          Website
        </Link>
      </CardFooter>
    </Card>
  );
}
