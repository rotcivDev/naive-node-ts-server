export type templateReplacementInstructions = {
  placeholder: string;
  newValueKey: string;
}[];

interface IReplacePlaceholderWithData {
  dataSource: Record<string, string | boolean>;
  templateSource: string;
  templateReplacementInstructions: templateReplacementInstructions;
}

interface IReplacePlaceholderWithTemplate {
  placeholder: string;
  templaceSource: string;
  childTemplate: string;
}

export function replacePlaceholderWithData({
  dataSource,
  templateSource,
  templateReplacementInstructions,
}: IReplacePlaceholderWithData) {
  let templateDraft = templateSource;
  templateReplacementInstructions.forEach((instruction) => {
    const injectionRegEx = new RegExp(instruction.placeholder, "g");
    if (
      instruction.newValueKey === "hasTag" &&
      dataSource[instruction.newValueKey] === false
    ) {
      templateDraft = templateDraft.replace(injectionRegEx, "hidden");
    } else {
      templateDraft = templateDraft.replace(
        injectionRegEx,
        dataSource[instruction.newValueKey] as string
      );
    }
  });
  return templateDraft;
}

export function replacePlaceholderWithTemplate({
  placeholder,
  templaceSource,
  childTemplate,
}: IReplacePlaceholderWithTemplate) {
  const injectionRegEx = new RegExp(placeholder, "g");
  return templaceSource.replace(injectionRegEx, childTemplate);
}
