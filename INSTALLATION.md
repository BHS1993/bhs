# ইনস্টলেশন গাইড - ভাটিয়া উচ্চ বিদ্যালয় স্কুল ম্যানেজমেন্ট সিস্টেম

## 📋 প্রয়োজনীয়তা

### সিস্টেম প্রয়োজনীয়তা
- **Node.js**: 14.0.0 বা তার বেশি
- **npm**: 6.0.0 বা তার বেশি
- **ওয়েব ব্রাউজার**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **ইন্টারনেট সংযোগ**: CDN লিংকগুলির জন্য

### অপারেটিং সিস্টেম
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Ubuntu 18.04+
- ✅ CentOS 7+

## 🚀 ইনস্টলেশন ধাপ

### ১. প্রজেক্ট ডাউনলোড করুন

```bash
# Git থেকে ক্লোন করুন
git clone https://github.com/ashisakram/school-management-system.git

# প্রজেক্ট ডিরেক্টরিতে যান
cd school-management-system
```

### ২. ডিপেন্ডেন্সি ইনস্টল করুন

```bash
# npm ব্যবহার করে
npm install

# বা yarn ব্যবহার করে
yarn install
```

### ৩. সার্ভার শুরু করুন

```bash
# npm ব্যবহার করে
npm start

# বা yarn ব্যবহার করে
yarn start

# বা সরাসরি Node.js ব্যবহার করে
node server.js
```

### ৪. ব্রাউজারে খুলুন

```
http://localhost:3000
```

## 🔧 বিকল্প ইনস্টলেশন পদ্ধতি

### Python HTTP সার্ভার ব্যবহার করে

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### PHP সার্ভার ব্যবহার করে

```bash
php -S localhost:8000
```

### XAMPP/WAMP ব্যবহার করে

1. প্রজেক্ট ফাইলগুলি `htdocs` ফোল্ডারে কপি করুন
2. Apache সার্ভার শুরু করুন
3. ব্রাউজারে `http://localhost/school-management-system/` খুলুন

## 🌐 প্রোডাকশন ডেপ্লয়মেন্ট

### ১. স্ট্যাটিক হোস্টিং (Netlify, Vercel, GitHub Pages)

```bash
# প্রজেক্ট বিল্ড করুন
npm run build

# dist ফোল্ডার আপলোড করুন
```

### ২. শেয়ার্ড হোস্টিং

1. সব ফাইল FTP/SFTP দিয়ে আপলোড করুন
2. `public_html` বা `www` ফোল্ডারে রাখুন
3. ডোমেইন কনফিগার করুন

### ৩. VPS/ডেডিকেটেড সার্ভার

```bash
# সার্ভারে ক্লোন করুন
git clone https://github.com/ashisakram/school-management-system.git

# PM2 ইনস্টল করুন
npm install -g pm2

# সার্ভার শুরু করুন
pm2 start server.js --name "school-management"

# সার্ভার অটো-রিস্টার্ট সেট করুন
pm2 startup
pm2 save
```

## 🔐 সিকিউরিটি কনফিগারেশন

### ১. HTTPS সেটআপ

```bash
# SSL সার্টিফিকেট ইনস্টল করুন
sudo certbot --nginx

# বা ম্যানুয়াল SSL কনফিগারেশন
```

### ২. ফায়ারওয়াল কনফিগারেশন

```bash
# UFW ফায়ারওয়াল
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000
```

### ৩. .env ফাইল সেটআপ

```bash
# .env ফাইল তৈরি করুন
cp .env.example .env

# পরিবেশ ভেরিয়েবল সেট করুন
NODE_ENV=production
PORT=3000
```

## 📱 মোবাইল অ্যাপ সেটআপ

### PWA কনফিগারেশন

```bash
# Service Worker ইনস্টল করুন
npm install -g workbox-cli

# PWA বিল্ড করুন
workbox generateSW workbox-config.js
```

## 🔧 কাস্টমাইজেশন

### ১. স্কুল তথ্য পরিবর্তন

`index.html` এবং অন্যান্য ফাইলে স্কুলের তথ্য পরিবর্তন করুন:

```html
<!-- স্কুলের নাম -->
<h1>ভাটিয়া উচ্চ বিদ্যালয়</h1>

<!-- যোগাযোগের তথ্য -->
<p>ফোন: +৮৮০ ১৭২৬২৭২৫৮০</p>
<p>ইমেইল: bhatiaschool@gmail.com</p>
```

