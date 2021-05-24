export function generateUrl(wordHeroId, shareName, selectedType): string {
  shareName = encodeURIComponent(shareName);
  let url = window.location.origin;
  switch (selectedType) {
    case "game":
      url += `/hero/${wordHeroId}/${shareName}`;
      break;
    case "spidergram":
      url += `/spidegram/${wordHeroId}/${shareName}`;
      break;
    case "spidergram-done":
      url += `/spidegram-done/${wordHeroId}/${shareName}`;
      break;
    default:
      break;
  }

  if (shareName.length === 0) {
    url = "";
  }

  return url;
}
