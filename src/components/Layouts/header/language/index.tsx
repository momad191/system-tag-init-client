"use client";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import GetDefaultLanguage from "@/lib/getDefaultLanguage";
import GetDefaultFlag from "@/lib/GetDefaultFlag";

export function Language() {
  // Language
  const t = useTranslations("Language");
  const [current_language, setCurrent_Language] = useState("Arabic");
  const [current_Flag, setCurrent_Flag] = useState(
    "https://flagcdn.com/w40/gb.png",
  );
  const languages = [
    { name: t("Arabic"), code: "ar", flag: "https://flagcdn.com/w40/sa.png" },
    { name: t("English"), code: "en", flag: "https://flagcdn.com/w40/gb.png" },
  ];
  const [selected, setSelected] = useState(languages[0]);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setSystemLanguage = async (L: string, flag: string) => {
    await Cookies.set("lng", L);
    await Cookies.set("flag", flag);
    window.location.href = "/";
  };

  useEffect(() => {
    const lang = GetDefaultLanguage();
    setCurrent_Language(lang);
    const flag = GetDefaultFlag();
    setCurrent_Flag(flag);
  }, [current_language, current_Flag]);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div className="relative cursor-pointer p-1">
        <button
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center gap-2 rounded-3xl  p-2 px-2 py-2 text-sm font-bold md:text-base"
        >
          <img
            src={current_Flag}
            alt={current_language}
            className="h-4 w-5 rounded"
          />
          <span>{t("language")}</span>
          <FaChevronDown className="h-4 w-4" />
        </button>
        {open && (
          <ul className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-lg bg-white text-black shadow-lg">
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => {
                  setSelected(lang);
                  setSystemLanguage(lang.code, lang.flag);
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="h-4 w-5 rounded"
                />
                <span className="text-sm">{lang.name} </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
