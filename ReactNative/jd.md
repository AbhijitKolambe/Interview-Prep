# Mobile Developer Role & Knowledge Base

## 1. Job Roles & Responsibilities

### 1. Design, Develop, and Maintain iOS & Android Mobile Apps (Native and/or Ionic)

#### Design
Design starts with translating business requirements into a scalable mobile architecture.

**Key design principles:**
- Platform-specific UI/UX (Material Design for Android, Human Interface Guidelines for iOS)
- Clean architecture (UI → Domain → Data)
- Separation of concerns to isolate UI, business logic, and data sources
- Reusable components and shared utilities
- Offline-first strategy where applicable (important in FinTech)

**Native approach:**
- **Android:** Kotlin, MVVM, Jetpack components
- **iOS:** Swift, MVVM, Combine
- Best performance, deeper OS integration, stronger security controls

**Ionic approach:**
- Single codebase using Angular/React + Capacitor
- Faster development for MVPs or internal apps
- Requires careful optimization for performance and security
- Native plugins used for biometrics, storage, encryption

#### Maintenance
- Refactor legacy code to remove technical debt
- Upgrade SDKs, dependencies, and OS compatibility
- Monitor deprecations and breaking changes
- Ensure backward compatibility
- Continuous performance tuning

### 2. Implement New Features and Enhancements with High Code Quality

Feature development follows a structured lifecycle:
- Requirement analysis with Product Managers
- Technical design and API contract review
- Modular implementation
- Unit and integration testing
- Code review and refactoring

**Code quality practices:**
- SOLID principles
- DRY and KISS
- Meaningful naming and clean folder structure
- Reusable UI components
- Feature isolation (feature modules / lazy loading where applicable)
- Defensive programming to avoid runtime crashes

**Performance considerations:**
- Avoid heavy logic on UI thread
- Optimize rendering and memory usage
- Proper lifecycle handling

### 3. Develop UI Screens and Integrate with Backend REST APIs

#### UI Development
- Pixel-perfect implementation from Figma or design specs
- Responsive layouts across screen sizes
- Accessibility support
- Proper state handling (loading, success, error)

#### API Integration
- REST API integration using secure HTTP clients
- Token-based authentication (JWT / OAuth)
- Centralized API layer
- Request/response interceptors
- Error handling with meaningful user feedback

**Data handling:**
- DTO → Domain model mapping
- Validation of backend data
- Caching strategies
- Pagination and lazy loading for large datasets

**Security:**
- HTTPS only
- Certificate pinning where required
- No sensitive data stored in plain text

### 4. Participate in App Store Publishing (Play Store & App Store)

**Android (Play Store):**
- Signed AAB generation
- Versioning (versionCode, versionName)
- Release tracks (internal, closed, open, production)
- Play Console compliance (permissions, data safety, privacy policy)

**iOS (App Store):**
- Certificates and provisioning profiles
- Archive and upload via Xcode
- TestFlight distribution
- App Store review guidelines compliance

**Common responsibilities:**
- Store listing preparation
- Screenshots and metadata validation
- Handling rejection feedback
- Coordinating releases with business timelines

### 5. Handle Version Control, Releases, and Deployment Coordination

**Version control:**
- Git-based workflows (Git Flow or trunk-based)
- Feature branches, release branches, hotfix branches
- Meaningful commit messages

**Release management:**
- Semantic versioning
- Tagging stable releases
- Change logs
- Coordinating merges with QA and backend teams

**CI/CD:**
- Automated builds
- Automated tests
- Environment-specific configurations
- Secure handling of secrets and keys

### 6. Monitor Crash Analytics and Analyze User Feedback

**Crash monitoring tools:**
- Firebase Crashlytics
- Platform-specific crash logs

**Crash analysis process:**
- Identify crash frequency and affected OS versions
- Analyze stack traces
- Reproduce issues locally or via test builds
- Prioritize based on user impact

**User feedback:**
- App store reviews
- In-app feedback
- Support tickets

