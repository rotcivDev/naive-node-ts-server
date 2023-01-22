import http from "http";
import url from "node:url";
import {
  replacePlaceholderWithData,
  replacePlaceholderWithTemplate,
} from "./template-replacers";
import { fileReader } from "./file-reader";

// Templates
const templateCard = fileReader("card");
const templateOverview = fileReader("overview");
const templateProduct = fileReader("product");

// Data
const templateCardInstructions = fileReader("cardTemplateInstructions");
const parsedTemplateCardInstructions = JSON.parse(templateCardInstructions);
const templateProductInstructions = fileReader("productTemplateInstructions");
const parsedTemplateProductInstructions = JSON.parse(
  templateProductInstructions
);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url as string);

  // Home || Overview
  if (pathname === "/" || pathname === "/overview") {
    const rawProductdata = fileReader("apiData");
    const parsedProductData: Record<string, string>[] =
      JSON.parse(rawProductdata);

    const cardColectionTemplate = parsedProductData
      .map((product) =>
        replacePlaceholderWithData({
          dataSource: product,
          templateReplacementInstructions: parsedTemplateCardInstructions,
          templateSource: templateCard,
        })
      )
      .join("");

    const newOverviewTemplate = replacePlaceholderWithTemplate({
      childTemplate: cardColectionTemplate,
      placeholder: "{%PRODUCT_CARDS%}",
      templaceSource: templateOverview,
    });
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(newOverviewTemplate);
    return;
  }

  // Product
  if (pathname === "/product") {
    const rawProductdata = fileReader("apiData");
    const parsedProductData: Record<string, string>[] =
      JSON.parse(rawProductdata);

    const [key, value] = query?.split("=") as Array<string>;

    const product =
      key &&
      value &&
      parsedProductData.find((productData) => productData[key] == value);

    if (product) {
      const productTemplateWithData = replacePlaceholderWithData({
        dataSource: product,
        templateReplacementInstructions: parsedTemplateProductInstructions,
        templateSource: templateProduct,
      });
      res.writeHead(200, { "Content-type": "text/html" });
      res.end(productTemplateWithData);
      return;
    }
  }

  // Api
  if (pathname === "/api") {
    const rawProductdata = fileReader("apiData");

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(rawProductdata);
    return;
  }

  // Not found
  res.writeHead(404, {
    "Content-type": "text/html",
  });
  res.end("<h1>Page not found.</h1>");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
