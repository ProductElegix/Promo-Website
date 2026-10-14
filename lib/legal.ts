/**
 * Legal pages (/privacy, /terms). The app's Privacy Policy and Terms of Service come from the owner's
 * documents (effective March 30, 2025); the "Our website and waitlist" privacy section describes what
 * this site does. [Brackets] are details still to fill in.
 */
export type LegalBlock = { type: "p" | "h3"; text: string } | { type: "list"; items: string[] };
export type LegalDoc = { title: string; effective: string; contact: string; sections: { title: string; blocks: LegalBlock[] }[] };

export const PRIVACY_POLICY: LegalDoc = {
 "title": "Privacy Policy",
 "effective": "March 30, 2025",
 "sections": [
  {
   "title": "Introduction",
   "blocks": [
    {
     "type": "p",
     "text": "This Privacy Policy (\"Policy\") explains how Elegix (\"Elegix,\" \"we,\" \"our,\" or \"us\") handles your personal information when you use our mobile application and related services (collectively, the \"Services\"). We are committed to protecting your privacy and being transparent about how your data is used."
    },
    {
     "type": "p",
     "text": "By downloading, installing, or using the Elegix app — available on the Apple App Store and Google Play Store — you agree to the practices described in this Policy. If you do not agree, please do not use the Services. If you change your mind in the future, you may stop using the Services and exercise your rights as described below."
    },
    {
     "type": "p",
     "text": "For questions or concerns, contact us at mail@elegix.net."
    }
   ]
  },
  {
   "title": "1. Information We Collect",
   "blocks": [
    {
     "type": "h3",
     "text": "Information You Provide to Us"
    },
    {
     "type": "list",
     "items": [
      "Account registration: When you create an account, we collect your name, email address, and optionally a profile photo or username.",
      "Subscription and payment: When you upgrade to a paid plan, purchases are processed via Apple In-App Purchase or Google Play Billing. We do not store your full payment card details. We may receive transaction identifiers, subscription status, and purchase history from platform providers.",
      "Communications: If you contact our support team, we collect your email address, messages, and any attachments you provide.",
      "User-generated content: Any content you create, save, or share within the app.",
      "Surveys and feedback: If you participate in optional surveys or submit feedback, we collect your responses and any information you voluntarily share."
     ]
    },
    {
     "type": "h3",
     "text": "Information Collected Automatically"
    },
    {
     "type": "list",
     "items": [
      "Device identifiers: IP address, device model, operating system version, and unique device identifiers.",
      "Usage data: Features used, screens visited, session duration, in-app interactions, and crash reports.",
      "Subscription status: Whether you are on our Free or Premium tier, your subscription expiry, and renewal events.",
      "Analytics data: Aggregate and anonymised statistics about how users interact with the app, to help us improve the experience."
     ]
    },
    {
     "type": "h3",
     "text": "Information From Third Parties"
    },
    {
     "type": "list",
     "items": [
      "Sign-in providers: If you sign in with Apple or Google, we receive your display name and email address as shared by those platforms.",
      "App stores: Apple App Store and Google Play may share purchase receipts, subscription status, and refund events with us."
     ]
    }
   ]
  },
  {
   "title": "2. How We Use Your Information",
   "blocks": [
    {
     "type": "list",
     "items": [
      "Provide and operate the Services: Creating your account, delivering app features, and processing subscription status.",
      "Manage subscriptions: Verifying free or premium entitlements, processing upgrades, downgrades, and renewals via Apple or Google platforms.",
      "Improve the Services: Analysing usage patterns (in anonymised or aggregated form) to fix bugs, prioritise features, and enhance performance.",
      "Communicate with you: Sending transactional emails (account confirmations, subscription receipts), support replies, and, where you have opted in, product news and tips.",
      "Security and fraud prevention: Monitoring for suspicious behaviour, protecting the integrity of the Services, and enforcing our Terms of Service.",
      "Legal compliance: Meeting applicable legal obligations, including tax reporting and responding to lawful requests from authorities."
     ]
    },
    {
     "type": "p",
     "text": "Note: We do not use your personal content or usage data to train or improve general-purpose AI or machine learning models. Any AI-powered features within the app process your data solely to deliver that feature to you."
    }
   ]
  },
  {
   "title": "3. Cookies & Tracking Technologies",
   "blocks": [
    {
     "type": "p",
     "text": "Our mobile app primarily uses mobile SDKs and device-level identifiers rather than browser cookies. On our website and web-based components of the Services, we may use cookies and similar technologies as described below."
    },
    {
     "type": "list",
     "items": [
      "Strictly necessary: Required for core functionality such as authentication and session management.",
      "Analytics: We use analytics SDKs (such as Firebase Analytics) to understand how users engage with the app.",
      "Crash reporting: We use crash-reporting tools to detect and diagnose technical issues."
     ]
    },
    {
     "type": "p",
     "text": "Technologies we use and their data retention:"
    },
    {
     "type": "list",
     "items": [
      "Firebase Analytics — App usage analytics and retention analysis. Retained up to 14 months.",
      "Firebase Crashlytics — Crash detection and diagnostics. Retained 90 days.",
      "Apple App Store / RevenueCat — Subscription management and receipt validation. Retained per subscription lifecycle.",
      "Google Play Billing — Subscription management on Android. Retained per subscription lifecycle.",
      "Stripe (web payments) — Payment processing for web-based purchases. Retained per transaction."
     ]
    },
    {
     "type": "p",
     "text": "You can limit ad tracking on your device through your iOS or Android privacy settings at any time."
    }
   ]
  },
  {
   "title": "4. Who We Share Your Data With",
   "blocks": [
    {
     "type": "list",
     "items": [
      "Platform providers: Apple Inc. and Google LLC, for in-app purchase processing, subscription management, and app distribution.",
      "Cloud infrastructure: We use cloud hosting providers (such as AWS or Google Cloud) for data storage and computing. These providers are bound by confidentiality and data-processing agreements.",
      "Analytics & crash-reporting vendors: Such as Firebase (Google LLC), who help us understand usage and diagnose errors.",
      "Customer support tools: Services that help us manage and respond to support requests.",
      "Payment processors: Where applicable, processors such as Stripe for web-based purchases, operating under their own privacy policies and PCI-DSS compliance.",
      "Legal & regulatory authorities: Where required by law, court order, or to protect the rights, property, or safety of Elegix, our users, or others.",
      "Business transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction."
     ]
    },
    {
     "type": "p",
     "text": "We do not sell your personal information to third parties."
    }
   ]
  },
  {
   "title": "5. Subscriptions & Payments",
   "blocks": [
    {
     "type": "p",
     "text": "Elegix operates on a freemium model. Core features are available to all users at no cost. Premium features are available via auto-renewing subscriptions offered through the Apple App Store and Google Play Store."
    },
    {
     "type": "list",
     "items": [
      "Payment handling: All payments are processed entirely by Apple or Google. Elegix does not store your payment card details.",
      "Subscription status: We receive subscription status updates (active, expired, refunded) and transaction identifiers to determine your entitlements within the app.",
      "Cancellations: Subscription management, cancellation, and refunds are handled through your Apple ID or Google account settings.",
      "Free tier: Free-tier usage does not require a payment method."
     ]
    },
    {
     "type": "p",
     "text": "To cancel your subscription: App Store > Apple ID > Subscriptions (iOS) or Google Play > Account > Subscriptions (Android). Cancellations take effect at the end of the current billing period."
    }
   ]
  },
  {
   "title": "6. Security",
   "blocks": [
    {
     "type": "p",
     "text": "We implement reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse. These include encryption in transit (TLS), encrypted storage, access controls, and regular security reviews."
    },
    {
     "type": "p",
     "text": "No method of electronic transmission or storage is completely secure. If you believe your account has been compromised, contact us immediately at mail@elegix.net."
    }
   ]
  },
  {
   "title": "7. Third Parties",
   "blocks": [
    {
     "type": "p",
     "text": "The Services may integrate with or link to third-party services or platforms. We are not responsible for the privacy practices of those third parties. We encourage you to review the privacy policies of any third-party services you use in connection with Elegix."
    }
   ]
  },
  {
   "title": "8. Where We Store Your Information",
   "blocks": [
    {
     "type": "p",
     "text": "Your information may be stored and processed in the United States or other countries where our service providers operate. If you are located in the European Economic Area (EEA) or the United Kingdom (UK), please be aware that your data may be transferred to and processed in countries outside those regions."
    },
    {
     "type": "p",
     "text": "Where such transfers occur, we rely on appropriate legal safeguards, including Standard Contractual Clauses approved by the European Commission or the UK Government, to ensure your data is protected to an equivalent standard."
    }
   ]
  },
  {
   "title": "9. Data Retention",
   "blocks": [
    {
     "type": "p",
     "text": "We retain your information for as long as necessary to provide the Services, fulfill the purposes described in this Policy, comply with legal obligations, and resolve disputes."
    },
    {
     "type": "list",
     "items": [
      "Active accounts: Information is retained for the duration of your account.",
      "Deleted accounts: Following account deletion, most personal data is removed from our production systems within 30 days. Residual copies in encrypted backups are deleted within 90 days.",
      "Transaction records: Subscription and payment records may be retained for longer periods as required by applicable tax or financial regulations.",
      "Anonymised data: Aggregated or anonymised analytics data that cannot identify you may be retained indefinitely."
     ]
    }
   ]
  },
  {
   "title": "10. Your Choices",
   "blocks": [
    {
     "type": "list",
     "items": [
      "Account information: You may update or correct your account details at any time within the app settings.",
      "Marketing communications: You may opt out of promotional emails by clicking the \"Unsubscribe\" link in any such email, or by contacting us at mail@elegix.net. You will still receive essential transactional messages.",
      "Push notifications: You can manage or disable push notifications through your device settings at any time.",
      "Analytics opt-out: You may limit ad tracking or analytics collection through your iOS or Android device privacy settings.",
      "Account deletion: You may request deletion of your account and associated data by contacting us at mail@elegix.net."
     ]
    }
   ]
  },
  {
   "title": "11. Your Rights (EEA & UK)",
   "blocks": [
    {
     "type": "p",
     "text": "If you are based in the European Economic Area or the United Kingdom, you have the following rights under applicable data protection law. To exercise any of these rights, contact us at mail@elegix.net. We may ask you to verify your identity before processing your request."
    },
    {
     "type": "list",
     "items": [
      "Access: Request a copy of the personal information we hold about you.",
      "Correction: Request correction of inaccurate or incomplete information.",
      "Erasure: Request deletion of your personal information, subject to certain legal exceptions.",
      "Restriction: Request that we restrict the processing of your information in certain circumstances.",
      "Portability: Receive a copy of your information in a structured, machine-readable format, or request transfer to another controller where technically feasible.",
      "Objection: Object to processing based on our legitimate interests or for direct marketing purposes.",
      "Withdrawal of consent: Where processing is based on consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing.",
      "Lodge a complaint: You have the right to lodge a complaint with the supervisory authority in your country of residence or place of work."
     ]
    }
   ]
  },
  {
   "title": "12. Children",
   "blocks": [
    {
     "type": "p",
     "text": "Our Services are not directed to children under the age of 13 (or 16 in certain jurisdictions). We do not knowingly collect personal information from children. If you believe a child has provided us with their information, please contact us at mail@elegix.net and we will take steps to delete such information promptly."
    }
   ]
  },
  {
   "title": "13. Contact & Complaints",
   "blocks": [
    {
     "type": "p",
     "text": "We welcome any questions, comments, or requests regarding this Policy."
    },
    {
     "type": "h3",
     "text": "Elegix Privacy enquiries: mail@elegix.net"
    },
    {
     "type": "p",
     "text": "We aim to respond to all privacy-related requests within 30 days. If you are located in the EEA or UK and are not satisfied with our response, you have the right to lodge a complaint with your local data protection authority."
    }
   ]
  },
  {
   "title": "14. Changes to This Policy",
   "blocks": [
    {
     "type": "p",
     "text": "We may update this Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons. When we make material changes, we will notify you through the app or by email before the changes take effect, and we will update the effective date at the top of this document."
    },
    {
     "type": "p",
     "text": "Your continued use of the Services after any changes become effective constitutes your acceptance of the updated Policy."
    }
   ]
  }
 ],
 "contact": "mail@elegix.net"
};

