

import { Box, Container, Heading, TableBody, TableCell, TableHeader, TableRoot, TableRow, Text, ListRoot, ListItem } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <Box py={10} px={4}>
            <Container maxW="4xl" p={8} >
                <Heading as="h1" size="xl" mb={4} color="blue.900">
                    Cookie Policy for xerobot.in
                </Heading>
                <Text fontWeight="bold">Effective Date: June 12, 2025</Text>
                <Text mt={4}>
                    This Cookie Policy explains how <strong>xerobot.in</strong> ("we", "us", "our") uses cookies and similar technologies when you visit our website or use our services (the "Service"). By continuing to use our website or app, you consent to the use of cookies as outlined below.
                </Text>

                <Heading as="h2" size="md" mt={6} color="blue.800">1. What Are Cookies?</Heading>
                <Text>
                    Cookies are small text files placed on your device (computer, tablet, smartphone) by websites you visit. They help websites remember your actions and preferences (such as login, language, and other settings).
                </Text>

                <Heading as="h2" size="md" mt={6} color="blue.800">2. Types of Cookies We Use</Heading>
                <TableRoot mt={4} variant="simple">
                    <TableHeader>
                        <TableRow>
                            <TableCell>Type of Cookie</TableCell>
                            <TableCell>Purpose</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell>Essential Cookies</TableCell>
                            <TableCell>Required for core functionality like login, authentication, and security.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Performance Cookies</TableCell>
                            <TableCell>Help us understand how users interact with our app (e.g., using analytics).</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Functional Cookies</TableCell>
                            <TableCell>Remember user preferences (e.g., language, interface settings).</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Third-Party Cookies</TableCell>
                            <TableCell>Set by third parties (like Facebook or Instagram) for login or integration.</TableCell>
                        </TableRow>
                    </TableBody>
                </TableRoot>
                <Heading as="h2" size="md" mt={6} color="blue.800">3. Third-Party Cookies</Heading>
                <Text>
                    Our service integrates with <strong>Facebook Graph API</strong> and <strong>Instagram Basic Display API</strong>. These platforms may place their own cookies for:
                </Text>
                <ListRoot spacing={2} mt={2}>
                    <ListItem>Authentication (OAuth tokens)</ListItem>
                    <ListItem>API usage tracking</ListItem>
                    <ListItem>Security and fraud detection</ListItem>
                </ListRoot>
                <Text mt={2}>We do not control third-party cookies. Please refer to:</Text>
                <ListRoot spacing={2}>
                    <ListItem>
                        <Link href="https://www.facebook.com/policies/cookies/" isExternal color="blue.500">Facebook Cookies Policy</Link>
                    </ListItem>
                    <ListItem>
                        <Link href="https://help.instagram.com/519522125107875" isExternal color="blue.500">Instagram Data Policy</Link>
                    </ListItem>
                </ListRoot>

                <Heading as="h2" size="md" mt={6} color="blue.800">4. How We Use Cookies</Heading>
                <ListRoot spacing={2}>
                    <ListItem>Authenticate users securely</ListItem>
                    <ListItem>Maintain user session data</ListItem>
                    <ListItem>Improve performance and user experience</ListItem>
                    <ListItem>Analyze usage through analytics tools</ListItem>
                    <ListItem>Integrate with social platforms securely</ListItem>
                </ListRoot>
                <Text mt={2}><strong>We do not</strong> use cookies to track you for advertising or sell your data.</Text>

                <Heading as="h2" size="md" mt={6} color="blue.800">5. How to Manage or Disable Cookies</Heading>
                <Text>You can manage or disable cookies in your browser settings:</Text>
                <ListRoot spacing={2} mt={2}>
                    <ListItem><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</ListItem>
                    <ListItem><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</ListItem>
                    <ListItem><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</ListItem>
                    <ListItem><strong>Edge:</strong> Settings → Cookies and site permissions</ListItem>
                </ListRoot>
                <Text mt={2}><strong>Note:</strong> Disabling cookies may affect core functionality like login and settings saving.</Text>

                <Heading as="h2" size="md" mt={6} color="blue.800">6. Changes to This Cookie Policy</Heading>
                <Text>
                    We may update this Cookie Policy from time to time. All changes will be posted on this page with a revised <strong>Effective Date</strong>. We encourage users to review it regularly.
                </Text>

                <Heading as="h2" size="md" mt={6} color="blue.800">7. Contact Us</Heading>
                <Text>If you have any questions about this Cookie Policy or our practices, please contact us at:</Text>
                <Text mt={2}>
                    📧 <strong>Email:</strong> <Link href="mailto:contact@xerobot.in" style={{ color: 'blue' }}>contact@xerobot.in</Link><br />
                    🌐 <strong>Website:</strong> <Link href="https://xerobot.in" style={{ color: 'blue' }}>https://xerobot.in</Link>
                </Text>
            </Container>
        </Box>
    )
}

export default page