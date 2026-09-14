# The Leads Den: UX research and design evaluation

## Executive finding

The most defensible product opportunity is continuity across a property relationship: an agent should retain the relevant context as a person moves from enquiry to inspection, follow-up and offer. Buyers and vendors need understandable next steps within that relationship. The design file contains substantial responses to this opportunity across mobile and web.

Published Australian research supports communication as a real consumer concern. Official CRM documentation establishes that contact identity, lead capture, follow-up and vendor reporting are existing industry workflows. The design evaluation connects these findings to the supplied screens. It does not establish the frequency of usability problems in The Leads Den itself.

## Research questions and method

The review addressed four questions: which relevant consumer difficulties have been documented; what existing CRMs already support; which design choices respond to those difficulties; and which assumptions should be tested next.

The evidence comprises two Australian consumer reports, official documentation from Rex and Agentbox, and the supplied UI Design.fig. The file review covered its 17-page hierarchy, extractable screen and component text, embedded-image contact sheets and selected full-size interface images. Components, references, old versions and role-divider pages were distinguished from principal product flows. This is a broad artefact review, not a click-through test of a running application.

The synthesis groups evidence by hand-off: CRM to working record, visitor to buyer profile, buyer to agent, agent to vendor and contact to ongoing communication. It uses task-based role descriptions instead of invented demographic personas. No participant quotations or observed behaviour are attributed to a primary study of this product.

Source review: September 2026. Project period confirmed by the designer: August 2024–February 2025. Contemporary evidence and later market evidence are distinguished below.

## Consumer evidence

### Communication

