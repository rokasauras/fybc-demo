# Forever Young Growth Platform — proposed architecture

## Product vision

Treat the public website as the acquisition layer of a broader customer platform:

1. Discover the clinic through search/social/referrals.
2. Use a guided facial finder or AI-assisted consultation.
3. Create a lead or customer profile.
4. Book and pay for a treatment.
5. Record consultation, treatment and product recommendations.
6. Trigger post-treatment follow-up.
7. Encourage rebooking at the right interval.
8. Replenish home-care products via recurring orders.
9. Reward loyalty and referrals.
10. Give the owner a live view of revenue, retention, follow-ups and customer value.

## Frontend

- React + TypeScript + Vite
- Mobile-first responsive components
- Public marketing pages
- Authenticated customer portal
- Authenticated staff/owner dashboard
- Shared design system and component library

Suggested routes:

- `/`
- `/treatments`
- `/treatments/:slug`
- `/skin-finder`
- `/book`
- `/shop`
- `/account`
- `/account/appointments`
- `/account/skin-plan`
- `/account/orders`
- `/account/rewards`
- `/dashboard`
- `/dashboard/customers`
- `/dashboard/follow-ups`
- `/dashboard/campaigns`
- `/dashboard/products`

## AWS application layer

### Hosting
- AWS Amplify Hosting for the React app initially.
- CloudFront/S3 is an alternative if you want lower-level control.

### Identity
- Amazon Cognito User Pools.
- Roles/groups: customer, therapist, manager, admin.
- MFA required for staff accounts.

### APIs
- Amazon API Gateway.
- AWS Lambda services grouped by domain rather than one giant Lambda.

Potential API domains:
- customer-service
- booking-service
- consultation-service
- loyalty-service
- product-service
- messaging-service
- analytics-service

### Database
Use a relational database for the core CRM because customers, appointments, treatments, orders, subscriptions, consent records and staff all have relationships.

Recommended starting point:
- Amazon Aurora PostgreSQL Serverless v2 or RDS PostgreSQL.

Useful complementary stores:
- S3 for images/documents/import files.
- DynamoDB only where its access pattern is clearly useful, e.g. event/activity streams or high-volume interaction events.

## Core relational model

### customers
- customer_id
- first_name
- last_name
- email
- phone
- date_of_birth (only if genuinely needed)
- created_at
- source
- status
- preferred_contact_channel

### customer_consents
- consent_id
- customer_id
- purpose
- channel
- lawful_basis_or_consent_type
- status
- captured_at
- source
- evidence_reference

### appointments
- appointment_id
- customer_id
- therapist_id
- treatment_id
- starts_at
- status
- amount
- booking_source

### treatments
- treatment_id
- name
- duration_minutes
- price
- category
- active

### consultations
- consultation_id
- customer_id
- appointment_id
- goals
- concerns
- answers_json
- therapist_notes
- created_at

### product_recommendations
- recommendation_id
- customer_id
- product_id
- appointment_id
- reason
- recommended_at

### orders
- order_id
- customer_id
- external_commerce_id
- status
- total
- ordered_at

### subscriptions
- subscription_id
- customer_id
- product_id
- external_subscription_id
- cadence
- status
- next_charge_at

### loyalty_ledger
- ledger_id
- customer_id
- type
- points
- monetary_value
- source_reference
- occurred_at

### follow_up_tasks
- task_id
- customer_id
- appointment_id
- type
- due_at
- status
- assigned_to

### customer_events
- event_id
- customer_id
- event_type
- source
- payload_json
- occurred_at

## Automation layer

Use EventBridge + Lambda/Step Functions for business workflows.

Examples:
- Appointment completed → create 2-day and 7-day follow-up.
- Treatment interval reached → rebooking recommendation.
- Product expected to run out → refill message.
- Customer inactive for 90/120 days → win-back eligibility.
- Birthday/customer anniversary → loyalty offer.
- Customer reaches spend threshold → upgrade loyalty tier.
- New web lead does not book within 24 hours → follow-up task.

