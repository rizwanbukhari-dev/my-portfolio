import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Canvas that enforces strict single-page validation."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)
        if num_pages > 1:
            print(f"ERROR: Budget exceeded: {num_pages} pages were generated.")
        else:
            print("CONFIRMED: Exactly 1 page budget achieved perfectly.")


def build_resume(primary_path, all_paths):
    styles = getSampleStyleSheet()

    # Premium Corporate Palette: Clean Charcoal & Classic Navy Accent
    color_charcoal = colors.HexColor("#0f172a")  # Slate 900 for name & bold item titles
    color_navy = colors.HexColor("#1e3a8a")      # Corporate Navy 900 for section headings & accent line
    color_link = colors.HexColor("#1d4ed8")      # Blue 700 for accessible hyperlink contrast
    color_body = colors.HexColor("#1e293b")      # Slate 800 for high-contrast, crystal-clear body text
    color_muted = colors.HexColor("#475569")     # Slate 600 for metadata & institutional locations
    color_divider = colors.HexColor("#1e3a8a")   # Corporate Navy accent rule

    # Typography Hierarchy
    name_style = ParagraphStyle(
        "DocName",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=23,
        textColor=color_charcoal,
        alignment=1  # Centered
    )

    headline_style = ParagraphStyle(
        "DocHeadline",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=13,
        textColor=color_navy,
        alignment=1
    )

    contact_style = ParagraphStyle(
        "DocContact",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.6,
        leading=12,
        textColor=color_muted,
        alignment=1
    )

    section_heading_style = ParagraphStyle(
        "DocSectionHeading",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10.2,
        leading=13,
        textColor=color_navy,
        textTransform="uppercase"
    )

    summary_style = ParagraphStyle(
        "DocSummary",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.7,
        leading=12.5,
        textColor=color_body
    )

    item_left_title = ParagraphStyle(
        "ItemLeftTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.4,
        leading=12.5,
        textColor=color_charcoal
    )

    item_right_meta = ParagraphStyle(
        "ItemRightMeta",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.6,
        leading=12,
        textColor=color_muted,
        alignment=2
    )

    item_subline = ParagraphStyle(
        "ItemSubline",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11.8,
        textColor=color_muted
    )

    tech_line_style = ParagraphStyle(
        "TechLine",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11.8,
        textColor=color_charcoal
    )

    bullet_style = ParagraphStyle(
        "DocBullet",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=color_body,
        leftIndent=11,
        firstLineIndent=-11
    )

    skill_category_style = ParagraphStyle(
        "SkillCategory",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.6,
        leading=12.2,
        textColor=color_charcoal
    )

    skill_list_style = ParagraphStyle(
        "SkillList",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.6,
        leading=12.2,
        textColor=color_body
    )

    story = []

    # 1. Header (Centered, Clean, ATS-friendly)
    story.append(Paragraph("SYED RIZWAN BUKHARI", name_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Computer Engineering Diploma Student | Aspiring Software Developer", headline_style))
    story.append(Spacer(1, 4))

    contact_line_1 = (
        "Budgam, Jammu and Kashmir, India &nbsp;&bull;&nbsp; "
        "Phone: +91 6005320065 &nbsp;&bull;&nbsp; "
        "Email: <a href='mailto:syedrizwanbukhari18@gmail.com'><font color='#1d4ed8'>syedrizwanbukhari18@gmail.com</font></a>"
    )
    contact_line_2 = (
        "Portfolio: <a href='https://rizwan-bukhari-1.vercel.app/'><font color='#1d4ed8'>rizwan-bukhari-1.vercel.app</font></a> &nbsp;&bull;&nbsp; "
        "GitHub: <a href='https://github.com/rizwanbukhari-dev'><font color='#1d4ed8'>github.com/rizwanbukhari-dev</font></a>"
    )
    story.append(Paragraph(contact_line_1, contact_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph(contact_line_2, contact_style))
    story.append(Spacer(1, 8))

    def add_section_header(title):
        story.append(Paragraph(title, section_heading_style))
        story.append(Spacer(1, 2))
        story.append(HRFlowable(width="100%", thickness=0.75, color=color_divider, spaceBefore=0, spaceAfter=5))

    # 2. Professional Summary
    add_section_header("Professional Summary")
    story.append(Paragraph(
        "Computer Engineering diploma student currently in the 5th semester at Government Polytechnic College Ganderbal, "
        "actively developing practical software engineering foundations. Experienced in building responsive, client-side web "
        "utilities and interactive applications using JavaScript, React, and Python, complemented by disciplined daily workflows "
        "in Linux environments and procedural problem-solving.",
        summary_style
    ))
    story.append(Spacer(1, 8))

    # 3. Education
    add_section_header("Education")

    # Diploma
    edu1_table = Table([
        [
            Paragraph("<b>Diploma in Computer Engineering (Three-Year Program)</b>", item_left_title),
            Paragraph("<i>Currently in 5th Semester</i>", item_right_meta)
        ]
    ], colWidths=[375, 165])
    edu1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1)
    ]))
    story.append(edu1_table)
    story.append(Paragraph("Government Polytechnic College Ganderbal &nbsp;&bull;&nbsp; Ganderbal, Jammu and Kashmir", item_subline))
    story.append(Spacer(1, 5))

    # 10th
    edu2_table = Table([
        [
            Paragraph("<b>Secondary Schooling (Class 10th)</b>", item_left_title),
            Paragraph("<i>Completed</i>", item_right_meta)
        ]
    ], colWidths=[375, 165])
    edu2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1)
    ]))
    story.append(edu2_table)
    story.append(Paragraph("HS Chewdara &nbsp;&bull;&nbsp; Jammu and Kashmir", item_subline))
    story.append(Spacer(1, 8))

    # 4. Technical Projects
    add_section_header("Projects")

    # PDFKit
    proj1_table = Table([
        [
            Paragraph("<b>PDFKit</b> &mdash; Web-Based PDF Utility Application", item_left_title),
            Paragraph(
                "<a href='https://pdfkit-1.vercel.app/'><font color='#1d4ed8'>Live Demo</font></a> &nbsp;&bull;&nbsp; "
                "<a href='https://github.com/rizwanbukhari-dev/pdfkit.1'><font color='#1d4ed8'>GitHub Repository</font></a>",
                item_right_meta
            )
        ]
    ], colWidths=[330, 210])
    proj1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1)
    ]))
    story.append(proj1_table)
    story.append(Paragraph("<b>Technologies:</b> JavaScript (ES6+), PDF-lib, HTML5, CSS3, Vercel", tech_line_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "&bull;&nbsp; Engineered a client-side document utility enabling users to merge multi-file PDFs, extract pages, compress documents, and convert images to PDF format directly in the browser.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull;&nbsp; Implemented all document transformations in browser memory using PDF-lib, ensuring complete user privacy with zero file uploads to external servers.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull;&nbsp; Designed a responsive, accessible interface with zero heavy UI libraries and deployed the production application on Vercel.",
        bullet_style
    ))
    story.append(Spacer(1, 7))

    # RizKey
    proj2_table = Table([
        [
            Paragraph("<b>RizKey</b> &mdash; Touch-Typing Web Application", item_left_title),
            Paragraph("<i>Interactive Platform &nbsp;&bull;&nbsp; React &amp; TypeScript</i>", item_right_meta)
        ]
    ], colWidths=[330, 210])
    proj2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1)
    ]))
    story.append(proj2_table)
    story.append(Paragraph("<b>Technologies:</b> React 19, TypeScript, Tailwind CSS, Vite, Recharts, Web Audio API, Vitest", tech_line_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "&bull;&nbsp; Developed a minimalist touch-typing application providing real-time WPM, raw speed, and accuracy calculations across customizable time and word limits.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull;&nbsp; Created a 15-lesson structured typing academy with an interactive virtual QWERTY keyboard illustrating proper finger placement zones and shift key technique.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull;&nbsp; Implemented targeted practice drills with weak-key error tracking, interactive typing mini-games, and performance charts using Recharts; authored 38 unit tests using Vitest.",
        bullet_style
    ))
    story.append(Spacer(1, 8))

    # 5. Technical Skills
    add_section_header("Technical Skills")

    skills_data = [
        [
            Paragraph("<b>Programming Languages:</b>", skill_category_style),
            Paragraph("Python, C, JavaScript (ES6+), TypeScript", skill_list_style)
        ],
        [
            Paragraph("<b>Web Technologies:</b>", skill_category_style),
            Paragraph("HTML5 (Semantic Markup), CSS3 (Flexbox &amp; Grid), Tailwind CSS, React 19", skill_list_style)
        ],
        [
            Paragraph("<b>Tools &amp; Platforms:</b>", skill_category_style),
            Paragraph("Git, GitHub, VS Code, Vite, Vercel", skill_list_style)
        ],
        [
            Paragraph("<b>Operating Systems:</b>", skill_category_style),
            Paragraph("Linux CLI (Bash, Core Utilities, File Permissions, Shell Navigation), Windows", skill_list_style)
        ]
    ]
    skills_table = Table(skills_data, colWidths=[150, 390])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5)
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 6))

    # 6. Additional Information / Coursework
    add_section_header("Additional Information")

    coursework_data = [
        [
            Paragraph("<b>Relevant Coursework:</b>", skill_category_style),
            Paragraph("Relational Database Management Systems (DBMS &amp; SQL), Operating Systems &amp; Linux Architecture, Computer Networks, Data Structures, Procedural Programming in C &amp; Python", skill_list_style)
        ],
        [
            Paragraph("<b>Engineering Focus:</b>", skill_category_style),
            Paragraph("Client-Side Web Architecture, Command-Line Utilities, Core Algorithms, Software Reliability", skill_list_style)
        ]
    ]
    coursework_table = Table(coursework_data, colWidths=[150, 390])
    coursework_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5)
    ]))
    story.append(coursework_table)

    # Output document
    doc = SimpleDocTemplate(
        primary_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    doc.build(story, canvasmaker=NumberedCanvas)

    for p in all_paths:
        if p != primary_path:
            shutil.copyfile(primary_path, p)

    print(f"Built {len(all_paths)} files successfully.")

if __name__ == "__main__":
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    docs_dir = os.path.join(base_dir, "assets", "docs")
    os.makedirs(docs_dir, exist_ok=True)
    
    target_named = os.path.join(docs_dir, "Syed-Rizwan-Bukhari-Resume.pdf")
    target_compat = os.path.join(docs_dir, "resume.pdf")

    build_resume(target_named, [target_named, target_compat])
