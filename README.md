# การใช้งาน Calendar Component สำหรับ ShadCN UI

บทความนี้แนะนำวิธีการใช้งาน Calendar Component ที่รองรับการเลือกเดือนและปีในรูปแบบ พ.ศ. และใช้ locale ภาษาไทย โดยใช้ ShadCN UI และ React Day Picker

## คุณสมบัติของ Calendar Component

- แสดงปฏิทินที่สามารถเลือกเดือนและปีได้
- แสดงวันที่นอกเดือนที่เลือก
- รองรับการแสดงผลปีในรูปแบบ พ.ศ.
- ใช้ date-fns ในการจัดการวันที่และ locale ภาษาไทย

## การติดตั้ง

ก่อนที่จะเริ่มต้น ให้ติดตั้ง dependencies ที่จำเป็น:

```bash
npm install react-day-picker date-fns
```

![ตัวอย่าง](https://pouch.jumpshare.com/preview/RmmhVUe6_4GIuGVFl6NVENcQDaQJ9zEN62Fd_N-6gRigVRtAKZUIAtWYIuWIfZGt_2UMPdmDFQlA0Z8IT5kULTm7DUNrLs3P9wmQ9sIfW40)