## Messaging

- Amazon SES for transactional email.
- Use a dedicated SMS/WhatsApp provider for messaging.
- Keep marketing consent/preferences separate from purely transactional communications.
- Every automated message should be generated from an auditable event and have opt-out logic where applicable.

## Commerce

Keep commerce behind an adapter/service layer so the website is not permanently coupled to one provider.

`CommerceProvider` interface:
- createCheckout()
- getProducts()
- getOrder()
- createSubscription()
- cancelSubscription()
- handleWebhook()

This allows Shopify, WooCommerce or another payment/subscription stack to be swapped without rewriting the CRM.

The CRM remains the source of customer intelligence; the commerce platform remains the source of payment/order truth.

## AI — later phase

Do not start by letting an LLM freely recommend clinical treatments.

Start with a deterministic rules engine:
- skin goal
- sensitivity
- contraindication flags
- budget
- appointment length
- previous treatment

Then add AI as a conversational layer over those approved rules and the clinic's own treatment knowledge.

Potential uses:
- conversational facial finder
- treatment FAQ assistant
- post-treatment check-ins
- staff/customer-summary generation
- suggested follow-up drafts
- campaign segmentation explanations

Use Amazon Bedrock if you want model calls and customer data processing to stay within the AWS architecture, while still applying minimum-data and access-control principles.

## Analytics

Track the whole lifecycle, not just page views:

- session_started
- treatment_viewed
- skin_finder_started
- skin_finder_completed
- treatment_recommended
- booking_started
- booking_completed
- account_created
- appointment_completed
- product_recommended
- product_purchased
- subscription_started
- follow_up_completed
- treatment_rebooked
- referral_created

Important dashboard metrics:
- visitor → booking conversion
- lead → booking conversion
- average transaction value
- rebooking rate
- 30/60/90-day retention
- treatment revenue
- retail/product revenue
- recurring product revenue
- customer lifetime value
- lapsed-customer revenue opportunity
- therapist utilisation
- acquisition source ROI

## Data migration

Do not import the 20-year archive straight into production tables in one step.

Pipeline:
1. Preserve raw source files unchanged in an encrypted S3 migration bucket.
2. Profile fields and formats.
3. Normalise names, phones, emails and dates.
4. Deduplicate customers.
5. Separate contact data from historical treatment/transaction history.
6. Assign provenance to every imported record.
7. Review consent/marketing status separately from customer identity.
8. Load into staging tables.
9. Validate counts and samples.
10. Promote clean records into production.

Every migrated record should retain `source_system`, `source_record_id`, `import_batch_id` and `imported_at` for auditability.

## Suggested build phases

### Phase 1 — Sell better
- React public website
- facial finder
- conversion tracking
- treatment pages
- real booking integration
- social landing pages

### Phase 2 — Know the customer
- Cognito accounts
- CRM database
- staff dashboard
- customer profiles
- import historical records
- treatment history
- consent/preferences

### Phase 3 — Retain and increase value
- automated follow-ups
- rebooking workflows
- product catalogue
- recurring product orders
- loyalty/rewards
- referrals

### Phase 4 — Scale acquisition
- source-level analytics
- social campaign landing pages
- automated win-back/customer segments
- content pipeline
- referral programme

### Phase 5 — Intelligent assistance
- structured digital consultations
- AI concierge
- staff co-pilot
- personalised lifecycle messaging
- next-best-action models

## £250k target framing

£250,000/year is approximately £20,833/month.

The platform should model the target as a mix of:
- treatment capacity × utilisation × average treatment value
- rebooking frequency
- retail/product attach rate
- recurring product revenue
- new-client acquisition
- lapsed-customer reactivation
- additional therapist capacity

The dashboard should make each lever visible rather than treating £250k as one undifferentiated sales target.