**Outcome:**
- Improved stability
- Reduced crash-free rate issues
- Better user retention

### 7. Work on Bug Fixing, Hotfixes, and Preventive Maintenance

**Bug fixing approach:**
- Root cause analysis
- Reproducible test cases
- Fix with minimal side effects
- Regression testing

**Hotfix handling:**
- Fast-tracked branch
- Minimal scope changes
- Emergency release pipeline
- Post-release validation

**Preventive maintenance:**
- Proactive refactoring
- Dependency updates
- Performance audits
- Memory leak fixes
- Deprecated API removal

### 8. Collaborate in Agile/Scrum Teams with Product Managers and QA

**Agile responsibilities:**
- Sprint planning and estimation
- Daily stand-ups
- Sprint reviews and retrospectives

**Collaboration:**
- Clarifying requirements with Product Managers
- Technical feasibility discussions
- Working closely with QA for test cases
- Supporting UAT and production validation

**Communication:**
- Clear technical explanations to non-technical stakeholders
- Ownership of assigned features
- Accountability for delivery timelines

### 9. Follow Secure Coding Practices for FinTech Applications

Security is non-negotiable in FinTech.

**Core practices:**
- Secure authentication and authorization
- Encrypted local storage
- Secure key management
- No hardcoded secrets
- Input validation and sanitization

**Advanced security:**
- Biometric authentication
- Session timeout handling
- Root/jailbreak detection
- Obfuscation and code hardening
- Secure API communication

**Compliance mindset:**
- Data privacy laws
- Least privilege access
- Secure error handling
- Regular security reviews

---

## 2. Technical Skills & Requirements

### 1. Strong Experience in Android (Kotlin/Java) and/or iOS (Swift)

#### Android (Kotlin / Java)
Strong Android experience means more than writing screens.

**Key areas:**
- MVVM architecture with clear separation of UI, ViewModel, and data layers
- Jetpack components: ViewModel, LiveData / Flow, Navigation, Room
- Lifecycle-aware components to avoid memory leaks
- Coroutines for async operations instead of callbacks
- Background work using WorkManager
- Handling configuration changes and process death
- Secure storage using Keystore and EncryptedSharedPreferences
- App performance optimization (ANR prevention, memory profiling)

**Java experience helps in:**
- Maintaining legacy codebases
- Understanding JVM behavior
- Migrating Java code to Kotlin safely

#### iOS (Swift)
Strong iOS experience includes:
- MVVM architecture with clean separation
- Swift language features (optionals, value types, protocols)
- Memory management using ARC
- Asynchronous programming using async/await or Combine
- Secure storage using Keychain
- Handling background tasks and app lifecycle
- Auto Layout and adaptive UI for multiple devices
- App Store compliance and certificate management

### 2. Experience with Hybrid Frameworks (Ionic Recommended)

Hybrid frameworks allow building apps using web technologies while still deploying native apps.

**Ionic experience typically includes:**
- Ionic with Angular or React
- Capacitor plugins for native functionality
- Writing platform-specific code when required
- Performance optimization to reduce WebView overhead
- Secure communication between JavaScript and native layers

**Use cases:**
- Faster development cycles
- Shared codebase across platforms
- Ideal for MVPs, internal tools, or content-heavy apps

**Limitations and mitigation:**
- Performance-sensitive features moved to native plugins
- Strict security practices due to WebView exposure
- Careful memory and event handling

### 3. Experience with React Native and/or Flutter

#### React Native
Strong React Native experience involves:
- Functional components and hooks
- State management patterns
- Native module integration
- Optimizing JS thread performance
- Handling gestures and animations efficiently
- Platform-specific code handling
- Secure storage and permissions management

**Understanding when to:**
- Use native modules
- Optimize rendering
- Avoid heavy computation on the JS thread

#### Flutter
Flutter experience includes:
- Dart language proficiency
- Widget-based UI composition
- State management approaches
- Understanding rendering pipeline (Skia)
- Platform channel integration for native features
- Performance tuning and memory optimization

