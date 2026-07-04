/**
 * data.js
 * ---------------------------------------------------------------------------
 * منوی کافه — تنها فایلی که برای کارهای روزمره (اضافه/حذف/تغییر قیمت) نیاز
 * دارید ویرایش کنید. بقیه‌ی فایل‌های js فقط این داده رو می‌خونن و رندر می‌کنن.
 *
 * ساختار هر دسته:
 * {
 *   id:        شناسه‌ی یکتای انگلیسی بدون فاصله (مثلا 'coffee'). همین id هم
 *              برای لینک‌دهی به منوی بالا استفاده میشه و هم به‌عنوان کلاس
 *              رنگی (accent-coffee) در css/menu.css. اگه دسته‌ی جدیدت با
 *              یکی از رنگ‌های تعریف‌شده (coffee/cold/herbal/dessert/breakfast)
 *              مطابقت نداشته باشه، فقط رنگ طلاییِ پیش‌فرض رو می‌گیره — مشکلی
 *              پیش نمیاد، صرفاً رنگ اختصاصی نداره مگراینکه یکی به menu.css
 *              اضافه کنید (به کامنت‌های accent- توی اون فایل نگاه کنید).
 *   title:     عنوان فارسی دسته
 *   subtitle:  توضیح کوتاه زیر عنوان
 *   icon:      یکی از کلیدهای ICONS پایین همین فایل
 *   items:     آرایه‌ای از آیتم‌های منو (ساختار هر آیتم را پایین ببینید)
 * }
 *
 * ساختار هر آیتم:
 * {
 *   id:      شناسه‌ی یکتا (مثلا 'espresso') — برای سبد خرید استفاده میشه
 *   name:    نام فارسی
 *   desc:    توضیح کوتاه، اختیاری (بذارید '' اگه لازم نیست)
 *   price:   قیمت به تومان، فقط عدد، بدون کاما
 *   soldOut: true یا false — true یعنی به‌جای دکمه‌های تعداد، برچسب «ناموجود» نشون داده میشه
 * }
 * ---------------------------------------------------------------------------
 */

export const MENU = [
  {
    id: 'coffee',
    title: 'قهوه‌ها',
    subtitle: 'دم‌آوری تازه، هر فنجان',
    icon: 'coffee',
    items: [
      { id: 'espresso',           name: 'اسپرسو',            desc: '',                              price: 65000,  soldOut: false },
      { id: 'americano',          name: 'آمریکانو',           desc: '',                              price: 75000,  soldOut: false },
      { id: 'latte',               name: 'لاته',               desc: 'شیر بخارداده، لایه‌ی نرم فوم', price: 95000,  soldOut: false },
      { id: 'cappuccino',         name: 'کاپوچینو',           desc: '',                              price: 90000,  soldOut: false },
      { id: 'mocha',               name: 'موکا',               desc: 'اسپرسو، شکلات تلخ، شیر',       price: 105000, soldOut: false },
      { id: 'turkish',             name: 'قهوه‌ی ترک',         desc: '',                              price: 70000,  soldOut: false },
      { id: 'caramel-macchiato',  name: 'کارامل ماکیاتو',      desc: '',                              price: 110000, soldOut: false }
    ]
  },
  {
    id: 'cold',
    title: 'نوشیدنی‌های سرد',
    subtitle: 'خنک و ریفرش‌کننده',
    icon: 'cold',
    items: [
      { id: 'iced-latte',      name: 'آیس لاته',           desc: '',            price: 100000, soldOut: false },
      { id: 'iced-americano',  name: 'آیس آمریکانو',       desc: '',            price: 80000,  soldOut: false },
      { id: 'frappe',           name: 'فراپه شکلات',        desc: '',            price: 120000, soldOut: false },
      { id: 'lemonade',         name: 'لیموناد نعنا',       desc: '',            price: 85000,  soldOut: false },
      { id: 'mojito',           name: 'موهیتو توت‌فرنگی',   desc: 'بدون الکل',   price: 95000,  soldOut: false }
    ]
  },
  {
    id: 'herbal',
    title: 'دمنوش‌ها',
    subtitle: 'گرم و آرام‌بخش',
    icon: 'herbal',
    items: [
      { id: 'orange-blossom',      name: 'دمنوش بهارنارنج',     desc: '', price: 60000,  soldOut: false },
      { id: 'cardamom-cinnamon',   name: 'دمنوش هل و دارچین',   desc: '', price: 60000,  soldOut: false },
      { id: 'masala',               name: 'چای ماسالا',          desc: '', price: 70000,  soldOut: false },
      { id: 'matcha',               name: 'ماچا لاته',           desc: '', price: 105000, soldOut: false }
    ]
  },
  {
    id: 'dessert',
    title: 'دسر و شیرینی',
    subtitle: 'همراه فنجان بعدی‌تان',
    icon: 'dessert',
    items: [
      { id: 'cheesecake',  name: 'چیزکیک نیویورکی', desc: '', price: 120000, soldOut: false },
      { id: 'brownie',      name: 'براونی گردویی',    desc: '', price: 95000,  soldOut: false },
      { id: 'tiramisu',     name: 'تیرامیسو',          desc: '', price: 115000, soldOut: true  },
      { id: 'cookie',       name: 'کوکی شکلاتی',       desc: '', price: 65000,  soldOut: false },
      { id: 'croissant',    name: 'کروسان کره‌ای',     desc: '', price: 75000,  soldOut: false }
    ]
  },
  {
    id: 'breakfast',
    title: 'صبحانه‌ی سبک',
    subtitle: 'شروعی آرام برای روز',
    icon: 'breakfast',
    items: [
      { id: 'omelette',      name: 'املت سوین',                       desc: 'تخم‌مرغ، گوجه، فلفل دلمه', price: 130000, soldOut: false },
      { id: 'bread-cheese',  name: 'نان و پنیر و گردو',                 desc: '',                          price: 90000,  soldOut: false },
      { id: 'pb-sandwich',   name: 'ساندویچ کره‌بادام‌زمینی و موز',     desc: '',                          price: 105000, soldOut: false }
    ]
  }
];

/** مجموعه‌ی آیکون‌های آماده. برای دسته‌ی جدید، یه ورودی svg مسیر جدید اینجا اضافه کن. */
export const ICONS = {
  coffee: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3c0 1-1 1-1 2s1 1 1 2M12 3c0 1-1 1-1 2s1 1 1 2"/>',
  cold: '<path d="M12 2v20M4.5 6l15 12M19.5 6l-15 12M2 12h20"/>',
  herbal: '<path d="M12 21c-4-2-7-6-7-11a7 7 0 0 1 14 0c0 5-3 9-7 11Z"/><path d="M12 21V9"/>',
  dessert: '<path d="M3 10l9-6 9 6-9 6-9-6Z"/><path d="M3 10v6l9 6 9-6v-6"/>',
  breakfast: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
  default: '<circle cx="12" cy="12" r="8"/>'
};
