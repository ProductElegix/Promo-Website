# Builds public/downloads/wheel-of-life-template.pdf (the printable Wheel of Life linked from the guide).
# Run from the repo root: python3 scripts/wheel-template.py  (needs reportlab and Liberation Sans)
import math
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
pdfmetrics.registerFont(TTFont("Sans", "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("SansB", "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"))
W, H = A4
c = canvas.Canvas("public/downloads/wheel-of-life-template.pdf", pagesize=A4)
c.setTitle("Wheel of Life template · Elegix"); c.setAuthor("Elegix"); c.setSubject("Printable Wheel of Life with 6 areas of life")
ink = HexColor("#111111"); muted = HexColor("#6b6b6b"); line = HexColor("#c9ccc7")
areas = [("Health", "#009a44", "Sleep, movement, food, energy", "Do I wake up with energy most days?"),
         ("Relationships", "#d50524", "Family, friends, partner, community", "Do the people who matter get my best, or my leftovers?"),
         ("Spirituality", "#6709c7", "Values, reflection, inner calm", "Do I make time to stop and ask why?"),
         ("Leisure", "#ff5e3b", "Rest, play, hobbies, fun", "When did I last do something just for fun?"),
         ("Personal Growth", "#0f14da", "Learning, skills, reading, challenges", "Am I learning something new this month?"),
         ("Finance & Career", "#dd4903", "Work, income, savings, business", "Is my work taking me where I want to go?")]
c.setFillColor(ink); c.setFont("SansB", 22); c.drawString(48, H-64, "Wheel of Life")
c.setFont("Sans", 10.5); c.setFillColor(muted)
c.drawString(48, H-84, "Rate each area from 1 (very unhappy) to 10 (fully satisfied). Colour in the rings up to your score.")
c.drawString(48, H-98, "Date: ____________________      Average score: ______      Lowest area: ______________________")
cx, cy, R0, R1 = W/2, H/2+70, 16, 160
n = len(areas)
c.setStrokeColor(line); c.setLineWidth(0.8)
for k in range(1, 11):
    c.circle(cx, cy, R0 + (R1-R0)*k/10, stroke=1, fill=0)
for i in range(n):
    a = math.pi/2 - i*2*math.pi/n
    c.line(cx + R0*math.cos(a), cy + R0*math.sin(a), cx + R1*math.cos(a), cy + R1*math.sin(a))
c.setFont("Sans", 7); c.setFillColor(muted)
for k in range(1, 11):
    r = R0 + (R1-R0)*(k-0.5)/10
    a = math.pi/2 - math.pi/n*0  # labels along first spoke, slightly offset
    c.drawCentredString(cx + 6, cy + r - 2.5, str(k))
for i, (name, col, desc, q) in enumerate(areas):
    a = math.pi/2 - (i+0.5)*2*math.pi/n
    ca = math.cos(a)
    x, y = cx + (R1+14)*ca, cy + (R1+18)*math.sin(a)
    draw = c.drawString if ca > 0.3 else (c.drawRightString if ca < -0.3 else c.drawCentredString)
    c.setFillColor(HexColor(col)); c.setFont("SansB", 11)
    draw(x, y, name)
    c.setFillColor(muted); c.setFont("Sans", 8)
    parts = desc.split(", ")
    lines = [", ".join(parts[:2]) + ",", ", ".join(parts[2:])] if abs(ca) > 0.9 else [desc]
    for j, ln in enumerate(lines):
        draw(x, y - 11 - 10*j, ln)
# questions
y = cy - R1 - 70
c.setFillColor(ink); c.setFont("SansB", 12); c.drawString(48, y, "A question for each area"); y -= 18
for name, col, desc, q in areas:
    c.setFillColor(HexColor(col)); c.setFont("SansB", 9.5); c.drawString(48, y, name)
    c.setFillColor(ink); c.setFont("Sans", 9.5); c.drawString(150, y, q); y -= 15
y -= 8
c.setFont("SansB", 12); c.drawString(48, y, "My one step this week"); y -= 18
c.setFont("Sans", 9.5); c.setFillColor(muted)
c.drawString(48, y, "For my lowest area, ________________________, this week I will: ______________________________________"); y -= 16
c.drawString(48, y, "____________________________________________________________________________________________")
c.setFont("Sans", 8.5); c.setFillColor(muted)
c.drawString(48, 36, "Redo your wheel every month and compare. More guides at www.elegix.net/guides")
c.drawRightString(W-48, 36, "Elegix · Choose your balance.")
c.showPage(); c.save()
