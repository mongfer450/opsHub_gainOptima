import {
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Dumbbell,
  FileSignature,
  FileText,
  Folder,
  Grid3x3,
  Image,
  Megaphone,
  MessageCircle,
  Settings,
  Tag,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

export const LINK_ICONS = {
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Dumbbell,
  FileSignature,
  FileText,
  Folder,
  Grid3x3,
  Image,
  Megaphone,
  MessageCircle,
  Settings,
  Tag,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
};

export const LINK_ICON_OPTIONS = [
  ["TrendingUp", "กราฟ"],
  ["CalendarDays", "ตาราง"],
  ["ClipboardCheck", "เช็คชื่อ"],
  ["ClipboardList", "ข้อมูล"],
  ["Dumbbell", "PT"],
  ["FileSignature", "สัญญา"],
  ["FileText", "ฟอร์ม"],
  ["Folder", "โฟลเดอร์"],
  ["Grid3x3", "หมวดหมู่"],
  ["Image", "Media"],
  ["Megaphone", "การตลาด"],
  ["MessageCircle", "แชท"],
  ["Settings", "ตั้งค่า"],
  ["Tag", "ราคา"],
  ["UserPlus", "สมาชิก"],
  ["Users", "ทีม"],
  ["Wallet", "เงิน"],
];

export function getIcon(iconKey) {
  return LINK_ICONS[iconKey] || FileText;
}

export const defaultCategories = [
  {
    id: "revenue",
    label: "รายรับ / รายจ่าย",
    description: "ยอดขาย คอมมิชชั่น ค่าใช้จ่าย",
    iconKey: "TrendingUp",
    items: [
      { label: "Gain Optima - Revenue", description: "ยอดวันนี้ + รายวันทั้งเดือน", iconKey: "TrendingUp", href: "https://docs.google.com/spreadsheets/d/11JY-u1njafkk_zIQSX4N-FQIRvvXGoTwR9MWkNkT3s4/edit" },
      { label: "คำนวณค่าคอม_PT", description: "คอมมิชชั่น PT ต่อลูกค้า", iconKey: "TrendingUp", href: "https://docs.google.com/spreadsheets/d/1cI4VGPDGgv1vvqWy2Rrtv7fTbBygAi_l9eaAl78M8hs/edit" },
      { label: "Expense Tracking", description: "เช็คลิสต์ค่าใช้จ่ายรายเดือน", iconKey: "Wallet", href: "https://docs.google.com/spreadsheets/d/13QUTSOoUkpCxTcgVsKu9RMXyT4PQQ-MhlByaWQXxIcg/edit" },
      { label: "การเงิน", description: "เอกสาร/หลักฐานการเงินใน Drive", iconKey: "Folder", href: "https://drive.google.com/drive/u/0/folders/1k4mOVMmZyY-vMOtOc4nXRJzjftGQIgDh" },
    ],
  },
  {
    id: "forms",
    label: "แบบฟอร์ม",
    description: "ฟอร์มสมัครและขอเบิกเงิน",
    iconKey: "FileText",
    items: [
      { label: "ฟอร์มสมัคร MB", description: "สมัครสมาชิก MB", iconKey: "UserPlus", href: "https://docs.google.com/forms/d/e/1FAIpQLSdpAkyz7xEH185jI7OHEH19JIut2jWloa8dm44pIzGW0EgC6g/viewform" },
      { label: "ฟอร์มสมัคร PT", description: "สมัครแพ็กเกจ PT", iconKey: "Dumbbell", href: "https://docs.google.com/forms/d/e/1FAIpQLSePqvl8De-2pAWmY61xVLQX-R0iRjUifkd_uBU18p9b5VKU3g/viewform" },
      { label: "ฟอร์มเบิกเงิน", description: "แบบฟอร์มขอเบิกเงิน", iconKey: "Wallet", href: "https://docs.google.com/forms/d/e/1FAIpQLScxE2zxvT-EwHF1pKdNtKByBZk54ehqwNYMEbi_CFttiI9IFQ/viewform" },
      { label: "บันทึกรายจ่าย", description: "ฟอร์มบันทึกรายจ่าย", iconKey: "Wallet", href: "https://docs.google.com/forms/d/e/1FAIpQLSfxy0U9FH1C7xgs52PK3dBB_9XRYm1dClmg1i6GvQcaS76zww/viewform" },
    ],
  },
  {
    id: "records",
    label: "หลังกรอกฟอร์ม",
    description: "ข้อมูลหลังปิดการขาย + รายการเบิก",
    iconKey: "ClipboardList",
    items: [
      { label: "หลังกรอก_PT/MB/เบิกเงิน", description: "ข้อมูลดิบหลังปิดการขาย", iconKey: "ClipboardList", href: "https://docs.google.com/spreadsheets/d/1OXyNdqlLjvT1lvfE-uIZSTaVqaUoe6VfKUgaY6xDjc0/edit" },
    ],
  },
  {
    id: "contracts",
    label: "สัญญา",
    description: "เอกสารสัญญา MB และ PT",
    iconKey: "FileSignature",
    items: [
      { label: "สัญญา MB", description: "เอกสารสัญญาสมาชิก MB", iconKey: "FileSignature", href: "https://docs.google.com/document/d/1ey2s60EYX9TZ_wu9oAQ1ZcM2Al2ULaAtWYtOLt916Yg/edit?usp=share_link" },
      { label: "สัญญา PT", description: "เอกสารสัญญาแพ็กเกจ PT", iconKey: "FileSignature", href: "https://docs.google.com/document/d/1nkHuz8ydD5jjrCZD_2zGuK_RacNCnt_RdHuP3fEzrps/edit?usp=sharing" },
    ],
  },
  {
    id: "attendance",
    label: "การเข้างาน",
    description: "เช็คชื่อเข้างานพนักงาน",
    iconKey: "Users",
    items: [
      { label: "เช็คชื่อทำงาน_DB", description: "ฟอร์มเช็คชื่อเข้างานดิบ", iconKey: "ClipboardCheck", href: "https://docs.google.com/spreadsheets/d/1xH5kKeXAqNaEZzheWAFZEKdQHbsMi55AipuoTkn_PoY/edit" },
      { label: "ตารางงาน", description: "ตารางเวรพนักงาน", iconKey: "CalendarDays", href: "https://docs.google.com/spreadsheets/d/1pS7S_LH7gjZ7wgWspvXSAZO9llpQVMa9TEbq3GnGvTo/edit?gid=161842714#gid=161842714" },
    ],
  },
  {
    id: "other",
    label: "การตลาด",
    description: "LINE, โฆษณา, Meta Business",
    iconKey: "Grid3x3",
    items: [
      { label: "LINE OA", description: "แจ้งเตือนลูกค้า", iconKey: "MessageCircle", href: "https://manager.line.biz/account/@053zeiuh" },
      { label: "Meta Ads", description: "แคมเปญโฆษณา", iconKey: "Megaphone", href: "https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=1661641184916973&business_id=1392220475703771&nav_entry_point=mbs_sub_nav" },
      { label: "Meta Business", description: "จัดการเพจและบัญชีธุรกิจ", iconKey: "Settings", href: "https://business.facebook.com/latest/home?global_scope_id=1392220475703771&business_id=1392220475703771&page_id=949179078279202&asset_id=949179078279202&redirect_session_id=3dd36a3d-4e15-4300-8817-028568037edd" },
      { label: "ราคาแพคเกจ/โปรโมชั่น", description: "ดูราคาและโปรโมชั่นล่าสุด", iconKey: "Tag", href: "https://canva.link/mdl0phvv8gblmcy" },
      { label: "คลัง Media", description: "ส่งงานคอนเทนต์ / ใช้ทำการตลาด", iconKey: "Image", href: "https://drive.google.com/drive/folders/1eHAvUBqEpAz5QBnoBJ1XGnCxbBXZIhfs?usp=share_link" },
    ],
  },
];

export const categories = defaultCategories;
