interface PageQueryParams {
  fontStyle: "sans" | "mono";
  backgroundColor: "dark" | "light";
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
}

export function getURLQueryParams() {
  const search = window.location.search.substring(1);
  const query = search.split("&");
  const params: { [key: string]: string } = {};
  query.forEach((param) => {
    const [key, value] = param.split("=");
    params[key] = value;
  });

  return {
    fontStyle: params.fontStyle as PageQueryParams["fontStyle"],
    backgroundColor: params.backgroundColor as PageQueryParams["backgroundColor"],
    borderColor: params.borderColor,
    borderWidth: Number(params.borderWidth),
    borderRadius: Number(params.borderRadius),
  }
}