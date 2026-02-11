import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // --- Navbar Keys ---
      symbol_text: "A SYMBOL OF QUALITY GOODS",
      search_placeholder: "Search Vivid Valley...",
      login: "Login",
      cart: "Cart",
      language_en: "English",
      language_bn: "Bangla",

      // --- About Us Keys ---
      about_title: "ABOUT US",
      tagline: "A Symbol of Quality Goods",
      who_we_are: "Who We Are",
      description:
        "Vivid Valley is a premier global e-commerce platform dedicated to delivering high-quality goods across borders. From fashion to electronics, we connect customers with premium products from around the world. With operations spanning the USA, Italy, and Bangladesh, we ensure a seamless shopping experience with top-notch support.",
      hq_location: "Global HQ: Jamaica, NY, USA",
      vivid_numbers: "Vivid Valley in Numbers",
      years_service: "Years of Service",
      global_branches: "Global Branches",
      users: "Users",
      support: "Support",
      get_know_us: "Get to Know Us",
      know_desc:
        "Our journey, our global presence, and the values that drive us.",
      our_story_title: "Our Story",
      our_story_content:
        "Vivid Valley started with a simple vision: to bridge the gap between quality manufacturers and global consumers. What began as a small initiative has grown into a multi-national e-commerce hub.",
      global_reach_title: "Global Reach",
      global_reach_content:
        "We have established a robust logistics network that spans three continents. Our strategic presence in New York, Bologna, and Dhaka allows us to source the best products.",
      customer_promise_title: "Customer Promise",
      customer_promise_content:
        "At Vivid Valley, the customer comes first. We are committed to providing a secure shopping environment and 24/7 customer support.",
      our_locations: "Our Global Branches",
      locations_desc:
        "Vivid Valley operates internationally to serve you better.",
      branch_usa: "OFFICE 1 (USA)",
      branch_italy: "OFFICE 2 (Italy)",
      branch_bd: "OFFICE 3 (Bangladesh)",
      what_we_offer: "What We Offer",
      offer_desc: "Quality goods for every aspect of your life.",
      strategy_title: "Company Strategy",
      strategy_desc: "Guided by excellence, driven by innovation.",
      strat_quality: "Quality First",
      strat_quality_desc:
        "We curate our collection with a strict focus on quality.",
      strat_mission: "Our Mission",
      strat_mission_desc:
        "To become the world's most trusted destination for discovering unique goods.",
      strat_innovation: "Innovation",
      strat_innovation_desc:
        "Leveraging the latest e-commerce technology for a smooth journey.",
      strat_growth: "Growth",
      strat_growth_desc:
        "Expanding our global footprint to bring more quality products.",
      get_in_touch: "Get in Touch",
      main_office: "Head Office",
      email_us: "Email Us",
      call_us: "Call Us",
      send_msg: "Send us a Message",
      form_name: "Name",
      form_email: "Email",
      form_msg: "Message",
      btn_send: "Send Message",
    },
  },
  bn: {
    translation: {
      //  Navbar Keys
      // symbol_text: "গুণগত মানের প্রতীক",
      search_placeholder: "ভিভিড ভ্যালি খুঁজুন",
      login: "লগইন",
      cart: "কার্ট",
      language_en: "English",
      language_bn: "বাংলা",

      // --- About Us Keys ---
      about_title: "আমাদের সম্পর্কে",
      tagline: "গুণমান সম্পন্ন পণ্যের প্রতীক",
      who_we_are: "আমরা কারা",
      description:
        "ভিভিড ভ্যালি একটি শীর্ষস্থানীয় গ্লোবাল ই-কমার্স প্ল্যাটফর্ম যা সীমানা পেরিয়ে উচ্চমানের পণ্য সরবরাহে নিবেদিত। ফ্যাশন থেকে শুরু করে ইলেকট্রনিক্স পর্যন্ত, আমরা গ্রাহকদের বিশ্বের সেরা পণ্যগুলোর সাথে সংযুক্ত করি। আমেরিকা, ইতালি এবং বাংলাদেশে কার্যক্রম পরিচালনার মাধ্যমে আমরা সেরা সাপোর্টের সাথে একটি নিরবচ্ছিন্ন শপিং অভিজ্ঞতা নিশ্চিত করি।",
      hq_location: "গ্লোবাল হেডকোয়ার্টার: জ্যামাইকা, নিউ ইয়র্ক, আমেরিকা",
      vivid_numbers: "সংখ্যায় ভিভিড ভ্যালি",
      years_service: "সেবার বছর",
      global_branches: "গ্লোবাল শাখা",
      users: "ব্যাবহারকারী ",
      support: "সাপোর্ট",
      get_know_us: "আমাদের জানুন",
      know_desc:
        "আমাদের যাত্রা, আমাদের বিশ্বব্যাপী উপস্থিতি এবং যে মূল্যবোধ আমাদের পরিচালিত করে।",
      our_story_title: "আমাদের গল্প",
      our_story_content:
        "ভিভিড ভ্যালি একটি সাধারণ লক্ষ্য নিয়ে শুরু হয়েছিল: মানসম্পন্ন প্রস্তুতকারক এবং বিশ্বব্যাপী গ্রাহকদের মধ্যে দূরত্ব কমানো। যা একটি ছোট উদ্যোগ হিসেবে শুরু হয়েছিল তা আজ একটি বহুজাতিক ই-কমার্স হাবে পরিণত হয়েছে।",
      global_reach_title: "বিশ্বব্যাপী উপস্থিতি",
      global_reach_content:
        "আমরা তিনটি মহাদেশ জুড়ে একটি শক্তিশালী লজিস্টিক নেটওয়ার্ক স্থাপন করেছি। নিউ ইয়র্ক, বোলোগনা এবং ঢাকায় আমাদের কৌশলগত উপস্থিতি আমাদের সেরা পণ্য সোর্স করতে সাহায্য করে।",
      customer_promise_title: "গ্রাহকের প্রতি প্রতিশ্রুতি",
      customer_promise_content:
        "ভিভিড ভ্যালিতে গ্রাহকই সবার আগে। আমরা একটি নিরাপদ শপিং পরিবেশ এবং ২৪/৭ গ্রাহক সেবা প্রদানে প্রতিশ্রুতিবদ্ধ।",
      our_locations: "আমাদের শাখাসমূহ",
      locations_desc:
        "আপনাদের আরও ভালো সেবা দিতে ভিভিড ভ্যালি আন্তর্জাতিকভাবে কাজ করছে।",
      branch_usa: "শাখা ১ (আমেরিকা)",
      branch_italy: "শাখা ২ (ইতালি)",
      branch_bd: "শাখা ৩ (বাংলাদেশ)",
      what_we_offer: "আমরা যা অফার করি",
      offer_desc: "আপনার জীবনের প্রতিটি ক্ষেত্রের জন্য মানসম্পন্ন পণ্য।",
      strategy_title: "কোম্পানির কৌশল",
      strategy_desc: "শ্রেষ্ঠত্ব দ্বারা নির্দেশিত, উদ্ভাবন দ্বারা চালিত।",
      strat_quality: "গুণমান সবার আগে",
      strat_quality_desc:
        "আমরা আমাদের কালেকশন কঠোরভাবে গুণমানের উপর ফোকাস করে তৈরি করি।",
      strat_mission: "আমাদের লক্ষ্য",
      strat_mission_desc:
        "অনন্য পণ্য খুঁজে পাওয়ার জন্য বিশ্বের সবচেয়ে বিশ্বস্ত গন্তব্য হয়ে ওঠা।",
      strat_innovation: "উদ্ভাবন",
      strat_innovation_desc:
        "একটি মসৃণ কেনাকাটার অভিজ্ঞতার জন্য আধুনিক ই-কমার্স প্রযুক্তি ব্যবহার করা।",
      strat_growth: "প্রবৃদ্ধি",
      strat_growth_desc:
        "বিশ্বজুড়ে আরও বেশি মানুষের কাছে মানসম্পন্ন পণ্য পৌঁছে দিতে আমাদের কার্যক্রম বিস্তার করা।",
      get_in_touch: "যোগাযোগ করুন",
      main_office: "প্রধান অফিস",
      email_us: "ইমেল করুন",
      call_us: "কল করুন",
      send_msg: "আমাদের মেসেজ পাঠান",
      form_name: "নাম",
      form_email: "ইমেল",
      form_msg: "মেসেজ",
      btn_send: "মেসেজ পাঠান",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
