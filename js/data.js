// ─────────────────────────────────────────────────────────────────
// ساختار هر دسته:
// {
//   id: string,        // شناسه یکتا انگلیسی (برای CSS: accent-coffee)
//   title: string,     // عنوان فارسی
//   subtitle: string,  // توضیح کوتاه
//   icon: string,      // کلید آیکن از ICONS
//   items: []          // آرایه آیتم‌های منو
// }
//
// ساختار هر آیتم:
// {
//   id: string,        // شناسه یکتا
//   name: string,      // نام فارسی
//   desc: string,      // توضیح کوتاه (می‌تواند خالی باشد)
//   price: number,     // قیمت به تومان
//   soldOut: boolean   // ناموجود؟
// }
// ─────────────────────────────────────────────────────────────────

export const MENU = [
  {
    id: 'herbal',
    title: 'چای و دمنوش',
    subtitle: 'گرم و آرام‌بخش',
    icon: 'herbal',
    items: [
      { id: 'tea-plain', name: 'چای ساده', desc: '', price: 60000, soldOut: false },
      { id: 'tea-green', name: 'چای سبز', desc: '', price: 60000, soldOut: false },
      { id: 'tea-sour', name: 'چای ترش', desc: '', price: 60000, soldOut: false },
      { id: 'tea-saffron', name: 'چای زعفران', desc: '', price: 75000, soldOut: false },
      { id: 'tea-cardamom-cinnamon', name: 'چای هل و دارچین', desc: '', price: 85000, soldOut: false },
      { id: 'tea-earl-grey', name: 'چای ارلانگ', desc: '', price: 95000, soldOut: false },
      { id: 'herbal-orange-blossom', name: 'دمنوش بهارنارنج', desc: '', price: 95000, soldOut: false },
      { id: 'herbal-borage', name: 'دمنوش گل گاو زبان', desc: '', price: 95000, soldOut: false },
      { id: 'herbal-health-nights', name: 'دمنوش شب های سلامت', desc: '', price: 100000, soldOut: false },
      { id: 'herbal-health', name: 'دمنوش سلامت', desc: '', price: 100000, soldOut: false },
    ],
  },
  {
    id: 'smoothie',
    title: 'اسموتی',
    subtitle: 'میوه‌ای و سرد',
    icon: 'cold',
    items: [
      { id: 'smoothie-orange', name: 'اسموتی پرتغال', desc: '', price: 180000, soldOut: false },
      { id: 'smoothie-sour', name: 'اسموتی ترش', desc: '', price: 180000, soldOut: false },
      { id: 'smoothie-apple', name: 'اسموتی سیب', desc: '', price: 180000, soldOut: false },
      { id: 'smoothie-coastal', name: 'اسموتی ساحلی', desc: '', price: 220000, soldOut: false },
    ],
  },
  {
    id: 'dessert',
    title: 'کیک و دسر',
    subtitle: 'همراه فنجان بعدی‌تان',
    icon: 'dessert',
    items: [
      { id: 'cake-daily', name: 'کیک روز', desc: '', price: 150000, soldOut: false },
      { id: 'cake-icecream', name: 'کیک و بستنی', desc: '', price: 240000, soldOut: false },
      { id: 'icecream-triple', name: 'بستنی (سه اسکوپ)', desc: '', price: 250000, soldOut: false },
      { id: 'milk-banana', name: 'شیر موز', desc: '', price: 200000, soldOut: false },
      { id: 'milk-coconut', name: 'شیر نارگیل', desc: '', price: 220000, soldOut: false },
    ],
  },
  {
    id: 'shake',
    title: 'شیک',
    subtitle: 'خامه‌ای و خوشمزه',
    icon: 'cold',
    items: [
      { id: 'shake-vanilla', name: 'وانیل', desc: '', price: 250000, soldOut: false },
      { id: 'shake-chocolate', name: 'شکلات', desc: '', price: 250000, soldOut: false },
      { id: 'shake-strawberry', name: 'توت فرنگی', desc: '', price: 250000, soldOut: false },
      { id: 'shake-banana-walnut', name: 'موز گردو', desc: '', price: 290000, soldOut: false },
      { id: 'shake-nutella', name: 'نوتلا', desc: '', price: 290000, soldOut: false },
      { id: 'shake-baklava', name: 'باقلوا', desc: '', price: 290000, soldOut: false },
      { id: 'shake-banana-nutella', name: 'موز نوتلا', desc: '', price: 320000, soldOut: false },
      { id: 'shake-banana-chocolate', name: 'موز شکلات', desc: '', price: 290000, soldOut: false },
      { id: 'shake-tiramisu', name: 'تیرامیسو', desc: '', price: 290000, soldOut: false },
      { id: 'shake-chocolate-hazelnut', name: 'شکلات فندق', desc: '', price: 290000, soldOut: false },
      { id: 'shake-coffee', name: 'قهوه', desc: '', price: 250000, soldOut: false },
      { id: 'shake-strawberry-nutella', name: 'توت فرنگی نوتلا', desc: '', price: 320000, soldOut: false },
      { id: 'shake-peanut', name: 'بادام زمینی', desc: '', price: 280000, soldOut: false },
      { id: 'shake-nutella-peanut', name: 'نوتلا بادام زمینی', desc: '', price: 320000, soldOut: false },
      { id: 'shake-lotus', name: 'لوتوس', desc: '', price: 320000, soldOut: false },
    ],
  },
  {
    id: 'mocktail',
    title: 'موکتل',
    subtitle: 'تازه و رنگی',
    icon: 'cold',
    items: [
      { id: 'mocktail-redbull', name: 'ردبلو', desc: '', price: 200000, soldOut: false },
      { id: 'mocktail-lotus', name: 'لوتوس', desc: '', price: 200000, soldOut: false },
      { id: 'mocktail-mai-tai', name: 'مای تای', desc: '', price: 210000, soldOut: false },
      { id: 'mocktail-pink-berry', name: 'پینک بری', desc: '', price: 210000, soldOut: false },
      { id: 'mocktail-mojito', name: 'موهیتو', desc: '', price: 200000, soldOut: false },
      { id: 'mocktail-lemonade', name: 'لیموناد', desc: '', price: 190000, soldOut: false },
      { id: 'mocktail-hype-cool', name: 'هایپ کول', desc: '', price: 250000, soldOut: false },
    ],
  },
  {
    id: 'coffee-hot',
    title: 'نوشیدنی گرم بر پایه قهوه',
    subtitle: 'دم‌آوری تازه، هر فنجان',
    icon: 'coffee',
    items: [
      { id: 'espresso-single', name: 'سینگل', desc: '', price: 80000, soldOut: false },
      { id: 'espresso-double', name: 'دبل', desc: '', price: 90000, soldOut: false },
      { id: 'americano', name: 'آمریکانو', desc: '', price: 90000, soldOut: false },
      { id: 'honey-moon', name: 'هانی مون', desc: '', price: 200000, soldOut: false },
      { id: 'cappuccino', name: 'کاپوچینو', desc: '', price: 180000, soldOut: false },
      { id: 'flat-white', name: 'فلت وایت', desc: '', price: 310000, soldOut: false },
      { id: 'hazelnut-macchiato', name: 'هیزل نات ماکیاتو', desc: '', price: 230000, soldOut: false },
      { id: 'mocha', name: 'موکا', desc: '', price: 230000, soldOut: false },
      { id: 'caramel-macchiato', name: 'کارامل ماکیاتو', desc: '', price: 230000, soldOut: false },
      { id: 'mochaccino', name: 'موکاچینو', desc: '', price: 230000, soldOut: false },
      { id: 'latte', name: 'لاته', desc: '', price: 200000, soldOut: false },
      { id: 'spanish-latte', name: 'لاته اسپانیایی', desc: '', price: 230000, soldOut: false },
      { id: 'black-latte', name: 'بلک لاته', desc: '', price: 190000, soldOut: false },
    ],
  },
  {
    id: 'coffee-brew',
    title: 'قهوه دمی',
    subtitle: 'روش‌های سنتی',
    icon: 'coffee',
    items: [
      { id: 'chemex', name: 'کِمِکس', desc: '', price: 170000, soldOut: false },
      { id: 'french-press', name: 'فرانسه', desc: '', price: 120000, soldOut: false },
      { id: 'turkish', name: 'ترک', desc: '', price: 110000, soldOut: false },
      { id: 'greek', name: 'یونانی', desc: '', price: 140000, soldOut: false },
    ],
  },
  {
    id: 'coffee-cold',
    title: 'نوشیدنی سرد بر پایه قهوه',
    subtitle: 'خنک و انرژی‌بخش',
    icon: 'cold',
    items: [
      { id: 'iced-americano', name: 'آیس آمریکانو', desc: '', price: 90000, soldOut: false },
      { id: 'iced-latte', name: 'آیس لاته', desc: '', price: 200000, soldOut: false },
      { id: 'iced-caramel', name: 'آیس کارامل', desc: '', price: 230000, soldOut: false },
      { id: 'iced-mocha', name: 'آیس موکا', desc: '', price: 230000, soldOut: false },
      { id: 'iced-bina', name: 'آیس بینا', desc: '', price: 230000, soldOut: false },
      { id: 'affogato', name: 'آفوگاتو', desc: '', price: 230000, soldOut: false },
      { id: 'affo-chocolate', name: 'آفو چاکلت', desc: '', price: 230000, soldOut: false },
      { id: 'frappe', name: 'فرآپه', desc: '', price: 290000, soldOut: false },
      { id: 'frappuccino', name: 'فراپاچینو', desc: '', price: 290000, soldOut: false },
      { id: 'coke-espresso', name: 'کوک اسپرسو', desc: '', price: 230000, soldOut: false },
      { id: 'hype-espresso', name: 'هایپ اسپرسو', desc: '', price: 290000, soldOut: false },
    ],
  },
  {
    id: 'milk-hot',
    title: 'نوشیدنی گرم بر پایه شیر',
    subtitle: 'نرم و گرم',
    icon: 'coffee',
    items: [
      { id: 'hot-chocolate', name: 'هات چاکلت', desc: '', price: 210000, soldOut: false },
      { id: 'white-chocolate', name: 'وایت چاکلت', desc: '', price: 210000, soldOut: false },
      { id: 'pink-chocolate', name: 'پینک چاکلت', desc: '', price: 210000, soldOut: false },
      { id: 'hazelnut-chocolate', name: 'هیزل نات چاکلت', desc: '', price: 240000, soldOut: false },
      { id: 'masala-tea', name: 'چای ماسالا', desc: '', price: 220000, soldOut: false },
      { id: 'milk-honey-cinnamon', name: 'شیر عسل دارچین', desc: '', price: 160000, soldOut: false },
      { id: 'milk-nescafe', name: 'شیر نسکافه', desc: '', price: 170000, soldOut: false },
      { id: 'karak-tea', name: 'چای کِرَک', desc: '', price: 240000, soldOut: false },
    ],
  },
  {
    id: 'sandwich',
    title: 'ساندویچ',
    subtitle: 'سیر و خوشمزه',
    icon: 'breakfast',
    items: [
      { id: 'sandwich-special', name: 'مخصوص(بمب)', desc: '', price: 665000, soldOut: false },
      { id: 'sandwich-roastbeef', name: 'رست بیف', desc: '', price: 895000, soldOut: false },
      { id: 'sandwich-hotdog-mushroom-cheese', name: 'هات داگ با قارچ و پنیر', desc: '', price: 390000, soldOut: false },
      { id: 'sandwich-turkish-kebab', name: 'کباب ترکی', desc: '', price: 0, soldOut: true },
      { id: 'sandwich-cold', name: 'سرد', desc: '', price: 350000, soldOut: false },
    ],
  },
  {
    id: 'burger',
    title: 'برگرها',
    subtitle: 'تازه و داغ',
    icon: 'breakfast',
    items: [
      { id: 'burger-classic', name: 'کلاسیک', desc: '', price: 320000, soldOut: false },
      { id: 'burger-cheese', name: 'چیز برگر', desc: '', price: 386000, soldOut: false },
      { id: 'burger-double', name: 'دوبل برگر', desc: '', price: 465000, soldOut: false },
      { id: 'burger-special', name: 'ویژه', desc: '', price: 587000, soldOut: false },
      { id: 'burger-royal', name: 'رویال برگر', desc: '', price: 470000, soldOut: false },
      { id: 'burger-cheese-mushroom', name: 'چیز برگر با قارچ و پنیر', desc: '', price: 495000, soldOut: false },
      { id: 'burger-mushroom', name: 'ماشروم برگر', desc: '', price: 385000, soldOut: false },
    ],
  },
  {
    id: 'pizza',
    title: 'پیتزا',
    subtitle: 'تازه از فر',
    icon: 'breakfast',
    items: [
      { id: 'pizza-special', name: 'پیتزا مخصوص', desc: '', price: 495000, soldOut: false },
      { id: 'pizza-mushroom-cheese', name: 'قارچ و پنیر', desc: '', price: 0, soldOut: true },
      { id: 'pizza-pepperoni', name: 'پپرونی', desc: '', price: 445000, soldOut: false },
      { id: 'pizza-mushroom-meat', name: 'قارچ و گوشت', desc: '', price: 0, soldOut: true },
      { id: 'pizza-mushroom-hotdog', name: 'قارچ و هات داگ', desc: '', price: 385000, soldOut: false },
      { id: 'pizza-vegetable', name: 'سبزیجات', desc: '', price: 315000, soldOut: false },
      { id: 'pizza-four-seasons', name: 'چهار فصل', desc: '', price: 0, soldOut: true },
      { id: 'pizza-roastbeef', name: 'رست بیف', desc: '', price: 995000, soldOut: false },
    ],
  },
  {
    id: 'appetizer',
    title: 'پیش غذا',
    subtitle: 'شروع خوب',
    icon: 'breakfast',
    items: [
      { id: 'fries', name: 'سیب زمینی', desc: '', price: 165000, soldOut: false },
      { id: 'mushroom-fried', name: 'قارچ سوخاری', desc: '', price: 0, soldOut: true },
      { id: 'fries-mushroom-cheese', name: 'سیب زمینی با قارچ و پنیر', desc: '', price: 335000, soldOut: false },
      { id: 'fries-special', name: 'سیب زمینی ویژه', desc: '', price: 428000, soldOut: false },
      { id: 'fries-sausage', name: 'سیب سوسیس', desc: '', price: 283000, soldOut: false },
      { id: 'fries-fillet', name: 'سیب فیله', desc: '', price: 485000, soldOut: false },
      { id: 'pasta-alfredo', name: 'پاستا آلفردو', desc: '', price: 510000, soldOut: false },
      { id: 'salad-caesar', name: 'سالاد سزار', desc: '', price: 450000, soldOut: false },
      { id: 'salad-classic', name: 'سالاد فصل کلاسیک', desc: '', price: 276000, soldOut: false },
      { id: 'salad-melograno', name: 'سالاد ملوگرانو', desc: '', price: 200000, soldOut: false },
    ],
  },
  {
    id: 'hookah',
    title: 'قلیان',
    subtitle: 'طعم‌های مختلف',
    icon: 'default',
    items: [
      { id: 'hookah-double-apple', name: 'دوسیب', desc: '', price: 200000, soldOut: false },
      { id: 'hookah-double-apple-mint', name: 'دوسیب نعنا', desc: '', price: 200000, soldOut: false },
      { id: 'hookah-lady-killer', name: 'لیدی کیلر', desc: '', price: 180000, soldOut: false },
      { id: 'hookah-moscow-nights', name: 'شب های موسکو', desc: '', price: 180000, soldOut: false },
    ],
  },
];

export const ICONS = {
  coffee: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3c0 1-1 1-1 2s1 1 1 2M12 3c0 1-1 1-1 2s1 1 1 2"/>',
  cold: '<path d="M12 2v20M4.5 6l15 12M19.5 6l-15 12M2 12h20"/>',
  herbal: '<path d="M12 21c-4-2-7-6-7-11a7 7 0 0 1 14 0c0 5-3 9-7 11Z"/><path d="M12 21V9"/>',
  dessert: '<path d="M3 10l9-6 9 6-9 6-9-6Z"/><path d="M3 10v6l9 6 9-6v-6"/>',
  breakfast: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
  default: '<circle cx="12" cy="12" r="8"/>',
};