export const TERMS: LegalDoc = {
 "title": "Terms of Service",
 "effective": "March 30, 2025",
 "sections": [
  {
   "title": "Introduction",
   "blocks": [
    {
     "type": "p",
     "text": "Welcome, and thank you for your interest in Elegix. These Terms of Service are a legally binding contract between you and Elegix regarding your use of the Elegix mobile application and related services (collectively, the “Service”), available on the Apple App Store and Google Play Store."
    },
    {
     "type": "p",
     "text": "PLEASE READ THE FOLLOWING TERMS CAREFULLY."
    },
    {
     "type": "p",
     "text": "By downloading, installing, or otherwise accessing or using the Service, you agree that you have read and understood, and, as a condition to your use of the Service, you agree to be bound by, the following terms and conditions, including Elegix’s Privacy Policy (together, these “Terms”). If you do not agree to the Terms, then you do not have our permission to use the Service."
    },
    {
     "type": "p",
     "text": "Arbitration Notice. Except for certain kinds of disputes described in Section 19 (Dispute Resolution), you agree that disputes arising under these Terms will be resolved by binding, individual arbitration, and by accepting these Terms, you and Elegix are each waiving the right to a trial by jury or to participate in any class action or representative proceeding."
    }
   ]
  },
  {
   "title": "1. Service Overview",
   "blocks": [
    {
     "type": "p",
     "text": "Elegix offers a mobile productivity application available on a freemium model. The free tier provides access to core features at no cost. The “Premium” tier provides access to additional features via an auto-renewing paid subscription, processed through the Apple App Store or Google Play Store, as applicable."
    }
   ]
  },
  {
   "title": "2. Eligibility",
   "blocks": [
    {
     "type": "p",
     "text": "You must be at least 13 years old to use the Service. By agreeing to these Terms, you represent and warrant that: (a) you are at least 13 years old; (b) you have not previously been suspended or removed from the Service; and (c) your registration and your use of the Service is in compliance with any and all applicable laws and regulations. If you are using the Service on behalf of an organization, the individual accepting these Terms represents and warrants they have authority to bind that organization."
    }
   ]
  },
  {
   "title": "3. Accounts and Registration",
   "blocks": [
    {
     "type": "p",
     "text": "To access certain features of the Service, you must register for an account. You may register using your Apple or Google account, or by creating a separate account with your email address. You agree that the information you provide to us is accurate and that you will keep it accurate and up to date at all times."
    },
    {
     "type": "p",
     "text": "You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If you believe your account is no longer secure, please contact us immediately at mail@elegix.net."
    }
   ]
  },
  {
   "title": "4. Payment Terms",
   "blocks": [
    {
     "type": "h3",
     "text": "4.1 Pricing"
    },
    {
     "type": "p",
     "text": "Elegix reserves the right to determine pricing for the Service. Current pricing is displayed within the app and on the relevant App Store or Play Store listing. All applicable taxes are calculated at checkout based on your location. Elegix may change the price of any feature of the Service and will provide you with reasonable advance notice of such changes before they apply."
    },
    {
     "type": "h3",
     "text": "4.2 Authorization"
    },
    {
     "type": "p",
     "text": "By initiating a purchase, you authorize Apple or Google (as applicable) to charge the applicable fees to your payment method on file. All payments are processed entirely by the respective platform provider. Elegix does not directly process or store your payment card details."
    },
    {
     "type": "h3",
     "text": "4.3 Subscription Service"
    },
    {
     "type": "p",
     "text": "Premium features are available via auto-renewing subscriptions. When you activate a subscription, the relevant platform provider will periodically charge your payment method on a recurring basis (monthly or annually, as selected) until you cancel. Your subscription will automatically renew unless cancelled before the end of the current billing period. You must cancel your subscription through your Apple ID or Google account settings to avoid being charged for the next billing period."
    },
    {
     "type": "h3",
     "text": "4.4 Refunds"
    },
    {
     "type": "p",
     "text": "All fees are non-refundable except as required by applicable law or as expressly provided by Apple or Google under their respective refund policies. Refund requests must be directed to the platform through which the purchase was made."
    },
    {
     "type": "h3",
     "text": "4.5 Delinquent Accounts"
    },
    {
     "type": "p",
     "text": "Elegix may suspend or terminate access to the Service for any account where fees owed to a platform provider result in your subscription being cancelled or lapsed."
    }
   ]
  },
  {
   "title": "5. Free and Premium Tiers",
   "blocks": [
    {
     "type": "p",
     "text": "Users may sign up for a free account to access the core features of the Service. The Premium tier provides access to additional features and is available via subscription. Elegix does not represent or guarantee that any specific Premium feature will become available in the free tier. You may upgrade to Premium at any time through the in-app purchase flow."
    }
   ]
  },
  {
   "title": "6. Beta Features",
   "blocks": [
    {
     "type": "h3",
     "text": "6.1 Generally"
    },
    {
     "type": "p",
     "text": "From time to time, Elegix may offer you the opportunity to try features that are not yet generally available (“Beta Features”). Beta Features may be designated as beta, preview, or experimental. You may use Beta Features solely for evaluation purposes and agree to provide Elegix with feedback upon request."
    },
    {
     "type": "h3",
     "text": "6.2 Beta Usage Data"
    },
    {
     "type": "p",
     "text": "You acknowledge and agree that Elegix may collect anonymous data regarding your use and performance of the Service in connection with Beta Features. Elegix may use such data to improve the Service."
    },
    {
     "type": "h3",
     "text": "6.3 Beta Disclaimer"
    },
    {
     "type": "p",
     "text": "Beta Features may be incomplete, unstable, or contain errors. Elegix may discontinue any Beta Feature at any time without notice. Your use of Beta Features is at your own risk. ALL BETA FEATURES ARE PROVIDED “AS-IS” WITHOUT ANY WARRANTY OF ANY KIND."
    }
   ]
  },
  {
   "title": "7. Licenses",
   "blocks": [
    {
     "type": "h3",
     "text": "7.1 Limited License"
    },
    {
     "type": "p",
     "text": "Subject to your complete and ongoing compliance with these Terms, Elegix grants you a limited, non-exclusive, non-transferable, revocable license to download, install, and use the Service on a mobile device that you own or control, solely for your personal, non-commercial use."
    },
    {
     "type": "h3",
     "text": "7.2 License Restrictions"
    },
    {
     "type": "p",
     "text": "Except as expressly authorized by Elegix or required by applicable law, you may not: (a) copy, reproduce, or distribute the Service; (b) modify or create derivative works of the Service; or (c) interfere with or circumvent any feature or security mechanism of the Service."
    },
    {
     "type": "h3",
     "text": "7.3 Feedback"
    },
    {
     "type": "p",
     "text": "If you provide suggestions or feedback regarding the Service, you grant Elegix an unrestricted, perpetual, irrevocable, royalty-free right to use that feedback for any purpose, including improving the Service."
    }
   ]
  },
  {
   "title": "8. Ownership; Proprietary Rights",
   "blocks": [
    {
     "type": "p",
     "text": "The Service and all content, features, software, design, graphics, and other materials provided by Elegix (“Materials”) are owned by Elegix or its licensors and are protected by intellectual property laws. Except as expressly authorized by Elegix, you may not use the Materials. All rights not expressly granted are reserved by Elegix."
    }
   ]
  },
  {
   "title": "9. Third-Party Terms",
   "blocks": [
    {
     "type": "h3",
     "text": "9.1 Third-Party Services"
    },
    {
     "type": "p",
     "text": "The Service may allow you to connect or export data to third-party services. By using such integrations, you agree that Elegix may transfer data to those third-party services. Third-party services are not under Elegix’s control, and Elegix is not responsible for their privacy practices or content."
    },
    {
     "type": "h3",
     "text": "9.2 Third-Party Software"
    },
    {
     "type": "p",
     "text": "The Service may include open-source or third-party software components. Your use of those components may be subject to separate license terms, which are not restricted by these Terms."
    },
    {
     "type": "h3",
     "text": "9.3 App Store Terms"
    },
    {
     "type": "p",
     "text": "Your use of the Service is also subject to the terms and conditions of Apple Inc. or Google LLC (as applicable) for their respective app marketplaces. In the event of a conflict between these Terms and the applicable marketplace terms, the marketplace terms shall govern with respect to your relationship with that marketplace provider. See also Section 22 (Notice Regarding Apple) below."
    }
   ]
  },
  {
   "title": "10. User Content",
   "blocks": [
    {
     "type": "h3",
     "text": "10.1 User Content Generally"
    },
    {
     "type": "p",
     "text": "The Service may allow you to create, upload, store, or share content such as text, notes, images, or other data (“User Content”). You retain any copyright and other proprietary rights you hold in your User Content."
    },
    {
     "type": "h3",
     "text": "10.2 License Grant to Elegix"
    },
    {
     "type": "p",
     "text": "By providing User Content to or via the Service, you grant Elegix a worldwide, non-exclusive, royalty-free license to use, host, store, reproduce, modify, and distribute your User Content solely as necessary to provide and improve the Service."
    },
    {
     "type": "h3",
     "text": "10.3 Representations and Warranties"
    },
    {
     "type": "p",
     "text": "You represent and warrant that: (a) you own or have the necessary rights to your User Content; (b) your User Content does not infringe any third-party intellectual property, privacy, or other rights; and (c) your User Content is not unlawful, defamatory, harassing, or otherwise objectionable."
    },
    {
     "type": "h3",
     "text": "10.4 User Content Disclaimer"
    },
    {
     "type": "p",
     "text": "Elegix does not control User Content and is not responsible for it. Elegix may, at its discretion and without notice, remove or block any User Content that violates these Terms or is otherwise objectionable."
    }
   ]
  },
  {
   "title": "11. Communications",
   "blocks": [
    {
     "type": "h3",
     "text": "11.1 Push Notifications"
    },
    {
     "type": "p",
     "text": "When you install the app, you may opt in to receive push notifications. You can manage or disable push notifications at any time through your device’s settings."
    },
    {
     "type": "h3",
     "text": "11.2 Email"
    },
    {
     "type": "p",
     "text": "We may send you transactional emails related to your account and, where you have opted in, promotional emails about the Service. You may opt out of promotional emails at any time by following the unsubscribe link in the email or by contacting us at mail@elegix.net."
    }
   ]
  },
  {
   "title": "12. Prohibited Conduct",
   "blocks": [
    {
     "type": "p",
     "text": "BY USING THE SERVICE YOU AGREE NOT TO:"
    },
    {
     "type": "list",
     "items": [
      "(a) use the Service for any illegal purpose or in violation of any applicable law or regulation;",
      "(b) harass, threaten, or otherwise harm any other user of the Service;",
      "(c) infringe or misappropriate any third-party intellectual property or other rights;",
      "(d) interfere with security-related features of the Service, including by reverse engineering or attempting to discover source code;",
      "(e) upload viruses, malware, or other harmful code, or interfere with the operation of the Service or any user’s enjoyment of it;",
      "(f) perform any fraudulent activity, including impersonating any person or entity or claiming a false affiliation;",
      "(g) sell or transfer your access rights or any rights to use the Service or Materials; or",
      "(h) attempt, assist, or encourage any of the above."
     ]
    }
   ]
  },
  {
   "title": "13. Intellectual Property Complaints",
   "blocks": [
    {
     "type": "p",
     "text": "If you believe that content on the Service infringes your intellectual property rights, please contact us at mail@elegix.net with the following information:"
    },
    {
     "type": "list",
     "items": [
      "An electronic or physical signature of the rights owner or an authorized person;",
      "A description of the work you claim has been infringed;",
      "A description of where the allegedly infringing material is located within the Service;",
      "Your contact information (address, phone number, and email address);",
      "A statement that you have a good faith belief that the use is not authorized by the rights owner, its agent, or the law; and",
      "A statement, under penalty of perjury, that the information in your notice is accurate and that you are the rights owner or authorized to act on their behalf."
     ]
    },
    {
     "type": "p",
     "text": "Elegix will promptly terminate the accounts of users determined to be repeat infringers."
    }
   ]
  },
  {
   "title": "14. Modification of These Terms",
   "blocks": [
    {
     "type": "p",
     "text": "We reserve the right to change these Terms at any time. If a change materially modifies your rights or obligations, we will notify you through the app or by email before the changes take effect. Your continued use of the Service after the effective date of any changes constitutes your acceptance of the updated Terms."
    }
   ]
  },
  {
   "title": "15. Term and Termination",
   "blocks": [
    {
     "type": "h3",
     "text": "15.1 Term"
    },
    {
     "type": "p",
     "text": "These Terms are effective beginning when you accept them or first use the Service, and remain in effect until terminated."
    },
    {
     "type": "h3",
     "text": "15.2 Termination"
    },
    {
     "type": "p",
     "text": "If you violate any provision of these Terms, your authorization to use the Service and these Terms automatically terminate. Elegix may also, at its sole discretion, suspend or terminate your account or access to the Service at any time, with or without notice. You may terminate your account at any time by contacting us at mail@elegix.net."
    },
    {
     "type": "h3",
     "text": "15.3 Effect of Termination"
    },
    {
     "type": "p",
     "text": "Upon termination: (a) your license rights will terminate and you must stop using the Service; (b) you will lose access to your account and any associated User Content; and (c) all provisions of these Terms that by their nature should survive termination will survive."
    }
   ]
  },
  {
   "title": "16. Modification of the Service",
   "blocks": [
    {
     "type": "p",
     "text": "Elegix reserves the right to modify, suspend, or discontinue the Service or any features at any time, temporarily or permanently, without notice. Elegix will have no liability to you for any such modification, suspension, or discontinuation."
    }
   ]
  },
  {
   "title": "17. Indemnity",
   "blocks": [
    {
     "type": "p",
     "text": "To the fullest extent permitted by law, you agree to defend, indemnify, and hold harmless Elegix and its officers, directors, employees, and agents from and against any claims, damages, losses, and expenses (including reasonable legal fees) arising out of or related to: (a) your use or misuse of the Service; (b) your violation of these Terms or any applicable law; (c) your violation of any third-party rights; or (d) your User Content."
    }
   ]
  },
  {
   "title": "18. Disclaimers; No Warranties",
   "blocks": [
    {
     "type": "p",
     "text": "THE SERVICE AND ALL MATERIALS ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT. ELEGIX DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF THE SERVICE IS AT YOUR OWN RISK."
    }
   ]
  },
  {
   "title": "19. Limitation of Liability",
   "blocks": [
    {
     "type": "p",
     "text": "TO THE FULLEST EXTENT PERMITTED BY LAW, ELEGIX AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE TO YOU FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE. TO THE FULLEST EXTENT PERMITTED BY LAW, ELEGIX’S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE IS LIMITED TO THE GREATER OF: (A) THE AMOUNTS YOU HAVE PAID TO ELEGIX (VIA THE APPLICABLE APP STORE) IN THE 12 MONTHS PRIOR TO THE CLAIM; OR (B) [amount]."
    }
   ]
  },
  {
   "title": "20. Dispute Resolution",
   "blocks": [
    {
     "type": "h3",
     "text": "20.1 Informal Resolution"
    },
    {
     "type": "p",
     "text": "Before filing any formal legal claim, you agree to contact Elegix at mail@elegix.net and attempt to resolve the dispute informally. Most concerns can be resolved this way."
    },
    {
     "type": "h3",
     "text": "20.2 Arbitration"
    },
    {
     "type": "p",
     "text": "If we cannot resolve a dispute informally, you and Elegix agree to resolve it through binding individual arbitration rather than in court, except as set out in Section 20.3. You waive the right to a jury trial and the right to participate in any class action or representative proceeding."
    },
    {
     "type": "h3",
     "text": "20.3 Exceptions"
    },
    {
     "type": "p",
     "text": "Either party may bring an individual claim in small claims court. Either party may also seek emergency injunctive or other equitable relief from a court of competent jurisdiction to prevent harm pending arbitration."
    },
    {
     "type": "h3",
     "text": "20.4 Governing Law"
    },
    {
     "type": "p",
     "text": "These Terms are governed by the laws of the jurisdiction in which Elegix is incorporated, without regard to conflict-of-law principles."
    }
   ]
  },
  {
   "title": "21. Miscellaneous",
   "blocks": [
    {
     "type": "list",
     "items": [
      "Entire Agreement: These Terms, together with the Privacy Policy, constitute the entire agreement between you and Elegix regarding the Service and supersede all prior agreements.",
      "Severability: If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.",
      "Waiver: Elegix’s failure to enforce any provision of these Terms will not constitute a waiver of that provision.",
      "Assignment: You may not assign or transfer your rights under these Terms without Elegix’s prior written consent. Elegix may assign these Terms without restriction.",
      "No Third-Party Beneficiaries: These Terms do not create any third-party beneficiary rights.",
      "Contact: For questions about these Terms, contact us at mail@elegix.net."
     ]
    }
   ]
  },
  {
   "title": "22. Notice Regarding Apple",
   "blocks": [
    {
     "type": "p",
     "text": "If you download the Service from Apple’s App Store, the following additional terms apply. You acknowledge that these Terms are between you and Elegix only, not with Apple Inc. (“Apple”), and that Apple is not responsible for the Service or its content."
    },
    {
     "type": "list",
     "items": [
      "The license granted to you for the Service is limited to a non-transferable license to use it on Apple-branded devices you own or control, subject to the App Store Terms of Service.",
      "Apple has no obligation to provide maintenance or support services for the Service.",
      "In the event of any failure of the Service to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price (if any) to you. To the maximum extent permitted by law, Apple has no other warranty obligation with respect to the Service.",
      "Apple is not responsible for addressing any claims by you or any third party relating to the Service, including product liability claims, consumer protection claims, or intellectual property infringement claims.",
      "Apple and its subsidiaries are third-party beneficiaries of these Terms, and upon your acceptance, Apple will have the right to enforce these Terms against you as a third-party beneficiary."
     ]
    }
   ]
  }
 ],
 "contact": "mail@elegix.net"
};

