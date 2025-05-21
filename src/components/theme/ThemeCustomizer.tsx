"use client";

import { Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For color input if needed, but using predefined for now
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeContext';
import type { ThemeSettings } from '@/lib/types';
import { DEFAULT_THEME } from '@/lib/types';

interface ColorOption {
  name: string;
  value: string; // HSL string
}

const colorOptions: Record<keyof ThemeSettings, ColorOption[]> = {
  primaryColor: [
    { name: 'Slate Blue (Default)', value: DEFAULT_THEME.primaryColor },
    { name: 'Forest Green', value: '120 60% 30%' },
    { name: 'Crimson Red', value: '0 70% 50%' },
    { name: 'Royal Purple', value: '270 60% 50%' },
  ],
  accentColor: [
    { name: 'Soft Lavender (Default)', value: DEFAULT_THEME.accentColor },
    { name: 'Light Gold', value: '50 80% 70%' },
    { name: 'Sky Blue', value: '200 80% 70%' },
    { name: 'Pale Pink', value: '340 80% 80%' },
  ],
  backgroundColor: [
    { name: 'Light Gray (Default)', value: DEFAULT_THEME.backgroundColor },
    { name: 'Off-White', value: '30 20% 98%' },
    { name: 'Dark Slate', value: '210 10% 15%' }, // Example Dark Mode BG
  ],
  foregroundColor: [
    { name: 'Dark Slate Gray (Default)', value: DEFAULT_THEME.foregroundColor },
    { name: 'Charcoal', value: '0 0% 20%' },
    { name: 'Light Gray (for Dark BG)', value: '210 10% 85%' }, // Example Dark Mode FG
  ],
};


interface ThemeCustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeCustomizer({ open, onOpenChange }: ThemeCustomizerProps) {
  const theme = useTheme();

  const handleColorChange = (property: keyof ThemeSettings, value: string) => {
    theme.setTheme({ [property]: value });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[350px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Paintbrush className="h-5 w-5" />
            Customize Theme
          </SheetTitle>
          <SheetDescription>
            Adjust the colors of your Chronicle Canvas experience. Changes are saved locally.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          {(Object.keys(colorOptions) as Array<keyof ThemeSettings>).map((key) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {colorOptions[key].map((option) => (
                  <Button
                    key={option.value}
                    variant={theme[key] === option.value ? 'default' : 'outline'}
                    onClick={() => handleColorChange(key, option.value)}
                    className="h-auto p-2 text-xs flex-col items-start"
                  >
                    <div
                      className="w-full h-8 rounded-md mb-1 border"
                      style={{ backgroundColor: `hsl(${option.value})` }}
                    />
                    {option.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <SheetFooter className="mt-auto">
          <Button variant="outline" onClick={theme.resetTheme} className="mr-2">
            Reset to Default
          </Button>
          <SheetClose asChild>
            <Button>Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
