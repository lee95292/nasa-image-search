const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
};

export const Device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,

  Max_mobileS: `(max-width: ${size.mobileS})`,
  Max_mobileM: `(max-width: ${size.mobileM})`,
  Max_mobileL: `(max-width: ${size.mobileL})`,
  Max_tablet: `(max-width: ${size.tablet})`,
  Max_laptop: `(max-width: ${size.laptop})`,
  Max_laptopL: `(max-width: ${size.laptopL})`,
  Max_desktop: `(max-width: ${size.desktop})`,
  Max_desktopL: `(max-width: ${size.desktop})`
};