/** What this website and the waitlist collect. Shown as its own section in /privacy, right after the introduction. */
export const WEBSITE_SECTION: { title: string; blocks: LegalBlock[] } = {
  title: "Our website and waitlist",
  blocks: [
    { type: "p", text: "This section covers the Elegix website and its waitlist, before the app is available. Elegix is operated by [legal name], [country], [postal address]." },
    { type: "h3", text: "What we collect on the website" },
    { type: "list", items: [
      "Your email address, when you join the waitlist or take the Life Balance check.",
      "Which form you used (for example the hero, the balance check or the early access form) and, in the early access form, how you'd like to start.",
      "If you take the Life Balance check: your 7 area ratings from 1 to 10. They are your own estimates, not medical information, and we keep your last 10 checks so you can see your progress later.",
      "When you joined, and a record of your consent: the date, the page and the version of this policy.",
      "Where you came from, if your link had it: the referring website, the page you first landed on and campaign tags (utm_source, utm_medium, utm_campaign). Your browser keeps these locally until you sign up.",
      "Whether you opened our emails. Our email provider records opens with a small invisible image, together with the device and approximate location of the open.",
    ] },
    { type: "h3", text: "Why and where" },
    { type: "list", items: [
      "We use this to keep your place on the waitlist, email you when your spot opens, send your Life Balance score with a first step, and understand which pages and campaigns bring people in.",
      "Waitlist details are stored in our mailing list at Mailgun (Mailgun Technologies, Inc., United States), which also sends our emails and processes the data on our behalf.",
      "The website is hosted on Vercel. It uses no analytics or advertising cookies.",
      "We keep waitlist details until you unsubscribe or ask us to delete them. After you unsubscribe we keep only a note that you did, so we don't email you by mistake.",
      "Unsubscribe any time with the link at the bottom of every email, or write to mail@elegix.net to get a copy of your data or have it deleted.",
    ] },
  ],
};
