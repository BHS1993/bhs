/**
 * Demo Data for School Management System
 * This file contains sample data for demonstration purposes
 */

window.demoData = {
    // School Information
    schoolInfo: {
        name: "ভাটিয়া উচ্চ বিদ্যালয়",
        englishName: "Bhatia High School",
        address: "পোস্ট অফিস- নিয়ামতপুর, করিমগঞ্জ, কিশোরগঞ্জ-২৩১০",
        phone: "+৮৮০ ১৭২৬২৭২৫৮০",
        email: "bhatiaschool@gmail.com",
        website: "www.bhatiahighschool.edu.bd",
        established: "১৯৯৫",
        principal: "মোঃ আব্দুল হামিদ",
        vicePrincipal: "মোসাঃ ফাতেমা বেগম"
    },

    // Students Data
    students: [
        {
            id: "STU001",
            name: "আহমেদ হাসান",
            englishName: "Ahmed Hasan",
            class: "Class 10",
            section: "A",
            roll: "01",
            admissionDate: "2023-01-15",
            parentInfo: {
                father: "মোঃ আব্দুল হামিদ",
                mother: "মোসাঃ ফাতেমা বেগম",
                phone: "01712345678",
                email: "parent1@email.com"
            },
            attendance: {
                present: 85,
                absent: 5,
                total: 90
            },
            results: {
                "Mid Term": { grade: "A+", marks: 95 },
                "Final Term": { grade: "A+", marks: 92 }
            }
        },
        {
            id: "STU002",
            name: "ফাতেমা আক্তার",
            englishName: "Fatema Akter",
            class: "Class 9",
            section: "B",
            roll: "15",
            admissionDate: "2022-03-10",
            parentInfo: {
                father: "মোঃ রফিক আহমেদ",
                mother: "মোসাঃ সাবরিনা বেগম",
                phone: "01812345678",
                email: "parent2@email.com"
            },
            attendance: {
                present: 88,
                absent: 2,
                total: 90
            },
            results: {
                "Mid Term": { grade: "A", marks: 88 },
                "Final Term": { grade: "A+", marks: 90 }
            }
        },
        {
            id: "STU003",
            name: "মোহাম্মদ আলী",
            englishName: "Mohammad Ali",
            class: "Class 8",
            section: "A",
            roll: "08",
            admissionDate: "2021-01-20",
            parentInfo: {
                father: "মোঃ সেলিম খান",
                mother: "মোসাঃ রেহানা বেগম",
                phone: "01912345678",
                email: "parent3@email.com"
            },
            attendance: {
                present: 82,
                absent: 8,
                total: 90
            },
            results: {
                "Mid Term": { grade: "A", marks: 85 },
                "Final Term": { grade: "A", marks: 87 }
            }
        }
    ],

    // Teachers Data
    teachers: [
        {
            id: "TCH001",
            name: "মোঃ রফিক আহমেদ",
            englishName: "Mohammad Rafiq Ahmed",
            subject: "গণিত",
            qualification: "MSc in Mathematics",
            joiningDate: "2020-03-01",
            contact: "01812345678",
            email: "rafiq@school.edu.bd",
            salary: 45000,
            attendance: {
                present: 95,
                absent: 5,
                total: 100
            }
        },
        {
            id: "TCH002",
            name: "মোসাঃ সাবরিনা বেগম",
            englishName: "Sabrina Begum",
            subject: "ইংরেজি",
            qualification: "MA in English",
            joiningDate: "2019-06-15",
            contact: "01712345678",
            email: "sabrina@school.edu.bd",
            salary: 42000,
            attendance: {
                present: 98,
                absent: 2,
                total: 100
            }
        },
        {
            id: "TCH003",
            name: "মোঃ সেলিম খান",
            englishName: "Selim Khan",
            subject: "বিজ্ঞান",
            qualification: "MSc in Physics",
            joiningDate: "2021-01-10",
            contact: "01912345678",
            email: "selim@school.edu.bd",
            salary: 40000,
            attendance: {
                present: 92,
                absent: 8,
                total: 100
            }
        }
    ],

    // Classes Data
    classes: [
        {
            id: "CLASS10",
            name: "Class 10",
            section: "A",
            teacher: "TCH001",
            students: ["STU001"],
            subjects: ["গণিত", "ইংরেজি", "বাংলা", "বিজ্ঞান", "সামাজিক বিজ্ঞান"]
        },
        {
            id: "CLASS9",
            name: "Class 9",
            section: "B",
            teacher: "TCH002",
            students: ["STU002"],
            subjects: ["গণিত", "ইংরেজি", "বাংলা", "বিজ্ঞান", "সামাজিক বিজ্ঞান"]
        },
        {
            id: "CLASS8",
            name: "Class 8",
            section: "A",
            teacher: "TCH003",
            students: ["STU003"],
            subjects: ["গণিত", "ইংরেজি", "বাংলা", "বিজ্ঞান", "সামাজিক বিজ্ঞান"]
        }
    ],

    // Results Data
    results: {
        "2024": {
            "Class 10": {
                "Mid Term": {
                    "STU001": { marks: 95, grade: "A+", position: 1 }
                },
                "Final Term": {
                    "STU001": { marks: 92, grade: "A+", position: 1 }
                }
            },
            "Class 9": {
                "Mid Term": {
                    "STU002": { marks: 88, grade: "A", position: 3 }
                },
                "Final Term": {
                    "STU002": { marks: 90, grade: "A+", position: 2 }
                }
            },
            "Class 8": {
                "Mid Term": {
                    "STU003": { marks: 85, grade: "A", position: 5 }
                },
                "Final Term": {
                    "STU003": { marks: 87, grade: "A", position: 4 }
                }
            }
        }
    },

    // Attendance Data
    attendance: {
        "2024-02-02": {
            "STU001": { status: "present", time: "08:30" },
            "STU002": { status: "present", time: "08:25" },
            "STU003": { status: "present", time: "08:35" },
            "TCH001": { status: "present", time: "08:00" },
            "TCH002": { status: "present", time: "08:05" },
            "TCH003": { status: "present", time: "08:10" }
        }
    },

    // News and Announcements
    news: [
        {
            id: "NEWS001",
            title: "নতুন ওয়েবসাইট চালু",
            content: "আমাদের স্কুলের নতুন ডিজিটাল প্ল্যাটফর্ম চালু হয়েছে। এখন সব ধরনের শিক্ষা সংক্রান্ত কাজ অনলাইনে করা যাবে।",
            date: "2025-02-02",
            type: "announcement",
            priority: "high"
        },
        {
            id: "NEWS002",
            title: "ভর্তি কার্যক্রম শুরু",
            content: "২০২৫-২৬ শিক্ষাবর্ষের জন্য অনলাইন ভর্তি কার্যক্রম শুরু হয়েছে। আগ্রহী শিক্ষার্থীরা আবেদন করতে পারেন।",
            date: "2025-01-28",
            type: "admission",
            priority: "medium"
        },
        {
            id: "NEWS003",
            title: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
            content: "আগামী মাসে আমাদের স্কুলের বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে। সকল শিক্ষার্থী অংশগ্রহণের জন্য আমন্ত্রিত।",
            date: "2025-01-25",
            type: "event",
            priority: "low"
        }
    ],

    // Calendar Events
    events: [
        {
            id: "EVT001",
            title: "মিড টার্ম পরীক্ষা",
            date: "2025-03-15",
            type: "exam",
            description: "মিড টার্ম পরীক্ষা শুরু হবে"
        },
        {
            id: "EVT002",
            title: "স্কুলের বার্ষিক ক্রীড়া প্রতিযোগিতা",
            date: "2025-04-20",
            type: "sports",
            description: "বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে"
        },
        {
            id: "EVT003",
            title: "ফাইনাল পরীক্ষা",
            date: "2025-11-10",
            type: "exam",
            description: "ফাইনাল পরীক্ষা শুরু হবে"
        }
    ],

    // Utility Functions
    getStudentById: function(id) {
        return this.students.find(student => student.id === id);
    },

    getTeacherById: function(id) {
        return this.teachers.find(teacher => teacher.id === id);
    },

    getClassById: function(id) {
        return this.classes.find(cls => cls.id === id);
    },

    getStudentResults: function(studentId, year, exam) {
        return this.results[year]?.[exam]?.[studentId] || null;
    },

    getAttendanceByDate: function(date) {
        return this.attendance[date] || {};
    },

    getNewsByType: function(type) {
        return this.news.filter(item => item.type === type);
    },

    getEventsByMonth: function(year, month) {
        return this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getFullYear() === year && eventDate.getMonth() === month;
        });
    },

    // Statistics
    getStatistics: function() {
        return {
            totalStudents: this.students.length,
            totalTeachers: this.teachers.length,
            totalClasses: this.classes.length,
            averageAttendance: this.calculateAverageAttendance(),
            passRate: 98.5
        };
    },

    calculateAverageAttendance: function() {
        const totalPresent = this.students.reduce((sum, student) => sum + student.attendance.present, 0);
        const totalDays = this.students.reduce((sum, student) => sum + student.attendance.total, 0);
        return totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0;
    }
};
