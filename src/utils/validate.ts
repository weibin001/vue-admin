export const isExternal: (path: string) => boolean = (path: string) => /^(https?:|mailto:|tel:)/.test(path)
