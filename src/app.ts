import http from "http";
import {
  replacePlaceholderWithData,
  replacePlaceholderWithTemplate,
  templateReplacementInstructions,
} from "./template-data-injector";
import { fileReader } from "./file-reader";

// Templates
const templateCard = fileReader("card");

const templateOverview = fileReader("overview");
const templateProduct = fileReader("product");

// Data
const rawProductdata = fileReader("apiData");
const parsedProductData: Record<string, string>[] = JSON.parse(rawProductdata);
const templateCardInstructions = fileReader("cardTemplateInstructions");
const parsedTemplateCardInstructions = JSON.parse(templateCardInstructions);
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Home || Overview
  if (pathName === "/" || pathName === "/overview") {
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
  if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(templateProduct);
    return;
  }

  // Api
  if (pathName === "/api") {
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
