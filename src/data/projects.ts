import type { StaticImageData } from "next/image";

import blueCrossPhilippines from "../portfolio_images/Blue Cross Philippines.jpg";
import coulsonAndCoRealEstate from "../portfolio_images/Coulson and Co Real Estate.jpg";
import denovansRealEstate from "../portfolio_images/Denovans Real Estate.png";
import heatMapDashboardThingsboard from "../portfolio_images/Heat Map Dashboard - Thingsboard.png";
import megaPhilippines from "../portfolio_images/MEGA Philippines INC.jpg";
import mercyConnectConsultation from "../portfolio_images/Mercy Connect Consultation.png";
import oneLastPintMobileApp from "../portfolio_images/One Last Pint Mobile App.jpg";
import swosh from "../portfolio_images/SWOSH.jpg";
import tissueDispenserDashboardThingsboard from "../portfolio_images/Tissue Dispenser Dashboard - Thingsboard.png";
import worldTradeCenterMetroManila from "../portfolio_images/World Trade Center Metro Manila.jpg";

export interface Project {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  deviceType: "desktop" | "mobile";
  bgColor?: string;
  screenshots?: Array<string | StaticImageData>;
}

const portfolioProject = (
  id: string,
  title: string,
  image: StaticImageData,
): Project => ({
  id,
  title,
  featured: true,
  deviceType: "desktop",
  screenshots: [image],
});

export const projects: Project[] = [
  portfolioProject(
    "heat-map-dashboard-thingsboard",
    "Heat Map Dashboard - Thingsboard",
    heatMapDashboardThingsboard,
  ),
  portfolioProject(
    "blue-cross-philippines",
    "Blue Cross Philippines",
    blueCrossPhilippines,
  ),
  portfolioProject(
    "coulson-and-co-real-estate",
    "Coulson and Co Real Estate",
    coulsonAndCoRealEstate,
  ),
  portfolioProject(
    "denovans-real-estate",
    "Denovans Real Estate",
    denovansRealEstate,
  ),
  portfolioProject(
    "mega-philippines-inc",
    "MEGA Philippines INC",
    megaPhilippines,
  ),
  portfolioProject(
    "mercy-connect-consultation",
    "Mercy Connect Consultation",
    mercyConnectConsultation,
  ),
  portfolioProject(
    "one-last-pint-mobile-app",
    "One Last Pint Mobile App",
    oneLastPintMobileApp,
  ),
  portfolioProject("swosh", "SWOSH", swosh),
  portfolioProject(
    "tissue-dispenser-dashboard-thingsboard",
    "Tissue Dispenser Dashboard - Thingsboard",
    tissueDispenserDashboardThingsboard,
  ),
  portfolioProject(
    "world-trade-center-metro-manila",
    "World Trade Center Metro Manila",
    worldTradeCenterMetroManila,
  ),
];
