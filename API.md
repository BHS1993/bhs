# API ডকুমেন্টেশন - ভাটিয়া উচ্চ বিদ্যালয় স্কুল ম্যানেজমেন্ট সিস্টেম

## 📚 API ওভারভিউ

এই স্কুল ম্যানেজমেন্ট সিস্টেমের API ডকুমেন্টেশন। বর্তমানে এটি একটি স্ট্যাটিক ওয়েবসাইট, তবে ভবিষ্যতে REST API যোগ করা হবে।

## 🔗 বেস URL

```
http://localhost:3000/api
```

## 🔐 অথেনটিকেশন

### সেশন-বেসড অথেনটিকেশন

```javascript
// লগইন রিকোয়েস্ট
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123",
  "userType": "admin"
}

// রেসপন্স
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "প্রধান প্রশাসক",
    "role": "admin",
    "permissions": ["read", "write", "delete"]
  }
}
```

## 👥 ইউজার ম্যানেজমেন্ট

### ইউজার প্রোফাইল

```javascript
// ইউজার প্রোফাইল পাওয়া
GET /api/users/profile
Authorization: Bearer <token>

// রেসপন্স
{
  "id": 1,
  "name": "রাহুল আহমেদ",
  "email": "rahul@school.edu.bd",
  "phone": "+8801726272580",
  "role": "student",
  "class": "10",
  "roll": "01",
  "avatar": "https://example.com/avatar.jpg",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### ইউজার আপডেট

```javascript
// প্রোফাইল আপডেট
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "রাহুল আহমেদ",
  "email": "rahul@school.edu.bd",
  "phone": "+8801726272580"
}

// রেসপন্স
{
  "success": true,
  "message": "প্রোফাইল সফলভাবে আপডেট হয়েছে",
  "user": {
    "id": 1,
    "name": "রাহুল আহমেদ",
    "email": "rahul@school.edu.bd",
    "phone": "+8801726272580"
  }
}
```

## 🎓 শিক্ষার্থী ম্যানেজমেন্ট

### শিক্ষার্থী তালিকা

```javascript
// সব শিক্ষার্থী পাওয়া
GET /api/students
Authorization: Bearer <token>

// রেসপন্স
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "রাহুল আহমেদ",
      "class": "10",
      "roll": "01",
      "section": "A",
      "admission_date": "2020-01-15",
      "status": "active"
    },
    {
      "id": 2,
      "name": "ফাতিমা খাতুন",
      "class": "10",
      "roll": "02",
      "section": "A",
      "admission_date": "2020-01-15",
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1250,
    "pages": 125
  }
}
```

### শিক্ষার্থী যোগ করা

```javascript
// নতুন শিক্ষার্থী যোগ করা
POST /api/students
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "করিম উদ্দিন",
  "class": "9",
  "section": "B",
  "admission_date": "2025-01-15",
  "father_name": "আব্দুল করিম",
  "mother_name": "রাশিদা বেগম",
  "phone": "+8801726272580",
  "address": "পোস্ট অফিস- নিয়ামতপুর, করিমগঞ্জ, কিশোরগঞ্জ"
}

// রেসপন্স
{
  "success": true,
  "message": "শিক্ষার্থী সফলভাবে যোগ করা হয়েছে",
  "student": {
    "id": 1251,
    "name": "করিম উদ্দিন",
    "class": "9",
    "roll": "15",
    "section": "B"
  }
}
```

## 👨‍🏫 শিক্ষক ম্যানেজমেন্ট

### শিক্ষক তালিকা

```javascript
// সব শিক্ষক পাওয়া
GET /api/teachers
Authorization: Bearer <token>

// রেসপন্স
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "মোঃ রহিম উদ্দিন",
      "subject": "গণিত",
      "qualification": "MSc in Mathematics",
      "phone": "+8801726272580",
      "email": "rahim@school.edu.bd",
      "joining_date": "2018-01-15",
      "status": "active"
    }
  ]
}
```

## 📊 ফলাফল ম্যানেজমেন্ট

### ফলাফল আপলোড

```javascript
// ফলাফল আপলোড করা
POST /api/results
Authorization: Bearer <token>
Content-Type: application/json

