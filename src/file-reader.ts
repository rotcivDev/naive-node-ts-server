import fs from "fs";

interface ISourceKeyDictionary {
  overview: string;
  product: string;
  card: string;
  apiData: string;
  cardTemplateInstructions: string;
}

const sourceKeyDictionary: ISourceKeyDictionary = {
  overview: `${__dirname}/templates/template-overview.html`,
  product: `${__dirname}/templates/template-product.html`,
  card: `${__dirname}/templates/template-card.html`,
  apiData: `${__dirname}/dev-data/data.json`,
  cardTemplateInstructions: `${__dirname}/dev-data/card-template-instructions.json`,
};

export function fileReader(docKey: keyof ISourceKeyDictionary) {
  return fs.readFileSync(sourceKeyDictionary[docKey], "utf-8");
}
