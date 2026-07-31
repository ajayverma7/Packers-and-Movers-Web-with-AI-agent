# Packers-and-Movers-Web-with-AI-agent
A modern and responsive web application for relocation services with AI Agent — designed to provide customers with a smooth and stress-free moving experience.

## Run the enquiry backend

Install dependencies and start the server. SMTP settings are loaded automatically from `.env`:

```powershell
python -m pip install -r requirements.txt
python server.py
```

The `.env` file should contain `SMTP_USERNAME` and `SMTP_PASSWORD`. Enquiries are sent to `sv9365617@gmail.com`.
