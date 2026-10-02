# ডেটা মডেল
এখনও কোনো ডোমেইন এনটিটি নেই। সাধারণ: `FileMetadata` (id, name, type, size, storageLocation, createdAt, updatedAt, relatedModule), `packages/shared-types`-এ।

## ইনভেন্টরি মডিউল
- `Item`: id, name, unit
- `Movement`: id, itemId, type (IN/OUT), quantity, date (YYYY-MM-DD), party (ইস্যুতে গ্রহণকারী বিভাগ/ব্যক্তি), note
- বছরের প্রারম্ভিক জের আলাদা সংরক্ষিত হয় না; আগের সব এন্ট্রির নিট থেকে হিসাব হয়, তাই জের স্বয়ংক্রিয়ভাবে টানা হয়।
