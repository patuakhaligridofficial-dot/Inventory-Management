# API
বেস পাথ `/api/v1`। সফল: `{ "success": true, "data": ... }`। ব্যর্থ: `{ "success": false, "error": { "code", "message" } }`।
| মেথড | পাথ | বিবরণ |
|---|---|---|
| GET | /health | `{ status: "ok" }` ফেরত দেয় |

## ইনভেন্টরি (`/api/v1/inventory`)
| মেথড | পাথ | বিবরণ |
|---|---|---|
| GET | /items | মালের তালিকা |
| POST | /items | নতুন মাল `{ name, unit }` |
| POST | /movements | এন্ট্রি `{ itemId, type: "IN"\|"OUT", quantity, date: "YYYY-MM-DD", party?, note? }`; OUT-এ `party` বাধ্যতামূলক, স্টকের বেশি ইস্যু নাকচ |
| GET | /movements?year= | বছরের এন্ট্রির তালিকা (নতুন আগে) |
| GET | /report?year= | বার্ষিক রিপোর্ট: প্রারম্ভিক জের, আগমন, বহির্গমন, অবশিষ্ট |