**Choosing between React Native and Flutter depends on:**
- Team skillset
- Performance needs
- Ecosystem maturity
- Long-term maintainability

### 4. Strong REST API Integration & Backend Logic Understanding

REST integration is critical in FinTech apps.

**Key skills:**
- HTTP methods and status code handling
- Token-based authentication (JWT / OAuth)
- Request signing and headers
- Retry and timeout strategies
- Pagination and filtering
- Error mapping and graceful failure handling

**Backend understanding includes:**
- Knowing how APIs are designed
- Understanding data contracts
- Handling partial failures
- Coordinating changes with backend teams
- Debugging API issues using logs and network traces

**Security awareness:**
- Never trusting backend data blindly
- Validating responses
- Preventing token leakage
- Secure session handling

### 5. Hands-on Experience with Third-Party FinTech Services

#### Common Integrations
- KYC and AML verification services
- Credit bureau data providers
- Payment gateways
- OTP and messaging services (SMS, WhatsApp)
- Document OCR for identity verification
- Analytics and event tracking platforms

#### Integration Responsibilities
- SDK and API-based integrations
- Secure handling of sensitive user data
- Proper permission and consent flows
- Failover and retry logic
- Compliance with regulatory requirements
- Handling vendor downtime gracefully

**Critical focus:**
- Data privacy
- Encryption in transit and at rest
- Audit-friendly implementation
- Minimal data retention

### 6. Git-Based Version Control (GitHub / GitLab / Bitbucket)

Strong Git experience includes:
- Feature branch workflows
- Pull request-based reviews
- Conflict resolution
- Rebase vs merge understanding
- Tagging and release branches
- Commit hygiene and traceability

**Best practices:**
- Small, focused commits
- Meaningful commit messages
- Avoid committing secrets
- Code reviews as a quality gate

### 7. Experience with CI/CD Pipelines for Mobile Apps

CI/CD for mobile apps goes beyond simple builds.

**Key aspects:**
- Automated build generation
- Environment-based configurations
- Automated testing
- Secure key and certificate handling
- Versioning automation
- Distribution to testers or stores

**Benefits:**
- Faster release cycles
- Reduced manual errors
- Consistent builds
- Better rollback capability

**FinTech focus:**
- Secure secrets management
- Controlled access to production pipelines
- Audit-friendly logs

### 8. Familiarity with Crashlytics / Firebase Analytics

#### Crash Monitoring
**Responsibilities include:**
- Monitoring crash-free user rates
- Analyzing stack traces
- Identifying device or OS-specific issues
- Prioritizing fixes based on impact

**Approach:**
- Fix root cause, not just symptoms
- Add defensive checks
- Improve logging and observability

#### Analytics
**Usage includes:**
- Tracking user flows
- Measuring feature adoption
- Funnel analysis
- Event-driven insights

**Analytics decisions:**
- Used for product improvements
- Performance optimization
- UX refinement
- Compliance-aware tracking (no sensitive data)

### 9. Experience in Agile Project Management Practices

Agile participation is not limited to attending meetings.

**Key responsibilities:**
- Sprint planning and estimation
- Breaking features into tasks
- Providing realistic timelines
- Daily standups with clear status updates
- Sprint reviews and demos
- Retrospective participation

**Collaboration:**
- Continuous alignment with Product Managers
- Early involvement in requirement discussions
- Close coordination with QA
- Ownership of deliverables

**Mindset:**
- Iterative improvement
- Transparency
- Accountability
- Adaptability to change

---

## 3. FinTech Domain Experience

### 1. FinTech / Banking / Lending App Experience

Experience in FinTech, Banking, or Lending apps goes beyond normal mobile development. It requires working in high-risk, regulated environments where data accuracy, security, and auditability are critical.

**Typical FinTech App Domains:**
- Digital banking
- Loan origination and management
- Credit scoring and underwriting
- KYC onboarding
- Payment processing
- EMI schedules and repayment tracking
- Transaction history and statements
- Customer support and dispute handling

