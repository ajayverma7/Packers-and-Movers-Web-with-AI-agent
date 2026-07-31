import os
import smtplib
from email.message import EmailMessage

from flask import Flask, jsonify, request, send_from_directory
from dotenv import load_dotenv

ROOT = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(ROOT, ".env"))
app = Flask(__name__, static_folder=ROOT, static_url_path="")


@app.get("/")
def home():
    return send_from_directory(ROOT, "index.html")


@app.post("/api/enquiry")
def enquiry():
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    phone = str(data.get("phone", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not all((name, phone, email, message)):
        return jsonify(error="Please complete all enquiry fields."), 400

    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    if not smtp_username or not smtp_password:
        return jsonify(error="Email service is not configured on the server."), 503

    mail = EmailMessage()
    mail["Subject"] = f"New MoveMate enquiry from {name}"
    mail["From"] = smtp_username
    mail["To"] = "sv9365617@gmail.com"
    mail["Reply-To"] = email
    mail.set_content(
        f"Name: {name}\nPhone: {phone}\nEmail: {email}\n\nEnquiry:\n{message}"
    )

    try:
        with smtplib.SMTP(
            os.getenv("SMTP_HOST", "smtp.gmail.com"),
            int(os.getenv("SMTP_PORT", "587")),
        ) as smtp:
            smtp.starttls()
            smtp.login(smtp_username, smtp_password)
            smtp.send_message(mail)
    except (OSError, smtplib.SMTPException):
        app.logger.exception("Enquiry email could not be sent")
        return jsonify(error="Email service is unavailable."), 503

    return jsonify(message="Enquiry sent successfully.")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.getenv("PORT", "5000")), debug=True)
