import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def create_sample_pdf(filename="SISTec_Sample_Document.pdf"):
    doc = SimpleDocTemplate(filename, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Title
    story.append(Paragraph("Sagar Institute of Science and Technology (SISTec) - Information Brochure", styles['Title']))
    story.append(Spacer(1, 12))

    # About
    story.append(Paragraph("About SISTec", styles['Heading1']))
    story.append(Paragraph("Sagar Institute of Science and Technology (SISTec) Gandhi Nagar is a premier engineering college located in Bhopal. It aims to provide quality education and foster innovation among students.", styles['Normal']))
    story.append(Spacer(1, 12))

    # Courses
    story.append(Paragraph("Courses Offered", styles['Heading1']))
    story.append(Paragraph("1. B.Tech in Computer Science & Engineering (CSE)", styles['Normal']))
    story.append(Paragraph("2. B.Tech in Artificial Intelligence & Data Science (AI & DS)", styles['Normal']))
    story.append(Paragraph("3. B.Tech in Mechanical Engineering (ME)", styles['Normal']))
    story.append(Paragraph("4. B.Tech in Civil Engineering (CE)", styles['Normal']))
    story.append(Paragraph("5. Master of Business Administration (MBA)", styles['Normal']))
    story.append(Spacer(1, 12))

    # AI & DS Department
    story.append(Paragraph("Artificial Intelligence & Data Science (AI & DS) Department", styles['Heading1']))
    story.append(Paragraph("The AI & DS department focuses on cutting-edge technologies like Machine Learning, Deep Learning, and Big Data Analytics. It has state-of-the-art labs and highly qualified faculty members.", styles['Normal']))
    story.append(Spacer(1, 12))

    # Facilities
    story.append(Paragraph("Facilities", styles['Heading1']))
    story.append(Paragraph("SISTec provides world-class facilities including:", styles['Normal']))
    story.append(Paragraph("- High-speed Wi-Fi across the campus", styles['Normal']))
    story.append(Paragraph("- Fully equipped computer labs", styles['Normal']))
    story.append(Paragraph("- Central Library with over 50,000 books", styles['Normal']))
    story.append(Paragraph("- Separate hostels for boys and girls with mess facilities", styles['Normal']))
    story.append(Spacer(1, 12))

    # Events
    story.append(Paragraph("Events & Hackathons", styles['Heading1']))
    story.append(Paragraph("SISTec regularly organizes technical events, workshops, and Hackathons to encourage practical learning. The annual tech-fest 'Sagar Fiesta' is one of the biggest events in the region.", styles['Normal']))
    story.append(Spacer(1, 12))
    
    # Rules
    story.append(Paragraph("Rules and Regulations", styles['Heading1']))
    story.append(Paragraph("Students must maintain a minimum of 75% attendance. ID cards are mandatory inside the campus. Mobile phones are restricted during class hours.", styles['Normal']))

    doc.build(story)
    print(f"Sample PDF created successfully at: {os.path.abspath(filename)}")

if __name__ == "__main__":
    create_sample_pdf()
