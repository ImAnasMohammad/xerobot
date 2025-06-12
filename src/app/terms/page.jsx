import { Box, Container, Heading, ListRoot, Text, ListItem } from "@chakra-ui/react";
import Link from "next/link";

export default function page() {
  return (
    <Box py={10}>
      <Container maxW="container.lg" p={10} boxShadow="md">
        <Heading as="h1" mb={4} >
          Terms and Conditions for xerobot Auto-Replier
        </Heading>
        <Text fontWeight="bold">Effective Date: June 12, 2025</Text>

        <Text mt={4}>
          Welcome to <strong>xerobot Auto-Replier</strong>, a service offered by <strong>xerobot.in</strong> (“Company”, “we”, “us”, or “our”). By accessing or using our application and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
        </Text>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">1. Acceptance of Terms</Heading>
        <Text>By using our service, you:</Text>
        <ListRoot>
          <ListItem>Confirm that you are at least 13 years old.</ListItem>
          <ListItem>Agree to comply with these Terms and all applicable laws.</ListItem>
          <ListItem>Authorize us to access and interact with your Instagram and/or Facebook account using official APIs.</ListItem>
        </ListRoot>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">2. Service Description</Heading>
        <Text>xerobot Auto-Replier allows you to:</Text>
        <ListRoot>
          <ListItem>Connect your Facebook and Instagram accounts.</ListItem>
          <ListItem>Automatically send replies to comments or posts based on templates you define.</ListItem>
          <ListItem>Manage and customize automated response rules.</ListItem>
        </ListRoot>
        <Text>We use secure, authorized methods (such as OAuth) to access your data only with your permission.</Text>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">3. User Responsibilities</Heading>
        <Text>You agree to:</Text>
        <ListRoot>
          <ListItem>Provide accurate information when registering.</ListItem>
          <ListItem>Not use the service for spamming, harassment, hate speech, or any unlawful activity.</ListItem>
          <ListItem>Use the application only for accounts you own or have proper permission to manage.</ListItem>
          <ListItem>Ensure your use complies with the Facebook and Instagram Platform Policies.</ListItem>
        </ListRoot>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">4. Account Access and Security</Heading>
        <ListRoot>
          <ListItem>You are responsible for maintaining the confidentiality of your account credentials.</ListItem>
          <ListItem>We are not responsible for unauthorized access due to your negligence.</ListItem>
          <ListItem>You may disconnect your social accounts at any time through app settings or platform settings.</ListItem>
        </ListRoot>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">5. Data Use</Heading>
        <Text>
          We collect and use your data as described in our{' '}
          <Link href="https://xerobot.in/privacy-policy.html" target="_blank" color="#0984e3">
            Privacy Policy
          </Link>. By using the service, you consent to that policy.
        </Text>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">6. Limitation of Liability</Heading>
        <Text>To the fullest extent permitted by law:</Text>
        <ListRoot>
          <ListItem>We are not liable for indirect, incidental, or consequential damages arising out of your use of the service.</ListItem>
          <ListItem>We make no guarantees about uptime, message accuracy, or delivery success.</ListItem>
        </ListRoot>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">7. Termination</Heading>
        <Text>We may suspend or terminate your access to the service if:</Text>
        <ListRoot>
          <ListItem>You violate these Terms.</ListItem>
          <ListItem>You misuse the app or APIs.</ListItem>
          <ListItem>Facebook or Instagram revoke API access.</ListItem>
        </ListRoot>
        <Text>You may also terminate use at any time by disconnecting your social media accounts.</Text>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">8. Third-Party Services</Heading>
        <Text>Our service relies on:</Text>
        <ListRoot>
          <ListItem>
            <Link style={{color:'blue'}} href="https://developers.facebook.com/docs/graph-api/" target="_blank">
              Facebook Graph API
            </Link>
          </ListItem>
          <ListItem>
            <Link style={{color:'blue'}} href="https://developers.facebook.com/docs/instagram-basic-display-api/" target="_blank">
              Instagram Basic Display API
            </Link>
          </ListItem>
        </ListRoot>
        <Text>Your use of these services is subject to their terms and conditions. We are not responsible for changes or issues caused by these platforms.</Text>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">9. Changes to Terms</Heading>
        <Text>We may update these Terms occasionally. If we do, we will update the “Effective Date” at the top and notify users via email or in-app notice where appropriate.</Text>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">10. Governing Law</Heading>
        <Text>These Terms are governed by the laws of <strong>India</strong>. Any disputes will be handled in the courts located in <strong>Andhra Pradesh</strong>, India.</Text>

        <Heading as="h2" size="md" mt={6} color="#0a3d62">11. Contact Us</Heading>
        <Text>For questions about these Terms, contact us at:</Text>
        <Text>📧 <strong>Email:</strong>{' '}
          <Link href="mailto:contact@xerobot.in" style={{color:'blue'}}>
            contact@xerobot.in
          </Link>
        </Text>
        <Text>🌐 <strong>Website:</strong>{' '}
          <Link href="https://xerobot.in" style={{color:'blue'}}>
            https://xerobot.in
          </Link>
        </Text>
      </Container>
    </Box>
  );
}
