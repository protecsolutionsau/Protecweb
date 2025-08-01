# Protec Solutions Website

A modern, responsive business website for Protec Solutions, built to showcase services, industry expertise, and contact capabilities.

---

## 🚀 Features
- Responsive design for desktop and mobile
- Custom branding with Protec Solutions logo and colors
- Services and industry focus for Government, Education, and Financial Services
- Contact form to send inquiries to business email
- Custom domain at [protecsolutions.com.au](https://protecsolutions.com.au)
- Deployed on Netlify with continuous deployment

---

## 🛠 Tech Stack
- Frontend: HTML5, CSS3, JavaScript, React 
- Hosting: Netlify
- Domain: protecsolutions.com.au
- Email Service: Resend via Supabase Edge Functions

---

## ⚙️ Setup & Installation

### Clone repository
```bash
git clone https://github.com/<your-repo>.git
cd protec-solutions-website
````

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create `.env` file:

```env
VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
RESEND_API_KEY=<your-resend-api-key>
```

### Run locally

```bash
npm run dev
```

---

## 🌐 Deployment

* Pushing changes to `main` branch triggers Netlify deployment
* Custom domain configured via Netlify DNS: protecsolutions.com.au

---

## 📩 Contact Form Setup

* Edge Function: `send-contact-email`
* Service: Resend API
* All form submissions are sent to `spkarthigeyan@gmail.com` from `website@protecsolutions.com.au`

---

## 📄 License

Proprietary - Owned by Protec Solutions

```
