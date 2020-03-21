export const TYPE_URL = {
  MATCH: {
    display: 'Match',
    key: 'match',
    suggest: 'Ex. http://www.example.com/',
  },
  START_WITH: {
    display: 'Start With',
    key: 'start-with',
    suggest: 'Ex. http://www.example.com/page/',
  },
  END_WITH: {
    display: 'End With',
    key: 'end-with',
    suggest: 'Ex. /detail',
  },
  CONTAINS: {
    display: 'Contains',
    key: 'contain',
    suggest: 'Ex. /page',
  },
  REGEX: {
    display: 'Regex',
    key: 'regex',
    suggest: 'Ex. /pages/[^/]+',
  },
};
