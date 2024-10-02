// profanityList.ts
const forbiddenWordsAndPhrases = [
    // Single words
    'ass',
    'asshole',
    'bastard',
    'bitch',
    'bloody',
    'bollocks',
    'bugger',
    'bullshit',
    'crap',
    'cunt',
    'damn',
    'dick',
    'douche',
    'fuck',
    'fucker',
    'fucking',
    'goddamn',
    'hell',
    'jerk',
    'motherfucker',
    'nigga',
    'nigger',
    'piss',
    'prick',
    'shit',
    'shitty',
    'slut',
    'twat',
    'whore',
  
    // Phrases
    'son of a bitch',
    'go to hell',
    'holy shit',
    'shut the fuck up',
    'fuck you',
    'dickhead',
    'screw you',
    'piece of shit',
    'pissed off',
    'fucked up',
    'fatass',
    'goddamned',
    'arsehole',
    'shithead',
    'kiss my ass',
    'lazy fucker',
  
    // Derogatory slurs (racial, sexual, etc.)
    'chink',
    'spic',
    'fag',
    'dyke',
    'tranny',
    'wetback',
    'gook',
    'kike',
    'coon',
    'cracker',
    'redneck',
  
    // Sexual content
    'blowjob',
    'handjob',
    'cum',
    'cumming',
    'suck my dick',
    'eat me',
    'anal',
    'dildo',
    'pussy',
    'wanker',
    'nipple',
    'boob',
  
    // Religious profanity
    'jesus fucking christ',
    'god damn',
    'damn it',
    'christ on a bike',
    'for fuck’s sake',
  ];

  // Function to check for profanity in the tag
  export const containsProfanity = (tag: string): boolean => {
    const lowerCasedTag = tag.toLowerCase();
    return forbiddenWordsAndPhrases.some(profanity => lowerCasedTag.includes(profanity));
  };
  
  export default forbiddenWordsAndPhrases;
  