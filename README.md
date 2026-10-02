# Inventory-Management
ইউনিভার্সাল ক্রস-প্ল্যাটফর্ম ফাউন্ডেশন
ওয়েব (Next.js), উইন্ডোজ ও মোবাইল (Flutter) এবং NestJS REST ব্যাকএন্ডের জন্য ডোমেইন-নিরপেক্ষ ভিত্তি।
কাজ শুরুর আগে `CLAUDE.md` ও `docs/DEVELOPMENT_STATUS.md` পড়ুন।
দ্রুত শুরু (ব্যাকএন্ড)
    cp .env.example .env
    npm install
    npm run build
    npm test
    npm run start:dev --workspace backend
হেলথ চেক: GET http://localhost:3000/api/v1/health
`apps/web`, `apps/desktop`, `apps/mobile` এখনও `create-next-app` ও `flutter create` দিয়ে তৈরি করতে হবে (প্রতিটির README দেখুন)।
