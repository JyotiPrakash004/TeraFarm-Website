// Central place for every external link and release setting.
// Leave a value as "" until you have the real URL — buttons stay disabled instead of breaking.
// Google Drive: set the folder/file sharing to "Anyone with the link can view", or visitors can't open it.
export const appLinks = {
  demoApkUrl: "https://drive.google.com/drive/folders/1DoXTELATgeVY802-wcKBwehvF2_TcyyN?usp=sharing",
  demoDriveUrl: "https://drive.google.com/drive/folders/1maSe8wfqOQtVQfGBZMHshLlnVGvs532p",
  demoVersion: "v0.1 Demo",
  productionApkUrl: "",
  productionAvailable: false,
  productionVersion: "v1.0",
  instagramUrl: "https://www.instagram.com/terafarm01?xtok=cjBlZ3dyaXZ0MnI3",
  projectUrl: "",
};

export const isValidUrl = (u?: string) => {
  if (!u) return false;
  if (u.startsWith("/") || u.startsWith("./")) return true;
  try {
    const p = new URL(u);
    return p.protocol === "https:" || p.protocol === "http:";
  } catch {
    return false;
  }
};

export const productionReady = () =>
  appLinks.productionAvailable && isValidUrl(appLinks.productionApkUrl);
