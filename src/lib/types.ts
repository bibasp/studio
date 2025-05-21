export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string; // Full content for AI summary generation
  author: string;
  date: string; // ISO 8601 string format
  tags: string[];
  summary: string;
  imageUrl?: string;
}

export interface ThemeSettings {
  primaryColor: string; // HSL string e.g., "210 14% 57%"
  accentColor: string;  // HSL string
  backgroundColor: string; // HSL string
  foregroundColor: string; // HSL string
}

export const DEFAULT_THEME: ThemeSettings = {
  backgroundColor: "208 100% 97%", // Light Gray (AliceBlue)
  foregroundColor: "220 20% 15%",   // Dark Cool Gray - Improved Contrast
  primaryColor: "210 14% 57%",     // Slate Blue
  accentColor: "240 67% 94%",      // Soft Lavender
};
