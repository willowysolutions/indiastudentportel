const ensureTrailingSlash = (value) => `${String(value || "").replace(/\/+$/, "")}/`;
const removeTrailingSlash = (value) => String(value || "").replace(/\/+$/, "");

export const baseUrl = ensureTrailingSlash(
  import.meta.env.VITE_API_BASE_URL ||
    "https://indiastudentportal.com/studentapi/"
);


export const publicStorageUrl = removeTrailingSlash(
  import.meta.env.VITE_PUBLIC_STORAGE_URL ||
    `${removeTrailingSlash(baseUrl)}/storage/app/public`
);

/**
 * Converts old/raw college image values into a complete URL.
 * Supports:
 * - logo/file.png
 * - image/file.jpeg
 * - storage/app/public/logo/file.png
 * - a full production/local URL
 * - blob/data URLs used for new-image previews
 */
export const resolveCollegeMediaUrl = (
  urlValue,
  pathValue,
  defaultDirectory
) => {
  let value = urlValue || pathValue;

  if (!value || value === "null") {
    return null;
  }

  value = String(value).trim().replace(/\\/g, "/");

  if (/^(blob:|data:image\/)/i.test(value)) {
    return value;
  }

  if (/^https?:\/\//i.test(value)) {
    const storageMarker = "/storage/app/public/";
    const markerPosition = value.toLowerCase().indexOf(storageMarker);

    // Rebuild application storage URLs using the current environment.
    if (markerPosition >= 0) {
      value = value.slice(markerPosition + storageMarker.length);
    } else {
      return value;
    }
  }

  value = value
    .replace(/^\/+/, "")
    .replace(/^storage\/app\/public\//i, "")
    .replace(/^public\/storage\//i, "")
    .replace(/^storage\//i, "")
    .replace(/^public\//i, "");

  if (defaultDirectory && !value.includes("/")) {
    value = `${defaultDirectory}/${value}`;
  }

  return `${publicStorageUrl}/${value}`;
};