**Key Responsibilities in FinTech Apps:**
- Implementing multi-step onboarding journeys
- Handling sensitive financial and identity data
- Ensuring transactional accuracy and consistency
- Managing session security and timeouts
- Supporting regulatory audits and logging
- Ensuring zero data leakage and minimal crash tolerance

**Lending-Specific Knowledge:**
- Loan lifecycle understanding (application → approval → disbursement → repayment)
- Interest calculations, EMIs, penalties
- Credit bureau integrations
- Risk and eligibility checks
- Graceful handling of partial approvals and rejections

### 2. Knowledge of Mobile Security Best Practices

Mobile security is a core engineering responsibility in FinTech apps, not an afterthought.

**Device-Level Security:**
- Secure storage using Keychain (iOS) and Keystore (Android)
- Encrypted local databases
- Preventing sensitive data exposure in logs or screenshots
- Secure clipboard usage
- Background app data protection

**Application-Level Security:**
- Strong authentication mechanisms
- Biometric authentication with fallback
- Session expiration and token refresh handling
- Certificate pinning
- Secure API communication (HTTPS only)
- Rooted / jailbroken device detection

**Code-Level Security:**
- No hardcoded secrets or API keys
- Obfuscation and code hardening
- Input validation on both client and server
- Defensive programming to prevent crashes and exploits

### 3. Awareness of International FinTech Regulations (PCI-DSS, GDPR)

Strong FinTech developers understand why regulations exist, not just what they are.

**PCI-DSS Awareness:**
- No storage of raw card details on the device
- Using tokenized payment flows
- Secure transmission of payment data
- Delegating card handling to compliant SDKs or gateways
- Minimizing exposure of payment-related data

**GDPR Awareness:**
- Data minimization (collect only what is required)
- Explicit user consent for data collection
- Ability to delete or anonymize user data
- Secure handling of personal and identity data
- Clear privacy disclosures and data usage transparency

**Practical Mobile Implications:**
- Avoid tracking sensitive personal data in analytics
- Proper handling of screenshots and background snapshots
- Secure user logout and data wipe mechanisms
- Compliance-friendly error handling (no sensitive data in error messages)

### 4. Secure Financial Data Handling Practices

Handling financial data requires precision, confidentiality, and traceability.

**Data in Transit:**
- Encrypted network communication
- Strong TLS configurations
- API request signing when required
- Secure headers and tokens

**Data at Rest:**
- Encryption for local storage
- Secure cache management
- Controlled data retention policies
- Automatic cleanup on logout or app uninstall

**Audit and Compliance Support:**
- Consistent event logging (non-sensitive)
- Transaction traceability
- Time-stamped records
- Reproducible flows for audits

### 5. Experience with KSA FinTech Projects and SAMA Regulations

Experience in Saudi Arabia FinTech projects is a strong advantage due to region-specific regulations and workflows.

**Regulatory Awareness:**
- Understanding guidelines issued by Saudi Central Bank (SAMA)
- Compliance with local data hosting and processing rules
- Security and risk assessment expectations
- Strong emphasis on consumer protection

**Saudi Banking & Financial Workflows:**
- Local KYC and identity verification flows
- Bank integrations aligned with Saudi financial infrastructure
- Payment and transfer flows compliant with local systems
- Arabic language and RTL layout support
- Region-specific compliance checks

**Practical Engineering Impact:**
- Working closely with compliance teams
- Adapting onboarding flows for local regulations
- Handling approvals and audits
- Designing systems that can evolve with regulatory changes

---

## 4. Razorpay Payment Gateway Integration in React Native (Step by Step)

This flow applies to Android and iOS using the official Razorpay React Native SDK.

### 1. Prerequisites and High-Level Flow

**Overall Payment Flow (Important for Interview):**
1. App requests backend to create an order
2. Backend creates Razorpay order using secret key
3. Backend sends `order_id` to mobile app
4. App opens Razorpay Checkout
5. User completes payment
6. Razorpay returns payment response to app
7. App sends payment details to backend
8. Backend verifies payment signature
9. Backend confirms success/failure

