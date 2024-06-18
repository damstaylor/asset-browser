const toTitleCase = (str: string) => {
  const matches = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
  );
  return matches
    ? matches.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1)).join(" ")
    : str;
};

export { toTitleCase };
