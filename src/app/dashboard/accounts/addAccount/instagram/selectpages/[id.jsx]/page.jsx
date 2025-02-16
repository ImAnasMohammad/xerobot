// src/components/SelectFacebookPage.js
'use client'
import { toastError } from "@/components/custom/toast";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import useColors from "@/hooks/useColors";
import { Box, Text, Grid, VStack } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
    const { textUltraShadedDark } = useColors();
    const [pages, setPages] = useState([]);
    const router = usePathname();
    const id = router.split('/').pop().toLocaleLowerCase();
    
    const getFacebookPageDetails = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/instagram/getDetails/facebookPageDetails?id=${id}`);
            if (res.data.message === null) {
                setPages(res.data.data)
            } else {
                toastError(res.data.message)
            }
        } catch (err) {
            toastError(err.message)
        }
    }

    useEffect(() => {
        getFacebookPageDetails();
    }, [])
    return (
        <Box p={6} maxW="1200px" mx="auto">
            <Box>
                <Text mb={2} textAlign="center" fontSize={'3xl'}>
                    Select Your Facebook Page
                </Text>
                <Text mb={20} textAlign="center" fontSize={'md'} color={textUltraShadedDark}>
                    Select Your Facebook Page which is connected with your instagarm account
                </Text>
            </Box>
            <Grid
                templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                gap={6}
                alignItems="center"
            >
                {
                    pages?.length > 0 ? <FacebookPagesGrid pages={pages} id={id} /> : <FacebookPagesSkeletonGrid ids={[1, 2, 3, 4, 5, 6, 7, 8]} />
                }
            </Grid>
        </Box>
    );
};

const FacebookPagesGrid = ({ pages, id }) => {
    return <>
        {pages.map((page) => <FacebookPageCard page={page} key={page.id} id={id} />)}
    </>
}
const FacebookPageCard = ({ page, id }) => {
    return <Link href={`/dashboard/accounts/addAccount/instagram/confirm/linkInstagarm/${id}/${page.id}`}>
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p={4}
            textAlign="center"
            _hover={{ boxShadow: "lg", transform: "scale(1.02)", transition: "0.2s" }}
        >
            <VStack spacing={3}>
                <Avatar size="xl" name={page.name} src={page.picture.data.url} />
                <Text fontSize="lg" fontWeight="bold" mb={5}>{page.name}</Text>
            </VStack>
        </Box>
    </Link>
}



const FacebookPagesSkeletonGrid = ({ ids }) => {
    return <>
        {ids.map((id) => <FacebookPageCardSkeleton id={id} key={id} />)}
    </>
}
const FacebookPageCardSkeleton = ({ id }) => {
    return <Box
        key={id}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p={4}
        textAlign="center"
        _hover={{ boxShadow: "lg", transform: "scale(1.02)", transition: "0.2s" }}
    >
        <VStack spacing={3}>
            <SkeletonCircle size="20" />
            <Skeleton height="5" width={'100%'} />
        </VStack>
    </Box>
}
export default page;
