import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function page() {
  return (
    <Container maxW="container.lg" py={10}>
      <Heading as="h1" size="3xl" mb={4}>Privacy Policy</Heading>
      <Text mb={4}><strong>Effective Date:</strong>16/02/2025</Text>
      <Text mb={4}>Your privacy is important to us. This Privacy Policy explains how <strong>Xerobyte</strong> collects, uses, and protects your data.</Text>
      <Heading as="h2" size="lg" mt={6} mb={2}>1. Information We Collect</Heading>
      <Text mb={4}>We collect personal information such as name, email, and Instagram profile details with your consent.</Text>
      <Heading as="h2" size="lg" mt={6} mb={2}>2. How We Use Your Information</Heading>
      <Text mb={4}>We use your information to provide, improve, and secure our service. We do not sell your data.</Text>
      <Heading as="h2" size="lg" mt={6} mb={2}>3. Your Rights & Choices</Heading>
      <Text mb={4}>You may request data deletion at any time by contacting us.</Text>
    </Container>
  );
}