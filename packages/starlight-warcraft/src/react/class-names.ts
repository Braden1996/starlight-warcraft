export type ClassPart = string | false | null | undefined;

function isClass(part: ClassPart): part is string {
  return typeof part === "string" && part.length > 0;
}

export function classNames(...parts: readonly ClassPart[]): string {
  return parts.filter(isClass).join(" ");
}