{
  "exam_id": 1,
  "class": "10",
  "section": "A",
  "results": [
    {
      "student_id": 1,
      "subject": "বাংলা",
      "marks": 85,
      "grade": "A+"
    },
    {
      "student_id": 1,
      "subject": "ইংরেজি",
      "marks": 80,
      "grade": "A"
    }
  ]
}

// রেসপন্স
{
  "success": true,
  "message": "ফলাফল সফলভাবে আপলোড হয়েছে",
  "exam_id": 1
}
```

### ফলাফল পাওয়া

```javascript
// শিক্ষার্থীর ফলাফল পাওয়া
GET /api/results/student/1
Authorization: Bearer <token>

// রেসপন্স
{
  "success": true,
  "student": {
    "id": 1,
    "name": "রাহুল আহমেদ",
    "class": "10",
    "roll": "01"
  },
  "results": [
    {
      "exam_name": "মিড টার্ম পরীক্ষা",
      "exam_date": "2025-01-15",
      "subjects": [
        {
          "name": "বাংলা",
          "marks": 85,
          "grade": "A+",
          "total_marks": 100
        },
        {
          "name": "ইংরেজি",
          "marks": 80,
          "grade": "A",
          "total_marks": 100
        }
      ],
      "total_marks": 850,
      "obtained_marks": 765,
      "percentage": 90.0,
      "grade": "A+"
    }
  ]
}
```

## 📅 উপস্থিতি ম্যানেজমেন্ট

### উপস্থিতি রেকর্ড

```javascript
// উপস্থিতি রেকর্ড করা
POST /api/attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2025-01-15",
  "class": "10",
  "section": "A",
  "attendance": [
    {
      "student_id": 1,
      "status": "present",
      "remarks": ""
    },
    {
      "student_id": 2,
      "status": "absent",
      "remarks": "অসুস্থ"
    }
  ]
}

// রেসপন্স
{
  "success": true,
  "message": "উপস্থিতি সফলভাবে রেকর্ড হয়েছে",
  "date": "2025-01-15",
  "total_students": 45,
  "present": 42,
  "absent": 3
}
```

### উপস্থিতি রিপোর্ট

```javascript
// উপস্থিতি রিপোর্ট পাওয়া
GET /api/attendance/report?student_id=1&month=1&year=2025
Authorization: Bearer <token>

// রেসপন্স
{
  "success": true,
  "student": {
    "id": 1,
    "name": "রাহুল আহমেদ"
  },
  "month": 1,
  "year": 2025,
  "total_days": 22,
  "present_days": 20,
  "absent_days": 2,
  "attendance_percentage": 90.9,
  "details": [
    {
      "date": "2025-01-01",
      "status": "present"
    },
    {
      "date": "2025-01-02",
      "status": "absent",
      "remarks": "অসুস্থ"
    }
  ]
}
```

## 💰 ফি ম্যানেজমেন্ট

### ফি রেকর্ড

```javascript
// ফি রেকর্ড করা
POST /api/fees
Authorization: Bearer <token>
Content-Type: application/json

{
  "student_id": 1,
  "month": 1,
  "year": 2025,
  "amount": 500,
  "payment_method": "cash",
  "payment_date": "2025-01-15",
  "remarks": "জানুয়ারি মাসের ফি"
}

// রেসপন্স
{
  "success": true,
  "message": "ফি সফলভাবে রেকর্ড হয়েছে",
  "receipt_no": "FEE-2025-001"
}
```

### ফি রিপোর্ট

```javascript
// ফি রিপোর্ট পাওয়া
GET /api/fees/report?student_id=1&year=2025
Authorization: Bearer <token>

// রেসপন্স
{
  "success": true,
  "student": {
    "id": 1,
    "name": "রাহুল আহমেদ"
  },
  "year": 2025,
  "total_fee": 6000,
  "paid_fee": 5500,
  "due_fee": 500,
  "monthly_details": [
    {
      "month": 1,
      "amount": 500,
      "paid": 500,
      "due": 0,
      "status": "paid"
    },
    {
      "month": 2,
      "amount": 500,
      "paid": 0,
      "due": 500,
      "status": "unpaid"
    }
  ]
}
```

## 📧 নোটিফিকেশন

### নোটিফিকেশন পাঠানো

```javascript
// নোটিফিকেশন পাঠানো
POST /api/notifications
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "sms",
  "recipients": ["student", "parent"],
  "class": "10",
  "message": "আগামীকাল স্কুল বন্ধ থাকবে",
  "scheduled_at": "2025-01-16T08:00:00Z"
}