> **Critical rule:** 👉 Secret key must **never** be used in the mobile app

### 2. Create Razorpay Account and Get Keys

1. Create a Razorpay account
2. Generate:
   - **Key ID** (used in app)
   - **Secret Key** (backend only)
3. Enable required payment methods (UPI, Cards, NetBanking, Wallets)
4. Environment:
   - **Test keys** for development
   - **Live keys** for production

### 3. Backend: Create Order (Mandatory Step)

Payment order must be created on backend.

**Backend Order Creation (Conceptual):**
- Amount is sent in smallest currency unit (paise)
- Currency (INR, SAR, etc.)
- Receipt reference

**Example backend response to app:**
```json
{
  "order_id": "order_ABC123",
  "amount": 50000,
  "currency": "INR"
}
```

> **Interview Note:** Order creation prevents tampering and ensures PCI compliance.

### 4. Install Razorpay SDK in React Native

```bash
npm install react-native-razorpay
```

**For iOS:**
```bash
cd ios && pod install
```

### 5. Android Configuration

**File:** `AndroidManifest.xml`
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

**Minimum SDK:** `minSdkVersion 21`

### 6. iOS Configuration

**File:** `Info.plist`
```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

Add URL scheme if required by payment method.

### 7. Fetch Order from Backend in React Native

```javascript
const createOrder = async () => {
  const response = await fetch('YOUR_BACKEND_ORDER_API');
  return response.json();
};
```

### 8. Open Razorpay Checkout (Core Step)

```javascript
import RazorpayCheckout from 'react-native-razorpay';

const startPayment = async () => {
  const order = await createOrder();

  const options = {
    description: 'Loan repayment',
    image: 'https://your-logo-url',
    currency: order.currency,
    key: 'YOUR_RAZORPAY_KEY_ID',
    amount: order.amount,
    order_id: order.order_id,
    name: 'Your Company Name',
    prefill: {
      email: 'user@email.com',
      contact: '9999999999',
      name: 'User Name'
    },
    theme: { color: '#000000' }
  };

  RazorpayCheckout.open(options)
    .then(data => {
      handlePaymentSuccess(data);
    })
    .catch(error => {
      handlePaymentFailure(error);
    });
};
```

### 9. Handle Payment Success

```javascript
const handlePaymentSuccess = (data) => {
  const payload = {
    razorpay_payment_id: data.razorpay_payment_id,
    razorpay_order_id: data.razorpay_order_id,
    razorpay_signature: data.razorpay_signature
  };

  verifyPaymentOnBackend(payload);
};
```

> **Do NOT trust success directly on mobile. Always verify on backend.**

### 10. Backend: Payment Signature Verification (Critical)

**Backend verifies:**
- `order_id`
- `payment_id`
- `signature`

**Verification ensures:**
- Payment authenticity
- No man-in-the-middle attack
- Compliance with FinTech security standards

**Only after verification:**
- Mark transaction as successful
- Update loan/payment status

### 11. Handle Payment Failure

```javascript
const handlePaymentFailure = (error) => {
  console.log(error.code);
  console.log(error.description);
};
```

**Failure cases:**
- User cancelled
- Network issue
- Bank declined
- Timeout

> **Best practice:** Show user-friendly error messages, log technical details silently.

### 12. Important Security Best Practices (Interview Gold)

- **Never** store secret key in app
- **Always** create orders on backend
- **Always** verify signature on backend
- **Do not** log payment IDs in production logs
- Use **HTTPS only**
- Disable screenshots on payment screens (FinTech apps)
- Handle session expiry during payment

### 13. Razorpay in FinTech / Lending Apps (Real Use Cases)

- Loan EMI payments
- Processing fees
- Subscription charges
- Part payments
- Foreclosure payments

**Extra handling:**
- Retry mechanisms
- Idempotent backend APIs
- Transaction reconciliation
- Webhook handling on backend