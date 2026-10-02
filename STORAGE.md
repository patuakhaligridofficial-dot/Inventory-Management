# স্টোরেজ
ইন্টারফেস: `DataRepository<T>`, `FileStorage` (`backend/src/storage`)। প্রোভাইডার নির্বাচিত হয় `STORAGE_DATA_PROVIDER` / `STORAGE_FILE_PROVIDER` দিয়ে।
বর্তমানে আছে: `memory` ডেটা প্রোভাইডার। পরিকল্পিত: Google Sheets, Google Drive, PostgreSQL, লোকাল ফাইল। Google-নির্দিষ্ট কোড শুধু `backend/src/integrations` ও প্রোভাইডার ক্লাসে থাকবে। ক্রেডেনশিয়াল শুধু env-এ।
