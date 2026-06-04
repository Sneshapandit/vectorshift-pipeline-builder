const TEMPLATE_VARIABLE_PATTERN = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

export const extractTemplateVariables = (text) => {
  const matches = text.match(TEMPLATE_VARIABLE_PATTERN) || [];

  return [
    ...new Set(
      matches.map((match) => match.replace(/{{\s*|\s*}}/g, ''))
    ),
  ];
};