The Real Insurance / MYMAVINS finding and its question base are presented in the case study. The study used an online survey and allowed multiple responses to the relevant question. Its methodology and publication dates were checked against the original report. It provides directional evidence, not a study of The Leads Den customers. [Report, pp. 3, 24](https://www.realinsurance.com.au/documents/whitepaper-the-real-property-report-2025.pdf)

The later REA buyer report provides a separate check. Its page 20 records 62% agreement with a tendency to stop investigating a property when the agent is unresponsive, with a stated buyer base of 2,051. This is reported attitude, not measured abandonment or a conversion benchmark. The extracted slide deck does not provide sufficient recruitment detail to assess representativeness fully. [REA, p. 20](https://customer.realestate.com.au/wp-content/uploads/2026/03/Buyers-Property-Seeker-Report-2025.pdf)

**Interpretation:** providing property-linked communication and convenient follow-up is relevant. Faster access to information may support responsiveness, but workload, agency policy and agent behaviour also influence it. The interface cannot be credited with improvement without measurement.

### Buyer readiness

The seller finding is also included in the case study. Its design implication is to understand readiness and dependencies while treating exploratory buyers respectfully. Readiness labels should be editable and grounded in information the person actually supplied. [Report, p. 30](https://www.realinsurance.com.au/documents/whitepaper-the-real-property-report-2025.pdf)

**Interpretation:** budget, timing, finance and a prior-property sale can help prepare a conversation. They do not independently establish whether someone is a worthwhile customer. A matching score should not silently become a credibility judgement.

## Competitive workflow analysis

| Workflow | Documented baseline | Implication for The Leads Den |
|---|---|---|
| Lead capture | Rex describes a consolidated incoming-lead backlog. | Evaluate whether imported and new enquiries retain identity and ownership. Do not claim lead capture is unique. |
| Matching and follow-up | Rex lists buyer matching and follow-up capabilities. | The differentiator must be the coherent role experience or execution quality, verified through use. |
| Vendor communication | Agentbox supports campaign activity reporting, including inspections and feedback. | Property-related activity must translate into something useful for a seller, not merely internal counters. |
| Duplicate contacts | Rex documents duplicate finding, review and merging. | Design explicit identity and recovery states at import and check-in boundaries. |

Sources: [Rex CRM](https://www.rexsoftware.com/products/real-estate-crm), [Rex leads](https://support.rexsoftware.com/hc/en-us/articles/360032070533-Introduction-to-Leads-in-Rex), [Agentbox vendor management](https://www.agentbox.com.au/features-pages/vendor-management), [Rex deduplication](https://support.rexsoftware.com/hc/en-us/articles/360032911234-Record-Deduplication-Merging-Records).

These are documentation comparisons, not hands-on benchmarks. Vendor testimonials are curated marketing material and were not treated as independent usability findings. Current documentation may differ from the products available during 2024–25.

## Evidence-to-design mapping

| Problem or risk | Evidence type | Response visible in the file | Remaining question |
|---|---|---|---|
| Context is needed for a useful response. | Consumer evidence plus design synthesis. | Property tabs connect enquiries, matches, check-ins and offers; quick contact actions. | Can an agent identify the person and next action without assistance? |
| Contact records can duplicate. | Official CRM support documentation. | Check-in adds or associates people with contacts; CRM connection. | What happens if a visitor already exists or shares an email address? |
| Suitability and readiness require different information. | Consumer evidence plus task analysis. | Preferences, intent, budget, finance, timing and existing-property dependency. | Which questions can be deferred, and how do users correct outdated answers? |
| An offer requires information beyond price. | Design/task analysis, not a measured user complaint. | Staged purchaser, ownership, financial and conditions forms. | Do people understand terms and know what submission means? |
| Shared work can expose information to the wrong audience. | Design evaluation. | Private/public controls, property assignment and subagent permissions. | Is visibility understandable at every sharing action? |
| Bulk communication can become irrelevant. | Design evaluation. | Recipient selection, templates, dynamic fields and scheduling. | Can the agent identify stale fields, duplicate recipients and unwanted follow-ups? |

Source locations: UI Design.fig — Agent Mobile (0:1), Agent Web (28:2423), Buyer Mobile (540:49777), Buyer Web (540:49779), New Changes, Admin Dashboard and Landing Page. The companion product-understanding inventory provides more detail. Proposed improvements above are not described as completed features.

## Priority recommendations

**First: make consequential state explicit.** Prioritise imported-record freshness, offer status and message recipients. These are moments when an incorrect assumption can affect another person. Show the source and time of data, explain the next actor in an offer and preview who will receive a message. Failed or pending actions need a recoverable state rather than a misleading success label.

**Second: reduce information demands at the inspection.** Test a minimal check-in followed by optional profile completion. Preserve a clear benefit for answering additional questions. A short flow should still obtain the necessary permission and avoid creating duplicate contacts; speed alone is not the success criterion.

**Third: separate interest from judgement.** Matched, interested, attended and offered describe different facts. Avoid treating them as interchangeable stages in a guaranteed linear funnel. People can inspect without offering, return after months or buy a different property. Give the agent context without implying certainty.

**Fourth: communicate ownership across the team.** Property assignment and feature permissions support delegation, but the next-action owner must remain obvious. Reassignment should preserve active tasks and explain its effects. A vendor should receive the information relevant to their property without seeing unrelated buyer or agency data.

## Proposed validation study

Recruit five Australian sales agents using an existing CRM, five active or recent buyers with varied experience and three recent or active vendors. This is an initial qualitative round, not a statistically representative sample or a completed study. Include participants who use assistive technology or enlarged text where feasible; arrange additional focused accessibility sessions when the initial sample cannot cover those needs.

Use realistic but synthetic records. Ask participants to perform tasks before explaining the interface. Record task completion, assistance, misunderstandings and recovery; obtain recording consent if recording sessions. Avoid collecting real financial documents.

| Task | Main signal | Design decision it informs |
|---|---|---|
| Find a newly checked-in buyer who already exists in the CRM, then prepare a follow-up. | Correct record, relevant context, time, assistance. | Property hub, identity resolution and contact history. |
| Register for an inspection and answer the buyer profile questions. | Abandonment points, comprehension, willingness to provide each field. | Progressive information collection. |
| Submit an offer with another purchaser and a financing dependency. | Missing information, errors and correct explanation of what happens next. | Form sequencing, help and status language. |
| Review a forwarded offer as a vendor. | Correct understanding of terms, authority and next action. | Vendor visibility and decision states. |
| Schedule a message to selected attendees, with one incomplete profile. | Detection of unresolved fields and recipient mistakes. | Message preview and safeguards. |
| Recover after a CRM update fails. | Ability to recognise stale data and recover without duplicate work. | Sync feedback and recovery states. |

Establish a baseline from the existing agency workflow for comparable tasks. Compare completion and error patterns before interpreting time savings. With small samples, report observations and counts rather than a percentage suggesting population-wide impact. Re-test the revised high-risk hand-offs before extending the study to lower-priority features.

## Outcome measurement

For a pilot, instrument the journey from enquiry or attendance to an agent action, including time to first relevant follow-up, records requiring correction and incomplete-offer requests. Pair these operational measures with short buyer and vendor checks about clarity of next steps. Segment by agency and scenario; differences in lead quality, staffing and market conditions can overwhelm a simple before/after comparison.

Set targets after a baseline is available. Do not use the consumer-survey percentages as product conversion targets. Guard against optimising message volume while increasing unwanted contact, or shortening forms while increasing incomplete offers.

## Case-study editorial structure

The draft uses the previously agreed structure: problem, role and scope, evidence, design decisions, trade-offs, solution, outcome and reflection. This aligns with Nielsen Norman Group’s portfolio guidance, which asks designers to explain their contribution and reasoning as well as show the work. The exact earlier list of twenty portfolios was not re-audited in this research pass; no “world top twenty” ranking is claimed. [Rachel Krause, Nielsen Norman Group, 4 August 2019](https://www.nngroup.com/articles/ux-design-portfolios/)

## Sources and evidence boundaries

1. UI Design.fig — supplied private design source; reviewed locally. Counts include components, references and historical work. The case-study visuals are existing screen images extracted unchanged from the supplied Figma file; their locations are recorded in screen-provenance.json.
2. Real Insurance / MYMAVINS, Real Property Report 2025 — February 2025; July 2024 fieldwork. [Original report](https://www.realinsurance.com.au/documents/whitepaper-the-real-property-report-2025.pdf).
3. REA, buyer insights from the 2025 Property Seeker Report — later market evidence; p. 20 buyer base 2,051. [Original report](https://customer.realestate.com.au/wp-content/uploads/2026/03/Buyers-Property-Seeker-Report-2025.pdf).
4. Rex Software — product and support pages linked in the comparison; accessed September 2026. These establish documented functionality and failure categories, not prevalence.
5. Agentbox — vendor-management page linked above; accessed September 2026. Marketing descriptions, not independent test results.
6. Nielsen Norman Group — portfolio guidance linked above; editorial guidance, not evidence about Australian property buyers.

Launch status, live integration behaviour, adoption, client feedback and measured business outcomes have not been established. Matching is visible in the design, but its implementation is not sufficiently specified to label it AI. The strongest current case-study claims concern design scope, connected workflows and the rationale supported by this evidence.
