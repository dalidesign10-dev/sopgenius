export interface TemplateFAQ {
  q: string;
  a: string;
}

export interface Template {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  industry: string;
  department: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  whoIsItFor: string[];
  whatToInclude: string[];
  exampleSteps: string[];
  whyUseAI: string;
  relatedSlugs: string[];
  faq: TemplateFAQ[];
}

export const TEMPLATES: Template[] = [
  {
    slug: "instrument-sterilization-sop-template",
    title: "Instrument Sterilization Protocol SOP Template",
    metaTitle:
      "Instrument Sterilization Protocol SOP Template — Free AI SOP Generator | DentiSOP",
    metaDescription:
      "Create a CDC-aligned instrument sterilization SOP for your dental practice. Cover autoclave validation, biological indicators, packaging, and sterilization logs.",
    industry: "Clinical Operations",
    department: "Sterilization / Infection Control",
    icon: "ShieldAlert",
    shortDescription:
      "Ensure every reusable dental instrument is properly cleaned, packaged, sterilized, and documented following CDC and OSAP guidelines.",
    longDescription: `Instrument sterilization is the backbone of infection control in any dental practice. A single lapse in the reprocessing workflow can expose patients and staff to bloodborne pathogens, trigger regulatory citations, and devastate your practice's reputation. This SOP template walks your sterilization technicians through every step — from point-of-use pre-treatment at chairside through ultrasonic cleaning, inspection, packaging, autoclave loading, and sterile storage — so nothing is left to memory or guesswork.

The template incorporates current CDC Guidelines for Infection Control in Dental Health-Care Settings and OSAP best practices. It specifies when to run biological indicators (spore tests), how to interpret chemical indicator results, what to document in the sterilization log, and the corrective actions required when a cycle fails. These details matter during state board inspections and OSHA audits, where incomplete records are the most frequently cited deficiency.

Whether you run a single-operatory general practice or a multi-location group, having a written sterilization protocol protects patients, satisfies regulatory requirements, and gives your team confidence that every instrument in every cassette is safe. Use this template as your starting point, then let DentiSOP tailor it to your specific autoclaves, instrument inventory, and practice workflow.`,
    whoIsItFor: [
      "Dental office managers establishing or updating sterilization workflows",
      "Sterilization technicians who need a clear step-by-step reprocessing procedure",
      "Practice owners preparing for state board or OSHA inspections",
      "Multi-location dental groups standardizing sterilization across offices",
    ],
    whatToInclude: [
      "Point-of-use pre-treatment and instrument transport",
      "Ultrasonic cleaning and manual scrubbing procedures",
      "Instrument inspection, packaging, and cassette assembly",
      "Autoclave loading parameters and cycle selection",
      "Biological indicator (spore test) schedule and interpretation",
      "Chemical indicator verification at every cycle",
      "Sterilization log documentation and record retention",
      "Failed cycle corrective action and instrument recall procedure",
    ],
    exampleSteps: [
      "At chairside, place contaminated instruments in a pre-soak solution or enzyme spray immediately after use to prevent bioburden from drying, then transport them to the sterilization area in a puncture-resistant covered container.",
      "Run instruments through the ultrasonic cleaner for the manufacturer-recommended cycle time, then rinse under tap water, visually inspect each instrument under magnification for residual debris, and re-clean any instrument that does not pass inspection.",
      "Dry instruments thoroughly, assemble them into cassettes or pouches with an internal Type 5 chemical integrator, and seal packaging using a heat sealer or self-seal strips with the date, cycle number, and technician initials on the label.",
      "Load the autoclave without overcrowding, place a biological indicator (spore test) in the most challenging location per manufacturer instructions, select the appropriate cycle (e.g., 270 degrees F / 132 degrees C wrapped cycle at 4 minutes for a prevacuum autoclave), and start the run.",
      "After the cycle completes, verify the external chemical indicator on each package changed color, check the printout or digital log for time, temperature, and pressure parameters, and move packages to the designated sterile storage area without touching the sterile field.",
      "Incubate the biological indicator per manufacturer instructions, record the pass/fail result in the sterilization log, and if a spore test fails, immediately quarantine all items processed since the last passing test, notify the lead clinician, and initiate the recall and re-sterilization procedure.",
    ],
    whyUseAI:
      "Every dental practice has a different mix of autoclaves, instrument types, and staffing models. DentiSOP generates a sterilization SOP customized to your specific equipment — including exact cycle parameters for your autoclave model, the biological indicator brand you stock, and the cassette system you use. Instead of adapting a generic CDC checklist, you get a procedure your sterilization tech can follow from the first instrument to the last log entry, complete with corrective action steps and documentation templates.",
    relatedSlugs: [
      "infection-control-ppe-sop-template",
      "operatory-turnover-sop-template",
    ],
    faq: [
      {
        q: "How often should we run biological indicator (spore) tests?",
        a: "The CDC recommends at least weekly spore testing for every sterilizer used in a dental setting. Many state dental boards require it and some mandate more frequent testing. Best practice is to run a spore test with every implantable-device load and to document results in a dedicated sterilization log.",
      },
      {
        q: "What should we do if a spore test comes back positive?",
        a: "Immediately remove the sterilizer from service. Quarantine all instruments processed since the last negative spore test. Re-run the spore test after verifying loading procedures and cycle parameters. Do not return the sterilizer to service until you have a confirmed negative result. Document the failure, corrective actions, and retest results in the sterilization log.",
      },
      {
        q: "Can we use chemical indicators instead of biological indicators?",
        a: "No. Chemical indicators verify that instruments were exposed to sterilization conditions, but only biological indicators (spore tests) confirm that the sterilizer actually killed resistant organisms. You need both: a chemical integrator in every package and biological monitoring on a regular schedule.",
      },
      {
        q: "How long should we keep sterilization records?",
        a: "Retention requirements vary by state, but most dental regulatory bodies recommend keeping sterilization logs for a minimum of three years. Some states require longer retention. Check your state dental board regulations and err on the side of keeping records longer. DentiSOP can configure the retention schedule for your specific state.",
      },
    ],
  },
  {
    slug: "osha-exposure-control-plan-sop-template",
    title: "OSHA Exposure Control Plan SOP Template",
    metaTitle:
      "OSHA Exposure Control Plan SOP Template — Free AI SOP Generator | DentiSOP",
    metaDescription:
      "Build an OSHA-referenced exposure control plan for your dental office. Cover bloodborne pathogens, exposure incidents, PPE, hepatitis B vaccination, and sharps disposal.",
    industry: "Compliance & Safety",
    department: "Safety / Compliance",
    icon: "ShieldAlert",
    shortDescription:
      "Meet OSHA Bloodborne Pathogens Standard requirements with a documented exposure control plan covering PPE, sharps safety, vaccinations, and incident response.",
    longDescription: `OSHA's Bloodborne Pathogens Standard (29 CFR 1910.1030) requires every dental practice to maintain a written Exposure Control Plan, and the penalties for non-compliance can reach tens of thousands of dollars per violation. This SOP template provides a complete, ready-to-customize framework that addresses every element OSHA inspectors look for — exposure determination by job classification, engineering and work practice controls, PPE requirements, hepatitis B vaccination program, post-exposure evaluation procedures, and annual training documentation.

The most common citation dental offices receive is failing to update the Exposure Control Plan annually or lacking documentation of employee training. This template builds update triggers and training checklists directly into the procedure so annual reviews do not slip through the cracks. It also includes the specific forms and logs OSHA expects to see: sharps injury logs, exposure incident reports, hepatitis B declination forms, and training attendance records.

Whether you have three team members or thirty, OSHA compliance is not optional. This template scales from solo practitioners to multi-provider group practices and covers dental-specific hazards — needle sticks, bur lacerations, aerosol exposure, and contact with saliva and blood. Let DentiSOP adapt it to your practice's specific job classifications, PPE inventory, and state-level OSHA requirements.`,
    whoIsItFor: [
      "Practice owners responsible for OSHA compliance",
      "Office managers tasked with maintaining the written Exposure Control Plan",
      "Safety officers conducting annual bloodborne pathogen training",
      "Dental group compliance directors standardizing policies across locations",
    ],
    whatToInclude: [
      "Exposure determination by job classification and task",
      "Engineering controls: sharps containers, safety devices, needle recapping prohibition",
      "Work practice controls: hand hygiene, specimen handling, laundry procedures",
      "PPE selection, provision, and replacement policy",
      "Hepatitis B vaccination program and declination documentation",
      "Post-exposure incident evaluation and follow-up protocol",
      "Annual training requirements and attendance documentation",
      "Sharps injury log and recordkeeping schedule",
    ],
    exampleSteps: [
      "List every job classification in the practice (dentist, hygienist, dental assistant, sterilization technician, front office staff) and identify which tasks involve reasonably anticipated exposure to blood or other potentially infectious materials (OPIM).",
      "Ensure sharps containers are placed within arm's reach of every point of use, verify that self-sheathing needles or other engineered sharps injury prevention devices are available, and post signage prohibiting two-handed needle recapping.",
      "Provide appropriately sized gloves, masks, protective eyewear, and gowns to all employees with occupational exposure at no cost; replace PPE immediately when contaminated, damaged, or when barrier integrity is compromised.",
      "Offer the hepatitis B vaccination series to every employee with occupational exposure within 10 working days of initial assignment; collect a signed declination form from any employee who declines and retain it in the employee's confidential medical record.",
      "When an exposure incident occurs, immediately flush the wound or mucous membrane, document the incident on the Exposure Incident Report form, refer the employee to the designated healthcare professional within 24 hours, and initiate source-patient testing with consent.",
      "Conduct annual bloodborne pathogen training for all employees with occupational exposure, covering the Exposure Control Plan, routes of transmission, PPE use, and post-exposure procedures; document attendance with signed rosters and retain records for three years beyond the employee's tenure.",
    ],
    whyUseAI:
      "OSHA compliance documents are notoriously tedious to write and easy to get wrong. DentiSOP generates an Exposure Control Plan pre-populated with your practice's job classifications, the specific engineered sharps devices you use, your PPE brands and sizes, and the name of your designated healthcare professional for post-exposure evaluation. It keeps the regulatory language accurate while making the procedure readable enough for your team to actually follow — and it reminds you of the annual review and training deadlines so you stay ahead of inspectors.",
    relatedSlugs: [
      "infection-control-ppe-sop-template",
      "instrument-sterilization-sop-template",
    ],
    faq: [
      {
        q: "How often must the Exposure Control Plan be updated?",
        a: "OSHA requires an annual review and update of the Exposure Control Plan. The review must reflect changes in tasks, procedures, job classifications, and available safer medical devices. Document the review date and any changes made even if no substantive changes were necessary.",
      },
      {
        q: "What happens if an employee declines the hepatitis B vaccine?",
        a: "The employee must sign the specific OSHA-mandated declination statement. Retain the signed form in the employee's confidential medical record. The employee may later request the vaccination at the employer's expense at any time during employment.",
      },
      {
        q: "Do front office staff need to be included in the Exposure Control Plan?",
        a: "Only if their duties involve reasonably anticipated exposure to blood or OPIM. If front office staff handle patient charts, insurance cards, or phones but never contact instruments, blood, or clinical waste, they may be excluded. Document the rationale for any exclusion in the exposure determination section.",
      },
      {
        q: "What records must we retain and for how long?",
        a: "Retain employee medical records (vaccination status, exposure incidents) for the duration of employment plus 30 years. Retain training records for three years from the training date. Maintain the sharps injury log for at least five years. Keep all records accessible to employees and to OSHA upon request.",
      },
    ],
  },
  {
    slug: "hipaa-patient-records-sop-template",
    title: "HIPAA Patient Records Management SOP Template",
    metaTitle:
      "HIPAA Patient Records Management SOP Template — Free AI SOP Generator | DentiSOP",
    metaDescription:
      "Create a HIPAA-referenced patient records SOP for your dental practice. Cover PHI handling, access controls, breach notification, record retention, and patient rights.",
    industry: "Compliance & Safety",
    department: "Administration / Privacy",
    icon: "ClipboardCheck",
    shortDescription:
      "Protect patient health information with documented procedures for access controls, breach response, record retention, and HIPAA rights requests.",
    longDescription: `HIPAA violations in dental practices most often stem not from hackers but from everyday process gaps — an unlocked computer screen, a misfiled chart, a text message containing patient details, or a team member accessing records without a legitimate purpose. This SOP template addresses the Privacy Rule and Security Rule requirements that apply to dental offices, translating federal regulations into practical, daily procedures your team can follow without a law degree.

The template covers the full lifecycle of protected health information (PHI): how patient data enters the practice (intake forms, referrals, digital imaging), who is authorized to access which systems, how records are stored and transmitted, when and how records are disposed of, and what to do if a breach occurs. It also documents the administrative safeguards HIPAA requires — workforce training, Business Associate Agreements, risk assessments, and sanction policies — in a format that satisfies auditors.

Dental practices of every size are covered entities under HIPAA, yet many lack the written policies that the law demands. This template closes that gap. DentiSOP can customize it for your practice management software, imaging system, cloud storage provider, and state privacy laws that may impose requirements beyond the federal baseline.`,
    whoIsItFor: [
      "Practice owners serving as the designated HIPAA Privacy Officer",
      "Office managers responsible for staff training on PHI handling",
      "Compliance consultants helping dental clients meet HIPAA requirements",
      "Multi-location dental organizations standardizing privacy policies",
    ],
    whatToInclude: [
      "PHI identification and minimum necessary standard",
      "Role-based access controls for practice management and imaging systems",
      "Workstation security and automatic log-off policies",
      "Encryption requirements for electronic PHI at rest and in transit",
      "Breach identification, risk assessment, and notification procedures",
      "Patient rights: access requests, amendment requests, accounting of disclosures",
      "Record retention schedule and secure destruction procedures",
      "Business Associate Agreement tracking and workforce training schedule",
    ],
    exampleSteps: [
      "Designate a HIPAA Privacy Officer and Security Officer (may be the same person in a small practice), document their names and responsibilities in the policy manual, and post the Notice of Privacy Practices in the reception area and on the practice website.",
      "Configure role-based access in the practice management system so that front desk staff can view scheduling and demographics, clinical staff can access treatment records and imaging, and billing staff can access financial and insurance data — with no role having broader access than required for their job function.",
      "Enable automatic screen lock after two minutes of inactivity on all workstations, require unique user credentials for every team member (no shared logins), and enable audit logging so that every access to a patient record is tracked by user, date, and time.",
      "Encrypt all electronic PHI at rest (full-disk encryption on workstations and servers) and in transit (TLS for email containing PHI, encrypted patient portal messaging); prohibit the transmission of PHI via standard SMS or unencrypted personal email.",
      "When a potential breach is identified, the Privacy Officer conducts a four-factor risk assessment within 24 hours to determine whether notification is required, documents the assessment, and if the breach is reportable, notifies affected individuals within 60 days and submits the report to HHS as required.",
      "Conduct annual HIPAA training for all workforce members, including temporary staff and volunteers, covering PHI handling, breach reporting, patient rights, and social engineering awareness; document attendance and retain training records for six years.",
    ],
    whyUseAI:
      "HIPAA policies are dense, and most dental-specific templates are either too vague to satisfy auditors or too complex for a small office to implement. DentiSOP generates a records management SOP calibrated to your practice size, software systems, and state-specific requirements. It produces the exact policy language auditors expect while keeping daily procedures clear enough for every team member to follow — and it can generate the supporting documents you need, including the Notice of Privacy Practices, Business Associate Agreement checklist, and breach risk assessment worksheet.",
    relatedSlugs: [
      "new-patient-intake-sop-template",
      "osha-exposure-control-plan-sop-template",
    ],
    faq: [
      {
        q: "Does a small dental practice really need a written HIPAA policy?",
        a: "Yes. HIPAA applies to all covered entities regardless of size. The Privacy Rule and Security Rule both require documented policies and procedures. A small practice may have simpler policies, but they must be written, implemented, and available for review during an audit or complaint investigation.",
      },
      {
        q: "How long must we retain patient dental records?",
        a: "HIPAA requires that policy documentation be retained for six years, but patient record retention is governed by state law, which varies widely — commonly seven to ten years from the last date of treatment, or until the patient reaches the age of majority plus a specified period for minors. Check your state dental practice act for the exact requirement.",
      },
      {
        q: "Do we need to encrypt emails with patients?",
        a: "If the email contains protected health information, HIPAA requires reasonable safeguards. Encryption is the most straightforward safeguard. If a patient requests unencrypted email communication, document their request and inform them of the risk. Use a HIPAA-referenced patient portal for routine clinical communications.",
      },
      {
        q: "What counts as a reportable breach?",
        a: "An impermissible acquisition, access, use, or disclosure of PHI that compromises its security or privacy. Perform a four-factor risk assessment (nature of PHI, who accessed it, whether it was actually acquired or viewed, and extent of mitigation) to determine whether notification is required. When in doubt, consult your HIPAA counsel.",
      },
    ],
  },
  {
    slug: "operatory-turnover-sop-template",
    title: "Operatory Turnover & Disinfection SOP Template",
    metaTitle:
      "Operatory Turnover & Disinfection SOP Template — Free AI SOP Generator | DentiSOP",
    metaDescription:
      "Standardize dental operatory turnover with a step-by-step disinfection SOP. Cover room teardown, surface disinfection, barrier replacement, and patient-ready verification.",
    industry: "Clinical Operations",
    department: "Clinical / Hygiene",
    icon: "ClipboardCheck",
    shortDescription:
      "Turn over operatories quickly and safely with a repeatable procedure for teardown, disinfection, barrier replacement, and patient-ready checks.",
    longDescription: `Operatory turnover is the most frequently repeated procedure in a dental office — and the one most likely to be shortcut when the schedule is running behind. A missed surface, a forgotten barrier, or a skipped waterline flush can mean a cross-contamination event that puts patients at risk and exposes the practice to liability. This SOP template breaks the turnover process into a sequenced checklist that any trained team member can complete consistently in a defined time window.

The template follows CDC surface disinfection categories, distinguishing between clinical contact surfaces (light handles, bracket trays, chair controls) that require barrier protection or disinfection between patients and housekeeping surfaces (floors, walls) that require less frequent attention. It specifies the EPA-registered disinfectant contact time for your product, the correct barrier materials for each surface, and the dental unit waterline flushing protocol that reduces biofilm risk.

Efficient turnover keeps your schedule on time, and thorough turnover keeps your patients safe. This template helps you achieve both. DentiSOP can customize it for your specific operatory layout, disinfectant brand, barrier system, and waterline treatment protocol.`,
    whoIsItFor: [
      "Dental assistants responsible for operatory setup and teardown",
      "Office managers creating standardized turnover checklists",
      "Infection control coordinators auditing clinical compliance",
      "Practice owners reducing turnover time without sacrificing safety",
    ],
    whatToInclude: [
      "Used instrument and sharps removal procedure",
      "Clinical contact surface identification and disinfection protocol",
      "EPA-registered disinfectant selection and contact time requirements",
      "Barrier removal and replacement checklist by surface",
      "Dental unit waterline flushing before and between patients",
      "Equipment preparation: handpieces, air/water syringe tips, suction lines",
      "Patient-ready verification walkthrough",
      "Turnover time tracking for schedule optimization",
    ],
    exampleSteps: [
      "Don utility gloves and remove all used instruments, sharps, and single-use items from the operatory; transport contaminated instruments to the sterilization area in a puncture-resistant container and dispose of sharps and waste in designated receptacles.",
      "Remove all surface barriers (headrest covers, light handle sleeves, bracket tray covers, hose sleeves, chair control covers) and discard them without contacting the underlying surface; if any contamination is visible beneath a barrier, clean and disinfect that surface before placing a new barrier.",
      "Spray or wipe all clinical contact surfaces — including the light handle, bracket tray, chair arms, countertops, drawer pulls, and curing light — with the EPA-registered intermediate-level disinfectant and allow the full manufacturer-specified contact time (typically 1 to 3 minutes) before wiping dry.",
      "Flush the dental unit waterlines, air/water syringe, and high-speed handpiece lines for a minimum of 20 to 30 seconds between patients per CDC recommendations to reduce biofilm accumulation; replace disposable air/water syringe tips and high-volume evacuator tips.",
      "Place fresh barriers on all designated surfaces, set out a new patient care kit (bib, cup, saliva ejector, tray cover), load the instrument cassette for the next scheduled procedure, and verify that all handpieces and the curing light are functional.",
      "Perform a final walkthrough using the patient-ready checklist: confirm that the chair is in the entry position, the light is off, surfaces are dry and barrier-covered, the monitor displays the next patient's name, and there are no visible signs of the previous patient's visit.",
    ],
    whyUseAI:
      "Operatory layouts, disinfectant products, and barrier systems vary from practice to practice. DentiSOP generates a turnover SOP customized to your operatory floor plan, the exact disinfectant you use (with its specific contact time), and the barrier products in your inventory. It also calculates a realistic target turnover time based on your operatory count and appointment schedule so your front desk and clinical teams are aligned on timing.",
    relatedSlugs: [
      "instrument-sterilization-sop-template",
      "infection-control-ppe-sop-template",
    ],
    faq: [
      {
        q: "How long should operatory turnover take?",
        a: "A thorough turnover typically takes 7 to 15 minutes depending on the procedure completed and the operatory layout. The key constraint is disinfectant contact time — you cannot rush the wet-contact period. Schedule buffer time between patients that accounts for both disinfection and setup.",
      },
      {
        q: "Do we need to flush waterlines between every patient?",
        a: "Yes. The CDC recommends flushing dental unit waterlines for 20 to 30 seconds between patients to discharge water that may have been stagnant in the tubing. Additionally, flush all lines for at least two minutes at the start of each day. Follow your waterline treatment system manufacturer's additional instructions.",
      },
      {
        q: "Can we use the same disinfectant for all surfaces?",
        a: "Use an EPA-registered hospital-grade intermediate-level disinfectant for clinical contact surfaces. Housekeeping surfaces (floors, walls, sinks) can be cleaned with a low-level disinfectant or detergent. Always follow the manufacturer's instructions for dilution, contact time, and surface compatibility.",
      },
      {
        q: "What surfaces require barriers versus disinfection?",
        a: "Barriers are recommended for surfaces that are difficult to clean (textured or irregular surfaces), frequently touched during procedures, and at high risk for contamination. Common barrier-covered surfaces include light handles, chair controls, and bracket trays. Smooth, easily cleaned surfaces like countertops are typically disinfected rather than barrier-covered.",
      },
    ],
  },
  {
    slug: "dental-emergency-response-sop-template",
    title: "Dental Emergency Response SOP Template",
    metaTitle:
      "Dental Emergency Response SOP Template — Free AI SOP Generator | DentiSOP",
    metaDescription:
      "Prepare your dental team for medical emergencies with a structured SOP covering syncope, anaphylaxis, cardiac arrest, emergency kit management, and staff roles.",
    industry: "Clinical Operations",
    department: "Clinical / Emergency",
    icon: "Heart",
    shortDescription:
      "Prepare your dental team for medical emergencies with defined protocols for syncope, anaphylaxis, cardiac arrest, emergency kit checks, and staff drills.",
    longDescription: `Medical emergencies in the dental office are rare — but when they happen, every second of hesitation costs. The most dangerous moment is not the emergency itself; it is the three to five seconds when everyone in the room looks at each other wondering who does what. This SOP template eliminates that pause by assigning specific roles (team leader, airway manager, medications/AED operator, recorder, and 911 caller) and defining step-by-step protocols for the emergencies most likely to occur in a dental setting: vasovagal syncope, allergic reactions and anaphylaxis, respiratory distress, hypoglycemia, seizures, angina, and cardiac arrest.

The template also covers the operational side that keeps your emergency response functional: emergency drug kit contents and quantities, oxygen delivery equipment, AED placement and maintenance, expiration date tracking, and the quarterly drill schedule that ensures your team can execute the protocols under stress. Most state dental boards require that practices maintain emergency drugs and equipment; this SOP documents what you have, where it is, and who checks it.

Whether you are a solo general practitioner or a large oral surgery group administering conscious sedation, having a written, rehearsed emergency plan is both a clinical necessity and a legal safeguard. DentiSOP can tailor the protocols to your sedation level, team size, drug inventory, and proximity to the nearest hospital.`,
    whoIsItFor: [
      "Dentists responsible for patient safety during clinical procedures",
      "Office managers coordinating emergency preparedness and drills",
      "Dental assistants assigned as emergency team members",
      "Practices that administer sedation and need enhanced emergency protocols",
    ],
    whatToInclude: [
      "Emergency team role assignments: team leader, airway, medications/AED, recorder, 911 caller",
      "Protocol flowcharts for syncope, anaphylaxis, cardiac arrest, respiratory distress, hypoglycemia, and seizures",
      "Emergency drug kit contents, dosages, and administration routes",
      "Oxygen delivery equipment and airway management supplies",
      "AED placement, maintenance schedule, and operation procedure",
      "Emergency kit expiration date tracking and replenishment process",
      "Quarterly emergency drill schedule and debriefing documentation",
      "Post-event documentation and incident reporting requirements",
    ],
    exampleSteps: [
      "At the first sign of a medical emergency, the treating dentist assumes the team leader role, stops the dental procedure, positions the patient appropriately (supine for syncope or cardiac event, upright for respiratory distress), and directs team members to their assigned roles.",
      "The designated 911 caller contacts emergency medical services immediately for any event beyond simple syncope, provides the practice address and suite number, describes the patient's condition, and stations a staff member at the building entrance to direct paramedics to the operatory.",
      "The medications/AED operator retrieves the emergency kit and AED from the designated location (which must be reachable within 60 seconds), opens the kit, and prepares medications as directed by the team leader — for example, administering 0.3 mg epinephrine intramuscularly for suspected anaphylaxis.",
      "The airway manager administers supplemental oxygen via nasal cannula or non-rebreather mask as appropriate, assists with airway positioning (head-tilt/chin-lift or jaw thrust), and stands ready to provide bag-valve-mask ventilation if the patient becomes apneic.",
      "The recorder documents the timeline of events, vital signs taken at regular intervals, medications administered with dosages and times, and the patient's response; this record accompanies the patient to the hospital and a copy is placed in the patient chart.",
      "After the event, the team leader conducts an immediate debriefing within 24 hours, completes the incident report form, replenishes any emergency supplies used, and schedules a team review to discuss what went well and what should be improved.",
    ],
    whyUseAI:
      "Emergency protocols must be specific to your team, equipment, and clinical environment — a generic poster on the wall is not enough. DentiSOP generates emergency response procedures that name your actual team members in each role, list the exact drugs and dosages in your emergency kit, reference your AED model's operating steps, and account for your practice's distance from the nearest emergency department. The result is a ready-to-drill protocol, not a document that collects dust in a binder.",
    relatedSlugs: [
      "infection-control-ppe-sop-template",
      "osha-exposure-control-plan-sop-template",
    ],
    faq: [
      {
        q: "What emergencies are most common in a dental office?",
        a: "Vasovagal syncope (fainting) is by far the most common medical emergency in dental settings, followed by mild allergic reactions, orthostatic hypotension, and hypoglycemia. True life-threatening emergencies like anaphylaxis and cardiac arrest are rare but require immediate, rehearsed responses. Your SOP should cover the full spectrum from common to critical.",
      },
      {
        q: "What drugs should be in a dental office emergency kit?",
        a: "At minimum, maintain epinephrine (1:1,000 for intramuscular injection), diphenhydramine, nitroglycerin, albuterol inhaler, aspirin, oral glucose or sugar source, and supplemental oxygen. Practices providing sedation need additional drugs. Check your state dental board requirements as mandatory kit contents vary by jurisdiction and sedation permit level.",
      },
      {
        q: "How often should we conduct emergency drills?",
        a: "Conduct team emergency drills at least quarterly, rotating through different scenarios each session. Practices that administer sedation should drill more frequently. Document each drill including the scenario, response time, team performance, and areas for improvement. Drills build the muscle memory that makes real emergencies survivable.",
      },
      {
        q: "Is an AED required in a dental office?",
        a: "Requirements vary by state, but the ADA and most dental safety experts strongly recommend that every dental office have a functioning AED regardless of legal mandate. Ensure the AED is accessible within 60 seconds from any operatory, conduct monthly status checks, and verify that pads and batteries are not expired.",
      },
    ],
  },
  {
    slug: "infection-control-ppe-sop-template",
    title: "Infection Control & PPE SOP Template",
    metaTitle:
      "Infection Control & PPE SOP Template — Free AI SOP Generator | DentiSOP",
    metaDescription:
      "Establish comprehensive infection control and PPE procedures for your dental office. Cover hand hygiene, PPE donning/doffing, aerosol management, and waste segregation.",
    industry: "Clinical Operations",
    department: "Infection Control",
    icon: "ShieldAlert",
    shortDescription:
      "Establish standard precautions for hand hygiene, PPE donning and doffing, aerosol management, surface barriers, laundry, and waste segregation.",
    longDescription: `Infection control in dentistry extends far beyond gloves and masks. It is a system of layered precautions — hand hygiene, personal protective equipment, engineering controls, aerosol management, environmental surface management, and waste handling — that together reduce the risk of disease transmission between patients and between patients and staff. This SOP template documents the complete infection control program your dental practice needs, organized into daily procedures that every clinical team member follows.

The template is built on the CDC's Standard Precautions framework and incorporates guidance from the Organization for Safety, Asepsis and Prevention (OSAP). It specifies when to perform hand hygiene (not just "wash your hands" but the five specific moments defined by the WHO), which PPE to wear for which procedure category, the correct sequence for donning and doffing to avoid self-contamination, and how to manage aerosol-generating procedures that present unique risks in dental settings.

This is the master infection control document that ties together your sterilization protocol, operatory turnover procedure, and OSHA Exposure Control Plan into a cohesive program. DentiSOP can customize it for your practice's clinical procedures, PPE brands, aerosol mitigation equipment (high-volume evacuation, extraoral suction), and laundry and waste disposal vendors.`,
    whoIsItFor: [
      "Infection control coordinators responsible for the practice's IC program",
      "Clinical team members who need clear PPE and hygiene procedures",
      "Practice owners establishing a documented infection control manual",
      "Dental hygienists managing aerosol-generating procedure protocols",
    ],
    whatToInclude: [
      "Hand hygiene procedure and the five moments for hand hygiene",
      "PPE selection by procedure type: gloves, masks, eyewear, gowns",
      "Donning and doffing sequence to prevent self-contamination",
      "Aerosol-generating procedure precautions and mitigation equipment",
      "Surface barrier protocols and environmental surface management",
      "Regulated medical waste segregation and disposal procedures",
      "Laundry handling for reusable gowns and cloth barriers",
      "Infection control training schedule and competency verification",
    ],
    exampleSteps: [
      "Perform hand hygiene using alcohol-based hand rub (minimum 60% alcohol) or antimicrobial soap and water for at least 20 seconds at each of the five required moments: before patient contact, before aseptic procedures, after body fluid exposure risk, after patient contact, and after contact with patient surroundings.",
      "Select PPE appropriate to the procedure: for non-aerosol procedures, wear examination gloves, a surgical mask, and protective eyewear; for aerosol-generating procedures (ultrasonic scaling, high-speed handpiece use, air polishing), add an ASTM Level 3 mask or N95 respirator and a face shield or full-coverage eyewear.",
      "Don PPE in the correct sequence — gown first, then mask (ensure a snug fit over nose and under chin), then eyewear or face shield, then gloves with cuffs over gown sleeves — before entering the operatory or contacting the patient.",
      "During aerosol-generating procedures, use high-volume evacuation (HVE) positioned close to the working area, activate extraoral suction if available, and use a pre-procedural antimicrobial mouth rinse to reduce the microbial load in patient-generated aerosols.",
      "Doff PPE in the reverse sequence to minimize self-contamination: remove gloves first (using the glove-in-glove technique), then gown, then eyewear, then mask (handling only by ear loops or ties); perform hand hygiene immediately after removing all PPE.",
      "Segregate regulated medical waste (items saturated or dripping with blood, pathological waste, sharps) into designated red biohazard bags or sharps containers; place non-regulated clinical waste in standard trash; and arrange pickup by the licensed medical waste transporter on the established schedule.",
    ],
    whyUseAI:
      "Infection control programs involve dozens of interconnected procedures, and a gap in one area can undermine the entire system. DentiSOP generates a comprehensive IC manual that connects your hand hygiene, PPE, sterilization, surface disinfection, and waste management procedures into a single coherent document. It accounts for the specific aerosol-generating procedures your practice performs, the PPE products you stock, and your waste hauler's requirements — producing a practice-ready manual instead of a generic guideline summary.",
    relatedSlugs: [
      "instrument-sterilization-sop-template",
      "operatory-turnover-sop-template",
    ],
    faq: [
      {
        q: "When should dental staff use an N95 respirator instead of a surgical mask?",
        a: "N95 respirators are recommended when treating patients with known or suspected airborne infectious diseases (such as active tuberculosis) and may be advisable during aerosol-generating procedures on patients with respiratory infections. Standard surgical masks are appropriate for routine dental procedures. Follow current CDC and OSHA guidance, which may change during outbreaks.",
      },
      {
        q: "How should we handle PPE shortages?",
        a: "Develop a contingency plan that prioritizes PPE for the highest-risk procedures and personnel. Strategies include extended use of respirators (wearing the same respirator for multiple patients without removing it), switching to reusable gowns and face shields that can be disinfected, and maintaining a minimum 30-day supply buffer. Never reuse single-use gloves or compromise on hand hygiene.",
      },
      {
        q: "What is the correct way to dispose of regulated medical waste?",
        a: "Place items saturated or dripping with blood and all sharps into designated red biohazard containers. Non-saturated items (lightly soiled gauze, gloves) are typically non-regulated and go in standard trash — but check your state regulations, as definitions vary. Arrange removal by a licensed medical waste transporter and retain manifests for the required retention period.",
      },
      {
        q: "How often should infection control training be conducted?",
        a: "Conduct formal infection control training at initial hire and at least annually thereafter. OSHA's Bloodborne Pathogens Standard mandates annual training for all employees with occupational exposure. Supplement formal training with brief monthly huddle topics to reinforce key procedures like hand hygiene technique and PPE donning/doffing sequence.",
      },
    ],
  },
  {
    slug: "new-patient-intake-sop-template",
    title: "New Patient Intake & Insurance Verification SOP Template",
    metaTitle:
      "New Patient Intake & Insurance Verification SOP Template — Free AI SOP Generator | DentiSOP",
    metaDescription:
      "Streamline new dental patient intake with an SOP covering registration forms, insurance verification, treatment plan presentation, consent, and HIPAA notices.",
    industry: "Front Office",
    department: "Reception / Scheduling",
    icon: "UserPlus",
    shortDescription:
      "Streamline new patient registration, insurance eligibility verification, consent collection, HIPAA notice distribution, and appointment scheduling.",
    longDescription: `The new patient experience starts before the patient sits in the chair — it starts with the first phone call or online form submission. A disorganized intake process leads to missing information, insurance claim denials, treatment delays, and patients who feel like they fell through the cracks before treatment even begins. This SOP template standardizes every step from initial contact through the patient's first appointment, ensuring that registration, insurance verification, consent, and scheduling happen in the right order with nothing overlooked.

The template addresses the specific challenges dental front offices face: verifying dental insurance benefits that are structured differently from medical plans (annual maximums, frequency limitations, waiting periods, missing tooth clauses), collecting the right consent forms for dental procedures, presenting treatment plans with accurate patient cost estimates, and distributing the HIPAA Notice of Privacy Practices with documented acknowledgment. Each step includes who is responsible, when it should happen relative to the appointment date, and what to do if information is missing or insurance verification reveals a coverage issue.

Whether you use Dentrix, Eaglesoft, Open Dental, or another practice management system, the workflow structure is the same. DentiSOP can customize this template for your specific software, the insurance plans you see most frequently, the consent forms your state requires, and your practice's new-patient appointment structure.`,
    whoIsItFor: [
      "Front desk coordinators managing new patient registration and scheduling",
      "Insurance coordinators responsible for eligibility verification and benefits breakdown",
      "Office managers standardizing the intake workflow across front office staff",
      "Practice owners reducing claim denials caused by intake errors",
    ],
    whatToInclude: [
      "New patient registration form collection (demographic, medical/dental history, consent)",
      "Insurance card imaging and plan eligibility verification procedure",
      "Benefits breakdown: annual maximum, deductible, coverage percentages, frequency limitations, waiting periods",
      "Treatment plan financial presentation and patient cost estimate",
      "Informed consent forms for planned procedures",
      "HIPAA Notice of Privacy Practices distribution and signed acknowledgment",
      "Appointment scheduling and new patient confirmation workflow",
      "Incomplete intake follow-up and missing information tracking",
    ],
    exampleSteps: [
      "When a new patient contacts the practice, collect the patient's full name, date of birth, phone number, email address, and insurance information; enter the demographic data into the practice management system and mail or email the new patient registration packet (or direct them to the online portal) with instructions to complete and return forms at least 48 hours before the appointment.",
      "Upon receiving the completed registration forms, verify that all required fields are filled — including medical history, current medications, allergies, dental history, and emergency contact — and flag any incomplete sections for follow-up by phone before the appointment.",
      "Scan the front and back of the patient's insurance card, enter the subscriber and group information into the practice management system, and submit an electronic eligibility verification to confirm active coverage, annual maximum remaining, deductible status, coverage percentages by procedure category, and any waiting periods or frequency limitations.",
      "Prepare a benefits breakdown summary for the clinical team and patient, noting any procedures that may require pre-authorization, missing tooth clause implications, or frequency limitations that affect the timing of treatment (such as prophylaxis limited to two per benefit year).",
      "On the day of the appointment, greet the patient, confirm identity and demographic information, collect any remaining forms, obtain the signed HIPAA Notice of Privacy Practices acknowledgment, scan a photo ID and insurance card if not already on file, and collect any patient-responsible copayment or deductible amount before seating.",
      "After the initial examination, the treatment coordinator presents the treatment plan with a clear cost estimate showing insurance-covered amounts and patient responsibility, obtains informed consent signatures for planned procedures, and schedules the next appointment before the patient leaves the office.",
    ],
    whyUseAI:
      "Dental intake workflows involve dozens of small steps that are easy to overlook but expensive to fix after the fact — a missed insurance verification leads to a denied claim, a forgotten consent form delays treatment. DentiSOP generates an intake SOP matched to your practice management software, the insurance plans you accept, and your state's specific consent requirements. It builds in the verification checkpoints and follow-up triggers that prevent the most common front office errors, and it formats the procedure so new hires can learn it quickly.",
    relatedSlugs: [
      "hipaa-patient-records-sop-template",
      "dental-lab-case-communication-sop-template",
    ],
    faq: [
      {
        q: "How far in advance should we verify insurance for a new patient?",
        a: "Verify insurance eligibility at least two to three business days before the scheduled appointment. This gives you time to resolve coverage issues, contact the patient about unexpected benefit limitations, and collect accurate cost estimates before the visit. Re-verify on the day of the appointment if more than a week has passed since the initial check.",
      },
      {
        q: "What consent forms are required for dental treatment?",
        a: "At minimum, obtain a general consent to treat and specific informed consent for each planned procedure that carries material risk (extractions, surgery, sedation, implants). Many states have additional requirements for specific procedures. Always include HIPAA Notice of Privacy Practices acknowledgment. Consult your state dental practice act and your malpractice carrier's recommendations.",
      },
      {
        q: "How do we handle patients without dental insurance?",
        a: "Create a separate intake workflow for uninsured patients that includes presenting your in-house membership plan or discount fee schedule, collecting a financial agreement, and offering payment plan options. The registration and consent steps remain the same — only the insurance verification and benefits breakdown steps are replaced with the self-pay financial discussion.",
      },
      {
        q: "Should we send new patient forms digitally or on paper?",
        a: "Digital forms (via your patient portal or a secure online form platform) reduce data entry errors, save front desk time, and arrive before the appointment. However, keep paper forms available for patients who prefer them or lack computer access. Whichever method you use, the SOP should specify a deadline for form completion and a follow-up process for incomplete submissions.",
      },
    ],
  },
  {
    slug: "dental-lab-case-communication-sop-template",
    title: "Dental Lab Case Communication SOP Template",
    metaTitle:
      "Dental Lab Case Communication SOP Template — Free AI SOP Generator | DentiSOP",
    metaDescription:
      "Standardize dental lab case communication with an SOP for lab prescriptions, shade matching, case tracking, quality checks, and remake management.",
    industry: "Front Office",
    department: "Lab Coordination",
    icon: "Package",
    shortDescription:
      "Standardize lab prescription forms, shade documentation, case tracking, shipment logging, quality checks on returned work, and remake procedures.",
    longDescription: `Miscommunication between the dental office and the laboratory is one of the most costly and frustrating problems in restorative dentistry. A shade that does not match, a margin that does not fit, or a case that arrives the day after the patient's scheduled seat appointment disrupts the schedule, wastes chair time, and erodes patient confidence. This SOP template creates a structured communication workflow between your practice and your dental labs — from the moment an impression or digital scan is taken through final delivery and quality verification.

The template covers the full lab case lifecycle: completing the lab prescription form with all required clinical information, documenting shade selection with standardized references and photographs, packaging and shipping (or digitally transmitting) the case, tracking turnaround times, inspecting returned work before the patient arrives, and managing remakes when the work does not meet specifications. It also addresses the administrative side — purchase order tracking, invoice reconciliation, and lab performance metrics that help you evaluate whether your lab partners are meeting quality and turnaround expectations.

Whether you work with a single local lab or multiple specialty labs across the country, having a documented communication process reduces errors, remakes, and scheduling disruptions. DentiSOP can customize this template for your case mix (crowns, bridges, implant restorations, removable prosthetics, orthodontic appliances), your digital workflow (intraoral scanner, CAD/CAM, or conventional impressions), and the specific labs you partner with.`,
    whoIsItFor: [
      "Lab coordinators managing case submissions and tracking for the practice",
      "Dental assistants responsible for shade documentation and case packaging",
      "Office managers monitoring lab turnaround times and costs",
      "Dentists who want consistent quality and communication with lab partners",
    ],
    whatToInclude: [
      "Lab prescription form completion requirements and clinical details checklist",
      "Shade selection and documentation protocol (shade guide, photographs, custom staining notes)",
      "Case packaging, labeling, and shipping or digital submission procedure",
      "Case tracking log with expected return dates and status updates",
      "Incoming case inspection and quality verification checklist",
      "Remake and adjustment request procedure with documentation",
      "Lab invoice reconciliation and cost tracking",
      "Lab performance review metrics (turnaround time, remake rate, accuracy)",
    ],
    exampleSteps: [
      "Immediately after the clinical preparation appointment, complete the lab prescription form with all required fields: patient name, tooth numbers, restoration type, material selection, shade (using Vita Classical or 3D-Master designation with a corresponding intraoral photograph showing the shade tab held adjacent to the prepared tooth), margin type, occlusal scheme, and any special instructions.",
      "Package the case — either export the digital scan file through the lab portal with the digital prescription attached, or disinfect the conventional impression per manufacturer instructions, wrap it in a damp paper towel and sealed bag, and place it in the lab shipping container with the physical prescription and any bite registration or opposing model.",
      "Log the case in the lab tracking system (spreadsheet or practice management software) with the patient name, tooth number, lab name, date sent, expected return date based on the lab's quoted turnaround time, and the scheduled patient seat appointment date — ensuring the seat appointment is at least two business days after the expected return date.",
      "When the case is returned, the lab coordinator logs the receipt date in the tracking system, and the evaluating clinician inspects the restoration against the prescription: verify shade match (compare to the original shade photo), check marginal fit on the die or model, confirm contacts, occlusion, and contour, and document the pass/fail result.",
      "If the case does not pass inspection, document the specific discrepancy on the remake request form (shade mismatch, open margin, incorrect contour, etc.), photograph the issue, contact the lab to discuss, and return the case with the documentation; reschedule the patient appointment and update the tracking log with the new expected return date.",
      "At the end of each month, review the lab tracking log to calculate each lab's average turnaround time, remake rate, and on-time delivery percentage; discuss any concerns with the lab representative and retain the performance data for quarterly lab partner reviews.",
    ],
    whyUseAI:
      "Lab communication involves clinical, logistical, and administrative details that are easy to overlook under time pressure. DentiSOP generates a lab case SOP matched to your specific restorative workflow — whether you use conventional impressions or digital scans, which labs you partner with and their submission requirements, and how your practice management system tracks cases. It builds in the quality checkpoints that catch errors before the patient is in the chair and the documentation steps that support remake requests when the lab work does not meet specifications.",
    relatedSlugs: [
      "new-patient-intake-sop-template",
      "operatory-turnover-sop-template",
    ],
    faq: [
      {
        q: "What information must be included on a dental lab prescription?",
        a: "At minimum: patient name, tooth numbers, restoration type, material, shade designation, margin design, and the prescribing dentist's signature and license number. Include occlusal scheme, any custom staining or characterization requests, implant platform and abutment specifications for implant cases, and photos. The more detail you provide, the fewer remakes you will encounter.",
      },
      {
        q: "How should we document shade selection to reduce remakes?",
        a: "Use a standardized shade guide (Vita Classical or Vita 3D-Master) and record the specific tab designation. Photograph the selected shade tab held next to the prepared tooth under consistent lighting (no overhead fluorescent, ideally color-corrected or natural light). Note any custom characterization. Send both the shade designation and photo to the lab with every case.",
      },
      {
        q: "What is an acceptable remake rate for a dental lab?",
        a: "Industry benchmarks suggest a remake rate below 2 to 3 percent is acceptable for a quality lab. Track your remake rate by lab, by restoration type, and by reason for remake. If a lab's remake rate exceeds 5 percent, schedule a meeting to discuss quality concerns and consider trialing an alternative lab for a portion of your cases.",
      },
      {
        q: "How far in advance of the seat appointment should we receive lab work?",
        a: "Aim to receive completed lab work at least two business days before the patient's scheduled appointment. This buffer allows time for inspection and, if necessary, communication with the lab about adjustments before the patient arrives. Build this buffer into your scheduling protocol by confirming lab turnaround times when the case is submitted.",
      },
    ],
  },
  {
    slug: "dental-assistant-onboarding-sop-template",
    title: "Dental Assistant Onboarding SOP Template",
    metaTitle:
      "Dental Assistant Onboarding SOP Template — Free AI SOP Generator | DentiSOP",
    metaDescription:
      "Create a comprehensive dental assistant onboarding SOP. Cover clinical training, sterilization protocols, patient communication, and compliance requirements.",
    industry: "HR & Training",
    department: "Human Resources / Training",
    icon: "UserPlus",
    shortDescription:
      "Standardize how your practice trains and onboards new dental assistants with a clear, step-by-step procedure covering clinical skills, compliance, and office protocols.",
    longDescription: `Dental assistant turnover is among the highest in healthcare, and every departure takes institutional knowledge with it. When a new assistant starts, practices often rely on whoever happens to be available that day to show them around, leading to inconsistent training that varies depending on who is teaching. One assistant learns sterilization one way, another learns a different sequence, and neither receives structured exposure to the compliance requirements that regulators expect every team member to understand. The result is longer ramp-up times, preventable clinical errors, and a frustrating experience that drives new hires out the door before they reach full productivity.

Regulatory requirements make standardized onboarding even more critical. OSHA mandates that every employee with occupational exposure to bloodborne pathogens receive training before they begin tasks that involve contact with blood or other potentially infectious materials — not after their first week, not when the office manager has time, but before exposure begins. HIPAA requires workforce training on privacy policies and procedures. State dental boards may impose additional requirements for radiology certification, coronal polishing permits, or expanded function credentials. A documented onboarding SOP ensures these compliance training milestones happen on schedule and are properly recorded.

A structured onboarding program that follows a written SOP reduces time-to-competency from months to weeks. New dental assistants know exactly what they need to learn, in what order, and by when. Trainers follow the same checklist regardless of which senior assistant or office manager is conducting the orientation. Evaluation checkpoints at defined intervals catch skill gaps early, before they become patient safety issues. The practice protects itself from compliance gaps, and the new hire gains confidence from a clear path to independence — reducing the turnover that triggered the hiring cycle in the first place.`,
    whoIsItFor: [
      "Office managers responsible for hiring and training new clinical staff",
      "Lead dental assistants who mentor and train incoming team members",
      "HR coordinators at multi-location dental groups standardizing onboarding across offices",
      "Practice owners seeking to reduce turnover by improving the new-hire experience",
    ],
    whatToInclude: [
      "First-day orientation checklist covering office tour, introductions, IT setup, uniform and badge, and employee handbook review",
      "Clinical skills training schedule with hands-on competencies for chairside assisting, suctioning, instrument transfer, and radiograph exposure",
      "Sterilization and instrument reprocessing training with demonstrated competency sign-off",
      "HIPAA privacy and security training with documented acknowledgment and OSHA Bloodborne Pathogens Standard training before occupational exposure begins",
      "Patient communication and front-office cross-training covering phone etiquette, appointment confirmation, and patient greeting protocols",
      "Scheduled evaluation checkpoints at Day 3, Week 1, Week 2, and Day 30 with written competency assessments and feedback sessions",
    ],
    exampleSteps: [
      "Day 1 — Orientation: Conduct an office tour covering operatories, sterilization area, lab, supply storage, break room, and emergency exits. Introduce the new assistant to every team member by name and role. Issue uniform, ID badge, keys, and login credentials for the practice management system. Review the employee handbook, complete HIPAA privacy training with signed acknowledgment, and complete OSHA Bloodborne Pathogens training before any clinical exposure.",
      "Days 2–3 — Sterilization and Infection Control: Train the new assistant on the full instrument reprocessing workflow: point-of-use pre-treatment, ultrasonic cleaning, inspection, packaging, autoclave operation, biological indicator handling, and sterilization log documentation. Have them process three full instrument cycles under direct supervision and verify competency before allowing independent operation.",
      "Days 3–5 — Chairside Assisting Fundamentals: Shadow an experienced assistant during patient procedures to observe instrument transfer, suctioning technique, material mixing, and four-handed dentistry workflow. Gradually transition from observation to hands-on participation with the senior assistant providing real-time coaching.",
      "Week 1 — Radiograph Training: Train on the practice's radiograph equipment including sensor placement, exposure settings, infection control for digital sensors, and image evaluation. Verify that the assistant holds any state-required radiology certification or permit before allowing independent radiograph exposure.",
      "Week 2 — Patient Communication and Administrative Cross-Training: Train on patient greeting protocols, appointment confirmation calls, chairside patient communication during procedures, and post-operative instruction delivery. Introduce basic front-office tasks including patient check-in and check-out workflows so the assistant can support the front desk during peak times.",
      "Day 14 and Day 30 — Formal Evaluation Checkpoints: Conduct a structured competency assessment covering clinical skills, sterilization protocol compliance, radiograph technique, patient communication, and OSHA/HIPAA knowledge. Provide written feedback, document areas meeting expectations and areas needing improvement, and set goals for the next evaluation period.",
    ],
    whyUseAI:
      "Every dental practice has a unique mix of procedures, equipment, software, and state-specific requirements that make generic onboarding checklists inadequate. DentiSOP generates a customized onboarding SOP based on your practice's specific workflow — the autoclave model your sterilization tech uses, the practice management system your front desk runs, the radiograph equipment in your operatories, and the expanded functions your state permits dental assistants to perform. The result is a ready-to-use onboarding plan that your office manager can hand to every new hire on Day 1, not a template that requires weeks of adaptation.",
    relatedSlugs: [
      "infection-control-ppe-sop-template",
      "instrument-sterilization-sop-template",
      "hipaa-patient-records-sop-template",
      "osha-exposure-control-plan-sop-template",
    ],
    faq: [
      {
        q: "How long should a dental assistant onboarding program last?",
        a: "A structured onboarding program should cover at least the first 30 days with formal evaluation checkpoints, but full competency development typically takes 60 to 90 days depending on the assistant's prior experience. The first two weeks focus on foundational skills, compliance training, and supervised clinical work. Days 15 through 30 transition to increasing independence with periodic check-ins. After 30 days, conduct a comprehensive review to determine whether the assistant is ready for full independent work or needs additional training in specific areas.",
      },
      {
        q: "What compliance training must be completed before a new dental assistant starts clinical work?",
        a: "At minimum, OSHA requires Bloodborne Pathogens Standard training before the employee performs any task with occupational exposure to blood or other potentially infectious materials. HIPAA privacy and security training should also be completed on Day 1. Depending on your state, additional requirements may include radiology safety certification, infection control coursework, and CPR/BLS certification. Document all training with dates, topics covered, and signed acknowledgments.",
      },
      {
        q: "How do we evaluate whether a new dental assistant is progressing on schedule?",
        a: "Build formal evaluation checkpoints into the onboarding SOP at Day 3, Week 1, Week 2, and Day 30. Use a written competency checklist that covers each skill area: sterilization, chairside assisting, radiographs, patient communication, and compliance knowledge. Have the training supervisor and the new assistant both sign the evaluation. If gaps are identified, create a targeted remediation plan with a follow-up assessment date rather than waiting for problems to surface during patient care.",
      },
    ],
  },
];

export function getTemplateBySlug(slug: string): Template | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}

export function getTemplatesByIndustry(): Record<string, Template[]> {
  return TEMPLATES.reduce(
    (acc, template) => {
      if (!acc[template.industry]) {
        acc[template.industry] = [];
      }
      acc[template.industry].push(template);
      return acc;
    },
    {} as Record<string, Template[]>,
  );
}
