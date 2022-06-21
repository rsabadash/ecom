export const attributeLanguage = {
    uk: 'uk',
    en: 'en'
} as const;

export const attributeCover = {
    soft: 'soft',
    hard: 'hard'
} as const;

export const attributeCondition = {
    new: 'new',
    used: 'used'
} as const;

export const formFields = {
    screenwriter: 'screenwriter',
    artist: 'artist',
    publishingHouse: 'publishingHouse',
    language: 'language',
    format: 'format',
    cover: 'cover',
    year: 'year',
    condition: 'condition',
    label: 'label',
    character: 'character',
    genre: 'genre',
    title: 'title',
    price: 'price',
    priceDiscount: 'priceDiscount',
    pages: 'pages',
    quantity: 'quantity',
    isbn: 'isbn',
    description: 'description'
} as const;

export const fieldsNeedTranslations = [
    formFields.screenwriter,
    formFields.artist,
    formFields.character,
    formFields.genre
];