### ২. রঙ থিম পরিবর্তন

`assets/css/school-theme.css` ফাইলে CSS ভেরিয়েবল পরিবর্তন করুন:

```css
:root {
    --primary-color: #005792;    /* আপনার স্কুলের রঙ */
    --accent-color: #28a745;     /* অ্যাকসেন্ট রঙ */
    --primary-dark: #003f6b;     /* গাঢ় রঙ */
}
```

### ৩. লগইন সিস্টেম কাস্টমাইজ

`login.html` ফাইলে ডেমো ইউজার তথ্য পরিবর্তন করুন:

```javascript
// ডেমো ইউজার তথ্য
this.users = {
    admin: [
        { username: 'your_admin', password: 'your_password', name: 'আপনার নাম' }
    ],
    // আরও ইউজার যোগ করুন
};
```

## 🐛 সমস্যা সমাধান

### সাধারণ সমস্যা

#### ১. পোর্ট 3000 ব্যবহৃত
```bash
# অন্য পোর্ট ব্যবহার করুন
PORT=3001 npm start
```

#### ২. Node.js ইনস্টল নেই
```bash
# Node.js ডাউনলোড করুন
# https://nodejs.org/
```

#### ৩. ফাইল পারমিশন সমস্যা
```bash
# ফাইল পারমিশন ঠিক করুন
chmod +x server.js
```

#### ৪. CORS সমস্যা
```bash
# সার্ভারে CORS হেডার যোগ করুন
res.setHeader('Access-Control-Allow-Origin', '*');
```

### ডিবাগিং

```bash
# ডিবাগ মোডে চালান
DEBUG=* npm start

# লগ ফাইল দেখুন
tail -f logs/app.log
```

## 📞 সহায়তা

### যোগাযোগ
- **ইমেইল**: ashisakram@gmail.com
- **GitHub**: https://github.com/ashisakram
- **ইস্যু রিপোর্ট**: https://github.com/ashisakram/school-management-system/issues

### ডকুমেন্টেশন
- **API ডকুমেন্টেশন**: `/docs/api.md`
- **ডেভেলপার গাইড**: `/docs/DEVELOPMENT.md`
- **কন্ট্রিবিউশন গাইড**: `/docs/CONTRIBUTING.md`

## 🔄 আপডেট

### অটো আপডেট

```bash
# Git থেকে আপডেট করুন
git pull origin main

# ডিপেন্ডেন্সি আপডেট করুন
npm update
```

### ম্যানুয়াল আপডেট

1. নতুন ভার্সন ডাউনলোড করুন
2. পুরানো ফাইল ব্যাকআপ করুন
3. নতুন ফাইল ইনস্টল করুন
4. কনফিগারেশন আপডেট করুন

## 📋 চেকলিস্ট

### ইনস্টলেশন চেকলিস্ট
- [ ] Node.js ইনস্টল করা হয়েছে
- [ ] npm ইনস্টল করা হয়েছে
- [ ] প্রজেক্ট ক্লোন করা হয়েছে
- [ ] ডিপেন্ডেন্সি ইনস্টল করা হয়েছে
- [ ] সার্ভার শুরু করা হয়েছে
- [ ] ব্রাউজারে সাইট খোলা হয়েছে
- [ ] লগইন সিস্টেম কাজ করছে
- [ ] সব ড্যাশবোর্ড অ্যাক্সেস করা যাচ্ছে

### প্রোডাকশন চেকলিস্ট
- [ ] HTTPS কনফিগার করা হয়েছে
- [ ] ডোমেইন সেটআপ করা হয়েছে
- [ ] SSL সার্টিফিকেট ইনস্টল করা হয়েছে
- [ ] ফায়ারওয়াল কনফিগার করা হয়েছে
- [ ] ব্যাকআপ সিস্টেম সেটআপ করা হয়েছে
- [ ] মনিটরিং সিস্টেম ইনস্টল করা হয়েছে
- [ ] লগ রোটেশন কনফিগার করা হয়েছে

---

**© ২০২৫ ভাটিয়া উচ্চ বিদ্যালয়। সকল অধিকার সংরক্ষিত।**
