import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function page() {
  return (
    <Container maxW="container.lg" py={10}>
      <Heading as="h1" size="3xl" mb={4}>Terms of Service</Heading>
      <Text mb={4}><strong>Effective Date:</strong> 16/02/2025</Text>
      <Text mb={4}>Welcome to <strong>Xerobyte</strong>! These Terms of Service ("Terms") govern your use of our web application, which provides automation for Instagram comments ("Service"). By accessing or using Xerobyte, you agree to comply with these Terms.</Text>
      <Heading as="h2" size="lg" mt={6} mb={2}>1. Acceptance of Terms</Heading>
      <Text mb={4}>By using Xerobyte, you agree to these Terms and our Privacy Policy. If you do not agree, please do not use our Service.</Text>
      <Heading as="h2" size="lg" mt={6} mb={2}>2. Eligibility</Heading>
      <Text mb={4}>You must be at least 18 years old and comply with all applicable laws, including Facebook and Instagram's policies.</Text>
      <Heading as="h2" size="lg" mt={6} mb={2}>3. Use of Service</Heading>
      <Text mb={4}>Xerobyte automates Instagram comment interactions in compliance with Meta’s policies. You agree not to misuse the Service, including spamming, violating Instagram's rules, or engaging in prohibited activities.</Text>
    </Container>
  );
}