// রেসপন্স
{
  "success": true,
  "message": "নোটিফিকেশন সফলভাবে পাঠানো হয়েছে",
  "notification_id": 123,
  "recipients_count": 150
}
```

## 📊 ড্যাশবোর্ড স্ট্যাটিসটিক্স

### অ্যাডমিন ড্যাশবোর্ড

```javascript
// অ্যাডমিন ড্যাশবোর্ড স্ট্যাটস
GET /api/admin/dashboard
Authorization: Bearer <token>

// রেসপন্স
{
  "success": true,
  "stats": {
    "total_students": 1250,
    "total_teachers": 85,
    "total_classes": 25,
    "attendance_today": 1200,
    "fee_collection_month": 250000,
    "exam_results_pending": 5
  },
  "recent_activities": [
    {
      "type": "student_admission",
      "message": "নতুন শিক্ষার্থী ভর্তি হয়েছে",
      "timestamp": "2025-01-15T10:30:00Z"
    }
  ]
}
```

## 🔍 সার্চ API

### শিক্ষার্থী সার্চ

```javascript
// শিক্ষার্থী সার্চ
GET /api/search/students?q=রাহুল&class=10
Authorization: Bearer <token>

// রেসপন্স
{
  "success": true,
  "results": [
    {
      "id": 1,
      "name": "রাহুল আহমেদ",
      "class": "10",
      "roll": "01",
      "section": "A"
    }
  ],
  "total": 1
}
```

## 📁 ফাইল আপলোড

### ফাইল আপলোড

```javascript
// ফাইল আপলোড
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

// Form data:
// file: <file>
// type: "student_photo"
// student_id: 1

// রেসপন্স
{
  "success": true,
  "message": "ফাইল সফলভাবে আপলোড হয়েছে",
  "file_url": "https://example.com/uploads/student_1_photo.jpg",
  "file_name": "student_1_photo.jpg",
  "file_size": 1024000
}
```

## 🚨 এরর হ্যান্ডলিং

### এরর কোড

```javascript
// সাধারণ এরর রেসপন্স
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "অনুগ্রহ করে সব ক্ষেত্র পূরণ করুন",
    "details": {
      "name": "নাম প্রয়োজনীয়",
      "email": "সঠিক ইমেইল দিন"
    }
  }
}

// এরর কোড তালিকা
400: BAD_REQUEST
401: UNAUTHORIZED
403: FORBIDDEN
404: NOT_FOUND
422: VALIDATION_ERROR
500: INTERNAL_SERVER_ERROR
```

## 📝 API ভার্সনিং

### ভার্সন স্ট্র্যাটেজি

```javascript
// API ভার্সন URL-এ
GET /api/v1/students

// হেডারে ভার্সন
GET /api/students
API-Version: 1.0

// রেসপন্সে ভার্সন
{
  "success": true,
  "version": "1.0",
  "data": [...]
}
```

## 🔒 সিকিউরিটি

### CORS কনফিগারেশন

```javascript
// CORS হেডার
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### রেট লিমিটিং

```javascript
// রেট লিমিট হেডার
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642233600
```

## 📋 API টেস্টিং

### Postman কালেকশন

```json
{
  "info": {
    "name": "School Management API",
    "version": "1.0.0"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"admin\",\n  \"password\": \"admin123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            }
          }
        }
      ]
    }
  ]
}
```

## 🔄 WebSocket API

### রিয়েল-টাইম আপডেট

```javascript
// WebSocket কানেকশন
const ws = new WebSocket('ws://localhost:3000/ws');

// মেসেজ পাঠানো
ws.send(JSON.stringify({
  type: 'notification',
  data: {
    message: 'নতুন নোটিফিকেশন',
    timestamp: new Date().toISOString()
  }
}));

// মেসেজ গ্রহণ
ws.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};
```

---

**© ২০২৫ ভাটিয়া উচ্চ বিদ্যালয়। সকল অধিকার সংরক্ষিত।**
