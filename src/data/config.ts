import { Mail, type LucideIcon } from "lucide-react";

export interface Social {
  name: string;
  url: string;
  icon: LucideIcon;
}

// GitHub and LinkedIn were dropped here: the template shipped with the original
// author's profiles. Add them back once the real URLs are known.
export const socials: Social[] = [
  {
    name: "Email",
    url: "mailto:nickyjacobo00@gmail.com",
    icon: Mail,
  },
];

export const siteConfig = {
  name: "Nicky Jacobo",
  title: "Senior Full Stack Developer",
  description:
    "Senior Full Stack Developer with over 10 years of front-end and back-end experience, building fast, responsive websites, plugins, and web applications.",
};
