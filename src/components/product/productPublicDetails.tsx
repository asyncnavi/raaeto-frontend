import {useGetProductFeatures, useGetRatings} from "@/api/product";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Image, Divider, Link, Accordion, AccordionItem, Chip, Input,
    Tabs,
    Tab, User,
} from "@heroui/react";
import {addToast} from "@heroui/toast";

import SampleThumbnail from "../../assets/burpy.png";
import {FC} from "react";


import {useForm} from "react-hook-form";
import RateInput from "@/components/common/RateInput.tsx";
import {Product} from "@/types/product.ts";
import {useCreateRating} from "@/api/ratings.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/store/index.ts";
import {Feature} from "@/types/feature.ts";
import RatingStars from "@/components/rating/ratingStars.tsx";


type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    product: Product;
};

type RatingFormValues = {
    comment: string;
    rating: number;
};


function FeatureRatings({feature}: { feature: Feature }) {

    const {data: ratings} = useGetRatings({
        organization_id: feature.organization_id,
        product_id: feature.product_id,
        feature_id: feature.id,
    })
    const [rateFeature] = useCreateRating();

    const {user_id} = useSelector((state: RootState) => state.organization)

    const {register, handleSubmit, setValue, reset} = useForm<RatingFormValues>({
        defaultValues: {
            comment: "",
            rating: 0,
        },
    });

    const onSubmit = async (formData: RatingFormValues) => {
        if (!user_id) {
            addToast(
                {
                    title: "You are not logged in.",
                    description: "Please login first to add comment.",
                    color: "danger",

                }
            )
            return
        }

        if (formData.rating == 0) {
            addToast(
                {
                    title: "Please rate from 1 star to 5",
                    color: "warning",
                }
            )
            return
        }

        try {
            await rateFeature({
                user_id: user_id as number,
                organization_id: feature.organization_id,
                product_id: feature.product_id,
                feature_id: feature.id,
                rating_value: formData.rating,
                comment: formData.comment,
            })
            addToast(
                {
                    title: "Rated successfully",
                    color: "success",
                }
            )
            setValue("rating", 0)
            reset();
        } catch (e) {
            addToast(
                {
                    title: "Error while rating please try again.",
                    description: JSON.stringify(e),
                    color: "danger",
                }
            )
        }

    };

    return (
        <div>
            <Chip size="sm" variant="dot" color="warning">
                Rate
            </Chip>
            <div className="flex justify-between items-center gap-2 px-2 py-2">
                <small
                    className="text-xs italic">{ratings && (ratings.reduce((acc, rating) => acc + rating.rating_value, 0) / (ratings.length || 1)).toFixed(1)} Average
                    Rating / {ratings?.length ?? 0} people rated.</small>

            </div>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="space-y-2">
                    <Input label="Add a comment" {...register("comment")} />
                    <RateInput onSelect={(rating) => setValue("rating", rating)}/>
                    <div className="flex justify-end">
                        <Button type="submit" variant="flat" color="warning" size="sm">
                            Post
                        </Button>
                    </div>
                </div>
            </form>

            <Tabs aria-label="Options" variant="bordered">
                <Tab key="details" title="Details">
                    <div className="gap-2 px-2 py-2">
                        <Image
                            width="200"
                            radius="lg"
                            isBlurred
                            isZoomed
                            src={feature.thumbnail_url || SampleThumbnail}
                        />
                        <p className="text-xs px-2 py-2">{feature.description}</p>
                    </div>
                </Tab>
                <Tab key="ratings" title="Ratings">
                    <div>
                        {ratings?.map((rating) => {
                            return (
                                <div className="space-y-10 flex justify-between">
                                    <User
                                        avatarProps={{
                                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                        }}
                                        description={rating.comment}
                                        name={rating?.username || "Unknown"}
                                    />
                                    <div className="flex">
                                        <RatingStars ratingValue={rating.rating_value}/>
                                    </div>


                                </div>
                            )
                        })}
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}


function ProductFeatures({product}: { product: Product }) {

    const {data: features} = useGetProductFeatures({
        product_id: product.id,
        organization_id: product.organization_id
    }, {skip: !product.id || !product.organization_id});


    return (
        <div>
            {features ? (
                <Accordion variant="bordered">
                    {features.map((feature) => (
                        <AccordionItem key={feature.id} aria-label={`Feature ${feature.id}`} title={feature.name}>
                            <FeatureRatings feature={feature}/>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <p>No features available.</p>
            )}
        </div>
    );
}


const ProductPublicDetails: FC<Props> = ({isOpen, onOpenChange, product}) => {

    return (
        <Drawer size="4xl" isOpen={isOpen} className="overflow-hidden" onOpenChange={onOpenChange}>

            <DrawerContent className='overflow-hidden'>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">{product?.name}</DrawerHeader>
                        <DrawerBody>
                            <Image alt="burpy" width="300" radius="lg" isBlurred
                                   src={product?.thumbnail_url || SampleThumbnail}/>
                            <Link isExternal showAnchorIcon color="success" href={product?.website_url ?? ""}>
                                Website
                            </Link>
                            <h2 className="font-bold">About the product.</h2>
                            <Divider/>
                            <p>{product?.description}</p>
                            <h2 className="font-bold">Rate the features</h2>
                            <Divider/>
                            <ProductFeatures product={product}/>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
};


export default ProductPublicDetails;
