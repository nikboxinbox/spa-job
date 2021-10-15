export const CHARACTERS = () => 'character';

export const CHARACTERS_BY_PAGE = (page) => `character/?page=${page}`;

export const CHARACTERS_BY_NAME = (name) => `character/?name=${name}`;

export const CHARACTERS_BY_STATUS = (status) => `character/?status=${status}`;

export const CHARACTERS_BY_NAME_STATUS = (name, status) =>
  `character/?name=${name}&status=${status}`;
