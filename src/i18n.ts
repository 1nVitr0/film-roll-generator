import messages from "@intlify/unplugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";

export const AVAILABLE_LOCALES = ["en-US", "de-DE"];

export const i18n = createI18n({
  legacy: false,
  locale: navigator.languages.find((locale) => AVAILABLE_LOCALES.includes(locale)) || "en-US",
  messages,
  numberFormats: {
    "de-DE": {
      currency: {
        currency: "EUR",
        currencyDisplay: "symbol",
        style: "currency",
      },
      compact: {
        notation: "compact",
        compactDisplay: "short",
      },
      percent: {
        style: "percent",
        useGrouping: false,
      },
    },
    "en-US": {
      currency: {
        currency: "EUR",
        style: "currency",
      },
      compact: {
        notation: "compact",
        compactDisplay: "short",
      },
      percent: {
        style: "percent",
        useGrouping: false,
      },
    },
  },
  datetimeFormats: {
    "de-DE": {
      shortDate: {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      },
      shortTime: {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      },
      shortDateTime: {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      },
      mediumDate: {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
      mediumTime: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      },
      mediumDateTime: {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      },
      longDate: {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
      longTime: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
        hour12: false,
      },
      longDateTime: {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
        hour12: false,
      },
    },
    "en-US": {
      shortDate: {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      },
      shortTime: {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      },
      shortDateTime: {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      },
      mediumDate: {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
      mediumTime: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      },
      mediumDateTime: {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      },
      longDate: {
        month: "long",
        day: "numeric",
        year: "numeric",
      },
      longTime: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
        hour12: true,
      },
      longDateTime: {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
        hour12: true,
      },
    },
  },
});
