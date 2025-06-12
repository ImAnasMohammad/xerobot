import { Box, Container, Heading, Text,ListRoot, ListItem } from "@chakra-ui/react";
import Link from "next/link";

export default function page() {
  return (
    <Box py={10}>
      <Container maxW="7xl" p={10} borderRadius="md">
        <Heading as="h1" size="xl" color="blue.800" mb={4}>
          Privacy Policy for xerobot Auto-Replier Application
        </Heading>
        <Text fontWeight="bold">Effective Date: 12-06-2025</Text>
        <Text mt={4}>
          At <strong>xerobot.in</strong> (“we”, “our”, “us”), your privacy is important to us. This Privacy Policy explains how we collect, use, store, and share information when you use our automated reply application, which integrates with Instagram and Facebook to generate responses to posts on behalf of users.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>1. Overview</Heading>
        <Text>This application allows users to connect their Instagram and Facebook accounts and automate replies to posts or comments based on user-defined criteria. We access your data only with your permission and strictly for the purpose of providing this service.</Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>2. Information We Collect</Heading>
        <Text fontWeight="bold">a. User-Provided Information:</Text>
        <ListRoot listStyleType={'disc'}>
          <ListItem>Name, email address, and contact details.</ListItem>
          <ListItem>Instagram and Facebook account details (via secure login).</ListItem>
          <ListItem>Custom reply templates, keywords, and settings you configure.</ListItem>
        </ListRoot>
        <Text fontWeight="bold" mt={4}>b. Social Media Data (via APIs):</Text>
        <ListRoot listStyleType={'disc'}>
          <ListItem>Post content, comment threads, metadata.</ListItem>
          <ListItem>Page IDs, post IDs, timestamps.</ListItem>
          <ListItem>Profile information you allow us to access (read-only).</ListItem>
        </ListRoot>
        <Text mt={2}>📌 <strong>Note:</strong> We use Facebook Graph API and Instagram Basic Display API. Your data is accessed only with your consent and solely to automate replies as per your preferences.</Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>3. How We Use Your Information</Heading>
        <ListRoot listStyleType={'disc'}>
          <ListItem>Authenticate you securely via Facebook/Instagram login.</ListItem>
          <ListItem>Read and analyze your posts and comments (with consent).</ListItem>
          <ListItem>Generate and send automated replies based on your templates.</ListItem>
          <ListItem>Improve and personalize our services.</ListItem>
          <ListItem>Provide customer support.</ListItem>
        </ListRoot>
        <Text>We do not sell or use your data for any unauthorized marketing.</Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>4. How We Share Your Data</Heading>
        <ListRoot listStyleType={'disc'}>
          <ListItem>With service providers (e.g., cloud hosting, analytics) under confidentiality agreements.</ListItem>
          <ListItem>With Facebook/Instagram APIs as needed to interact on your behalf.</ListItem>
          <ListItem>As required by law or legal process.</ListItem>
          <ListItem>In case of business transfer (e.g., acquisition), with prior notice.</ListItem>
        </ListRoot>
        <Text>We do not sell your personal or social media data to third parties.</Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>5. Third-Party APIs</Heading>
        <Text>Our service uses official APIs from:</Text>
        <ListRoot listStyleType={'disc'}>
          <ListItem><Link color="blue.500" href="https://developers.facebook.com/policy/" isExternal>Facebook Graph API</Link></ListItem>
          <ListItem><Link color="blue.500" href="https://developers.facebook.com/terms" isExternal>Instagram Basic Display API</Link></ListItem>
        </ListRoot>
        <Text>Your use of these services is subject to the Facebook & Instagram Platform Policies. We operate in compliance with their guidelines and obtain your authorization using OAuth-based login.</Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>6. Data Security</Heading>
        <ListRoot listStyleType={'disc'}>
          <ListItem>Secure data transmission (HTTPS).</ListItem>
          <ListItem>OAuth-based login and token handling.</ListItem>
          <ListItem>Access tokens are encrypted and stored securely.</ListItem>
        </ListRoot>
        <Text>However, no internet-based service is 100% secure. Use the application at your discretion.</Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>7. User Control and Consent</Heading>
        <ListRoot listStyleType={'disc'}>
          <ListItem>Revoke access at any time via your Facebook/Instagram account settings.</ListItem>
          <ListItem>Disconnect your account from the app at any time.</ListItem>
          <ListItem>Request deletion of your data by contacting us.</ListItem>
        </ListRoot>
        <Text>We only operate with your active consent.</Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>8. Data Retention</Heading>
        <Text>We retain your data as long as you use our service. Upon account deactivation or data deletion request, we delete all user-related data within 7 working days.</Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>9. Children’s Privacy</Heading>
        <Text>Our service is not intended for use by individuals under 13 years of age. We do not knowingly collect data from children.</Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>10. Changes to This Policy</Heading>
        <Text>We may update this Privacy Policy occasionally. All changes will be posted on this page with an updated effective date. Major changes will be communicated via email or in-app notices.</Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>11. Contact Us</Heading>
        <Text>
          📧 <strong>Email:</strong> <Link style={{color:"blue"}}  href="mailto:contact@xerobot.in" >contact@xerobot.in</Link><br />
          🌐 <strong>Website:</strong> <Link style={{color:"blue"}} href="https://xerobot.in" isExternal>https://xerobot.in</Link>
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={2}>12. Legal Compliance</Heading>
        <ListRoot listStyleType={'disc'}>
          <ListItem><Link style={{color:"blue"}} href="https://developers.facebook.com/policy/" target="_blank">Facebook Platform Terms</Link></ListItem>
          <ListItem><Link style={{color:"blue"}} href="https://developers.facebook.com/terms" target="_blank">Instagram Platform Policy</Link></ListItem>
        </ListRoot>
      </Container>
    </Box>
  );
}


