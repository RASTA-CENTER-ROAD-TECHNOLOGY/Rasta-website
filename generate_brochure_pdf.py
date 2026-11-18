import os
import shutil
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Image as RLImage,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

NAVY = colors.HexColor("#0F3D7A")
DARK_SLATE = colors.HexColor("#0F172A")
SLATE = colors.HexColor("#334155")
MUTED = colors.HexColor("#475569")
LIGHT_BG = colors.HexColor("#F8FAFC")
BORDER = colors.HexColor("#CBD5E1")


def safe_img(path, max_w, max_h):
    if not os.path.exists(path):
        return Spacer(max_w, max_h)
    try:
        from PIL import Image as PILImage
        with PILImage.open(path) as im:
            w, h = im.size
        ratio = min(max_w / float(w), max_h / float(h))
        return RLImage(path, width=w * ratio, height=h * ratio)
    except Exception:
        return Spacer(max_w, max_h)


def draw_page_chrome(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFillColor(NAVY)
    canvas.rect(0, h - 5 * mm, w, 5 * mm, stroke=0, fill=1)
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.75)
    canvas.line(15 * mm, 13 * mm, w - 15 * mm, 13 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(15 * mm, 8.5 * mm, "RASTA - Center for Road Technology | Peenya Industrial Area, Bengaluru - 560058")
    canvas.drawRightString(w - 15 * mm, 8.5 * mm, f"Page {doc.page}")
    canvas.restoreState()


def build_pdf():
    out_root = "RASTA_Complete_College_Brochure_2026.pdf"
    out_public = os.path.join("public", "RASTA_Complete_College_Brochure_2026.pdf")

    doc = SimpleDocTemplate(
        out_root,
        pagesize=A4,
        leftMargin=15 * mm,
        rightMargin=15 * mm,
        topMargin=12 * mm,
        bottomMargin=17 * mm,
        title="RASTA Center for Road Technology - Official College and Consultancy Brochure",
        author="RASTA - Center for Road Technology",
    )

    styles = getSampleStyleSheet()
    s_tag = ParagraphStyle(
        "Tag",
        parent=styles["Normal"],
        fontName="Courier-Bold",
        fontSize=8.5,
        textColor=NAVY,
        spaceAfter=3,
    )
    s_h1 = ParagraphStyle(
        "H1",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=26,
        textColor=DARK_SLATE,
        spaceAfter=5,
    )
    s_h2 = ParagraphStyle(
        "H2",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13.5,
        leading=17,
        textColor=NAVY,
        spaceBefore=6,
        spaceAfter=5,
    )
    s_h3 = ParagraphStyle(
        "H3",
        parent=styles["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=13,
        textColor=DARK_SLATE,
        spaceBefore=5,
        spaceAfter=3,
    )
    s_body = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=13,
        textColor=SLATE,
        spaceAfter=5,
    )
    s_small = ParagraphStyle(
        "Small",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.8,
        leading=10.5,
        textColor=SLATE,
    )
    s_cell = ParagraphStyle(
        "Cell",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8,
        leading=10.5,
        textColor=SLATE,
    )
    s_hdr = ParagraphStyle(
        "Hdr",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=10.5,
        textColor=colors.white,
    )

    def make_table(rows, col_widths, header=True):
        wrapped = []
        for r_idx, row in enumerate(rows):
            out_row = []
            for cell in row:
                if isinstance(cell, str):
                    style = s_hdr if (header and r_idx == 0) else s_cell
                    out_row.append(Paragraph(escape(cell), style))
                else:
                    out_row.append(cell)
            wrapped.append(out_row)

        t = Table(wrapped, colWidths=col_widths, repeatRows=1 if header else 0)
        ts = [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ]
        if header:
            ts += [
                ("BACKGROUND", (0, 0), (-1, 0), DARK_SLATE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT_BG]),
            ]
        t.setStyle(TableStyle(ts))
        return t

    story = []
    usable_w = A4[0] - 30 * mm

    # --- PAGE 1: COVER ---
    story.append(safe_img("public/images/rasta-logo.png", 58 * mm, 18 * mm))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("INSTITUTIONAL PROSPECTUS AND CONSULTANCY BROCHURE | 2026 EDITION", s_tag))
    story.append(Paragraph("RASTA - Center for Road Technology", s_h1))
    story.append(Paragraph(
        "<b>Better roads begin with better knowledge.</b> Total Solutions Provider in Highway Technology.",
        ParagraphStyle("Lead", parent=s_body, fontSize=11, textColor=NAVY, spaceAfter=6),
    ))
    story.append(Paragraph(
        "RASTA (Resource Centre for Asphalt and Soil Training Academy) is an independent center for road technology, infrastructure construction, and management. Established in Bengaluru in 2002 by (late) Prof. C. E. G. Justo in association with M/s Ingersoll-Rand India Ltd., RASTA operates as an initiative of the Volvo Group within the Volvo Construction Equipment Campus in Peenya.",
        s_body,
    ))
    story.append(Spacer(1, 2 * mm))
    story.append(safe_img("public/images/hero-highway.png", usable_w, 72 * mm))
    story.append(Spacer(1, 4 * mm))

    metrics_data = [
        ["20+ Years", "50+ Specialists", "3,300+ Trainees", "62 Lab & Field Tests", "112+ Projects"],
        [
            "Founded in 2002 in Bengaluru",
            "Full-time faculty and industry experts",
            "Plus ~1,000 M.Tech and 3 Ph.D. graduates",
            "NABL ISO/IEC 17025:2017 accredited",
            "Consultancy and funded R&D studies",
        ],
    ]
    story.append(make_table(metrics_data, [usable_w / 5.0] * 5, header=True))
    story.append(Spacer(1, 4 * mm))

    vm_data = [
        [Paragraph("<b>VISION</b>", s_tag), Paragraph("<b>MISSION</b>", s_tag)],
        [
            Paragraph("To be the Centre of Excellence in road and infrastructure research and practice in the country.", s_body),
            Paragraph("To be the Knowledge Centre that will help students and professionals to disseminate the latest knowledge in Road and Infrastructure Technology.", s_body),
        ],
    ]
    story.append(make_table(vm_data, [usable_w / 2.0, usable_w / 2.0], header=False))
    story.append(PageBreak())

    # --- PAGE 2: GOVERNANCE, EXPERTS & ADVISORY COUNCIL ---
    story.append(Paragraph("01 / INSTITUTIONAL GOVERNANCE AND LEADERSHIP", s_tag))
    story.append(Paragraph("Eminent Experts, Trustees, and Advisory Council", s_h2))

    advisors_data = [
        [
            safe_img("public/images/brochure/acad_p3_3_976x710.jpeg", 48 * mm, 32 * mm),
            safe_img("public/images/brochure/acad_p3_2_969x710.jpeg", 48 * mm, 32 * mm),
            safe_img("public/images/brochure/acad_p3_1_969x710.jpeg", 48 * mm, 32 * mm),
        ],
        [
            Paragraph("<b>Prof. C. E. G. Justo</b><br/>Founder &amp; First Technical Advisor (2002)<br/>Former Professor &amp; Dean, Bangalore University", s_small),
            Paragraph("<b>Prof. B. R. Srinivasamurthy</b><br/>Second Technical Advisor (2007-2017)<br/>Former Professor, IISc Bengaluru", s_small),
            Paragraph("<b>Prof. A. Veeraragavan</b><br/>Technical Advisor (2018 onwards)<br/>Former Professor, IIT Madras", s_small),
        ],
    ]
    story.append(make_table(advisors_data, [usable_w / 3.0] * 3, header=False))

    story.append(Paragraph("Board of Trustees and Management", s_h3))
    trustees = [
        ["Name", "Role", "Primary Affiliation"],
        ["Mr. Dimitrov Krishnan", "Chairperson / Trustee - RASTA", "MD & Head - Region India, Volvo Construction Equipment"],
        ["Mr. Kamal Bali", "Trustee - RASTA", "President & MD, Volvo Group India"],
        ["Mr. Dharmendra Pandey", "Trustee - RASTA", "Head of Operations & GM, Volvo Construction Equipment India"],
        ["Dr. Anil Kashyap", "Trustee - RASTA", "President & Chancellor, NICMAR University"],
        ["Mr. Ravishankar Vaidyanathan", "Managing Trustee - RASTA", "Head - Used Equipment, Volvo Construction Equipment"],
        ["Mr. B. Sridhar", "Trust Administrator", "RASTA - Center for Road Technology"],
        ["Dr. V. Ramachandra", "Professor & Director - RASTA", "Infrastructure Engineering & Management Division"],
        ["Vijay Kumar M.", "Chief Operating Officer", "RASTA - Center for Road Technology"],
    ]
    story.append(make_table(trustees, [45 * mm, 48 * mm, usable_w - 93 * mm]))

    story.append(Paragraph("RASTA Advisory Council (2024-2025)", s_h3))
    council = [
        ["Sl.", "Member", "Designation and Organization"],
        ["1", "Dr. A. Veeraragavan", "Former Professor, IIT Madras & Technical Advisor, RASTA (Chairman)"],
        ["2", "Dr. V. Ramachandra", "Professor & Director, RASTA Bengaluru (Member Secretary)"],
        ["3", "Dr. P. K. Sikdar", "Former Director, CRRI New Delhi; President at ICT Pvt Ltd"],
        ["4", "Sri R. K. Pandey", "Member - Tech (Retd), NHAI"],
        ["5", "Dr. K. P. Isaac", "Former Vice Chancellor, Kerala Technological University"],
        ["6", "Capt. R. R. Doddihal", "Former GM (Tech) and Chief Engineer"],
        ["7", "Sri Bidur Kant Jha", "Director, New Technology for Highway Development, MoRTH"],
        ["8", "Sri Mohan Ramanathan", "MD, M/s Advanced Construction Technologies (P) Ltd, Chennai"],
        ["9", "Dr. Manamohan R. Kalgal", "Former President, ICI"],
        ["10", "Sri Venkata Chunduru", "Director, Arcadis"],
        ["11", "Dr. Vijay Gopal Kovvali", "Research Professor, CISTUP"],
        ["12", "Sri Vijay Kumar", "CEO, Infrastructure Equipment Skill Council (IESC)"],
        ["13", "Mr. Sadashivam", "Joint GM & Head of EDRC Designs, L&T Construction, Chennai"],
        ["14", "Dr. Samson Mathews", "Director, NATPAC"],
        ["15", "Dr. G. L. Sivakumar Babu", "Professor, Dept. of Civil Engineering, IISc Bengaluru"],
        ["16", "Mr. Rathnakar Reddy", "MD, Infra Support Engineering Consultants Pvt. Ltd."],
    ]
    story.append(make_table(council, [10 * mm, 45 * mm, usable_w - 55 * mm]))
    story.append(PageBreak())

    # --- PAGE 3: ACADEMICS, TRAINING & R&D ---
    story.append(Paragraph("02 / ACADEMICS, TRAINING, AND RESEARCH", s_tag))
    story.append(Paragraph("VTU Postgraduate Programs, Training Calendar, and Sponsored R&amp;D", s_h2))
    story.append(Paragraph(
        "RASTA is an approved extension and research center of Visvesvaraya Technological University (VTU), Belgaum, and is approved by AICTE, New Delhi. The library holds over 1,000 reference volumes, 2,000 books, 800 IRC and BIS codes, National Digital Library access, HDM4, Matlab, and AutoCAD.",
        s_body,
    ))

    courses = [
        ["Program", "Duration & Affiliation", "Core Focus"],
        ["M.Tech in Highway Technology", "2 Years | VTU & AICTE", "Pavement design, traffic engineering, AI, and highway asset management"],
        ["M.Tech in Infrastructure Engineering and Management", "2 Years | VTU & AICTE", "Project management, risk analysis, smart cities, and sustainable delivery"],
        ["P.G. Diploma in Highway Technology", "1 Year | Postgraduate", "Material characterization, construction QA/QC, and field testing"],
        ["P.G. Certificate Course in Road Technology", "6 Months | Intensive", "Practical asphalt and concrete construction and laboratory execution"],
        ["Ph.D. and M.Sc. (Engg.)", "Research Center | VTU", "Applied doctoral research in transportation and pavement engineering"],
    ]
    story.append(make_table(courses, [54 * mm, 38 * mm, usable_w - 92 * mm]))

    story.append(Paragraph("Training Topics (3,300+ Engineers Trained; 1 to 15 Days) and 2025-26 Calendar", s_h3))
    story.append(Paragraph(
        "Topics: Road materials; Soil engineering and ground improvement; Pavement evaluation and design; Economic evaluation; Construction and maintenance; Plants and equipment; Construction planning and management; Project Management; Contract Management; Road Safety and Audit; Quality Assurance; Pavement failures and remedial measures; Concrete roads; Advancements in Road Technology.",
        s_small,
    ))
    story.append(Spacer(1, 2 * mm))
    calendar = [
        ["Sl.", "Training Program (2025-2026)", "Duration", "Schedule"],
        ["1", "Finishing School", "3 months", "October"],
        ["2", "Technical Enrichment Program", "15 days", "October"],
        ["3", "Internship Program", "3 months", "October"],
        ["4", "GIS Training", "2 days", "October 8-9"],
        ["5", "AI Driven Sustainable Highway Construction", "3 months", "November"],
        ["6", "Data Analytics for Core Engineering", "40 hrs (7 weeks)", "November"],
        ["7", "AI and its application in civil engineering for senior engineers", "2 days", "October 15-16"],
        ["8", "Bituminous Concrete mix design - challenges and solutions", "2 days", "October"],
    ]
    story.append(make_table(calendar, [10 * mm, 98 * mm, 36 * mm, usable_w - 144 * mm]))

    story.append(Paragraph("Funded Research Projects and Strategic MOUs", s_h3))
    rnd = [
        ["Project Title", "Sponsor", "Value (Rs.)"],
        ["Performance Evaluation of Plastic Cell Filled (PCCBP) and RCC Pavements in Karnataka", "NRIDA, New Delhi", "26.43 Lakhs"],
        ["Performance Evaluation of Roads Constructed Using Jute Geo-Textiles", "NRIDA, New Delhi", "26.14 Lakhs"],
        ["Lab and Field Investigation of Rural Roads Stabilised with RBI Grade-81", "NRIDA, New Delhi", "26.14 Lakhs"],
        ["Crack Sealing Treatment with GlasGrid on Devihalli Hassan Road", "Saint Gobain / L&T IDPL", "23.04 Lakhs"],
        ["Performance Evaluation of Cement Concrete Rural Roads under PMGSY", "NRIDA, New Delhi", "22.64 Lakhs"],
        ["Performance Assessment of Waste Plastic Roads in Karnataka under PMGSY", "NRIDA, New Delhi", "20.50 Lakhs"],
        ["Performance Evaluation of PMGSY Roads Using Terrazyme", "NRIDA, New Delhi", "16.90 Lakhs"],
        ["Use of High-Volume Fly Ash Cement in Pavement Layers", "ACC Limited / NRIDA", "12.00 Lakhs"],
        ["Test Track Expansion Design Project, Hoskote", "Volvo Group", "4.30 Lakhs"],
        ["Characterization of Demolished Brick Masonry Waste", "KSCST", "0.05 Lakhs"],
    ]
    story.append(make_table(rnd, [102 * mm, 46 * mm, usable_w - 148 * mm]))
    story.append(Spacer(1, 2 * mm))
    story.append(Paragraph(
        "<b>Active MOUs:</b> Bentley Systems India (Centre of Excellence for Digital Infrastructure Innovation Hub), NITTTR Kolkata, NRIDA (Govt. of India), UltraTech Cement Ltd., Infra Support Engineering Consultants, Smart Infra Innovations, Street Matrix, and Streets Consultants.",
        s_small,
    ))
    story.append(PageBreak())

    # --- PAGE 4: CONSULTANCY & NABL TESTING FACILITIES ---
    story.append(Paragraph("03 / CONSULTANCY SERVICES AND NABL ISO/IEC 17025:2017 LABORATORIES", s_tag))
    story.append(Paragraph("7 Consultancy Domains and 62 Standardized Laboratory and Field Tests", s_h2))
    story.append(Paragraph(
        "RASTA serves as the State Technical Agency (STA) for PMGSY in Karnataka and Technical Partner to PAC for World Bank Citizen Monitoring across 7 states. Faculty sit on IRC and BIS technical panels.",
        s_body,
    ))

    lab_photos = [
        [
            safe_img("public/images/brochure/cons_p5_1_349x219.jpeg", 40 * mm, 26 * mm),
            safe_img("public/images/brochure/cons_p5_6_228x144.jpeg", 40 * mm, 26 * mm),
            safe_img("public/images/brochure/cons_p5_7_348x219.jpeg", 40 * mm, 26 * mm),
            safe_img("public/images/brochure/cons_p5_4_348x219.jpeg", 40 * mm, 26 * mm),
        ],
        [
            Paragraph("Soil & Aggregate Lab", s_small),
            Paragraph("Bitumen Lab", s_small),
            Paragraph("3000 kN Compression Lab", s_small),
            Paragraph("Mobile Testing Lab", s_small),
        ],
    ]
    story.append(make_table(lab_photos, [usable_w / 4.0] * 4, header=False))
    story.append(Spacer(1, 2 * mm))

    tests_table = [
        ["Category", "Tests Available at RASTA (Conforming to BIS, IRC, and MoRT&H)"],
        ["Soil (11)", "Wet & Dry Sieve Analysis, CBR Test, Atterberg Limits, Free Swell Index, Light & Heavy Compaction, Moisture Content, Specific Gravity, Direct Shear Test, Triaxial Test, Hydrometer Analysis, Permeability Test."],
        ["Aggregates (9)", "Gradation, Impact Value, Crushing Value, Shape Test (Flakiness & Elongation Index), Los Angeles Abrasion, Specific Gravity, Water Absorption, Polished Stone Value, Bulk Density."],
        ["Cement (6)", "Normal Consistency, Initial & Final Setting Time, Fineness by Blaine's Air Permeability, Compressive Strength, Soundness, Density by Lechatelier's Apparatus."],
        ["Concrete (8)", "Compressive Strength, Split Tensile Strength, Flexural Strength, Workability (Slump, Vee Bee Consistometer, Compaction Factor), Permeability, Flow Table Test."],
        ["Bitumen (8)", "Ductility, Penetration, Softening Point, Thin Film Oven Test, Flash & Fire Point, Viscosity (Brookfield / Saybolt), Specific Gravity, Residue by Evaporation of Emulsion."],
        ["Bituminous Mixes (6)", "Marshall Stability, Rutting, Skid Resistance, Fatigue Test, Indirect Tensile Strength, Bitumen Extraction."],
        ["Field Tests (14)", "Falling Weight Deflectometer (FWD), Benkelman Beam Test, Plate Load Test, Ultrasonic Pulse Velocity, Rebound Hammer, Roughness (Bump Integrator & MERLIN), Skid Resistance (BPN), Field Density (Sand Replacement & Core Cutter), Pavement Gradation, Rapid Moisture Meter, Bitumen Extraction, Camber, Micro & Macro Texture, Dynamic Cone Penetration Test."],
    ]
    story.append(make_table(tests_table, [35 * mm, usable_w - 35 * mm]))
    story.append(Spacer(1, 2 * mm))

    domains = [
        ["Consultancy Domain", "Key Deliverables"],
        ["1. Road Construction & QC", "Project Management Consultancy (PMC), Third Party Inspection, QA/QC, Construction Quality Management"],
        ["2. Pavement Design", "Life cycle cost designs, Geometric Design, Facilities Design, Runways and Taxiways, Flexible/Composite/Rigid Overlays"],
        ["3. Traffic Engineering", "Classified Volume Count (Metro Count/Videographic), Spot Speed, Speed & Delay, O&D Survey, Blackspot Studies, Junctions"],
        ["4. Road Asset Management", "Technical Audit, Failure Investigation, Rehabilitation Design, BOQ & Cost Estimation, Road Safety Audit"],
        ["5. Material Testing (NABL)", "Soil, Aggregates, Bitumen, Cement, Concrete, Steel, Emulsion, NDT, Concrete & Bituminous Mix Designs"],
        ["6. Field Investigations", "FWD, Benkelman Beam, MERLIN, Bump Integrator, British Pendulum, Core Extraction, Go-PRO Condition Surveys"],
        ["7. Detailed Project Report", "Reconnaissance, Soil & Engineering Surveys, Traffic Forecast, Pavement Design, Rate Analysis, Drawings & DPR"],
    ]
    story.append(make_table(domains, [44 * mm, usable_w - 44 * mm]))
    story.append(PageBreak())

    # --- PAGE 5: ONGOING PROJECTS, CLIENTS & CONTACT ---
    story.append(Paragraph("04 / ONGOING PROJECTS, CLIENTS, AND CONTACT DIRECTORY", s_tag))
    story.append(Paragraph("Selected Consultancy Portfolio and Institutional Contact Details", s_h2))

    ongoing = [
        ["Sl.", "Client", "Ongoing Consultancy Assignment"],
        ["1", "BREN Sports City Pvt Ltd.", "Quality Control and Assurance of Racetrack and other roads at Doddaballapura"],
        ["2", "SHDP", "Project Management Consultancy at Hassan District"],
        ["3", "Bengaluru Traffic Police", "Improvement of 16 critical junctions in Bengaluru City"],
        ["4", "KIADB", "Project Management Consultancy at Bhavanahalli, Nandur, Chamarajanagar Industrial Areas"],
        ["5", "APMC", "Project Management Consultancy at Bengaluru Urban & Rural (Zone I), Kolar, Chikkaballapur & Ramanagara"],
        ["6", "Agratha Mega Food Park Pvt. Ltd.", "Project Management Consultancy, Nelamangala"],
        ["7", "KRIDL", "Third Party Inspection at Ramanagar, Kolar & Bangalore"],
    ]
    story.append(make_table(ongoing, [10 * mm, 48 * mm, usable_w - 58 * mm]))
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph(
        "<b>Completed Portfolio (87+ Projects):</b> Includes KIADB Industrial Areas across Karnataka, BMRCL Service Roads and DPRs, Toyota Kirloskar Motors Bidadi (D22 CBU Yard, P-1 Road, Sub-track), Airports (Hisar, Vijayapur, Shivamogga, Koppal), Volvo CSR Junctions, Intel Bellandur, NH-4/NH-7/NH-4A/NH-48/NH-214 studies, BBMP Benkelman Beam studies, MGNREGA, and KSHIP.",
        s_body,
    ))
    story.append(Paragraph(
        "<b>Esteemed Clients:</b> NHAI, SHDP, Volvo India, BREN Sports City, Larsen &amp; Toubro (L&amp;T), Bangalore International Airport Ltd. (BIAL), UltraTech Cements, GMR Group, Saint Gobain, PWD Karnataka, Toyota Motors, Intel Engineering, Bengaluru Traffic Police, KIADB, BMRCL (Namma Metro), BBMP, KRIDL, KRRDA, KRDCL, RDPR Govt. of Karnataka, EI Technologies, Skanska Cementation, CES, Feedback Ventures, NRIDA, MGNREGA, Bengaluru Smart City, and KSHIP.",
        s_body,
    ))

    contact_tbl = [
        ["Department / Function", "Official Contact", "Phone / Email"],
        ["Campus Address", "RASTA - Center for Road Technology", "VOLVO Construction Equipment Campus, # 7 & 8, Phase 1, Peenya Industrial Area, Bengaluru - 560058"],
        ["Landline & Website", "Central Office", "080 22192500 / 699 / 705 / 706 / 642 | www.rastacentre.co.in"],
        ["Trust Administration", "Mr. B. Sridhar", "+91 98450 36377 | group.rasta@rastaindia.com"],
        ["Consultancy & Testing", "Dr. K. M. Mallesha", "+91 99009 23722 | kmm@rastaindia.com"],
        ["Academics, Training & R&D", "Dr. G. Kavitha", "+91 97313 39914 | gkavitha@rastaindia.com"],
        ["Accounts & Admissions", "Mrs. Jayanthi Manoj / Mrs. Laxmi C. Naik", "+91 99166 82206 / +91 96063 26161"],
    ]
    story.append(make_table(contact_tbl, [42 * mm, 48 * mm, usable_w - 90 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "<b>Copyright Disclaimer:</b> Copyright 2026 RASTA - Center for Road Technology, managed by an Independent Trust of Volvo India Pvt. Ltd. Academic programs follow VTU and AICTE regulations. Laboratory testing conforms to NABL ISO/IEC 17025:2017 scope.",
        s_small,
    ))

    doc.build(story, onFirstPage=draw_page_chrome, onLaterPages=draw_page_chrome)
    os.makedirs("public", exist_ok=True)
    shutil.copyfile(out_root, out_public)
    print("Regenerated clean wrapped PDF:", out_root)


if __name__ == "__main__":
    build_pdf()
