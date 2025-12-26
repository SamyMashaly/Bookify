import os

class statics:
    # 1. الحصول على المسار المطلق للمجلد الذي يحتوي على هذا الملف
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    
    # 2. دمج مسار المجلد مع اسم قاعدة البيانات
    # هذا سيعطيك المسار الصحيح سواء كنت على Windows أو Linux
    DATABASE_NAME = os.path.join(BASE_DIR, "bookify.db")