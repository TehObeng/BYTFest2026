import { Sponsor } from '../SponsorLogoGrid';

import pertaminaLogo from '../Images/logosponsor/pertamina.png';
import betaSolutionsLogo from '../Images/logosponsor/beta_solutions.png';
import gammaIncLogo from '../Images/logosponsor/gamma_inc.png';
import deltaCoLogo from '../Images/logosponsor/delta_co.png';
import epsilonLLCLogo from '../Images/logosponsor/epsilon_llc.png';
import zetaGroupLogo from '../Images/logosponsor/zeta_group.png';
import etaFoundationLogo from '../Images/logosponsor/eta_foundation.png';
import thetaLtdLogo from '../Images/logosponsor/theta_ltd.png';

export const mockSponsors: Sponsor[] = [
  { name: "Pertamina", logoUrl: pertaminaLogo, websiteUrl: "https://www.pertamina.com/", tier: "Platinum" },
  { name: "Beta Solutions", logoUrl: betaSolutionsLogo, websiteUrl: "#", tier: "Gold" },
  { name: "Gamma Inc.", logoUrl: gammaIncLogo, websiteUrl: "#", tier: "Gold" },
  { name: "Delta Co.", logoUrl: deltaCoLogo, websiteUrl: "#", tier: "Silver" },
  { name: "Epsilon LLC", logoUrl: epsilonLLCLogo, websiteUrl: "#", tier: "Silver" },
  { name: "Zeta Group", logoUrl: zetaGroupLogo, websiteUrl: "#", tier: "Community Partner" },
  { name: "Eta Foundation", logoUrl: etaFoundationLogo, websiteUrl: "#", tier: "Community Partner" },
  { name: "Theta Ltd.", logoUrl: thetaLtdLogo, websiteUrl: "#", tier: "Media Partner" },
];
