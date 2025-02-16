import { Box, Container, Heading, Text, Link, VStack, HStack } from "@chakra-ui/react";
import { FaFacebook, FaDiscord, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";

const Footer = () => {
  const pages = {
    heading: "Pages",
    links: [
      { name: "Home", link: "/" },
      { name: "Login", link: "/login" },
      { name: "Services", link: "#services" },
      { name: "Contact", link: "/contact-us" },
    ],
  };

  return (
    <Box bg="gray.900" color="white" py={8}>
      <Container maxW="container.xl">
        <HStack justify="space-between" wrap="wrap" spacing={10}>
          <Section content={pages} />
          {/* <Section content={pages} />
          <Section content={pages} />
          <Section content={pages} /> */}
        </HStack>
        <Box mt={6} py={4} borderTopWidth={1} borderColor="gray.700" textAlign="center">
          <Text fontSize="sm">© {new Date().getFullYear()} All Rights Reserved.</Text>
          <HStack justify="center" mt={4} spacing={4}>
            <Link href="#" aria-label="Facebook" color="gray.400" _hover={{ color: "white" }}><FaFacebook size={20} /></Link>
            <Link href="#" aria-label="Discord" color="gray.400" _hover={{ color: "white" }}><FaDiscord size={20} /></Link>
            <Link href="#" aria-label="Twitter" color="gray.400" _hover={{ color: "white" }}><FaTwitter size={20} /></Link>
            <Link href="#" aria-label="GitHub" color="gray.400" _hover={{ color: "white" }}><FaGithub size={20} /></Link>
            <Link href="#" aria-label="Dribbble" color="gray.400" _hover={{ color: "white" }}><FaDribbble size={20} /></Link>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

const Section = ({ content }) => {
  const { heading, links=[] } = content;
  return (
    <VStack align="start">
      <Heading as="h2" size="md" textTransform="uppercase" mb={2}>{heading}</Heading>
      {links.map((item, index) => (
        <Link key={index} href={item.link} color="gray.400" _hover={{ color: "white" }}>
          {item.name}
        </Link>
      ))}
    </VStack>
  );
};

export default Footer;