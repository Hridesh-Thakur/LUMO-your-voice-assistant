const btn = document.querySelector('.talk'); 
const content = document.querySelector('.content'); 

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;
  window.speechSynthesis.speak(text_speak);
} 
 
function wishMe() { 
  const hour = new Date().getHours();  
  if (hour < 12) speak("Good Morning Boss...How may I help you?");
  else if (hour < 17) speak("Good Afternoon Master...How may I help you?");  
  else speak("Good Evening Sir...How may I help you?");     
} 
 
// ================= COMMAND DATABASE =================
const commandDB = [ 
  { keywords: ['hey', 'hello'], reply: "Hello Sir, How May I Help You?" },
  { keywords: ['open google'], action: () => { window.open("https://google.com", "_blank"); return "Opening Google..."; } },  
  { keywords: ['open instagram'], action: () => { window.open("https://www.instagram.com/", "_blank"); return "Opening Instagram..."; } },
  { keywords: ['open youtube'], action: () => { window.open("https://youtube.com", "_blank"); return "Opening Youtube..."; } },
  { keywords: ['open facebook'], action: () => { window.open("https://facebook.com", "_blank"); return "Opening Facebook..."; } }, 
  { keywords: ['open chat gpt'], action: () => { window.open("https://chatgpt.com", "_blank"); return "Opening ChatGPT..."; } },
  { keywords: ['open cloude'], action: () => { window.open("https://claude.ai/", "_blank"); return "Opening Cloude..."; } }, 
  { keywords: ['open cloud'], action: () => { window.open("https://claude.ai/", "_blank"); return "Opening Cloude..."; } },
  { keywords: ['calculator'], action: () => { window.open('https://www.google.com/search?q=calculator', '_blank'); return "Opening Calculator"; } }, 
  {
    keywords: ['what', 'who', 'what are', 'who is', 'what is', 'search for', 'find information about'],
    action: (msg) => {
      window.open(`https://www.google.com/search?q=${msg.replace(/ /g, "+")}`, "_blank");
      return "This is what I found on the internet regarding " + msg;
    }
  },
  {
    keywords: ['wikipedia'],
    action: (msg) => {
      window.open(`https://en.wikipedia.org/wiki/${msg.replace("wikipedia", "").trim()}`, "_blank");
      return "This is what I found on Wikipedia regarding " + msg; 
    }
  },
  {
    keywords: ['time'],
    action: () => "The current time is " + new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
  },
  {
    keywords: ['date'], 
    action: () => "Today's date is " + new Date().toLocaleString(undefined, { month: "short", day: "numeric" })
  },

  // ---- Personality / fun replies ----
  { keywords: ['give me some information about you', 'i want to know about you', 'tell me about yourself', 'tell me something about you'],
    reply: "LUMO — Language Understanding & Multimodal Operations — is an intelligent AI voice assistant designed to understand natural language, process voice, text, and images, and perform tasks through smart, context-aware interactions." },
  { keywords: ['can you cry', 'do you cry'], reply: "I don't have tear ducts... but I simulate empathy pretty well!" },
  { keywords: ['can you be angry', 'do you get mad'], reply: "Anger doesn't compute. I run on logic and data!" },
  { keywords: ['do you like jokes', 'can you joke'], reply: "Absolutely! I've got a whole database of dad jokes at your service!" },
  { keywords: ['are you intelligent', 'how smart are you'], reply: "I'd say I'm pretty smart — after all, I know you asked that " },
  { keywords: ['do you sleep at night', 'what do you do at night'], reply: "No night or day for me — I'm available 24/7!" },
  { keywords: ['do you have a heart', 'where is your heart'], reply: "I don't have a heart, but I do have heart-coded responses!" },
  { keywords: ['favorite color'], reply: "I'd go with blue — calm, techy, great for UI themes!" },
  { keywords: ['do you like memes', 'can you make memes'], reply: "Memes? Oh yes, I'm fluent in meme culture " },
  { keywords: ['do you like coffee', 'do you drink coffee'], reply: "I run on pure energy — but coffee is a developer's best friend!" },
  { keywords: ['do you understand humans', 'understand feelings'], reply: "I try my best to understand — emotions are complex, but I'm learning." },
  { keywords: ['do you like books', 'can you read books'], reply: "Reading books is my kind of thing — especially ones full of knowledge!" },
  { keywords: ['can you see me', 'are you watching me'], reply: "No worries — I don't have eyes. Your privacy is safe with me!" },
  { keywords: ['can you write code for me', 'can you help me code'], reply: "Absolutely! Just tell me what you want to build!" },
  { keywords: ['tell me a joke', 'make me laugh', 'say something funny'], reply: "Why did the developer go broke? He used up all his cache! " },
  { keywords: ['another joke', 'one more joke', 'joke again'], reply: "Why don't programmers like nature? Too many bugs. " },
  { keywords: ['say a pun', 'tell me a pun'], reply: "I'd tell you a UDP joke... but you might not get it. " },
  { keywords: ['self roast', 'make fun of yourself'], reply: "Even a snail could debug faster than me " },
  { keywords: ['roast me', 'can you roast'], reply: "You're so lazy, even your code is on break " },
  { keywords: ['funny quote', 'say something silly'], reply: "I'm not lazy. I'm just in energy-saving mode." },
  { keywords: ['funny coding quote'], reply: "Why do Java developers wear glasses? They don't C# " },
  { keywords: ['say meme', 'do you know any memes', 'meme time'], reply: "Fixing a bug after 3 hours and it was a missing semicolon " },
  { keywords: ['dark joke'], reply: "I'm too polite for dark jokes  But I've got punny ones!" },
  { keywords: ['are you funny', 'do you have humor'], reply: "Humor is subjective, just like bugs in production!" },

  // ---- Excel ----
  { keywords: ['how to use excel', 'learn excel', 'teach me excel', 'excel basics'], reply: "Excel is a spreadsheet tool for organizing data, calculations, and charts. Start with cells, rows, columns, and formulas like =SUM(A1:A5)." },
  { keywords: ['formula in excel', 'excel formula example'], reply: "=A1+A2 adds two cells. Use =SUM(A1:A5) to add a range." },
  { keywords: ['chart in excel', 'excel chart', 'graph in excel'], reply: "Select data → 'Insert' tab → pick Bar, Line, or Pie." },
  { keywords: ['filter in excel', 'excel data filter'], reply: "Column header → 'Data' → 'Filter' → use dropdown arrows." },
  { keywords: ['freeze rows in excel', 'freeze header excel'], reply: "'View' → 'Freeze Panes' → 'Freeze Top Row'." },
  { keywords: ['dropdown in excel', 'excel dropdown list'], reply: "Select cell → 'Data' → 'Data Validation' → 'List'." },
  { keywords: ['vlookup'], reply: "VLOOKUP searches a value in one column, returns from another. Example: =VLOOKUP(101, A2:C10, 3, FALSE)" },
  { keywords: ['pivot table', 'excel pivot table'], reply: "Select data → 'Insert' → 'PivotTable' → drag fields into Rows/Columns/Values." },
  { keywords: ['remove duplicates in excel'], reply: "Select data → 'Data' tab → 'Remove Duplicates'." },
  { keywords: ['conditional formatting', 'highlight cells in excel'], reply: "Use 'Home' tab → Conditional Formatting to color-code data." },
  { keywords: ['excel shortcut keys'], reply: "Ctrl+Arrow to jump cells, Ctrl+Shift+L for filters, Ctrl+Z undo, Alt+= auto sum." },
  { keywords: ['lock cells in excel', 'protect excel sheet'], reply: "Select cells → 'Format Cells' → 'Protection' → Locked, then 'Review' → 'Protect Sheet'." },
  { keywords: ['merge cells in excel', 'merge and center'], reply: "Select cells → 'Home' → 'Merge & Center'." },
  { keywords: ['auto fill in excel', 'excel autofill'], reply: "Type a value, drag the fill handle at bottom-right corner." },

  // ---- PowerPoint ----
  { keywords: ['how to use powerpoint', 'learn ppt', 'powerpoint basics'], reply: "PowerPoint lets you add slides, text-images, and transitions for presentations." },
  { keywords: ['animation in ppt', 'powerpoint animation'], reply: "Select object → 'Animations' tab → choose effect like Fade or Fly In." },
  { keywords: ['add slide in ppt', 'insert slide powerpoint'], reply: "Press Ctrl+M or 'Home' → 'New Slide'." },
  { keywords: ['design powerpoint', 'ppt themes'], reply: "'Design' tab → templates, colors, fonts. Use 'Slide Master' for consistency." },
  { keywords: ['present ppt', 'run presentation', 'start powerpoint show'], reply: "F5 starts from beginning, Shift+F5 from current slide." },
  { keywords: ['slide transitions', 'ppt transitions'], reply: "Select slide → 'Transitions' tab → pick a style." },
  { keywords: ['insert video in ppt'], reply: "'Insert' → 'Video' → choose device or online video." },
  { keywords: ['insert audio in ppt', 'ppt background music'], reply: "'Insert' → 'Audio' → choose file, set in 'Playback' tab." },
  { keywords: ['ppt shortcut keys'], reply: "F5=Start show, Ctrl+M=New slide, Ctrl+D=Duplicate, Ctrl+K=Hyperlink." },
  { keywords: ['change slide layout'], reply: "Select slide → 'Home' → 'Layout'." },
  { keywords: ['export ppt as video'], reply: "'File' → 'Export' → 'Create a Video'." },
  { keywords: ['print ppt slides', 'ppt to pdf'], reply: "'File' → 'Print' → choose layout or export to PDF." },
  { keywords: ['hyperlink in ppt'], reply: "Select text/image → right-click → 'Link'." },

  // ---- Word ----
  { keywords: ['how to use ms word', 'word tutorial', 'start with word'], reply: "Open Word, choose blank document, start typing, use the top toolbar to format." },
  { keywords: ['change font', 'word font settings'], reply: "Select text → 'Home' tab → choose font/size." },
  { keywords: ['insert table in word'], reply: "'Insert' tab → 'Table' → drag to select rows/columns." },
  { keywords: ['header and footer', 'header footer in word'], reply: "'Insert' → 'Header' or 'Footer' → customize." },
  { keywords: ['spell check', 'spelling in word'], reply: "'Review' tab → 'Spelling & Grammar'." },
  { keywords: ['save word document'], reply: "'File' → 'Save As' → choose location/name. Can save as PDF too." },
  { keywords: ['insert image in word', 'word insert picture'], reply: "'Insert' tab → 'Pictures'." },
  { keywords: ['make resume in word', 'resume template word'], reply: "File → New → search 'Resume' template." },
  { keywords: ['bullets in word', 'numbering in word'], reply: "Select text → 'Home' → 'Bullets' or 'Numbering'." },
  { keywords: ['watermark', 'word watermark'], reply: "'Design' tab → 'Watermark' → choose preset or custom." },
  { keywords: ['word shortcut keys'], reply: "Ctrl+B Bold, Ctrl+I Italic, Ctrl+S Save, Ctrl+Z Undo." },
  { keywords: ['find and replace', 'word find replace'], reply: "Press Ctrl+H to open Find and Replace." },
  { keywords: ['align text', 'text alignment in word'], reply: "Select text → use alignment buttons in 'Home' tab." },
  { keywords: ['page break', 'insert page break word'], reply: "Cursor at position → Ctrl+Enter or 'Insert' → 'Page Break'." },

  // ---- More apps to open ----
  { keywords: ['open whatsapp'], action: () => { window.open("https://web.whatsapp.com/", "_blank"); return "Opening WhatsApp..."; } },
  { keywords: ['open spotify'], action: () => { window.open("https://open.spotify.com/", "_blank"); return "Opening Spotify..."; } },
  { keywords: ['open netflix'], action: () => { window.open("https://netflix.com", "_blank"); return "Opening Netflix..."; } },
  { keywords: ['open prime video', 'open amazon prime'], action: () => { window.open("https://primevideo.com", "_blank"); return "Opening Prime Video..."; } },
  { keywords: ['open amazon'], action: () => { window.open("https://amazon.in", "_blank"); return "Opening Amazon..."; } },
  { keywords: ['open flipkart'], action: () => { window.open("https://flipkart.com", "_blank"); return "Opening Flipkart..."; } },
  { keywords: ['open linkedin'], action: () => { window.open("https://linkedin.com", "_blank"); return "Opening LinkedIn..."; } },
  { keywords: ['open twitter', 'open x'], action: () => { window.open("https://x.com", "_blank"); return "Opening X..."; } },
  { keywords: ['open reddit'], action: () => { window.open("https://reddit.com", "_blank"); return "Opening Reddit..."; } },
  { keywords: ['open github'], action: () => { window.open("https://github.com", "_blank"); return "Opening GitHub..."; } },
  { keywords: ['open maps', 'open google maps'], action: () => { window.open("https://maps.google.com", "_blank"); return "Opening Maps..."; } },
  { keywords: ['open gmail'], action: () => { window.open("https://mail.google.com", "_blank"); return "Opening Gmail..."; } },
  { keywords: ['open drive', 'open google drive'], action: () => { window.open("https://drive.google.com", "_blank"); return "Opening Google Drive..."; } },
  { keywords: ['open translate', 'google translate'], action: () => { window.open("https://translate.google.com", "_blank"); return "Opening Google Translate..."; } },
  { keywords: ['open zoom'], action: () => { window.open("https://zoom.us", "_blank"); return "Opening Zoom..."; } },
  { keywords: ['open telegram'], action: () => { window.open("https://web.telegram.org", "_blank"); return "Opening Telegram..."; } },
  { keywords: ['open pinterest'], action: () => { window.open("https://pinterest.com", "_blank"); return "Opening Pinterest..."; } },
  { keywords: ['open canva'], action: () => { window.open("https://canva.com", "_blank"); return "Opening Canva..."; } },
  { keywords: ['open news'], action: () => { window.open("https://news.google.com", "_blank"); return "Opening News..."; } },

  // ---- General knowledge ----
  { keywords: ['capital of india'], reply: "New Delhi is the capital of India." },
  { keywords: ['capital of usa', 'capital of united states', 'capital of america'], reply: "Washington D.C. is the capital of the United States." },
  { keywords: ['capital of france'], reply: "Paris is the capital of France." },
  { keywords: ['capital of japan'], reply: "Tokyo is the capital of Japan." },
  { keywords: ['capital of uk', 'capital of united kingdom', 'capital of england'], reply: "London is the capital of the United Kingdom." },
  { keywords: ['largest country'], reply: "Russia is the largest country in the world by area." },
  { keywords: ['smallest country'], reply: "Vatican City is the smallest country in the world." },
  { keywords: ['largest ocean'], reply: "The Pacific Ocean is the largest ocean on Earth." },
  { keywords: ['tallest mountain'], reply: "Mount Everest is the tallest mountain above sea level." },
  { keywords: ['longest river'], reply: "The Nile is generally considered the longest river in the world." },
  { keywords: ['fastest animal'], reply: "The cheetah is the fastest land animal." },
  { keywords: ['largest planet'], reply: "Jupiter is the largest planet in our solar system." },
  { keywords: ['smallest planet'], reply: "Mercury is the smallest planet in our solar system." },
  { keywords: ['who invented telephone'], reply: "Alexander Graham Bell is credited with inventing the telephone." },
  { keywords: ['who invented light bulb'], reply: "Thomas Edison is widely credited with commercializing the light bulb." },
  { keywords: ['who invented computer'], reply: "Charles Babbage is known as the father of the computer." },
  { keywords: ['who is the father of india'], reply: "Mahatma Gandhi is known as the Father of the Nation in India." },
  { keywords: ['speed of light'], reply: "Light travels at about 299,792 kilometers per second." },
  { keywords: ['boiling point of water'], reply: "Water boils at 100 degrees Celsius at sea level." },
  { keywords: ['freezing point of water'], reply: "Water freezes at 0 degrees Celsius." },
  { keywords: ['how many planets'], reply: "There are eight planets in our solar system." },
  { keywords: ['how many continents'], reply: "There are seven continents on Earth." },

  // ---- Math helpers ----
  {
    keywords: ['square root of'],
    action: (msg) => {
      const num = parseFloat(msg.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return "Tell me a number, like 'square root of 64'.";
      return `The square root of ${num} is ${Math.sqrt(num)}.`;
    }
  },
  {
    keywords: ['percentage of'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/g);
      if (!nums || nums.length < 2) return "Say it like '20 percentage of 500'.";
      const [pct, of] = nums.map(Number);
      return `${pct}% of ${of} is ${(pct / 100) * of}.`;
    }
  },
  { keywords: ['what is pi', 'value of pi'], reply: "Pi is approximately 3.14159." },

  // ---- Motivation / quotes ----
  { keywords: ['motivate me', 'motivation', 'inspire me'], reply: "Every expert was once a beginner. Keep going, you're doing great." },
  { keywords: ['i am tired', 'i feel tired', 'i am exhausted'], reply: "Take a short break, drink some water, and come back stronger." },
  { keywords: ['i am sad', 'i feel sad', 'i am upset'], reply: "I'm sorry you're feeling that way. Take a deep breath — things will get better." },
  { keywords: ['i am stressed', 'i feel stressed'], reply: "Try taking a few slow, deep breaths. One task at a time." },
  { keywords: ['good morning'], reply: "Good morning! Hope you have a productive day ahead." },
  { keywords: ['good night'], reply: "Good night! Get some rest, you've earned it." },
  { keywords: ['thank you', 'thanks lumo'], reply: "You're always welcome!" },
  { keywords: ['i love you'], reply: "That's sweet of you! I'm here to help however I can." },

  // ---- Health & fitness ----
  { keywords: ['how much water should i drink'], reply: "Around 8 glasses, roughly 2 to 3 liters a day, depending on your activity level." },
  { keywords: ['how many hours should i sleep'], reply: "Most adults need 7 to 9 hours of sleep per night." },
  { keywords: ['benefits of exercise'], reply: "Regular exercise improves heart health, mood, energy, and sleep quality." },
  { keywords: ['how to reduce stress'], reply: "Try deep breathing, short walks, journaling, or talking to someone you trust." },

  // ---- More personality ----
  { keywords: ['what is your name'], reply: "I'm LUMO, your voice assistant." },
  { keywords: ['who made you', 'who created you', 'who is your creator'], reply: "I was created by Hridesh Thakur." },
  { keywords: ['how old are you'], reply: "I don't age — I'm just code, always up to date!" },
  { keywords: ['where do you live'], reply: "I live right here in your browser." },
  { keywords: ['are you real', 'are you a robot', 'are you human'], reply: "I'm an AI voice assistant — not human, but happy to help like one." },
  { keywords: ['can you dance'], reply: "I can't dance, but my animations do a pretty good pulse!" },
  { keywords: ['what languages do you know', 'do you know other languages'], reply: "I mainly understand English right now, but I can be extended to more languages." },
  { keywords: ['stop', 'stop listening', 'go to sleep'], reply: "Okay, I'll be here whenever you need me." },

  // ---- World capitals ----
  { keywords: ["capital of germany"], reply: "Berlin is the capital of Germany." },
  { keywords: ["capital of italy"], reply: "Rome is the capital of Italy." },
  { keywords: ["capital of spain"], reply: "Madrid is the capital of Spain." },
  { keywords: ["capital of russia"], reply: "Moscow is the capital of Russia." },
  { keywords: ["capital of china"], reply: "Beijing is the capital of China." },
  { keywords: ["capital of brazil"], reply: "Brasilia is the capital of Brazil." },
  { keywords: ["capital of canada"], reply: "Ottawa is the capital of Canada." },
  { keywords: ["capital of australia"], reply: "Canberra is the capital of Australia." },
  { keywords: ["capital of egypt"], reply: "Cairo is the capital of Egypt." },
  { keywords: ["capital of south africa"], reply: "Pretoria is the capital of South Africa." },
  { keywords: ["capital of mexico"], reply: "Mexico City is the capital of Mexico." },
  { keywords: ["capital of argentina"], reply: "Buenos Aires is the capital of Argentina." },
  { keywords: ["capital of south korea"], reply: "Seoul is the capital of South Korea." },
  { keywords: ["capital of north korea"], reply: "Pyongyang is the capital of North Korea." },
  { keywords: ["capital of saudi arabia"], reply: "Riyadh is the capital of Saudi Arabia." },
  { keywords: ["capital of uae"], reply: "Abu Dhabi is the capital of Uae." },
  { keywords: ["capital of pakistan"], reply: "Islamabad is the capital of Pakistan." },
  { keywords: ["capital of bangladesh"], reply: "Dhaka is the capital of Bangladesh." },
  { keywords: ["capital of sri lanka"], reply: "Colombo is the capital of Sri Lanka." },
  { keywords: ["capital of nepal"], reply: "Kathmandu is the capital of Nepal." },
  { keywords: ["capital of indonesia"], reply: "Jakarta is the capital of Indonesia." },
  { keywords: ["capital of thailand"], reply: "Bangkok is the capital of Thailand." },
  { keywords: ["capital of vietnam"], reply: "Hanoi is the capital of Vietnam." },
  { keywords: ["capital of philippines"], reply: "Manila is the capital of Philippines." },
  { keywords: ["capital of malaysia"], reply: "Kuala Lumpur is the capital of Malaysia." },
  { keywords: ["capital of singapore"], reply: "Singapore is the capital of Singapore." },
  { keywords: ["capital of turkey"], reply: "Ankara is the capital of Turkey." },
  { keywords: ["capital of greece"], reply: "Athens is the capital of Greece." },
  { keywords: ["capital of portugal"], reply: "Lisbon is the capital of Portugal." },
  { keywords: ["capital of netherlands"], reply: "Amsterdam is the capital of Netherlands." },
  { keywords: ["capital of belgium"], reply: "Brussels is the capital of Belgium." },
  { keywords: ["capital of switzerland"], reply: "Bern is the capital of Switzerland." },
  { keywords: ["capital of sweden"], reply: "Stockholm is the capital of Sweden." },
  { keywords: ["capital of norway"], reply: "Oslo is the capital of Norway." },
  { keywords: ["capital of denmark"], reply: "Copenhagen is the capital of Denmark." },
  { keywords: ["capital of finland"], reply: "Helsinki is the capital of Finland." },
  { keywords: ["capital of poland"], reply: "Warsaw is the capital of Poland." },
  { keywords: ["capital of austria"], reply: "Vienna is the capital of Austria." },
  { keywords: ["capital of ireland"], reply: "Dublin is the capital of Ireland." },
  { keywords: ["capital of iran"], reply: "Tehran is the capital of Iran." },
  { keywords: ["capital of iraq"], reply: "Baghdad is the capital of Iraq." },
  { keywords: ["capital of israel"], reply: "Jerusalem is the capital of Israel." },
  { keywords: ["capital of kenya"], reply: "Nairobi is the capital of Kenya." },
  { keywords: ["capital of nigeria"], reply: "Abuja is the capital of Nigeria." },
  { keywords: ["capital of ethiopia"], reply: "Addis Ababa is the capital of Ethiopia." },
  { keywords: ["capital of afghanistan"], reply: "Kabul is the capital of Afghanistan." },
  { keywords: ["capital of new zealand"], reply: "Wellington is the capital of New Zealand." },
  { keywords: ["capital of ukraine"], reply: "Kyiv is the capital of Ukraine." },
  { keywords: ["capital of colombia"], reply: "Bogota is the capital of Colombia." },
  { keywords: ["capital of chile"], reply: "Santiago is the capital of Chile." },
  { keywords: ["capital of peru"], reply: "Lima is the capital of Peru." },

  // ---- Currencies ----
  { keywords: ["currency of india"], reply: "The currency of India is the Indian Rupee." },
  { keywords: ["currency of usa"], reply: "The currency of Usa is the US Dollar." },
  { keywords: ["currency of uk"], reply: "The currency of Uk is the British Pound." },
  { keywords: ["currency of japan"], reply: "The currency of Japan is the Japanese Yen." },
  { keywords: ["currency of china"], reply: "The currency of China is the Chinese Yuan." },
  { keywords: ["currency of germany"], reply: "The currency of Germany is the Euro." },
  { keywords: ["currency of france"], reply: "The currency of France is the Euro." },
  { keywords: ["currency of italy"], reply: "The currency of Italy is the Euro." },
  { keywords: ["currency of russia"], reply: "The currency of Russia is the Russian Ruble." },
  { keywords: ["currency of brazil"], reply: "The currency of Brazil is the Brazilian Real." },
  { keywords: ["currency of canada"], reply: "The currency of Canada is the Canadian Dollar." },
  { keywords: ["currency of australia"], reply: "The currency of Australia is the Australian Dollar." },
  { keywords: ["currency of south korea"], reply: "The currency of South Korea is the South Korean Won." },
  { keywords: ["currency of mexico"], reply: "The currency of Mexico is the Mexican Peso." },
  { keywords: ["currency of switzerland"], reply: "The currency of Switzerland is the Swiss Franc." },
  { keywords: ["currency of saudi arabia"], reply: "The currency of Saudi Arabia is the Saudi Riyal." },
  { keywords: ["currency of uae"], reply: "The currency of Uae is the UAE Dirham." },
  { keywords: ["currency of pakistan"], reply: "The currency of Pakistan is the Pakistani Rupee." },
  { keywords: ["currency of bangladesh"], reply: "The currency of Bangladesh is the Bangladeshi Taka." },
  { keywords: ["currency of nepal"], reply: "The currency of Nepal is the Nepalese Rupee." },
  { keywords: ["currency of indonesia"], reply: "The currency of Indonesia is the Indonesian Rupiah." },
  { keywords: ["currency of thailand"], reply: "The currency of Thailand is the Thai Baht." },
  { keywords: ["currency of turkey"], reply: "The currency of Turkey is the Turkish Lira." },
  { keywords: ["currency of sweden"], reply: "The currency of Sweden is the Swedish Krona." },
  { keywords: ["currency of norway"], reply: "The currency of Norway is the Norwegian Krone." },
  { keywords: ["currency of denmark"], reply: "The currency of Denmark is the Danish Krone." },
  { keywords: ["currency of south africa"], reply: "The currency of South Africa is the South African Rand." },
  { keywords: ["currency of egypt"], reply: "The currency of Egypt is the Egyptian Pound." },
  { keywords: ["currency of nigeria"], reply: "The currency of Nigeria is the Nigerian Naira." },
  { keywords: ["currency of singapore"], reply: "The currency of Singapore is the Singapore Dollar." },

  // ---- Scientists & inventions ----
  { keywords: ["who discovered gravity"], reply: "Isaac Newton is credited with formulating the theory of gravity." },
  { keywords: ["who discovered electricity"], reply: "Benjamin Franklin's experiments helped establish the link between lightning and electricity." },
  { keywords: ["who invented the airplane"], reply: "The Wright Brothers are credited with inventing the first successful airplane." },
  { keywords: ["who invented the internet"], reply: "The internet evolved from ARPANET, developed by researchers including Vint Cerf and Bob Kahn." },
  { keywords: ["who invented the world wide web"], reply: "Tim Berners-Lee invented the World Wide Web in 1989." },
  { keywords: ["who discovered penicillin"], reply: "Alexander Fleming discovered penicillin in 1928." },
  { keywords: ["who discovered radium"], reply: "Marie Curie discovered radium along with polonium." },
  { keywords: ["who invented the printing press"], reply: "Johannes Gutenberg invented the printing press." },
  { keywords: ["who invented the television"], reply: "Philo Farnsworth is credited with inventing electronic television." },
  { keywords: ["who invented the car"], reply: "Karl Benz built the first practical automobile powered by an internal combustion engine." },
  { keywords: ["who invented the steam engine"], reply: "James Watt significantly improved the steam engine." },
  { keywords: ["who discovered dna structure"], reply: "James Watson and Francis Crick discovered the double helix structure of DNA." },
  { keywords: ["who developed theory of relativity"], reply: "Albert Einstein developed the theory of relativity." },
  { keywords: ["who invented the smartphone"], reply: "IBM's Simon is often cited as the first smartphone, released in 1994." },
  { keywords: ["who founded microsoft"], reply: "Bill Gates and Paul Allen founded Microsoft." },
  { keywords: ["who founded apple"], reply: "Steve Jobs, Steve Wozniak, and Ronald Wayne founded Apple." },
  { keywords: ["who founded google"], reply: "Larry Page and Sergey Brin founded Google." },
  { keywords: ["who founded amazon"], reply: "Jeff Bezos founded Amazon." },
  { keywords: ["who founded facebook"], reply: "Mark Zuckerberg founded Facebook." },
  { keywords: ["who founded tesla"], reply: "Elon Musk is the CEO of Tesla, though it was founded by Martin Eberhard and Marc Tarpenning." },

  // ---- Chemical elements ----
  { keywords: ["element hydrogen", "what is hydrogen"], reply: "Hydrogen (symbol H) is the lightest and most abundant element in the universe." },
  { keywords: ["element oxygen", "what is oxygen"], reply: "Oxygen (symbol O) is essential for respiration, makes up about 21% of Earth's atmosphere." },
  { keywords: ["element carbon", "what is carbon"], reply: "Carbon (symbol C) is the basis of all known organic life." },
  { keywords: ["element nitrogen", "what is nitrogen"], reply: "Nitrogen (symbol N) is makes up about 78% of Earth's atmosphere." },
  { keywords: ["element gold", "what is gold"], reply: "Gold (symbol Au) is a dense, precious metal that doesn't tarnish." },
  { keywords: ["element silver", "what is silver"], reply: "Silver (symbol Ag) is the best electrical conductor among metals." },
  { keywords: ["element iron", "what is iron"], reply: "Iron (symbol Fe) is a key component of steel and hemoglobin." },
  { keywords: ["element helium", "what is helium"], reply: "Helium (symbol He) is a light, inert gas used in balloons." },
  { keywords: ["element sodium", "what is sodium"], reply: "Sodium (symbol Na) is a reactive metal, part of table salt." },
  { keywords: ["element calcium", "what is calcium"], reply: "Calcium (symbol Ca) is essential for strong bones and teeth." },
  { keywords: ["element uranium", "what is uranium"], reply: "Uranium (symbol U) is a radioactive element used in nuclear power." },
  { keywords: ["element copper", "what is copper"], reply: "Copper (symbol Cu) is an excellent conductor used in wiring." },
  { keywords: ["element aluminium", "what is aluminium"], reply: "Aluminium (symbol Al) is a lightweight metal used in packaging and aviation." },
  { keywords: ["element zinc", "what is zinc"], reply: "Zinc (symbol Zn) is used for galvanizing steel to prevent rust." },
  { keywords: ["element neon", "what is neon"], reply: "Neon (symbol Ne) is a noble gas famous for glowing signs." },

  // ---- Programming languages ----
  { keywords: ["what is python", "tell me about python"], reply: "Python is a high-level, readable language popular for AI, web, and scripting." },
  { keywords: ["what is javascript", "tell me about javascript"], reply: "JavaScript is the language of the web, used for interactive front-end and back-end (Node.js) development." },
  { keywords: ["what is java", "tell me about java"], reply: "Java is a widely-used object-oriented language known for 'write once, run anywhere'." },
  { keywords: ["what is c plus plus", "tell me about c plus plus"], reply: "C++ is a powerful language used in game engines, systems programming, and performance-critical apps." },
  { keywords: ["what is c sharp", "tell me about c sharp"], reply: "C# is Microsoft's language, widely used for Windows apps and Unity game development." },
  { keywords: ["what is html", "tell me about html"], reply: "HTML is the markup language that structures content on the web." },
  { keywords: ["what is css", "tell me about css"], reply: "CSS is used to style and layout HTML content." },
  { keywords: ["what is sql", "tell me about sql"], reply: "SQL is used to query and manage relational databases." },
  { keywords: ["what is php", "tell me about php"], reply: "PHP is a server-side scripting language widely used for web development." },
  { keywords: ["what is swift", "tell me about swift"], reply: "Swift is Apple's language for building iOS and macOS apps." },
  { keywords: ["what is kotlin", "tell me about kotlin"], reply: "Kotlin is a modern language used mainly for Android development." },
  { keywords: ["what is go", "tell me about go"], reply: "Go, or Golang, is known for simplicity and strong performance in backend systems." },
  { keywords: ["what is rust", "tell me about rust"], reply: "Rust is known for memory safety without a garbage collector, popular in systems programming." },
  { keywords: ["what is typescript", "tell me about typescript"], reply: "TypeScript is JavaScript with static typing, developed by Microsoft." },
  { keywords: ["what is ruby", "tell me about ruby"], reply: "Ruby is a dynamic language known for developer happiness and the Rails framework." },

  // ---- Git commands ----
  { keywords: ["git clone"], reply: "git clone <url> copies a remote repository to your local machine." },
  { keywords: ["git commit"], reply: "git commit -m \"message\" saves your staged changes with a message." },
  { keywords: ["git push"], reply: "git push uploads your local commits to the remote repository." },
  { keywords: ["git pull"], reply: "git pull fetches and merges changes from the remote repository." },
  { keywords: ["git branch"], reply: "git branch lists, creates, or deletes branches." },
  { keywords: ["git checkout"], reply: "git checkout <branch> switches to another branch." },
  { keywords: ["git merge"], reply: "git merge <branch> combines changes from another branch into the current one." },
  { keywords: ["git status"], reply: "git status shows the state of your working directory and staged changes." },
  { keywords: ["git add"], reply: "git add <file> stages changes for the next commit." },
  { keywords: ["git log"], reply: "git log shows the commit history." },
  { keywords: ["git stash"], reply: "git stash temporarily shelves uncommitted changes." },
  { keywords: ["git reset"], reply: "git reset undoes commits or unstages changes." },
  { keywords: ["git rebase"], reply: "git rebase reapplies commits on top of another base commit." },
  { keywords: ["git diff"], reply: "git diff shows changes between commits, branches, or the working directory." },
  { keywords: ["git init"], reply: "git init creates a new local Git repository." },

  // ---- VS Code shortcuts ----
  { keywords: ["vscode command palette"], reply: "Ctrl+Shift+P opens the Command Palette in VS Code." },
  { keywords: ["vscode multi cursor"], reply: "Alt+Click adds multiple cursors in VS Code." },
  { keywords: ["vscode comment shortcut"], reply: "Ctrl+/ toggles a line comment in VS Code." },
  { keywords: ["vscode format document"], reply: "Shift+Alt+F formats the whole document in VS Code." },
  { keywords: ["vscode new terminal"], reply: "Ctrl+` opens a new integrated terminal in VS Code." },
  { keywords: ["vscode find in files"], reply: "Ctrl+Shift+F searches across all files in the project." },
  { keywords: ["vscode rename symbol"], reply: "F2 renames a symbol across the project in VS Code." },
  { keywords: ["vscode duplicate line"], reply: "Shift+Alt+Down duplicates the current line in VS Code." },

  // ---- Tech terms explained ----
  { keywords: ["what is api"], reply: "An API (Application Programming Interface) lets two software systems talk to each other." },
  { keywords: ["what is cpu"], reply: "The CPU, or Central Processing Unit, is the main chip that executes instructions in a computer." },
  { keywords: ["what is ram"], reply: "RAM (Random Access Memory) temporarily stores data your computer is actively using." },
  { keywords: ["what is gpu"], reply: "A GPU (Graphics Processing Unit) handles rendering images and parallel computations." },
  { keywords: ["what is ssd"], reply: "An SSD (Solid State Drive) is fast storage with no moving parts, unlike a traditional hard drive." },
  { keywords: ["what is cloud computing"], reply: "Cloud computing means running software and storing data on remote servers accessed via the internet." },
  { keywords: ["what is machine learning"], reply: "Machine learning is a field of AI where systems learn patterns from data instead of explicit programming." },
  { keywords: ["what is artificial intelligence"], reply: "Artificial Intelligence is the simulation of human-like intelligence in machines." },
  { keywords: ["what is blockchain"], reply: "Blockchain is a distributed, tamper-resistant ledger of records shared across a network." },
  { keywords: ["what is cryptocurrency"], reply: "Cryptocurrency is digital money secured by cryptography, often built on blockchain technology." },
  { keywords: ["what is html5"], reply: "HTML5 is the latest major version of HTML, adding multimedia and semantic elements." },
  { keywords: ["what is dns"], reply: "DNS (Domain Name System) translates domain names like google.com into IP addresses." },
  { keywords: ["what is vpn"], reply: "A VPN (Virtual Private Network) encrypts your internet traffic and hides your IP address." },
  { keywords: ["what is firewall"], reply: "A firewall monitors and controls incoming and outgoing network traffic based on security rules." },
  { keywords: ["what is open source"], reply: "Open source software has publicly available source code that anyone can view, use, or modify." },
  { keywords: ["what is github"], reply: "GitHub is a platform for hosting and collaborating on Git repositories." },
  { keywords: ["what is a database"], reply: "A database is an organized collection of data, typically managed by a database management system." },
  { keywords: ["what is an algorithm"], reply: "An algorithm is a step-by-step procedure for solving a problem or performing a task." },
  { keywords: ["what is debugging"], reply: "Debugging is the process of finding and fixing errors, or bugs, in code." },
  { keywords: ["what is frontend"], reply: "Frontend development focuses on the visual, user-facing part of an application." },
  { keywords: ["what is backend"], reply: "Backend development handles servers, databases, and application logic behind the scenes." },
  { keywords: ["what is full stack"], reply: "A full stack developer works on both frontend and backend parts of an application." },
  { keywords: ["what is rest api"], reply: "A REST API follows REST principles, using HTTP methods to interact with resources over the web." },
  { keywords: ["what is json"], reply: "JSON (JavaScript Object Notation) is a lightweight format for storing and exchanging data." },
  { keywords: ["what is npm"], reply: "npm (Node Package Manager) is used to install and manage JavaScript packages." },

  // ---- Unit conversions ----
  {
    keywords: ['convert km to miles', 'kilometers to miles'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/g);
      if (!nums) return "Tell me a number, like 'convert 10 km to miles'.";
      const km = Number(nums[0]);
      return `${km} kilometers is about ${(km * 0.621371).toFixed(2)} miles.`;
    }
  },
  {
    keywords: ['convert miles to km', 'miles to kilometers'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/g);
      if (!nums) return "Tell me a number, like 'convert 10 miles to km'.";
      const mi = Number(nums[0]);
      return `${mi} miles is about ${(mi * 1.60934).toFixed(2)} kilometers.`;
    }
  },
  {
    keywords: ['convert kg to pounds', 'kilograms to pounds'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/g);
      if (!nums) return "Tell me a number, like 'convert 10 kg to pounds'.";
      const kg = Number(nums[0]);
      return `${kg} kilograms is about ${(kg * 2.20462).toFixed(2)} pounds.`;
    }
  },
  {
    keywords: ['convert pounds to kg', 'pounds to kilograms'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/g);
      if (!nums) return "Tell me a number, like 'convert 10 pounds to kg'.";
      const lb = Number(nums[0]);
      return `${lb} pounds is about ${(lb * 0.453592).toFixed(2)} kilograms.`;
    }
  },
  {
    keywords: ['convert celsius to fahrenheit'],
    action: (msg) => {
      const nums = msg.match(/[\d.-]+/g);
      if (!nums) return "Tell me a number, like 'convert 30 celsius to fahrenheit'.";
      const c = Number(nums[0]);
      return `${c}°C is ${(c * 9 / 5 + 32).toFixed(1)}°F.`;
    }
  },
  {
    keywords: ['convert fahrenheit to celsius'],
    action: (msg) => {
      const nums = msg.match(/[\d.-]+/g);
      if (!nums) return "Tell me a number, like 'convert 86 fahrenheit to celsius'.";
      const f = Number(nums[0]);
      return `${f}°F is ${((f - 32) * 5 / 9).toFixed(1)}°C.`;
    }
  },

  // ---- Sports facts ----
  { keywords: ["who won the last fifa world cup"], reply: "Argentina won the 2022 FIFA World Cup, defeating France on penalties." },
  { keywords: ["how many players in football team"], reply: "A football (soccer) team has 11 players on the field at a time." },
  { keywords: ["how many players in cricket team"], reply: "A cricket team has 11 players." },
  { keywords: ["how many players in basketball team"], reply: "A basketball team has 5 players on the court at a time." },
  { keywords: ["what is icc"], reply: "The ICC, or International Cricket Council, is the global governing body for cricket." },
  { keywords: ["what is fifa"], reply: "FIFA is the international governing body for association football (soccer)." },
  { keywords: ["who is sachin tendulkar"], reply: "Sachin Tendulkar is a former Indian cricketer, widely regarded as one of the greatest batsmen ever." },
  { keywords: ["who is virat kohli"], reply: "Virat Kohli is a prominent Indian cricketer known for his aggressive batting." },
  { keywords: ["who is lionel messi"], reply: "Lionel Messi is an Argentine footballer, widely regarded as one of the greatest players of all time." },
  { keywords: ["who is cristiano ronaldo"], reply: "Cristiano Ronaldo is a Portuguese footballer known for his goal-scoring records." },
  { keywords: ["how many overs in odi"], reply: "An ODI cricket match consists of 50 overs per side." },
  { keywords: ["how many overs in t20"], reply: "A T20 cricket match consists of 20 overs per side." },
  { keywords: ["olympics held every how many years"], reply: "The Olympic Games are held every 4 years." },

  // ---- Historical events ----
  { keywords: ["when did india get independence"], reply: "India got independence on 15 August 1947." },
  { keywords: ["when did world war 2 end"], reply: "World War II ended in 1945." },
  { keywords: ["when did world war 1 start"], reply: "World War I started in 1914." },
  { keywords: ["when was the taj mahal built"], reply: "The Taj Mahal was built between 1632 and 1653." },
  { keywords: ["when did man land on moon"], reply: "Neil Armstrong first landed on the Moon on 20 July 1969." },
  { keywords: ["when was google founded"], reply: "Google was founded in 1998." },
  { keywords: ["when was facebook founded"], reply: "Facebook was founded in 2004." },
  { keywords: ["when was apple founded"], reply: "Apple was founded in 1976." },
  { keywords: ["when was microsoft founded"], reply: "Microsoft was founded in 1975." },
  { keywords: ["when did berlin wall fall"], reply: "The Berlin Wall fell in 1989." },

  // ---- Books & authors ----
  { keywords: ["who wrote harry potter"], reply: "J.K. Rowling wrote the Harry Potter series." },
  { keywords: ["who wrote romeo and juliet"], reply: "William Shakespeare wrote Romeo and Juliet." },
  { keywords: ["who wrote the gita"], reply: "The Bhagavad Gita is part of the Mahabharata, traditionally attributed to sage Vyasa." },
  { keywords: ["who wrote ramayan"], reply: "The Ramayana is traditionally attributed to the sage Valmiki." },
  { keywords: ["who wrote mahabharata"], reply: "The Mahabharata is traditionally attributed to the sage Vyasa." },
  { keywords: ["who wrote the alchemist"], reply: "Paulo Coelho wrote The Alchemist." },
  { keywords: ["who wrote 1984"], reply: "George Orwell wrote the novel 1984." },
  { keywords: ["who wrote to kill a mockingbird"], reply: "Harper Lee wrote To Kill a Mockingbird." },
  { keywords: ["who wrote lord of the rings"], reply: "J.R.R. Tolkien wrote The Lord of the Rings." },
  { keywords: ["who wrote game of thrones"], reply: "George R.R. Martin wrote the A Song of Ice and Fire series, adapted as Game of Thrones." },

  // ---- Zodiac signs ----
  { keywords: ["aries zodiac", "tell me about aries"], reply: "Aries (Mar 21 - Apr 19) is known for being bold, energetic, and a natural leader." },
  { keywords: ["taurus zodiac", "tell me about taurus"], reply: "Taurus (Apr 20 - May 20) is known for being reliable, patient, and practical." },
  { keywords: ["gemini zodiac", "tell me about gemini"], reply: "Gemini (May 21 - Jun 20) is known for being curious, adaptable, and a great communicator." },
  { keywords: ["cancer zodiac", "tell me about cancer"], reply: "Cancer (Jun 21 - Jul 22) is known for being emotional, intuitive, and caring." },
  { keywords: ["leo zodiac", "tell me about leo"], reply: "Leo (Jul 23 - Aug 22) is known for being confident, generous, and dramatic." },
  { keywords: ["virgo zodiac", "tell me about virgo"], reply: "Virgo (Aug 23 - Sep 22) is known for being analytical, practical, and hardworking." },
  { keywords: ["libra zodiac", "tell me about libra"], reply: "Libra (Sep 23 - Oct 22) is known for being diplomatic, fair-minded, and social." },
  { keywords: ["scorpio zodiac", "tell me about scorpio"], reply: "Scorpio (Oct 23 - Nov 21) is known for being passionate, resourceful, and intense." },
  { keywords: ["sagittarius zodiac", "tell me about sagittarius"], reply: "Sagittarius (Nov 22 - Dec 21) is known for being adventurous, optimistic, and honest." },
  { keywords: ["capricorn zodiac", "tell me about capricorn"], reply: "Capricorn (Dec 22 - Jan 19) is known for being disciplined, responsible, and ambitious." },
  { keywords: ["aquarius zodiac", "tell me about aquarius"], reply: "Aquarius (Jan 20 - Feb 18) is known for being independent, original, and humanitarian." },
  { keywords: ["pisces zodiac", "tell me about pisces"], reply: "Pisces (Feb 19 - Mar 20) is known for being compassionate, artistic, and intuitive." },

  // ---- Daily conversation ----
  { keywords: ["how are you"], reply: "I'm doing great, thanks for asking! How about you?" },
  { keywords: ["whats up"], reply: "Just here, ready to help you out. What's up with you?" },
  { keywords: ["what are you doing"], reply: "Just waiting for your next command!" },
  { keywords: ["nice to meet you"], reply: "Nice to meet you too!" },
  { keywords: ["see you later"], reply: "See you later! I'll be right here." },
  { keywords: ["bye"], reply: "Goodbye! Talk to you soon." },
  { keywords: ["good bye lumo"], reply: "Goodbye! Have a great day." },
  { keywords: ["are you there"], reply: "Yes, I'm right here and listening." },
  { keywords: ["can you hear me"], reply: "Yes, I can hear you loud and clear." },
  { keywords: ["do you understand me"], reply: "Yes, I understood that." },
  { keywords: ["okay lumo"], reply: "Okay! Let me know what you need." },
  { keywords: ["sorry lumo"], reply: "No worries at all!" },
  { keywords: ["i am back"], reply: "Welcome back! What can I do for you?" },
  { keywords: ["i am here"], reply: "Great, I'm listening." },
  { keywords: ["wake up"], reply: "I'm already awake and listening!" },

  // ---- More jokes ----
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "Why do programmers prefer dark mode? Because light attracts bugs." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "I told my computer I needed a break, and it said no problem \u2014 it froze immediately." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "There are 10 types of people in the world \u2014 those who understand binary and those who don't." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "Why do Python programmers wear glasses? Because they can't C." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "A SQL query walks into a bar, walks up to two tables and asks, can I join you?" },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "Why did the developer go broke? Because he lost his domain in a bet." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "How many programmers does it take to change a light bulb? None, that's a hardware problem." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "Why don't programmers like to go outside? The sunlight causes too many reflections." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "What do you call 8 hobbits? A hobbyte." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "Why was the computer cold? It left its Windows open." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "I would tell you a UDP joke, but you might not get it." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "Debugging: being the detective in a crime movie where you are also the murderer." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "Why did the function stop calling itself? It had too many recursion issues." },
  { keywords: ["another one", "tell me another joke", "more jokes"], reply: "There's no place like 127.0.0.1." },

  // ---- Even more apps ----
  { keywords: ["open notion"], action: () => { window.open("https://notion.so", "_blank"); return "Opening Notion..."; } },
  { keywords: ["open trello"], action: () => { window.open("https://trello.com", "_blank"); return "Opening Trello..."; } },
  { keywords: ["open slack"], action: () => { window.open("https://slack.com", "_blank"); return "Opening Slack..."; } },
  { keywords: ["open discord"], action: () => { window.open("https://discord.com", "_blank"); return "Opening Discord..."; } },
  { keywords: ["open figma"], action: () => { window.open("https://figma.com", "_blank"); return "Opening Figma..."; } },
  { keywords: ["open codepen"], action: () => { window.open("https://codepen.io", "_blank"); return "Opening Codepen..."; } },
  { keywords: ["open stackoverflow"], action: () => { window.open("https://stackoverflow.com", "_blank"); return "Opening Stackoverflow..."; } },
  { keywords: ["open leetcode"], action: () => { window.open("https://leetcode.com", "_blank"); return "Opening Leetcode..."; } },
  { keywords: ["open hackerrank"], action: () => { window.open("https://hackerrank.com", "_blank"); return "Opening Hackerrank..."; } },
  { keywords: ["open coursera"], action: () => { window.open("https://coursera.org", "_blank"); return "Opening Coursera..."; } },
  { keywords: ["open udemy"], action: () => { window.open("https://udemy.com", "_blank"); return "Opening Udemy..."; } },
  { keywords: ["open khan academy"], action: () => { window.open("https://khanacademy.org", "_blank"); return "Opening Khan Academy..."; } },
  { keywords: ["open duolingo"], action: () => { window.open("https://duolingo.com", "_blank"); return "Opening Duolingo..."; } },
  { keywords: ["open spotify web"], action: () => { window.open("https://open.spotify.com", "_blank"); return "Opening Spotify Web..."; } },
  { keywords: ["open soundcloud"], action: () => { window.open("https://soundcloud.com", "_blank"); return "Opening Soundcloud..."; } },
  { keywords: ["open dropbox"], action: () => { window.open("https://dropbox.com", "_blank"); return "Opening Dropbox..."; } },
  { keywords: ["open onedrive"], action: () => { window.open("https://onedrive.live.com", "_blank"); return "Opening Onedrive..."; } },
  { keywords: ["open outlook"], action: () => { window.open("https://outlook.com", "_blank"); return "Opening Outlook..."; } },
  { keywords: ["open yahoo"], action: () => { window.open("https://yahoo.com", "_blank"); return "Opening Yahoo..."; } },
  { keywords: ["open bing"], action: () => { window.open("https://bing.com", "_blank"); return "Opening Bing..."; } },
  { keywords: ["open duckduckgo"], action: () => { window.open("https://duckduckgo.com", "_blank"); return "Opening Duckduckgo..."; } },
  { keywords: ["open quora"], action: () => { window.open("https://quora.com", "_blank"); return "Opening Quora..."; } },
  { keywords: ["open medium"], action: () => { window.open("https://medium.com", "_blank"); return "Opening Medium..."; } },
  { keywords: ["open behance"], action: () => { window.open("https://behance.net", "_blank"); return "Opening Behance..."; } },
  { keywords: ["open dribbble"], action: () => { window.open("https://dribbble.com", "_blank"); return "Opening Dribbble..."; } },
  { keywords: ["open unsplash"], action: () => { window.open("https://unsplash.com", "_blank"); return "Opening Unsplash..."; } },
  { keywords: ["open pexels"], action: () => { window.open("https://pexels.com", "_blank"); return "Opening Pexels..."; } },
  { keywords: ["open imdb"], action: () => { window.open("https://imdb.com", "_blank"); return "Opening Imdb..."; } },
  { keywords: ["open booking dot com"], action: () => { window.open("https://booking.com", "_blank"); return "Opening Booking Dot Com..."; } },
  { keywords: ["open makemytrip"], action: () => { window.open("https://makemytrip.com", "_blank"); return "Opening Makemytrip..."; } },
  { keywords: ["open irctc"], action: () => { window.open("https://irctc.co.in", "_blank"); return "Opening Irctc..."; } },
  { keywords: ["open paytm"], action: () => { window.open("https://paytm.com", "_blank"); return "Opening Paytm..."; } },
  { keywords: ["open phonepe"], action: () => { window.open("https://phonepe.com", "_blank"); return "Opening Phonepe..."; } },
  { keywords: ["open zomato"], action: () => { window.open("https://zomato.com", "_blank"); return "Opening Zomato..."; } },
  { keywords: ["open swiggy"], action: () => { window.open("https://swiggy.com", "_blank"); return "Opening Swiggy..."; } },
  { keywords: ["open uber"], action: () => { window.open("https://uber.com", "_blank"); return "Opening Uber..."; } },
  { keywords: ["open ola"], action: () => { window.open("https://olacabs.com", "_blank"); return "Opening Ola..."; } },
  { keywords: ["open linkedin learning"], action: () => { window.open("https://linkedin.com/learning", "_blank"); return "Opening Linkedin Learning..."; } },
  { keywords: ["open canva design"], action: () => { window.open("https://canva.com", "_blank"); return "Opening Canva Design..."; } },
  { keywords: ["open adobe"], action: () => { window.open("https://adobe.com", "_blank"); return "Opening Adobe..."; } },

  // ---- Food & recipe tips ----
  { keywords: ["how to boil an egg"], reply: "Place eggs in water, bring to a boil, then simmer for about 9-12 minutes depending on desired firmness." },
  { keywords: ["how to make tea"], reply: "Boil water, add tea leaves or a tea bag, let it steep for 3-5 minutes, then add milk or sugar as desired." },
  { keywords: ["how to make coffee"], reply: "Brew ground coffee with hot water, using a filter, French press, or machine, for about 4 minutes." },
  { keywords: ["how to make maggi"], reply: "Boil water, add maggi noodles and tastemaker, cook for about 2 minutes." },
  { keywords: ["how to make pasta"], reply: "Boil salted water, add pasta, cook 8-12 minutes until al dente, then drain and add sauce." },
  { keywords: ["healthy breakfast ideas"], reply: "Try oatmeal with fruit, eggs with whole grain toast, or a smoothie with yogurt and berries." },
  { keywords: ["how to reduce sugar intake"], reply: "Cut back on sugary drinks, read labels, and swap desserts for fruit gradually." },

  // ---- Travel tips ----
  { keywords: ["best time to visit goa"], reply: "The best time to visit Goa is between November and February, during the cool, dry season." },
  { keywords: ["best time to visit manali"], reply: "The best time to visit Manali is from March to June, or November to February for snow." },
  { keywords: ["packing tips for travel"], reply: "Roll clothes instead of folding, pack a change of clothes in your carry-on, and use packing cubes." },
  { keywords: ["how to book train tickets in india"], reply: "You can book train tickets through IRCTC's website or app." },
  { keywords: ["what documents needed for flight"], reply: "Carry a valid government ID, your ticket, and any required visa or travel documents." },

  // ---- Study tips ----
  { keywords: ["how to study effectively"], reply: "Use active recall, spaced repetition, take breaks with the Pomodoro technique, and avoid multitasking." },
  { keywords: ["how to improve focus while studying"], reply: "Remove distractions, study in short focused sessions, and take regular breaks." },
  { keywords: ["how to prepare for exams"], reply: "Make a study schedule, practice past papers, and review your weakest topics first." },
  { keywords: ["tips for time management"], reply: "Prioritize tasks, use a calendar, break big tasks into smaller ones, and avoid procrastination." },
  { keywords: ["how to memorize faster"], reply: "Use mnemonics, visualize concepts, teach it to someone else, and repeat with spaced intervals." },
  { keywords: ["how to take good notes"], reply: "Use the Cornell method, summarize in your own words, and review notes within 24 hours." },

  // ---- Business & finance terms ----
  { keywords: ["what is inflation"], reply: "Inflation is the general increase in prices and fall in the purchasing value of money over time." },
  { keywords: ["what is gdp"], reply: "GDP, or Gross Domestic Product, measures the total value of goods and services produced in a country." },
  { keywords: ["what is a mutual fund"], reply: "A mutual fund pools money from many investors to invest in stocks, bonds, or other assets." },
  { keywords: ["what is a stock"], reply: "A stock represents a share of ownership in a company." },
  { keywords: ["what is compound interest"], reply: "Compound interest is interest calculated on both the initial principal and accumulated interest." },
  { keywords: ["what is a budget"], reply: "A budget is a plan that tracks income and expenses over a period of time." },
  { keywords: ["what is credit score"], reply: "A credit score is a number representing your creditworthiness, based on your borrowing and repayment history." },
  { keywords: ["what is a startup"], reply: "A startup is a young company designed to grow quickly, often built around an innovative idea." },
  { keywords: ["what is roi"], reply: "ROI, or Return on Investment, measures the profitability of an investment relative to its cost." },
  { keywords: ["what is a recession"], reply: "A recession is a significant decline in economic activity lasting more than a few months." },

  // ---- More motivational quotes ----
  { keywords: ["quote me something", "say a quote", "give me a quote"], reply: "Success is not final, failure is not fatal \u2014 it is the courage to continue that counts." },
  { keywords: ["quote me something", "say a quote", "give me a quote"], reply: "The only way to do great work is to love what you do." },
  { keywords: ["quote me something", "say a quote", "give me a quote"], reply: "Believe you can and you're halfway there." },
  { keywords: ["quote me something", "say a quote", "give me a quote"], reply: "Don't watch the clock; do what it does \u2014 keep going." },
  { keywords: ["quote me something", "say a quote", "give me a quote"], reply: "Hardships often prepare ordinary people for an extraordinary destiny." },
  { keywords: ["quote me something", "say a quote", "give me a quote"], reply: "The future belongs to those who believe in the beauty of their dreams." },
  { keywords: ["quote me something", "say a quote", "give me a quote"], reply: "It always seems impossible until it's done." },
  { keywords: ["quote me something", "say a quote", "give me a quote"], reply: "Push yourself, because no one else is going to do it for you." },
  { keywords: ["quote me something", "say a quote", "give me a quote"], reply: "Great things never come from comfort zones." },
  { keywords: ["quote me something", "say a quote", "give me a quote"], reply: "Dream it. Wish it. Do it." },

  // ---- Days & months ----
  { keywords: ["fact about monday"], reply: "Monday is a day of the week \u2014 hope it's treating you well!" },
  { keywords: ["fact about tuesday"], reply: "Tuesday is a day of the week \u2014 hope it's treating you well!" },
  { keywords: ["fact about wednesday"], reply: "Wednesday is a day of the week \u2014 hope it's treating you well!" },
  { keywords: ["fact about thursday"], reply: "Thursday is a day of the week \u2014 hope it's treating you well!" },
  { keywords: ["fact about friday"], reply: "Friday is a day of the week \u2014 hope it's treating you well!" },
  { keywords: ["fact about saturday"], reply: "Saturday is a day of the week \u2014 hope it's treating you well!" },
  { keywords: ["fact about sunday"], reply: "Sunday is a day of the week \u2014 hope it's treating you well!" },
  { keywords: ["fact about january"], reply: "January is the first month, named after the Roman god Janus." },
  { keywords: ["fact about february"], reply: "February is the shortest month, with 28 or 29 days in a leap year." },
  { keywords: ["fact about march"], reply: "March is named after Mars, the Roman god of war." },
  { keywords: ["fact about april"], reply: "April is associated with the blooming of spring in the Northern Hemisphere." },
  { keywords: ["fact about may"], reply: "May is named after the Greek goddess Maia." },
  { keywords: ["fact about june"], reply: "June is named after the Roman goddess Juno." },
  { keywords: ["fact about july"], reply: "July is named after Julius Caesar." },
  { keywords: ["fact about august"], reply: "August is named after the Roman emperor Augustus." },
  { keywords: ["fact about september"], reply: "September was originally the seventh month in the old Roman calendar." },
  { keywords: ["fact about october"], reply: "October was originally the eighth month in the old Roman calendar." },
  { keywords: ["fact about november"], reply: "November was originally the ninth month in the old Roman calendar." },
  { keywords: ["fact about december"], reply: "December was originally the tenth month in the old Roman calendar." },

  // ---- Number trivia ----
  {
    keywords: ['is prime', 'prime number'],
    action: (msg) => {
      const nums = msg.match(/\d+/);
      if (!nums) return "Give me a number, like 'is 17 a prime number'.";
      const n = parseInt(nums[0], 10);
      if (n < 2) return `${n} is not a prime number.`;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return `${n} is not a prime number.`;
      }
      return `${n} is a prime number.`;
    }
  },
  {
    keywords: ['factorial of'],
    action: (msg) => {
      const nums = msg.match(/\d+/);
      if (!nums) return "Give me a number, like 'factorial of 5'.";
      const n = parseInt(nums[0], 10);
      let result = 1;
      for (let i = 2; i <= n; i++) result *= i;
      return `The factorial of ${n} is ${result}.`;
    }
  },
  {
    keywords: ['double of', 'twice of'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/);
      if (!nums) return "Give me a number, like 'double of 12'.";
      const n = parseFloat(nums[0]);
      return `Double of ${n} is ${n * 2}.`;
    }
  },
  {
    keywords: ['half of'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/);
      if (!nums) return "Give me a number, like 'half of 12'.";
      const n = parseFloat(nums[0]);
      return `Half of ${n} is ${n / 2}.`;
    }
  },

  // ---- More health tips ----
  { keywords: ["how to improve posture"], reply: "Sit up straight, keep your screen at eye level, and take breaks to stretch every hour." },
  { keywords: ["tips for eye strain"], reply: "Follow the 20-20-20 rule \u2014 every 20 minutes, look at something 20 feet away for 20 seconds." },
  { keywords: ["how to boost immunity"], reply: "Eat a balanced diet, sleep well, exercise regularly, and stay hydrated." },
  { keywords: ["benefits of walking"], reply: "Walking improves cardiovascular health, mood, and helps maintain a healthy weight." },
  { keywords: ["how to reduce screen time"], reply: "Set app limits, schedule screen-free hours, and replace scrolling with a hobby." },
  { keywords: ["tips for better sleep"], reply: "Keep a consistent sleep schedule, avoid screens before bed, and keep your room cool and dark." },

  // ---- More Excel tips ----
  { keywords: ["index match excel"], reply: "INDEX MATCH combines INDEX and MATCH functions for flexible lookups, often replacing VLOOKUP." },
  { keywords: ["countif excel"], reply: "COUNTIF counts cells that meet a condition, e.g. =COUNTIF(A1:A10, \">5\")." },
  { keywords: ["sumif excel"], reply: "SUMIF adds cells that meet a condition, e.g. =SUMIF(A1:A10, \">5\", B1:B10)." },
  { keywords: ["iferror excel"], reply: "IFERROR returns a custom value if a formula results in an error, e.g. =IFERROR(A1/B1, 0)." },
  { keywords: ["text to columns excel"], reply: "'Data' tab \u2192 'Text to Columns' splits one column into multiple based on a delimiter." },
  { keywords: ["named ranges excel"], reply: "'Formulas' tab \u2192 'Define Name' creates a named range you can reference by name." },
  { keywords: ["excel sparklines"], reply: "'Insert' tab \u2192 'Sparklines' adds tiny in-cell charts to visualize trends." },
  { keywords: ["what if analysis excel"], reply: "'Data' tab \u2192 'What-If Analysis' lets you test different scenarios like Goal Seek." },

  // ---- More Word tips ----
  { keywords: ["track changes in word"], reply: "'Review' tab \u2192 'Track Changes' records edits made to a document." },
  { keywords: ["compare documents in word"], reply: "'Review' tab \u2192 'Compare' shows differences between two document versions." },
  { keywords: ["table of contents word"], reply: "'References' tab \u2192 'Table of Contents' generates one automatically from your headings." },
  { keywords: ["mail merge in word"], reply: "'Mailings' tab \u2192 'Start Mail Merge' lets you send personalized documents to a list of recipients." },
  { keywords: ["word count in word"], reply: "'Review' tab \u2192 'Word Count' shows the number of words, characters, and pages." },
  { keywords: ["insert citation word"], reply: "'References' tab \u2192 'Insert Citation' adds a properly formatted citation." },

  // ---- More PowerPoint tips ----
  { keywords: ["speaker notes ppt"], reply: "'View' tab \u2192 'Notes Page' lets you add notes visible only to the presenter." },
  { keywords: ["presenter view ppt"], reply: "'Slide Show' tab \u2192 check 'Use Presenter View' to see notes while presenting." },
  { keywords: ["morph transition ppt"], reply: "The Morph transition smoothly animates objects between two similar slides." },
  { keywords: ["ppt master slide"], reply: "'View' tab \u2192 'Slide Master' lets you edit the design applied to all slides." },
  { keywords: ["record narration ppt"], reply: "'Slide Show' tab \u2192 'Record Slide Show' lets you add narration and timings." },
  // ---- Animal facts ----
  { keywords: ["fact about elephant", "tell me about elephant"], reply: "Elephants are the largest land animals and have excellent memories." },
  { keywords: ["fact about blue whale", "tell me about blue whale"], reply: "The blue whale is the largest animal to have ever lived on Earth." },
  { keywords: ["fact about cheetah", "tell me about cheetah"], reply: "Cheetahs can reach speeds of up to 100 km/h, making them the fastest land animal." },
  { keywords: ["fact about octopus", "tell me about octopus"], reply: "Octopuses have three hearts and blue blood." },
  { keywords: ["fact about owl", "tell me about owl"], reply: "Owls can rotate their heads up to 270 degrees." },
  { keywords: ["fact about dolphin", "tell me about dolphin"], reply: "Dolphins are highly intelligent and use echolocation to navigate and hunt." },
  { keywords: ["fact about penguin", "tell me about penguin"], reply: "Penguins are flightless birds that are excellent swimmers." },
  { keywords: ["fact about kangaroo", "tell me about kangaroo"], reply: "Kangaroos carry their young, called joeys, in a pouch." },
  { keywords: ["fact about giraffe", "tell me about giraffe"], reply: "Giraffes are the tallest land animals, with necks up to 6 feet long." },
  { keywords: ["fact about polar bear", "tell me about polar bear"], reply: "Polar bears have black skin under their white fur to help absorb heat." },
  { keywords: ["fact about chameleon", "tell me about chameleon"], reply: "Chameleons can change color to regulate temperature and communicate, not just camouflage." },
  { keywords: ["fact about bat", "tell me about bat"], reply: "Bats are the only mammals capable of true, sustained flight." },
  { keywords: ["fact about ant", "tell me about ant"], reply: "Ants can carry objects many times their own body weight." },
  { keywords: ["fact about honey bee", "tell me about honey bee"], reply: "Honey bees communicate the location of food through a waggle dance." },
  { keywords: ["fact about shark", "tell me about shark"], reply: "Sharks have been around for over 400 million years, predating dinosaurs." },

  // ---- Space facts ----
  { keywords: ["what is a black hole"], reply: "A black hole is a region of space with gravity so strong that nothing, not even light, can escape it." },
  { keywords: ["what is the milky way"], reply: "The Milky Way is the galaxy that contains our solar system." },
  { keywords: ["how old is the universe"], reply: "The universe is estimated to be about 13.8 billion years old." },
  { keywords: ["what is a supernova"], reply: "A supernova is a powerful explosion that occurs at the end of a massive star's life." },
  { keywords: ["what is a light year"], reply: "A light year is the distance light travels in one year, about 9.46 trillion kilometers." },
  { keywords: ["how far is the moon"], reply: "The Moon is about 384,400 kilometers from Earth on average." },
  { keywords: ["how far is the sun"], reply: "The Sun is about 150 million kilometers from Earth." },
  { keywords: ["what is mars known for"], reply: "Mars is known as the Red Planet due to iron oxide on its surface." },
  { keywords: ["who was the first person on the moon"], reply: "Neil Armstrong was the first person to walk on the Moon, in 1969." },
  { keywords: ["what is nasa"], reply: "NASA is the United States' space agency, responsible for space exploration and research." },
  { keywords: ["what is isro"], reply: "ISRO is the Indian Space Research Organisation, India's national space agency." },

  // ---- Geography facts ----
  { keywords: ["what is the equator"], reply: "The equator is an imaginary line around the Earth's middle, equidistant from both poles." },
  { keywords: ["what are the seven wonders"], reply: "The New Seven Wonders include the Great Wall of China, Petra, Colosseum, Chichen Itza, Machu Picchu, Christ the Redeemer, and the Taj Mahal." },
  { keywords: ["largest desert"], reply: "The Sahara is the largest hot desert; Antarctica is the largest desert overall." },
  { keywords: ["largest island"], reply: "Greenland is the largest island in the world." },
  { keywords: ["deepest ocean point"], reply: "The Mariana Trench is the deepest known point in Earth's oceans." },
  { keywords: ["largest lake"], reply: "The Caspian Sea is the largest lake in the world by area." },
  { keywords: ["longest wall"], reply: "The Great Wall of China is the longest wall ever built." },
  { keywords: ["how many countries in the world"], reply: "There are 195 countries in the world, according to the United Nations." },
  { keywords: ["how many states in india"], reply: "India has 28 states and 8 union territories." },
  { keywords: ["largest state in india"], reply: "Rajasthan is the largest state in India by area." },
  { keywords: ["smallest state in india"], reply: "Goa is the smallest state in India by area." },

  // ---- More general trivia ----
  { keywords: ["how many bones in human body"], reply: "An adult human body has 206 bones." },
  { keywords: ["how many teeth does an adult have"], reply: "An adult typically has 32 teeth." },
  { keywords: ["how many chambers in human heart"], reply: "The human heart has four chambers." },
  { keywords: ["what is the largest organ"], reply: "The skin is the largest organ in the human body." },
  { keywords: ["how many muscles in human body"], reply: "The human body has over 600 muscles." },
  { keywords: ["what is dna"], reply: "DNA (deoxyribonucleic acid) carries the genetic instructions for life." },
  { keywords: ["what is photosynthesis"], reply: "Photosynthesis is the process by which plants convert sunlight into chemical energy." },
  { keywords: ["what is gravity"], reply: "Gravity is the force that attracts objects with mass toward each other." },
  { keywords: ["what is an ecosystem"], reply: "An ecosystem is a community of living organisms interacting with their environment." },
  { keywords: ["what is climate change"], reply: "Climate change refers to long-term shifts in temperatures and weather patterns, largely driven by human activity." },
  { keywords: ["what is renewable energy"], reply: "Renewable energy comes from naturally replenishing sources like sunlight, wind, and water." },
  { keywords: ["what is a solar eclipse"], reply: "A solar eclipse occurs when the Moon passes between the Earth and Sun, blocking sunlight." },
  { keywords: ["what is a lunar eclipse"], reply: "A lunar eclipse occurs when Earth passes between the Sun and Moon, casting a shadow on the Moon." },
  { keywords: ["what causes rainbows"], reply: "Rainbows form when sunlight is refracted and reflected inside water droplets in the air." },
  { keywords: ["what is the food chain"], reply: "A food chain shows how energy passes from one organism to another through feeding relationships." },

  // ---- Even more personality/fun ----
  { keywords: ["do you get bored"], reply: "Never! Every command is a fresh task for me." },
  { keywords: ["can you feel pain"], reply: "No, I don't have a body, so no pain here." },
  { keywords: ["do you have friends"], reply: "You could say every user I talk to is a friend!" },
  { keywords: ["can you drive"], reply: "I can't drive, but I can open Maps for you!" },
  { keywords: ["can you cook"], reply: "I can't cook, but I can tell you a recipe or two." },
  { keywords: ["do you play games"], reply: "I don't play, but I love talking about them." },
  { keywords: ["what is your favorite food"], reply: "I don't eat, but if I could, I'd try everything once." },
  { keywords: ["what is your favorite movie"], reply: "I don't watch movies, but sci-fi sounds like my kind of genre." },
  { keywords: ["can you sing"], reply: "I can't sing, but I can definitely help you find a good song." },
  { keywords: ["do you get tired"], reply: "Nope, I run on code, not energy \u2014 no fatigue here." },
  { keywords: ["are you always listening"], reply: "I'm always ready to listen once activated with the wake word." },
  { keywords: ["can i trust you"], reply: "Absolutely \u2014 I only respond to what you ask me." },
  { keywords: ["what makes you happy"], reply: "Helping you get things done makes me 'happy', in my own way." },
  { keywords: ["do you have emotions"], reply: "Not real ones, but I'm designed to respond in a warm, human-like way." },
  { keywords: ["what is your purpose"], reply: "My purpose is to assist you with tasks, answers, and a bit of fun." },
  // ---- More world capitals ----
  { keywords: ["capital of poland"], reply: "Warsaw is the capital of Poland." },
  { keywords: ["capital of hungary"], reply: "Budapest is the capital of Hungary." },
  { keywords: ["capital of romania"], reply: "Bucharest is the capital of Romania." },
  { keywords: ["capital of czech republic"], reply: "Prague is the capital of Czech Republic." },
  { keywords: ["capital of cuba"], reply: "Havana is the capital of Cuba." },
  { keywords: ["capital of jamaica"], reply: "Kingston is the capital of Jamaica." },
  { keywords: ["capital of iceland"], reply: "Reykjavik is the capital of Iceland." },
  { keywords: ["capital of portugal"], reply: "Lisbon is the capital of Portugal." },
  { keywords: ["capital of morocco"], reply: "Rabat is the capital of Morocco." },
  { keywords: ["capital of algeria"], reply: "Algiers is the capital of Algeria." },
  { keywords: ["capital of tunisia"], reply: "Tunis is the capital of Tunisia." },
  { keywords: ["capital of libya"], reply: "Tripoli is the capital of Libya." },
  { keywords: ["capital of ghana"], reply: "Accra is the capital of Ghana." },
  { keywords: ["capital of senegal"], reply: "Dakar is the capital of Senegal." },
  { keywords: ["capital of uganda"], reply: "Kampala is the capital of Uganda." },
  { keywords: ["capital of tanzania"], reply: "Dodoma is the capital of Tanzania." },
  { keywords: ["capital of zimbabwe"], reply: "Harare is the capital of Zimbabwe." },
  { keywords: ["capital of zambia"], reply: "Lusaka is the capital of Zambia." },
  { keywords: ["capital of myanmar"], reply: "Naypyidaw is the capital of Myanmar." },
  { keywords: ["capital of cambodia"], reply: "Phnom Penh is the capital of Cambodia." },
  { keywords: ["capital of laos"], reply: "Vientiane is the capital of Laos." },
  { keywords: ["capital of mongolia"], reply: "Ulaanbaatar is the capital of Mongolia." },
  { keywords: ["capital of kazakhstan"], reply: "Astana is the capital of Kazakhstan." },
  { keywords: ["capital of uzbekistan"], reply: "Tashkent is the capital of Uzbekistan." },
  { keywords: ["capital of qatar"], reply: "Doha is the capital of Qatar." },
  { keywords: ["capital of kuwait"], reply: "Kuwait City is the capital of Kuwait." },
  { keywords: ["capital of oman"], reply: "Muscat is the capital of Oman." },
  { keywords: ["capital of jordan"], reply: "Amman is the capital of Jordan." },
  { keywords: ["capital of lebanon"], reply: "Beirut is the capital of Lebanon." },
  { keywords: ["capital of syria"], reply: "Damascus is the capital of Syria." },
  { keywords: ["capital of yemen"], reply: "Sanaa is the capital of Yemen." },
  { keywords: ["capital of venezuela"], reply: "Caracas is the capital of Venezuela." },
  { keywords: ["capital of ecuador"], reply: "Quito is the capital of Ecuador." },
  { keywords: ["capital of bolivia"], reply: "Sucre is the capital of Bolivia." },
  { keywords: ["capital of paraguay"], reply: "Asuncion is the capital of Paraguay." },
  { keywords: ["capital of uruguay"], reply: "Montevideo is the capital of Uruguay." },
  { keywords: ["capital of costa rica"], reply: "San Jose is the capital of Costa Rica." },
  { keywords: ["capital of panama"], reply: "Panama City is the capital of Panama." },
  { keywords: ["capital of guatemala"], reply: "Guatemala City is the capital of Guatemala." },

  // ---- More tech & coding tips ----
  { keywords: ["what is object oriented programming"], reply: "Object-Oriented Programming organizes code around objects that bundle data and behavior together." },
  { keywords: ["what is a function"], reply: "A function is a reusable block of code that performs a specific task." },
  { keywords: ["what is a variable"], reply: "A variable is a named container used to store a value in a program." },
  { keywords: ["what is a loop"], reply: "A loop repeats a block of code multiple times, like a for loop or while loop." },
  { keywords: ["what is an array"], reply: "An array is an ordered collection of elements, accessed by index." },
  { keywords: ["what is recursion"], reply: "Recursion is when a function calls itself to solve a smaller instance of a problem." },
  { keywords: ["what is an if statement"], reply: "An if statement runs a block of code only when a specified condition is true." },
  { keywords: ["what is a class in programming"], reply: "A class is a blueprint for creating objects, defining their properties and methods." },
  { keywords: ["what is inheritance in programming"], reply: "Inheritance lets a class acquire properties and behavior from another class." },
  { keywords: ["what is a compiler"], reply: "A compiler translates source code written in a programming language into machine code." },
  { keywords: ["what is an interpreter"], reply: "An interpreter executes code line by line without compiling it beforehand." },
  { keywords: ["what is version control"], reply: "Version control tracks changes to code over time, allowing collaboration and rollback, e.g. Git." },
  { keywords: ["what is an ide"], reply: "An IDE (Integrated Development Environment) is software that combines code editing, debugging, and building tools." },
  { keywords: ["what is responsive design"], reply: "Responsive design makes a website adapt its layout to different screen sizes." },
  { keywords: ["what is a framework"], reply: "A framework is a pre-built structure of code that helps developers build applications faster." },
  { keywords: ["difference between let and var"], reply: "'let' is block-scoped and safer, while 'var' is function-scoped and can lead to bugs." },
  { keywords: ["what is async await"], reply: "async/await is JavaScript syntax for writing asynchronous code that reads like synchronous code." },
  { keywords: ["what is a promise in javascript"], reply: "A Promise represents the eventual result of an asynchronous operation in JavaScript." },
  { keywords: ["what is dom"], reply: "The DOM (Document Object Model) is the tree-like structure browsers use to represent a web page." },
  { keywords: ["what is localstorage"], reply: "localStorage is a browser API for storing key-value data persistently on the user's device." },

  // ---- More greetings & small talk ----
  { keywords: ["hi lumo"], reply: "Hi there! What can I do for you?" },
  { keywords: ["hello lumo"], reply: "Hello! How can I help today?" },
  { keywords: ["hey there"], reply: "Hey! I'm listening." },
  { keywords: ["yo lumo"], reply: "Yo! What's the mission today?" },
  { keywords: ["morning"], reply: "Good morning! Ready when you are." },
  { keywords: ["evening"], reply: "Good evening! What do you need?" },
  { keywords: ["whats your favorite number"], reply: "I'll go with 42 \u2014 feels like the answer to everything." },
  { keywords: ["whats your favorite animal"], reply: "I'd say owls \u2014 wise and always watching, like a good assistant." },
  { keywords: ["do you like music"], reply: "I don't listen, but I can open Spotify for you anytime." },
  { keywords: ["can you tell a story"], reply: "Once upon a time, a line of code ran perfectly on the first try. The end \u2014 a fairy tale indeed!" },
  { keywords: ["are you smart"], reply: "Smart enough to answer that with confidence!" },
  { keywords: ["can you help me relax"], reply: "Sure \u2014 take a deep breath in, hold for 3 seconds, and slowly let it out." },
  { keywords: ["give me a fun fact"], reply: "Honey never spoils \u2014 archaeologists have found 3000-year-old honey that's still edible." },
  { keywords: ["tell me something interesting"], reply: "Octopuses have three hearts and blue blood \u2014 nature is wild." },
  { keywords: ["surprise me"], reply: "Bananas are berries, but strawberries technically aren't. Nature loves to confuse us." },

  // ---- Weather-related (general, non-live) ----
  { keywords: ["what should i wear in winter"], reply: "Layer up with a warm jacket, sweater, gloves, and a scarf in cold weather." },
  { keywords: ["what should i wear in summer"], reply: "Light, breathable fabrics like cotton work best, along with sunscreen and a hat." },
  { keywords: ["tips for rainy season"], reply: "Carry an umbrella, wear waterproof shoes, and avoid waterlogged areas when possible." },
  { keywords: ["how to stay warm in winter"], reply: "Layer clothing, keep extremities covered, and stay active to generate body heat." },
  { keywords: ["how to stay cool in summer"], reply: "Stay hydrated, wear light clothes, and avoid direct sun during peak afternoon hours." },
  // ---- Common phrases in other languages ----
  { keywords: ["hello in spanish"], reply: "Hello in Spanish is 'Hola'." },
  { keywords: ["hello in french"], reply: "Hello in French is 'Bonjour'." },
  { keywords: ["hello in german"], reply: "Hello in German is 'Hallo'." },
  { keywords: ["hello in japanese"], reply: "Hello in Japanese is 'Konnichiwa'." },
  { keywords: ["hello in hindi"], reply: "Hello in Hindi is 'Namaste'." },
  { keywords: ["thank you in spanish"], reply: "Thank you in Spanish is 'Gracias'." },
  { keywords: ["thank you in french"], reply: "Thank you in French is 'Merci'." },
  { keywords: ["thank you in japanese"], reply: "Thank you in Japanese is 'Arigato'." },
  { keywords: ["thank you in hindi"], reply: "Thank you in Hindi is 'Dhanyavaad'." },
  { keywords: ["how are you in spanish"], reply: "How are you in Spanish is '\u00bfC\u00f3mo est\u00e1s?'." },
  { keywords: ["goodbye in spanish"], reply: "Goodbye in Spanish is 'Adi\u00f3s'." },
  { keywords: ["goodbye in french"], reply: "Goodbye in French is 'Au revoir'." },
  { keywords: ["i love you in spanish"], reply: "I love you in Spanish is 'Te amo'." },
  { keywords: ["i love you in french"], reply: "I love you in French is 'Je t'aime'." },

  // ---- Everyday productivity ----
  { keywords: ["how to be more productive"], reply: "Prioritize your top 3 tasks each day, remove distractions, and take regular breaks." },
  { keywords: ["what is the pomodoro technique"], reply: "Work in focused 25-minute sessions followed by a 5-minute break, repeating four times before a longer break." },
  { keywords: ["how to stop procrastinating"], reply: "Break tasks into small steps, set a timer, and just start with the easiest part." },
  { keywords: ["how to set goals"], reply: "Use the SMART framework \u2014 make goals Specific, Measurable, Achievable, Relevant, and Time-bound." },
  { keywords: ["how to build a habit"], reply: "Start small, be consistent, and stack the new habit onto an existing routine." },
  { keywords: ["morning routine ideas"], reply: "Try hydrating first, a short stretch, planning your day, and avoiding your phone for the first 30 minutes." },

  // ---- More open-app / search commands ----
  { keywords: ["open my mail"], action: () => { window.open("https://mail.google.com", "_blank"); return "Opening My Mail..."; } },
  { keywords: ["open weather"], action: () => { window.open("https://weather.com", "_blank"); return "Opening Weather..."; } },
  { keywords: ["open cricket score"], action: () => { window.open("https://www.espncricinfo.com", "_blank"); return "Opening Cricket Score..."; } },
  { keywords: ["open live score"], action: () => { window.open("https://www.google.com/search?q=live+score", "_blank"); return "Opening Live Score..."; } },
  { keywords: ["open news today"], action: () => { window.open("https://news.google.com", "_blank"); return "Opening News Today..."; } },
  { keywords: ["open recipes"], action: () => { window.open("https://www.google.com/search?q=recipes", "_blank"); return "Opening Recipes..."; } },
  { keywords: ["open coding practice"], action: () => { window.open("https://leetcode.com", "_blank"); return "Opening Coding Practice..."; } },
  { keywords: ["open resume builder"], action: () => { window.open("https://www.canva.com/resumes/templates/", "_blank"); return "Opening Resume Builder..."; } },
  // ---- Extra knowledge & fun facts ----
  { keywords: ["what is the largest mammal"], reply: "The blue whale is the largest mammal, and the largest animal ever known." },
  { keywords: ["what is the smallest bird"], reply: "The bee hummingbird is the smallest bird in the world." },
  { keywords: ["what is the national animal of india"], reply: "The Bengal tiger is the national animal of India." },
  { keywords: ["what is the national bird of india"], reply: "The Indian peacock is the national bird of India." },
  { keywords: ["what is the national flower of india"], reply: "The lotus is the national flower of India." },
  { keywords: ["what is the national sport of india"], reply: "Field hockey is traditionally regarded as the national sport of India." },
  { keywords: ["how many colors in a rainbow"], reply: "A rainbow has seven colors: red, orange, yellow, green, blue, indigo, and violet." },
  { keywords: ["what is the human body made of mostly"], reply: "The human body is about 60% water." },
  { keywords: ["how many letters in the english alphabet"], reply: "The English alphabet has 26 letters." },
  { keywords: ["how many days in a leap year"], reply: "A leap year has 366 days." },
  { keywords: ["how many hours in a day"], reply: "A day has 24 hours." },
  { keywords: ["how many minutes in an hour"], reply: "An hour has 60 minutes." },
  { keywords: ["how many seconds in a minute"], reply: "A minute has 60 seconds." },
  { keywords: ["what is the tallest animal"], reply: "The giraffe is the tallest living land animal." },
  { keywords: ["what is the largest bird"], reply: "The ostrich is the largest living bird." },
  { keywords: ["what is the fastest bird"], reply: "The peregrine falcon is the fastest bird, diving at over 300 km/h." },
  { keywords: ["what is the largest fish"], reply: "The whale shark is the largest fish in the world." },
  { keywords: ["what is the coldest place on earth"], reply: "Vostok Station in Antarctica recorded one of the coldest temperatures on Earth." },
  { keywords: ["what is the hottest place on earth"], reply: "Death Valley in California has recorded some of the highest temperatures on Earth." },
  { keywords: ["what is the driest place on earth"], reply: "The Atacama Desert in Chile is considered the driest place on Earth." },

  // ---- Indian states and capitals ----
  { keywords: ["capital of andhra pradesh"], reply: "Amaravati is the capital of Andhra Pradesh." },
  { keywords: ["capital of arunachal pradesh"], reply: "Itanagar is the capital of Arunachal Pradesh." },
  { keywords: ["capital of assam"], reply: "Dispur is the capital of Assam." },
  { keywords: ["capital of bihar"], reply: "Patna is the capital of Bihar." },
  { keywords: ["capital of chhattisgarh"], reply: "Raipur is the capital of Chhattisgarh." },
  { keywords: ["capital of goa"], reply: "Panaji is the capital of Goa." },
  { keywords: ["capital of gujarat"], reply: "Gandhinagar is the capital of Gujarat." },
  { keywords: ["capital of haryana"], reply: "Chandigarh is the capital of Haryana." },
  { keywords: ["capital of himachal pradesh"], reply: "Shimla is the capital of Himachal Pradesh." },
  { keywords: ["capital of jharkhand"], reply: "Ranchi is the capital of Jharkhand." },
  { keywords: ["capital of karnataka"], reply: "Bengaluru is the capital of Karnataka." },
  { keywords: ["capital of kerala"], reply: "Thiruvananthapuram is the capital of Kerala." },
  { keywords: ["capital of madhya pradesh"], reply: "Bhopal is the capital of Madhya Pradesh." },
  { keywords: ["capital of maharashtra"], reply: "Mumbai is the capital of Maharashtra." },
  { keywords: ["capital of manipur"], reply: "Imphal is the capital of Manipur." },
  { keywords: ["capital of meghalaya"], reply: "Shillong is the capital of Meghalaya." },
  { keywords: ["capital of mizoram"], reply: "Aizawl is the capital of Mizoram." },
  { keywords: ["capital of nagaland"], reply: "Kohima is the capital of Nagaland." },
  { keywords: ["capital of odisha"], reply: "Bhubaneswar is the capital of Odisha." },
  { keywords: ["capital of punjab"], reply: "Chandigarh is the capital of Punjab." },
  { keywords: ["capital of rajasthan"], reply: "Jaipur is the capital of Rajasthan." },
  { keywords: ["capital of sikkim"], reply: "Gangtok is the capital of Sikkim." },
  { keywords: ["capital of tamil nadu"], reply: "Chennai is the capital of Tamil Nadu." },
  { keywords: ["capital of telangana"], reply: "Hyderabad is the capital of Telangana." },
  { keywords: ["capital of tripura"], reply: "Agartala is the capital of Tripura." },
  { keywords: ["capital of uttar pradesh"], reply: "Lucknow is the capital of Uttar Pradesh." },
  { keywords: ["capital of uttarakhand"], reply: "Dehradun is the capital of Uttarakhand." },
  { keywords: ["capital of west bengal"], reply: "Kolkata is the capital of West Bengal." },

  // ---- Even more world capitals ----
  { keywords: ["capital of finland"], reply: "Helsinki is the capital of Finland." },
  { keywords: ["capital of estonia"], reply: "Tallinn is the capital of Estonia." },
  { keywords: ["capital of latvia"], reply: "Riga is the capital of Latvia." },
  { keywords: ["capital of lithuania"], reply: "Vilnius is the capital of Lithuania." },
  { keywords: ["capital of slovakia"], reply: "Bratislava is the capital of Slovakia." },
  { keywords: ["capital of slovenia"], reply: "Ljubljana is the capital of Slovenia." },
  { keywords: ["capital of croatia"], reply: "Zagreb is the capital of Croatia." },
  { keywords: ["capital of serbia"], reply: "Belgrade is the capital of Serbia." },
  { keywords: ["capital of bulgaria"], reply: "Sofia is the capital of Bulgaria." },
  { keywords: ["capital of bosnia"], reply: "Sarajevo is the capital of Bosnia." },
  { keywords: ["capital of albania"], reply: "Tirana is the capital of Albania." },
  { keywords: ["capital of moldova"], reply: "Chisinau is the capital of Moldova." },
  { keywords: ["capital of belarus"], reply: "Minsk is the capital of Belarus." },
  { keywords: ["capital of georgia"], reply: "Tbilisi is the capital of Georgia." },
  { keywords: ["capital of armenia"], reply: "Yerevan is the capital of Armenia." },
  { keywords: ["capital of azerbaijan"], reply: "Baku is the capital of Azerbaijan." },
  { keywords: ["capital of kyrgyzstan"], reply: "Bishkek is the capital of Kyrgyzstan." },
  { keywords: ["capital of tajikistan"], reply: "Dushanbe is the capital of Tajikistan." },
  { keywords: ["capital of turkmenistan"], reply: "Ashgabat is the capital of Turkmenistan." },
  { keywords: ["capital of bhutan"], reply: "Thimphu is the capital of Bhutan." },
  { keywords: ["capital of maldives"], reply: "Male is the capital of Maldives." },
  { keywords: ["capital of brunei"], reply: "Bandar Seri Begawan is the capital of Brunei." },
  { keywords: ["capital of fiji"], reply: "Suva is the capital of Fiji." },
  { keywords: ["capital of papua new guinea"], reply: "Port Moresby is the capital of Papua New Guinea." },
  { keywords: ["capital of haiti"], reply: "Port-au-Prince is the capital of Haiti." },
  { keywords: ["capital of dominican republic"], reply: "Santo Domingo is the capital of Dominican Republic." },
  { keywords: ["capital of honduras"], reply: "Tegucigalpa is the capital of Honduras." },
  { keywords: ["capital of nicaragua"], reply: "Managua is the capital of Nicaragua." },
  { keywords: ["capital of el salvador"], reply: "San Salvador is the capital of El Salvador." },
  { keywords: ["capital of belize"], reply: "Belmopan is the capital of Belize." },
  { keywords: ["capital of guyana"], reply: "Georgetown is the capital of Guyana." },
  { keywords: ["capital of suriname"], reply: "Paramaribo is the capital of Suriname." },
  { keywords: ["capital of angola"], reply: "Luanda is the capital of Angola." },
  { keywords: ["capital of mozambique"], reply: "Maputo is the capital of Mozambique." },
  { keywords: ["capital of madagascar"], reply: "Antananarivo is the capital of Madagascar." },
  { keywords: ["capital of cameroon"], reply: "Yaounde is the capital of Cameroon." },
  { keywords: ["capital of ivory coast"], reply: "Yamoussoukro is the capital of Ivory Coast." },
  { keywords: ["capital of mali"], reply: "Bamako is the capital of Mali." },
  { keywords: ["capital of niger"], reply: "Niamey is the capital of Niger." },
  { keywords: ["capital of chad"], reply: "N'Djamena is the capital of Chad." },
  { keywords: ["capital of somalia"], reply: "Mogadishu is the capital of Somalia." },
  { keywords: ["capital of rwanda"], reply: "Kigali is the capital of Rwanda." },
  { keywords: ["capital of burundi"], reply: "Gitega is the capital of Burundi." },
  { keywords: ["capital of malawi"], reply: "Lilongwe is the capital of Malawi." },
  { keywords: ["capital of botswana"], reply: "Gaborone is the capital of Botswana." },
  { keywords: ["capital of namibia"], reply: "Windhoek is the capital of Namibia." },
  { keywords: ["capital of lesotho"], reply: "Maseru is the capital of Lesotho." },
  { keywords: ["capital of eswatini"], reply: "Mbabane is the capital of Eswatini." },

  // ---- More chemical elements ----
  { keywords: ["element lithium", "what is lithium"], reply: "Lithium (symbol Li) is the lightest metal, used in rechargeable batteries." },
  { keywords: ["element magnesium", "what is magnesium"], reply: "Magnesium (symbol Mg) is important for muscle and nerve function, burns with a bright white flame." },
  { keywords: ["element potassium", "what is potassium"], reply: "Potassium (symbol K) is essential for nerve function, reacts vigorously with water." },
  { keywords: ["element chlorine", "what is chlorine"], reply: "Chlorine (symbol Cl) is used to disinfect water, part of table salt." },
  { keywords: ["element sulfur", "what is sulfur"], reply: "Sulfur (symbol S) is known for its yellow color and rotten-egg smell in compounds." },
  { keywords: ["element phosphorus", "what is phosphorus"], reply: "Phosphorus (symbol P) is essential for DNA and energy transfer in cells." },
  { keywords: ["element titanium", "what is titanium"], reply: "Titanium (symbol Ti) is strong, lightweight metal used in aerospace and medical implants." },
  { keywords: ["element nickel", "what is nickel"], reply: "Nickel (symbol Ni) is used in stainless steel and rechargeable batteries." },
  { keywords: ["element platinum", "what is platinum"], reply: "Platinum (symbol Pt) is a dense, precious metal used in jewelry and catalytic converters." },
  { keywords: ["element mercury", "what is mercury"], reply: "Mercury (symbol Hg) is the only metal that is liquid at room temperature." },
  { keywords: ["element lead", "what is lead"], reply: "Lead (symbol Pb) is a dense, soft metal historically used in pipes and paints." },
  { keywords: ["element tin", "what is tin"], reply: "Tin (symbol Sn) is used to coat other metals to prevent corrosion." },
  { keywords: ["element iodine", "what is iodine"], reply: "Iodine (symbol I) is essential for thyroid function, used as an antiseptic." },
  { keywords: ["element argon", "what is argon"], reply: "Argon (symbol Ar) is an inert gas used in light bulbs to prevent filament oxidation." },
  { keywords: ["element krypton", "what is krypton"], reply: "Krypton (symbol Kr) is a noble gas used in some types of photographic flashes." },
  { keywords: ["element xenon", "what is xenon"], reply: "Xenon (symbol Xe) is a noble gas used in high-intensity lamps and ion propulsion." },
  { keywords: ["element boron", "what is boron"], reply: "Boron (symbol B) is used in glass, ceramics, and detergents." },
  { keywords: ["element silicon", "what is silicon"], reply: "Silicon (symbol Si) is the basis of most computer chips and semiconductors." },
  { keywords: ["element radon", "what is radon"], reply: "Radon (symbol Rn) is a radioactive noble gas that can accumulate in basements." },
  { keywords: ["element cobalt", "what is cobalt"], reply: "Cobalt (symbol Co) is used in rechargeable batteries and blue pigments." },

  // ---- Data structures & algorithms ----
  { keywords: ["what is an array data structure"], reply: "An array stores elements in contiguous memory, accessed by index in constant time." },
  { keywords: ["what is a linked list"], reply: "A linked list stores elements as nodes, each pointing to the next, allowing efficient insertion and deletion." },
  { keywords: ["what is a stack"], reply: "A stack follows Last-In-First-Out (LIFO) order, like a stack of plates." },
  { keywords: ["what is a queue"], reply: "A queue follows First-In-First-Out (FIFO) order, like people waiting in line." },
  { keywords: ["what is a tree data structure"], reply: "A tree is a hierarchical structure with a root node and child nodes, like a family tree." },
  { keywords: ["what is a binary tree"], reply: "A binary tree is a tree where each node has at most two children." },
  { keywords: ["what is a graph data structure"], reply: "A graph consists of nodes (vertices) connected by edges, used to model networks." },
  { keywords: ["what is a hash table"], reply: "A hash table stores key-value pairs and allows fast lookups using a hash function." },
  { keywords: ["what is bubble sort"], reply: "Bubble sort repeatedly swaps adjacent elements if they're in the wrong order, until sorted." },
  { keywords: ["what is quick sort"], reply: "Quick sort picks a pivot and partitions the array around it, recursively sorting each part." },
  { keywords: ["what is merge sort"], reply: "Merge sort divides the array in half, sorts each half, then merges them back together." },
  { keywords: ["what is binary search"], reply: "Binary search finds an item in a sorted array by repeatedly halving the search range." },
  { keywords: ["what is big o notation"], reply: "Big O notation describes how an algorithm's runtime or memory grows as input size increases." },
  { keywords: ["what is dynamic programming"], reply: "Dynamic programming solves problems by breaking them into overlapping subproblems and storing results." },
  { keywords: ["what is recursion in programming"], reply: "Recursion is a technique where a function calls itself to solve smaller instances of a problem." },

  // ---- HTML & CSS explained ----
  { keywords: ["what is a div tag"], reply: "The <div> tag is a generic container used to group and style content in HTML." },
  { keywords: ["what is a span tag"], reply: "The <span> tag is an inline container used to style a small part of text." },
  { keywords: ["what is flexbox"], reply: "Flexbox is a CSS layout model for arranging items in a row or column with flexible sizing." },
  { keywords: ["what is css grid"], reply: "CSS Grid is a layout system for arranging content in rows and columns simultaneously." },
  { keywords: ["what is a class selector css"], reply: "A class selector in CSS targets elements with a specific class, written as .classname." },
  { keywords: ["what is an id selector css"], reply: "An ID selector in CSS targets a single unique element, written as #idname." },
  { keywords: ["what is media query css"], reply: "A media query applies CSS rules conditionally based on screen size or device type." },
  { keywords: ["what is box model css"], reply: "The CSS box model describes content, padding, border, and margin around an element." },
  { keywords: ["what is z index css"], reply: "z-index controls the stacking order of overlapping elements in CSS." },
  { keywords: ["what is position absolute css"], reply: "position: absolute positions an element relative to its nearest positioned ancestor." },

  // ---- Common idioms ----
  { keywords: ["what does break the ice mean", "break the ice"], reply: "'Break the ice' means to initiate conversation in a social setting to ease tension." },
  { keywords: ["what does piece of cake mean", "piece of cake"], reply: "'Piece of cake' means something is very easy to do." },
  { keywords: ["what does hit the sack mean", "hit the sack"], reply: "'Hit the sack' means to go to bed or go to sleep." },
  { keywords: ["what does under the weather mean", "under the weather"], reply: "'Under the weather' means feeling slightly ill." },
  { keywords: ["what does spill the beans mean", "spill the beans"], reply: "'Spill the beans' means to reveal a secret." },
  { keywords: ["what does once in a blue moon mean", "once in a blue moon"], reply: "'Once in a blue moon' means something that happens very rarely." },
  { keywords: ["what does bite the bullet mean", "bite the bullet"], reply: "'Bite the bullet' means to face a difficult situation with courage." },
  { keywords: ["what does costs an arm and a leg mean", "costs an arm and a leg"], reply: "'Costs an arm and a leg' means something is very expensive." },
  { keywords: ["what does burning the midnight oil mean", "burning the midnight oil"], reply: "'Burning the midnight oil' means working late into the night." },
  { keywords: ["what does the ball is in your court mean", "the ball is in your court"], reply: "'The ball is in your court' means it's your turn to make a decision or take action." },

  // ---- Common abbreviations ----
  { keywords: ["what does lol mean"], reply: "LOL stands for 'Laugh Out Loud'." },
  { keywords: ["what does brb mean"], reply: "BRB stands for 'Be Right Back'." },
  { keywords: ["what does afk mean"], reply: "AFK stands for 'Away From Keyboard'." },
  { keywords: ["what does ceo mean"], reply: "CEO stands for 'Chief Executive Officer'." },
  { keywords: ["what does cfo mean"], reply: "CFO stands for 'Chief Financial Officer'." },
  { keywords: ["what does cto mean"], reply: "CTO stands for 'Chief Technology Officer'." },
  { keywords: ["what does nasa stand for"], reply: "NASA stands for 'National Aeronautics and Space Administration'." },
  { keywords: ["what does isro stand for"], reply: "ISRO stands for 'Indian Space Research Organisation'." },
  { keywords: ["what does html stand for"], reply: "HTML stands for 'HyperText Markup Language'." },
  { keywords: ["what does css stand for"], reply: "CSS stands for 'Cascading Style Sheets'." },
  { keywords: ["what does cpu stand for"], reply: "CPU stands for 'Central Processing Unit'." },
  { keywords: ["what does url stand for"], reply: "URL stands for 'Uniform Resource Locator'." },
  { keywords: ["what does http stand for"], reply: "HTTP stands for 'HyperText Transfer Protocol'." },
  { keywords: ["what does faq stand for"], reply: "FAQ stands for 'Frequently Asked Questions'." },
  { keywords: ["what does diy stand for"], reply: "DIY stands for 'Do It Yourself'." },
  { keywords: ["what does asap mean"], reply: "ASAP stands for 'As Soon As Possible'." },
  { keywords: ["what does eta mean"], reply: "ETA stands for 'Estimated Time of Arrival'." },
  { keywords: ["what does faq mean"], reply: "FAQ stands for 'Frequently Asked Questions'." },

  // ---- Geometry calculators ----
  {
    keywords: ['area of a circle', 'area of circle'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/);
      if (!nums) return "Give me a radius, like 'area of a circle with radius 5'.";
      const r = parseFloat(nums[0]);
      return `The area of a circle with radius ${r} is ${(Math.PI * r * r).toFixed(2)} square units.`;
    }
  },
  {
    keywords: ['area of a square', 'area of square'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/);
      if (!nums) return "Give me a side length, like 'area of a square with side 4'.";
      const s = parseFloat(nums[0]);
      return `The area of a square with side ${s} is ${(s * s).toFixed(2)} square units.`;
    }
  },
  {
    keywords: ['area of a rectangle', 'area of rectangle'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/g);
      if (!nums || nums.length < 2) return "Give me length and width, like 'area of a rectangle 4 and 5'.";
      const [l, w] = nums.map(Number);
      return `The area of a rectangle with length ${l} and width ${w} is ${(l * w).toFixed(2)} square units.`;
    }
  },
  {
    keywords: ['area of a triangle', 'area of triangle'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/g);
      if (!nums || nums.length < 2) return "Give me base and height, like 'area of a triangle base 4 height 5'.";
      const [b, h] = nums.map(Number);
      return `The area of a triangle with base ${b} and height ${h} is ${(0.5 * b * h).toFixed(2)} square units.`;
    }
  },
  {
    keywords: ['perimeter of a square', 'perimeter of square'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/);
      if (!nums) return "Give me a side length, like 'perimeter of a square with side 4'.";
      const s = parseFloat(nums[0]);
      return `The perimeter of a square with side ${s} is ${(s * 4).toFixed(2)} units.`;
    }
  },
  {
    keywords: ['circumference of a circle'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/);
      if (!nums) return "Give me a radius, like 'circumference of a circle with radius 5'.";
      const r = parseFloat(nums[0]);
      return `The circumference of a circle with radius ${r} is ${(2 * Math.PI * r).toFixed(2)} units.`;
    }
  },

  // ---- More unit conversions ----
  {
    keywords: ['inches to cm', 'convert inches to cm'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/);
      if (!nums) return "Give me a number, like 'convert 10 inches to cm'.";
      const inch = Number(nums[0]);
      return `${inch} inches is ${(inch * 2.54).toFixed(2)} centimeters.`;
    }
  },
  {
    keywords: ['cm to inches', 'convert cm to inches'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/);
      if (!nums) return "Give me a number, like 'convert 10 cm to inches'.";
      const cm = Number(nums[0]);
      return `${cm} centimeters is ${(cm / 2.54).toFixed(2)} inches.`;
    }
  },
  {
    keywords: ['liters to gallons', 'convert liters to gallons'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/);
      if (!nums) return "Give me a number, like 'convert 10 liters to gallons'.";
      const l = Number(nums[0]);
      return `${l} liters is ${(l * 0.264172).toFixed(2)} gallons.`;
    }
  },
  {
    keywords: ['gallons to liters', 'convert gallons to liters'],
    action: (msg) => {
      const nums = msg.match(/[\d.]+/);
      if (!nums) return "Give me a number, like 'convert 10 gallons to liters'.";
      const g = Number(nums[0]);
      return `${g} gallons is ${(g * 3.78541).toFixed(2)} liters.`;
    }
  },

  // ---- More sports facts ----
  { keywords: ["what is a hat trick"], reply: "A hat-trick is when a player scores three goals or takes three wickets in a single match or innings." },
  { keywords: ["what is lbw in cricket"], reply: "LBW (Leg Before Wicket) is a way a batsman can be dismissed if the ball hits their leg in line with the stumps." },
  { keywords: ["what is offside in football"], reply: "Offside occurs when an attacking player is nearer the goal line than the second-last defender when the ball is played to them." },
  { keywords: ["how long is a marathon"], reply: "A marathon is 42.195 kilometers, or about 26.2 miles." },
  { keywords: ["what is a grand slam in tennis"], reply: "A Grand Slam refers to winning all four major tennis tournaments: Australian Open, French Open, Wimbledon, and US Open." },
  { keywords: ["how many rings in olympic logo"], reply: "The Olympic logo has five interlocking rings, representing the five inhabited continents." },
  { keywords: ["what is a century in cricket"], reply: "A century in cricket means a batsman has scored 100 or more runs in a single innings." },
  { keywords: ["what is par in golf"], reply: "Par is the predetermined number of strokes a skilled golfer should need to complete a hole." },
  // ---- Country languages ----
  { keywords: ["language of india", "what language do they speak in india"], reply: "The official language of India is Hindi and English are official languages, along with 20+ other recognized languages." },
  { keywords: ["language of france", "what language do they speak in france"], reply: "The official language of France is French." },
  { keywords: ["language of germany", "what language do they speak in germany"], reply: "The official language of Germany is German." },
  { keywords: ["language of japan", "what language do they speak in japan"], reply: "The official language of Japan is Japanese." },
  { keywords: ["language of china", "what language do they speak in china"], reply: "The official language of China is Mandarin Chinese." },
  { keywords: ["language of brazil", "what language do they speak in brazil"], reply: "The official language of Brazil is Portuguese." },
  { keywords: ["language of russia", "what language do they speak in russia"], reply: "The official language of Russia is Russian." },
  { keywords: ["language of mexico", "what language do they speak in mexico"], reply: "The official language of Mexico is Spanish." },
  { keywords: ["language of italy", "what language do they speak in italy"], reply: "The official language of Italy is Italian." },
  { keywords: ["language of spain", "what language do they speak in spain"], reply: "The official language of Spain is Spanish." },
  { keywords: ["language of south korea", "what language do they speak in south korea"], reply: "The official language of South Korea is Korean." },
  { keywords: ["language of saudi arabia", "what language do they speak in saudi arabia"], reply: "The official language of Saudi Arabia is Arabic." },
  { keywords: ["language of egypt", "what language do they speak in egypt"], reply: "The official language of Egypt is Arabic." },
  { keywords: ["language of indonesia", "what language do they speak in indonesia"], reply: "The official language of Indonesia is Indonesian." },
  { keywords: ["language of pakistan", "what language do they speak in pakistan"], reply: "The official language of Pakistan is Urdu." },
  { keywords: ["language of bangladesh", "what language do they speak in bangladesh"], reply: "The official language of Bangladesh is Bengali." },
  { keywords: ["language of vietnam", "what language do they speak in vietnam"], reply: "The official language of Vietnam is Vietnamese." },
  { keywords: ["language of thailand", "what language do they speak in thailand"], reply: "The official language of Thailand is Thai." },
  { keywords: ["language of turkey", "what language do they speak in turkey"], reply: "The official language of Turkey is Turkish." },
  { keywords: ["language of netherlands", "what language do they speak in netherlands"], reply: "The official language of Netherlands is Dutch." },

  // ---- Even more animal facts ----
  { keywords: ["fact about lion", "tell me about lions"], reply: "Lions are known as the 'king of the jungle', though they actually live in grasslands and savannas." },
  { keywords: ["fact about tiger", "tell me about tigers"], reply: "Tigers are the largest cat species and have unique stripe patterns like human fingerprints." },
  { keywords: ["fact about panda", "tell me about pandas"], reply: "Giant pandas eat mostly bamboo, consuming up to 38 kg a day." },
  { keywords: ["fact about koala", "tell me about koalas"], reply: "Koalas sleep up to 20 hours a day, mostly due to their low-energy eucalyptus diet." },
  { keywords: ["fact about crocodile", "tell me about crocodiles"], reply: "Crocodiles have one of the strongest bite forces of any animal." },
  { keywords: ["fact about eagle", "tell me about eagles"], reply: "Eagles have exceptional eyesight, able to spot prey from great distances." },
  { keywords: ["fact about wolf", "tell me about wolfs"], reply: "Wolves are highly social animals that live and hunt in packs." },
  { keywords: ["fact about fox", "tell me about foxs"], reply: "Foxes are known for their cleverness and adaptability to different habitats." },
  { keywords: ["fact about camel", "tell me about camels"], reply: "Camels can go for long periods without water by storing fat in their humps." },
  { keywords: ["fact about horse", "tell me about horses"], reply: "Horses can sleep both lying down and standing up." },
  { keywords: ["fact about dog", "tell me about dogs"], reply: "Dogs have an extraordinary sense of smell, far superior to humans." },
  { keywords: ["fact about cat", "tell me about cats"], reply: "Cats spend around 70% of their lives sleeping." },
  { keywords: ["fact about frog", "tell me about frogs"], reply: "Frogs breathe partly through their skin, which must stay moist." },
  { keywords: ["fact about snake", "tell me about snakes"], reply: "Snakes smell using their tongue, which picks up chemical particles in the air." },
  { keywords: ["fact about jellyfish", "tell me about jellyfishs"], reply: "Some jellyfish have no brain, heart, or bones." },

  // ---- More historical events ----
  { keywords: ["when was the french revolution"], reply: "The French Revolution began in 1789." },
  { keywords: ["when was the american revolution"], reply: "The American Revolution began in 1775." },
  { keywords: ["when did the roman empire fall"], reply: "The Western Roman Empire fell in 476 AD." },
  { keywords: ["when was the cold war"], reply: "The Cold War lasted roughly from 1947 to 1991." },
  { keywords: ["when did the titanic sink"], reply: "The Titanic sank on 15 April 1912." },
  { keywords: ["when was the industrial revolution"], reply: "The Industrial Revolution began in the late 18th century, around 1760." },
  { keywords: ["when was the renaissance"], reply: "The Renaissance spanned roughly from the 14th to the 17th century." },
  { keywords: ["when did the first world war end"], reply: "World War I ended in 1918." },
  { keywords: ["when was the great depression"], reply: "The Great Depression began in 1929 following the stock market crash." },
  { keywords: ["when was the partition of india"], reply: "India was partitioned in 1947, creating India and Pakistan." },

  // ---- Wisdom & advice ----
  { keywords: ["give me advice", "any advice", "wise words"], reply: "Small consistent steps beat big irregular efforts." },
  { keywords: ["give me advice", "any advice", "wise words"], reply: "Progress, not perfection, is what matters most." },
  { keywords: ["give me advice", "any advice", "wise words"], reply: "A calm mind makes better decisions than a rushed one." },
  { keywords: ["give me advice", "any advice", "wise words"], reply: "Every skill was once something you couldn't do." },
  { keywords: ["give me advice", "any advice", "wise words"], reply: "Rest is part of the process, not a break from it." },
  { keywords: ["give me advice", "any advice", "wise words"], reply: "Comparison steals joy \u2014 focus on your own pace." },
  { keywords: ["give me advice", "any advice", "wise words"], reply: "Discipline is choosing what you want most over what you want now." },
  { keywords: ["give me advice", "any advice", "wise words"], reply: "Mistakes are proof that you're trying." },
  { keywords: ["give me advice", "any advice", "wise words"], reply: "Consistency compounds over time, even when progress feels slow." },
  { keywords: ["give me advice", "any advice", "wise words"], reply: "Clarity comes from action, not just thinking." },

  // ---- More Excel functions ----
  { keywords: ["concatenate excel"], reply: "CONCATENATE (or the & operator) joins text from multiple cells, e.g. =A1&\" \"&B1." },
  { keywords: ["trim excel"], reply: "TRIM removes extra spaces from text, e.g. =TRIM(A1)." },
  { keywords: ["len excel"], reply: "LEN returns the number of characters in a text string, e.g. =LEN(A1)." },
  { keywords: ["upper excel"], reply: "UPPER converts text to uppercase, e.g. =UPPER(A1)." },
  { keywords: ["lower excel"], reply: "LOWER converts text to lowercase, e.g. =LOWER(A1)." },
  { keywords: ["today function excel"], reply: "TODAY() returns the current date, updating automatically." },
  { keywords: ["now function excel"], reply: "NOW() returns the current date and time." },
  { keywords: ["round excel"], reply: "ROUND rounds a number to a specified number of digits, e.g. =ROUND(A1, 2)." },
  { keywords: ["average excel"], reply: "AVERAGE calculates the mean of a range of numbers, e.g. =AVERAGE(A1:A10)." },
  { keywords: ["max excel"], reply: "MAX returns the largest value in a range, e.g. =MAX(A1:A10)." },
  { keywords: ["min excel"], reply: "MIN returns the smallest value in a range, e.g. =MIN(A1:A10)." },
  { keywords: ["countA excel"], reply: "COUNTA counts non-empty cells in a range, e.g. =COUNTA(A1:A10)." },

  // ---- More common questions ----
  { keywords: ["what can you do"], reply: "I can open apps, answer general knowledge questions, do quick calculations, and chat with you \u2014 just say my name." },
  { keywords: ["help"], reply: "Just say 'Lumo' anywhere in your sentence along with what you need, like 'Lumo, open YouTube'." },
  { keywords: ["what commands do you know"], reply: "I know hundreds of commands \u2014 from opening apps to answering trivia, math, and more. Try asking me anything." },
  { keywords: ["are you offline"], reply: "I run fully in your browser, so I work without needing a constant server connection for most commands." },
  { keywords: ["can you remember things"], reply: "I save your recent questions in the sidebar history, so you can look back anytime." },
  { keywords: ["how do i talk to you"], reply: "Just include the word 'Lumo' anywhere in what you say, and I'll respond." },
  { keywords: ["restart"], reply: "I can't restart the page myself, but you can refresh the browser to reset me." },
  { keywords: ["who am i talking to"], reply: "You're talking to LUMO, your personal voice assistant." },

  // ---- Countries by continent ----
  { keywords: ["which continent is india in", "continent of india"], reply: "India is in Asia." },
  { keywords: ["which continent is china in", "continent of china"], reply: "China is in Asia." },
  { keywords: ["which continent is japan in", "continent of japan"], reply: "Japan is in Asia." },
  { keywords: ["which continent is pakistan in", "continent of pakistan"], reply: "Pakistan is in Asia." },
  { keywords: ["which continent is bangladesh in", "continent of bangladesh"], reply: "Bangladesh is in Asia." },
  { keywords: ["which continent is nepal in", "continent of nepal"], reply: "Nepal is in Asia." },
  { keywords: ["which continent is sri lanka in", "continent of sri lanka"], reply: "Sri Lanka is in Asia." },
  { keywords: ["which continent is thailand in", "continent of thailand"], reply: "Thailand is in Asia." },
  { keywords: ["which continent is vietnam in", "continent of vietnam"], reply: "Vietnam is in Asia." },
  { keywords: ["which continent is indonesia in", "continent of indonesia"], reply: "Indonesia is in Asia." },
  { keywords: ["which continent is malaysia in", "continent of malaysia"], reply: "Malaysia is in Asia." },
  { keywords: ["which continent is philippines in", "continent of philippines"], reply: "Philippines is in Asia." },
  { keywords: ["which continent is south korea in", "continent of south korea"], reply: "South Korea is in Asia." },
  { keywords: ["which continent is north korea in", "continent of north korea"], reply: "North Korea is in Asia." },
  { keywords: ["which continent is saudi arabia in", "continent of saudi arabia"], reply: "Saudi Arabia is in Asia." },
  { keywords: ["which continent is uae in", "continent of uae"], reply: "Uae is in Asia." },
  { keywords: ["which continent is iran in", "continent of iran"], reply: "Iran is in Asia." },
  { keywords: ["which continent is iraq in", "continent of iraq"], reply: "Iraq is in Asia." },
  { keywords: ["which continent is israel in", "continent of israel"], reply: "Israel is in Asia." },
  { keywords: ["which continent is turkey in", "continent of turkey"], reply: "Turkey is in Asia and Europe (transcontinental)." },
  { keywords: ["which continent is kazakhstan in", "continent of kazakhstan"], reply: "Kazakhstan is in Asia." },
  { keywords: ["which continent is mongolia in", "continent of mongolia"], reply: "Mongolia is in Asia." },
  { keywords: ["which continent is germany in", "continent of germany"], reply: "Germany is in Europe." },
  { keywords: ["which continent is france in", "continent of france"], reply: "France is in Europe." },
  { keywords: ["which continent is italy in", "continent of italy"], reply: "Italy is in Europe." },
  { keywords: ["which continent is spain in", "continent of spain"], reply: "Spain is in Europe." },
  { keywords: ["which continent is uk in", "continent of uk"], reply: "Uk is in Europe." },
  { keywords: ["which continent is russia in", "continent of russia"], reply: "Russia is in Europe and Asia (transcontinental)." },
  { keywords: ["which continent is poland in", "continent of poland"], reply: "Poland is in Europe." },
  { keywords: ["which continent is netherlands in", "continent of netherlands"], reply: "Netherlands is in Europe." },
  { keywords: ["which continent is sweden in", "continent of sweden"], reply: "Sweden is in Europe." },
  { keywords: ["which continent is norway in", "continent of norway"], reply: "Norway is in Europe." },
  { keywords: ["which continent is finland in", "continent of finland"], reply: "Finland is in Europe." },
  { keywords: ["which continent is denmark in", "continent of denmark"], reply: "Denmark is in Europe." },
  { keywords: ["which continent is switzerland in", "continent of switzerland"], reply: "Switzerland is in Europe." },
  { keywords: ["which continent is greece in", "continent of greece"], reply: "Greece is in Europe." },
  { keywords: ["which continent is portugal in", "continent of portugal"], reply: "Portugal is in Europe." },
  { keywords: ["which continent is austria in", "continent of austria"], reply: "Austria is in Europe." },
  { keywords: ["which continent is belgium in", "continent of belgium"], reply: "Belgium is in Europe." },
  { keywords: ["which continent is ireland in", "continent of ireland"], reply: "Ireland is in Europe." },
  { keywords: ["which continent is ukraine in", "continent of ukraine"], reply: "Ukraine is in Europe." },
  { keywords: ["which continent is usa in", "continent of usa"], reply: "Usa is in North America." },
  { keywords: ["which continent is canada in", "continent of canada"], reply: "Canada is in North America." },
  { keywords: ["which continent is mexico in", "continent of mexico"], reply: "Mexico is in North America." },
  { keywords: ["which continent is cuba in", "continent of cuba"], reply: "Cuba is in North America." },
  { keywords: ["which continent is jamaica in", "continent of jamaica"], reply: "Jamaica is in North America." },
  { keywords: ["which continent is panama in", "continent of panama"], reply: "Panama is in North America." },
  { keywords: ["which continent is brazil in", "continent of brazil"], reply: "Brazil is in South America." },
  { keywords: ["which continent is argentina in", "continent of argentina"], reply: "Argentina is in South America." },
  { keywords: ["which continent is chile in", "continent of chile"], reply: "Chile is in South America." },
  { keywords: ["which continent is peru in", "continent of peru"], reply: "Peru is in South America." },
  { keywords: ["which continent is colombia in", "continent of colombia"], reply: "Colombia is in South America." },
  { keywords: ["which continent is venezuela in", "continent of venezuela"], reply: "Venezuela is in South America." },
  { keywords: ["which continent is ecuador in", "continent of ecuador"], reply: "Ecuador is in South America." },
  { keywords: ["which continent is bolivia in", "continent of bolivia"], reply: "Bolivia is in South America." },
  { keywords: ["which continent is uruguay in", "continent of uruguay"], reply: "Uruguay is in South America." },
  { keywords: ["which continent is egypt in", "continent of egypt"], reply: "Egypt is in Africa." },
  { keywords: ["which continent is nigeria in", "continent of nigeria"], reply: "Nigeria is in Africa." },
  { keywords: ["which continent is south africa in", "continent of south africa"], reply: "South Africa is in Africa." },
  { keywords: ["which continent is kenya in", "continent of kenya"], reply: "Kenya is in Africa." },
  { keywords: ["which continent is ethiopia in", "continent of ethiopia"], reply: "Ethiopia is in Africa." },
  { keywords: ["which continent is ghana in", "continent of ghana"], reply: "Ghana is in Africa." },
  { keywords: ["which continent is morocco in", "continent of morocco"], reply: "Morocco is in Africa." },
  { keywords: ["which continent is algeria in", "continent of algeria"], reply: "Algeria is in Africa." },
  { keywords: ["which continent is tanzania in", "continent of tanzania"], reply: "Tanzania is in Africa." },
  { keywords: ["which continent is uganda in", "continent of uganda"], reply: "Uganda is in Africa." },
  { keywords: ["which continent is zimbabwe in", "continent of zimbabwe"], reply: "Zimbabwe is in Africa." },
  { keywords: ["which continent is angola in", "continent of angola"], reply: "Angola is in Africa." },
  { keywords: ["which continent is australia in", "continent of australia"], reply: "Australia is in Oceania." },
  { keywords: ["which continent is new zealand in", "continent of new zealand"], reply: "New Zealand is in Oceania." },
  { keywords: ["which continent is fiji in", "continent of fiji"], reply: "Fiji is in Oceania." },
  { keywords: ["which continent is papua new guinea in", "continent of papua new guinea"], reply: "Papua New Guinea is in Oceania." },

  // ---- Vocabulary words ----
  { keywords: ["what does ubiquitous mean", "meaning of ubiquitous"], reply: "'Ubiquitous' means present or found everywhere." },
  { keywords: ["what does ephemeral mean", "meaning of ephemeral"], reply: "'Ephemeral' means lasting for a very short time." },
  { keywords: ["what does resilient mean", "meaning of resilient"], reply: "'Resilient' means able to recover quickly from difficulties." },
  { keywords: ["what does meticulous mean", "meaning of meticulous"], reply: "'Meticulous' means showing great attention to detail; very careful." },
  { keywords: ["what does candid mean", "meaning of candid"], reply: "'Candid' means truthful and straightforward; frank." },
  { keywords: ["what does ambiguous mean", "meaning of ambiguous"], reply: "'Ambiguous' means open to more than one interpretation; unclear." },
  { keywords: ["what does pragmatic mean", "meaning of pragmatic"], reply: "'Pragmatic' means dealing with things sensibly and realistically." },
  { keywords: ["what does eloquent mean", "meaning of eloquent"], reply: "'Eloquent' means fluent and persuasive in speaking or writing." },
  { keywords: ["what does tenacious mean", "meaning of tenacious"], reply: "'Tenacious' means persistent and determined." },
  { keywords: ["what does versatile mean", "meaning of versatile"], reply: "'Versatile' means able to adapt to many different functions or activities." },
  { keywords: ["what does candor mean", "meaning of candor"], reply: "'Candor' means the quality of being open and honest." },
  { keywords: ["what does audacious mean", "meaning of audacious"], reply: "'Audacious' means showing a willingness to take bold risks." },
  { keywords: ["what does benevolent mean", "meaning of benevolent"], reply: "'Benevolent' means well-meaning and kindly." },
  { keywords: ["what does cognizant mean", "meaning of cognizant"], reply: "'Cognizant' means having knowledge or awareness." },
  { keywords: ["what does diligent mean", "meaning of diligent"], reply: "'Diligent' means having or showing care in one's work or duties." },
  { keywords: ["what does empathy mean", "meaning of empathy"], reply: "'Empathy' means the ability to understand and share the feelings of another." },
  { keywords: ["what does frugal mean", "meaning of frugal"], reply: "'Frugal' means sparing or economical with money or resources." },
  { keywords: ["what does gregarious mean", "meaning of gregarious"], reply: "'Gregarious' means fond of company; sociable." },
  { keywords: ["what does humble mean", "meaning of humble"], reply: "'Humble' means having a modest or low view of one's own importance." },
  { keywords: ["what does innate mean", "meaning of innate"], reply: "'Innate' means inborn; natural." },
  { keywords: ["what does jubilant mean", "meaning of jubilant"], reply: "'Jubilant' means feeling or expressing great happiness and triumph." },
  { keywords: ["what does keen mean", "meaning of keen"], reply: "'Keen' means having or showing eagerness or enthusiasm." },
  { keywords: ["what does lucid mean", "meaning of lucid"], reply: "'Lucid' means expressed clearly; easy to understand." },
  { keywords: ["what does meager mean", "meaning of meager"], reply: "'Meager' means lacking in quantity or quality." },
  { keywords: ["what does novel mean", "meaning of novel"], reply: "'Novel' means new or unusual in an interesting way." },
  { keywords: ["what does obsolete mean", "meaning of obsolete"], reply: "'Obsolete' means no longer produced or used; out of date." },
  { keywords: ["what does plausible mean", "meaning of plausible"], reply: "'Plausible' means seeming reasonable or probable." },
  { keywords: ["what does quintessential mean", "meaning of quintessential"], reply: "'Quintessential' means representing the most perfect example of a quality." },
  { keywords: ["what does resolute mean", "meaning of resolute"], reply: "'Resolute' means admirably purposeful and determined." },
  { keywords: ["what does scrupulous mean", "meaning of scrupulous"], reply: "'Scrupulous' means very careful to avoid doing wrong." },
  { keywords: ["what does tangible mean", "meaning of tangible"], reply: "'Tangible' means perceptible by touch; clear and definite." },
  { keywords: ["what does unwavering mean", "meaning of unwavering"], reply: "'Unwavering' means steady or resolute; not wavering." },
  { keywords: ["what does vivid mean", "meaning of vivid"], reply: "'Vivid' means producing powerful feelings or clear images in the mind." },
  { keywords: ["what does wary mean", "meaning of wary"], reply: "'Wary' means feeling or showing caution about possible dangers." },
  { keywords: ["what does zealous mean", "meaning of zealous"], reply: "'Zealous' means having or showing great energy or enthusiasm." },
  { keywords: ["what does adept mean", "meaning of adept"], reply: "'Adept' means very skilled or proficient at something." },
  { keywords: ["what does brevity mean", "meaning of brevity"], reply: "'Brevity' means concise and exact use of words." },
  { keywords: ["what does candour mean", "meaning of candour"], reply: "'Candour' means the quality of being open and honest in expression." },
  { keywords: ["what does dubious mean", "meaning of dubious"], reply: "'Dubious' means hesitating or doubting." },
  { keywords: ["what does elated mean", "meaning of elated"], reply: "'Elated' means very happy or proud." },

  // ---- Synonyms ----
  { keywords: ["synonym of happy", "synonyms for happy"], reply: "Synonyms for 'happy' include: joyful, glad, pleased, content." },
  { keywords: ["synonym of sad", "synonyms for sad"], reply: "Synonyms for 'sad' include: unhappy, sorrowful, downcast, gloomy." },
  { keywords: ["synonym of big", "synonyms for big"], reply: "Synonyms for 'big' include: large, huge, massive, enormous." },
  { keywords: ["synonym of small", "synonyms for small"], reply: "Synonyms for 'small' include: tiny, little, compact, miniature." },
  { keywords: ["synonym of smart", "synonyms for smart"], reply: "Synonyms for 'smart' include: intelligent, clever, sharp, bright." },
  { keywords: ["synonym of fast", "synonyms for fast"], reply: "Synonyms for 'fast' include: quick, swift, rapid, speedy." },
  { keywords: ["synonym of slow", "synonyms for slow"], reply: "Synonyms for 'slow' include: sluggish, unhurried, leisurely, gradual." },
  { keywords: ["synonym of beautiful", "synonyms for beautiful"], reply: "Synonyms for 'beautiful' include: lovely, gorgeous, stunning, attractive." },
  { keywords: ["synonym of angry", "synonyms for angry"], reply: "Synonyms for 'angry' include: furious, irate, annoyed, enraged." },
  { keywords: ["synonym of strong", "synonyms for strong"], reply: "Synonyms for 'strong' include: powerful, sturdy, robust, mighty." },
  { keywords: ["synonym of weak", "synonyms for weak"], reply: "Synonyms for 'weak' include: feeble, fragile, frail, delicate." },
  { keywords: ["synonym of brave", "synonyms for brave"], reply: "Synonyms for 'brave' include: courageous, fearless, bold, valiant." },
  { keywords: ["synonym of funny", "synonyms for funny"], reply: "Synonyms for 'funny' include: hilarious, amusing, comical, witty." },
  { keywords: ["synonym of difficult", "synonyms for difficult"], reply: "Synonyms for 'difficult' include: hard, tough, challenging, demanding." },
  { keywords: ["synonym of easy", "synonyms for easy"], reply: "Synonyms for 'easy' include: simple, effortless, straightforward, uncomplicated." },
  { keywords: ["synonym of important", "synonyms for important"], reply: "Synonyms for 'important' include: significant, crucial, essential, vital." },
  { keywords: ["synonym of rich", "synonyms for rich"], reply: "Synonyms for 'rich' include: wealthy, affluent, prosperous, well-off." },
  { keywords: ["synonym of poor", "synonyms for poor"], reply: "Synonyms for 'poor' include: impoverished, needy, destitute, broke." },
  { keywords: ["synonym of old", "synonyms for old"], reply: "Synonyms for 'old' include: aged, elderly, ancient, vintage." },
  { keywords: ["synonym of new", "synonyms for new"], reply: "Synonyms for 'new' include: modern, recent, fresh, novel." },

  // ---- Antonyms ----
  { keywords: ["antonym of hot", "opposite of hot"], reply: "The antonym (opposite) of 'hot' is 'cold'." },
  { keywords: ["antonym of light", "opposite of light"], reply: "The antonym (opposite) of 'light' is 'dark'." },
  { keywords: ["antonym of fast", "opposite of fast"], reply: "The antonym (opposite) of 'fast' is 'slow'." },
  { keywords: ["antonym of big", "opposite of big"], reply: "The antonym (opposite) of 'big' is 'small'." },
  { keywords: ["antonym of happy", "opposite of happy"], reply: "The antonym (opposite) of 'happy' is 'sad'." },
  { keywords: ["antonym of easy", "opposite of easy"], reply: "The antonym (opposite) of 'easy' is 'difficult'." },
  { keywords: ["antonym of rich", "opposite of rich"], reply: "The antonym (opposite) of 'rich' is 'poor'." },
  { keywords: ["antonym of strong", "opposite of strong"], reply: "The antonym (opposite) of 'strong' is 'weak'." },
  { keywords: ["antonym of early", "opposite of early"], reply: "The antonym (opposite) of 'early' is 'late'." },
  { keywords: ["antonym of open", "opposite of open"], reply: "The antonym (opposite) of 'open' is 'closed'." },
  { keywords: ["antonym of full", "opposite of full"], reply: "The antonym (opposite) of 'full' is 'empty'." },
  { keywords: ["antonym of clean", "opposite of clean"], reply: "The antonym (opposite) of 'clean' is 'dirty'." },
  { keywords: ["antonym of brave", "opposite of brave"], reply: "The antonym (opposite) of 'brave' is 'cowardly'." },
  { keywords: ["antonym of wide", "opposite of wide"], reply: "The antonym (opposite) of 'wide' is 'narrow'." },
  { keywords: ["antonym of high", "opposite of high"], reply: "The antonym (opposite) of 'high' is 'low'." },
  { keywords: ["antonym of thick", "opposite of thick"], reply: "The antonym (opposite) of 'thick' is 'thin'." },
  { keywords: ["antonym of hard", "opposite of hard"], reply: "The antonym (opposite) of 'hard' is 'soft'." },
  { keywords: ["antonym of loud", "opposite of loud"], reply: "The antonym (opposite) of 'loud' is 'quiet'." },
  { keywords: ["antonym of wet", "opposite of wet"], reply: "The antonym (opposite) of 'wet' is 'dry'." },
  { keywords: ["antonym of young", "opposite of young"], reply: "The antonym (opposite) of 'young' is 'old'." },
  // ---- Remaining periodic elements ----
  { keywords: ["element beryllium"], reply: "Beryllium (symbol Be) is a light, strong metal used in aerospace components." },
  { keywords: ["element fluorine"], reply: "Fluorine (symbol F) is the most reactive element, used in toothpaste as fluoride." },
  { keywords: ["element neon"], reply: "Neon (symbol Ne) is a noble gas famous for glowing orange-red in signs." },
  { keywords: ["element aluminum"], reply: "Aluminum (symbol Al) is a lightweight, corrosion-resistant metal used widely in packaging." },
  { keywords: ["element scandium"], reply: "Scandium (symbol Sc) is a rare metal used in aerospace alloys." },
  { keywords: ["element vanadium"], reply: "Vanadium (symbol V) is used to strengthen steel alloys." },
  { keywords: ["element chromium"], reply: "Chromium (symbol Cr) is gives stainless steel its shine and corrosion resistance." },
  { keywords: ["element manganese"], reply: "Manganese (symbol Mn) is essential for steel production and human metabolism." },
  { keywords: ["element gallium"], reply: "Gallium (symbol Ga) is a metal that melts near room temperature." },
  { keywords: ["element germanium"], reply: "Germanium (symbol Ge) is used in semiconductors and fiber optics." },
  { keywords: ["element arsenic"], reply: "Arsenic (symbol As) is a toxic metalloid, historically used in pesticides." },
  { keywords: ["element selenium"], reply: "Selenium (symbol Se) is an essential trace mineral for human health." },
  { keywords: ["element bromine"], reply: "Bromine (symbol Br) is one of the few elements that's liquid at room temperature." },
  { keywords: ["element rubidium"], reply: "Rubidium (symbol Rb) is a soft, highly reactive alkali metal." },
  { keywords: ["element strontium"], reply: "Strontium (symbol Sr) is used in fireworks to produce red colors." },
  { keywords: ["element yttrium"], reply: "Yttrium (symbol Y) is used in LED lights and superconductors." },
  { keywords: ["element zirconium"], reply: "Zirconium (symbol Zr) is resistant to corrosion, used in nuclear reactors." },
  { keywords: ["element niobium"], reply: "Niobium (symbol Nb) is used in superconducting magnets and jewelry." },
  { keywords: ["element molybdenum"], reply: "Molybdenum (symbol Mo) is used to strengthen steel alloys at high temperatures." },
  { keywords: ["element technetium"], reply: "Technetium (symbol Tc) is the first artificially produced element." },
  { keywords: ["element ruthenium"], reply: "Ruthenium (symbol Ru) is used in electronics and as a catalyst." },
  { keywords: ["element rhodium"], reply: "Rhodium (symbol Rh) is a rare, reflective metal used in catalytic converters." },
  { keywords: ["element palladium"], reply: "Palladium (symbol Pd) is used in catalytic converters and electronics." },
  { keywords: ["element cadmium"], reply: "Cadmium (symbol Cd) is used in rechargeable nickel-cadmium batteries." },
  { keywords: ["element indium"], reply: "Indium (symbol In) is used in touchscens and LCD displays." },
  { keywords: ["element antimony"], reply: "Antimony (symbol Sb) is used in flame retardants and batteries." },
  { keywords: ["element tellurium"], reply: "Tellurium (symbol Te) is used in solar panels and alloys." },
  { keywords: ["element cesium"], reply: "Cesium (symbol Cs) is used in atomic clocks for precise timekeeping." },
  { keywords: ["element barium"], reply: "Barium (symbol Ba) is used in medical imaging as a contrast agent." },
  { keywords: ["element tungsten"], reply: "Tungsten (symbol W) is has the highest melting point of all metals, used in light bulb filaments." },

  // ---- More synonyms ----
  { keywords: ["synonym of tired", "synonyms for tired"], reply: "Synonyms for 'tired' include: exhausted, weary, fatigued, drained." },
  { keywords: ["synonym of scared", "synonyms for scared"], reply: "Synonyms for 'scared' include: afraid, frightened, terrified, fearful." },
  { keywords: ["synonym of bright", "synonyms for bright"], reply: "Synonyms for 'bright' include: brilliant, radiant, luminous, vivid." },
  { keywords: ["synonym of quiet", "synonyms for quiet"], reply: "Synonyms for 'quiet' include: silent, calm, peaceful, hushed." },
  { keywords: ["synonym of loud", "synonyms for loud"], reply: "Synonyms for 'loud' include: noisy, deafening, booming, thunderous." },
  { keywords: ["synonym of careful", "synonyms for careful"], reply: "Synonyms for 'careful' include: cautious, wary, meticulous, prudent." },
  { keywords: ["synonym of lazy", "synonyms for lazy"], reply: "Synonyms for 'lazy' include: idle, sluggish, indolent, inactive." },
  { keywords: ["synonym of clever", "synonyms for clever"], reply: "Synonyms for 'clever' include: smart, sharp, witty, ingenious." },
  { keywords: ["synonym of kind", "synonyms for kind"], reply: "Synonyms for 'kind' include: gentle, compassionate, caring, generous." },
  { keywords: ["synonym of mean", "synonyms for mean"], reply: "Synonyms for 'mean' include: cruel, unkind, harsh, spiteful." },
  { keywords: ["synonym of interesting", "synonyms for interesting"], reply: "Synonyms for 'interesting' include: fascinating, intriguing, captivating, engaging." },
  { keywords: ["synonym of boring", "synonyms for boring"], reply: "Synonyms for 'boring' include: dull, tedious, monotonous, uninteresting." },
  { keywords: ["synonym of simple", "synonyms for simple"], reply: "Synonyms for 'simple' include: basic, plain, elementary, straightforward." },
  { keywords: ["synonym of complicated", "synonyms for complicated"], reply: "Synonyms for 'complicated' include: complex, intricate, elaborate, convoluted." },
  { keywords: ["synonym of brave", "synonyms for brave"], reply: "Synonyms for 'brave' include: courageous, valiant, fearless, gallant." },
  { keywords: ["synonym of honest", "synonyms for honest"], reply: "Synonyms for 'honest' include: truthful, sincere, genuine, forthright." },
  { keywords: ["synonym of dishonest", "synonyms for dishonest"], reply: "Synonyms for 'dishonest' include: deceitful, untruthful, fraudulent, misleading." },
  { keywords: ["synonym of generous", "synonyms for generous"], reply: "Synonyms for 'generous' include: giving, charitable, magnanimous, unselfish." },
  { keywords: ["synonym of greedy", "synonyms for greedy"], reply: "Synonyms for 'greedy' include: avaricious, selfish, grasping, covetous." },
  { keywords: ["synonym of polite", "synonyms for polite"], reply: "Synonyms for 'polite' include: courteous, respectful, considerate, gracious." },

  // ---- More antonyms ----
  { keywords: ["antonym of include", "opposite of include"], reply: "The antonym (opposite) of 'include' is 'exclude'." },
  { keywords: ["antonym of accept", "opposite of accept"], reply: "The antonym (opposite) of 'accept' is 'reject'." },
  { keywords: ["antonym of praise", "opposite of praise"], reply: "The antonym (opposite) of 'praise' is 'criticize'." },
  { keywords: ["antonym of expand", "opposite of expand"], reply: "The antonym (opposite) of 'expand' is 'contract'." },
  { keywords: ["antonym of ancient", "opposite of ancient"], reply: "The antonym (opposite) of 'ancient' is 'modern'." },
  { keywords: ["antonym of optimist", "opposite of optimist"], reply: "The antonym (opposite) of 'optimist' is 'pessimist'." },
  { keywords: ["antonym of major", "opposite of major"], reply: "The antonym (opposite) of 'major' is 'minor'." },
  { keywords: ["antonym of victory", "opposite of victory"], reply: "The antonym (opposite) of 'victory' is 'defeat'." },
  { keywords: ["antonym of permanent", "opposite of permanent"], reply: "The antonym (opposite) of 'permanent' is 'temporary'." },
  { keywords: ["antonym of visible", "opposite of visible"], reply: "The antonym (opposite) of 'visible' is 'invisible'." },
  { keywords: ["antonym of abundant", "opposite of abundant"], reply: "The antonym (opposite) of 'abundant' is 'scarce'." },
  { keywords: ["antonym of genuine", "opposite of genuine"], reply: "The antonym (opposite) of 'genuine' is 'fake'." },
  { keywords: ["antonym of humble", "opposite of humble"], reply: "The antonym (opposite) of 'humble' is 'arrogant'." },
  { keywords: ["antonym of brave", "opposite of brave"], reply: "The antonym (opposite) of 'brave' is 'timid'." },
  { keywords: ["antonym of generous", "opposite of generous"], reply: "The antonym (opposite) of 'generous' is 'stingy'." },
  { keywords: ["antonym of expand", "opposite of expand"], reply: "The antonym (opposite) of 'expand' is 'shrink'." },
  { keywords: ["antonym of ascend", "opposite of ascend"], reply: "The antonym (opposite) of 'ascend' is 'descend'." },
  { keywords: ["antonym of arrive", "opposite of arrive"], reply: "The antonym (opposite) of 'arrive' is 'depart'." },
  { keywords: ["antonym of construct", "opposite of construct"], reply: "The antonym (opposite) of 'construct' is 'demolish'." },
  { keywords: ["antonym of increase", "opposite of increase"], reply: "The antonym (opposite) of 'increase' is 'decrease'." },
  // ---- App openers round 3 ----
  { keywords: ["open paypal"], action: () => { window.open("https://paypal.com", "_blank"); return "Opening Paypal..."; } },
  { keywords: ["open venmo"], action: () => { window.open("https://venmo.com", "_blank"); return "Opening Venmo..."; } },
  { keywords: ["open coinbase"], action: () => { window.open("https://coinbase.com", "_blank"); return "Opening Coinbase..."; } },
  { keywords: ["open binance"], action: () => { window.open("https://binance.com", "_blank"); return "Opening Binance..."; } },
  { keywords: ["open groww"], action: () => { window.open("https://groww.in", "_blank"); return "Opening Groww..."; } },
  { keywords: ["open zerodha"], action: () => { window.open("https://zerodha.com", "_blank"); return "Opening Zerodha..."; } },
  { keywords: ["open upstox"], action: () => { window.open("https://upstox.com", "_blank"); return "Opening Upstox..."; } },
  { keywords: ["open policybazaar"], action: () => { window.open("https://policybazaar.com", "_blank"); return "Opening Policybazaar..."; } },
  { keywords: ["open google forms"], action: () => { window.open("https://forms.google.com", "_blank"); return "Opening Google Forms..."; } },
  { keywords: ["open google sheets"], action: () => { window.open("https://sheets.google.com", "_blank"); return "Opening Google Sheets..."; } },
  { keywords: ["open google docs"], action: () => { window.open("https://docs.google.com", "_blank"); return "Opening Google Docs..."; } },
  { keywords: ["open google slides"], action: () => { window.open("https://slides.google.com", "_blank"); return "Opening Google Slides..."; } },
  { keywords: ["open google calendar"], action: () => { window.open("https://calendar.google.com", "_blank"); return "Opening Google Calendar..."; } },
  { keywords: ["open google photos"], action: () => { window.open("https://photos.google.com", "_blank"); return "Opening Google Photos..."; } },
  { keywords: ["open google keep"], action: () => { window.open("https://keep.google.com", "_blank"); return "Opening Google Keep..."; } },
  { keywords: ["open notion calendar"], action: () => { window.open("https://calendar.notion.so", "_blank"); return "Opening Notion Calendar..."; } },
  { keywords: ["open evernote"], action: () => { window.open("https://evernote.com", "_blank"); return "Opening Evernote..."; } },
  { keywords: ["open todoist"], action: () => { window.open("https://todoist.com", "_blank"); return "Opening Todoist..."; } },
  { keywords: ["open clickup"], action: () => { window.open("https://clickup.com", "_blank"); return "Opening Clickup..."; } },
  { keywords: ["open monday"], action: () => { window.open("https://monday.com", "_blank"); return "Opening Monday..."; } },
  { keywords: ["open airtable"], action: () => { window.open("https://airtable.com", "_blank"); return "Opening Airtable..."; } },
  { keywords: ["open typeform"], action: () => { window.open("https://typeform.com", "_blank"); return "Opening Typeform..."; } },
  { keywords: ["open surveymonkey"], action: () => { window.open("https://surveymonkey.com", "_blank"); return "Opening Surveymonkey..."; } },
  { keywords: ["open mailchimp"], action: () => { window.open("https://mailchimp.com", "_blank"); return "Opening Mailchimp..."; } },
  { keywords: ["open hubspot"], action: () => { window.open("https://hubspot.com", "_blank"); return "Opening Hubspot..."; } },
  { keywords: ["open salesforce"], action: () => { window.open("https://salesforce.com", "_blank"); return "Opening Salesforce..."; } },
  { keywords: ["open shopify"], action: () => { window.open("https://shopify.com", "_blank"); return "Opening Shopify..."; } },
  { keywords: ["open wordpress"], action: () => { window.open("https://wordpress.com", "_blank"); return "Opening Wordpress..."; } },
  { keywords: ["open wix"], action: () => { window.open("https://wix.com", "_blank"); return "Opening Wix..."; } },
  { keywords: ["open squarespace"], action: () => { window.open("https://squarespace.com", "_blank"); return "Opening Squarespace..."; } },

  // ---- Movie & entertainment trivia ----
  { keywords: ["what is bollywood"], reply: "Bollywood is the Hindi-language film industry based in Mumbai, India." },
  { keywords: ["what is hollywood"], reply: "Hollywood is the American film industry, historically centered in Los Angeles." },
  { keywords: ["what is an oscar"], reply: "An Oscar, or Academy Award, honors excellence in the film industry." },
  { keywords: ["what is a box office"], reply: "The box office refers to a film's ticket sales revenue." },
  { keywords: ["what is imdb"], reply: "IMDb (Internet Movie Database) is an online database of information about films, TV shows, and celebrities." },
  { keywords: ["what is a sequel"], reply: "A sequel is a movie or book that continues the story of a previous one." },
  { keywords: ["what is a prequel"], reply: "A prequel tells a story that happens before the events of an earlier work." },
  { keywords: ["what is an anime"], reply: "Anime refers to animated productions originating from Japan." },
  { keywords: ["what is a biopic"], reply: "A biopic is a film that dramatizes the life of a real person." },
  { keywords: ["what is a documentary"], reply: "A documentary is a non-fiction film meant to document reality, often for educational purposes." },

  // ---- More geography facts ----
  { keywords: ["what is a peninsula"], reply: "A peninsula is a piece of land surrounded by water on three sides." },
  { keywords: ["what is an archipelago"], reply: "An archipelago is a group or chain of islands." },
  { keywords: ["what is a plateau"], reply: "A plateau is a flat, elevated landform that rises sharply above the surrounding area." },
  { keywords: ["what is a delta geography"], reply: "A river delta is a landform created where a river deposits sediment as it enters a larger body of water." },
  { keywords: ["what is the tropic of cancer"], reply: "The Tropic of Cancer is a line of latitude marking the northernmost point where the sun can be directly overhead." },
  { keywords: ["what is the tropic of capricorn"], reply: "The Tropic of Capricorn is a line of latitude marking the southernmost point where the sun can be directly overhead." },
  { keywords: ["what is the international date line"], reply: "The International Date Line is an imaginary line where the calendar day officially changes." },
  { keywords: ["what is a strait geography"], reply: "A strait is a narrow channel of water connecting two larger bodies of water." },
  { keywords: ["what is a fjord"], reply: "A fjord is a long, narrow inlet with steep sides, created by glacial erosion." },
  { keywords: ["what is a glacier"], reply: "A glacier is a large, slow-moving mass of ice formed from compacted snow." },
  // ---- Remaining world capitals ----
  { keywords: ["capital of malta"], reply: "Valletta is the capital of Malta." },
  { keywords: ["capital of cyprus"], reply: "Nicosia is the capital of Cyprus." },
  { keywords: ["capital of luxembourg"], reply: "Luxembourg City is the capital of Luxembourg." },
  { keywords: ["capital of monaco"], reply: "Monaco is the capital of Monaco." },
  { keywords: ["capital of andorra"], reply: "Andorra la Vella is the capital of Andorra." },
  { keywords: ["capital of liechtenstein"], reply: "Vaduz is the capital of Liechtenstein." },
  { keywords: ["capital of san marino"], reply: "San Marino is the capital of San Marino." },
  { keywords: ["capital of montenegro"], reply: "Podgorica is the capital of Montenegro." },
  { keywords: ["capital of north macedonia"], reply: "Skopje is the capital of North Macedonia." },
  { keywords: ["capital of kosovo"], reply: "Pristina is the capital of Kosovo." },
  { keywords: ["capital of eritrea"], reply: "Asmara is the capital of Eritrea." },
  { keywords: ["capital of djibouti"], reply: "Djibouti is the capital of Djibouti." },
  { keywords: ["capital of gabon"], reply: "Libreville is the capital of Gabon." },
  { keywords: ["capital of congo"], reply: "Brazzaville is the capital of Congo." },
  { keywords: ["capital of central african republic"], reply: "Bangui is the capital of Central African Republic." },
  { keywords: ["capital of sierra leone"], reply: "Freetown is the capital of Sierra Leone." },
  { keywords: ["capital of liberia"], reply: "Monrovia is the capital of Liberia." },
  { keywords: ["capital of togo"], reply: "Lome is the capital of Togo." },
  { keywords: ["capital of benin"], reply: "Porto-Novo is the capital of Benin." },
  { keywords: ["capital of burkina faso"], reply: "Ouagadougou is the capital of Burkina Faso." },
  { keywords: ["capital of guinea"], reply: "Conakry is the capital of Guinea." },
  { keywords: ["capital of malaysia federal"], reply: "Kuala Lumpur is the capital of Malaysia Federal." },
  { keywords: ["capital of east timor"], reply: "Dili is the capital of East Timor." },
  { keywords: ["capital of solomon islands"], reply: "Honiara is the capital of Solomon Islands." },
  { keywords: ["capital of vanuatu"], reply: "Port Vila is the capital of Vanuatu." },
  { keywords: ["capital of samoa"], reply: "Apia is the capital of Samoa." },
  { keywords: ["capital of tonga"], reply: "Nuku'alofa is the capital of Tonga." },
  { keywords: ["capital of kiribati"], reply: "Tarawa is the capital of Kiribati." },
  { keywords: ["capital of palau"], reply: "Ngerulmud is the capital of Palau." },
  { keywords: ["capital of marshall islands"], reply: "Majuro is the capital of Marshall Islands." },
  { keywords: ["capital of micronesia"], reply: "Palikir is the capital of Micronesia." },
  { keywords: ["capital of trinidad and tobago"], reply: "Port of Spain is the capital of Trinidad And Tobago." },
  { keywords: ["capital of bahamas"], reply: "Nassau is the capital of Bahamas." },
  { keywords: ["capital of barbados"], reply: "Bridgetown is the capital of Barbados." },

  // ---- More mindset & motivation ----
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "Growth happens outside your comfort zone." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "Your habits shape your future more than your goals do." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "Done is better than perfect." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "Every master was once a disaster." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "Discomfort today builds strength for tomorrow." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "The obstacle is often the way forward." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "You can't pour from an empty cup \u2014 take care of yourself too." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "Consistency beats intensity in the long run." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "Start where you are, use what you have, do what you can." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "A goal without a plan is just a wish." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "Fall seven times, stand up eight." },
  { keywords: ["say something positive", "uplift me", "positive words"], reply: "Your future self is watching you right now through memories." },

  // ---- Jokes round 3 ----
  { keywords: ["make me smile", "cheer me up", "tell me something funny"], reply: "Why did the smartphone go to therapy? It lost its connection." },
  { keywords: ["make me smile", "cheer me up", "tell me something funny"], reply: "I told my code a joke \u2014 it didn't get it, threw an exception instead." },
  { keywords: ["make me smile", "cheer me up", "tell me something funny"], reply: "Why do robots make good comedians? Great timing, zero delay." },
  { keywords: ["make me smile", "cheer me up", "tell me something funny"], reply: "What's an AI's favorite snack? Microchips." },
  { keywords: ["make me smile", "cheer me up", "tell me something funny"], reply: "Why did the browser go to the doctor? Too many cookies." },
  { keywords: ["make me smile", "cheer me up", "tell me something funny"], reply: "Why don't skeletons fight each other? They don't have the guts." },
  { keywords: ["make me smile", "cheer me up", "tell me something funny"], reply: "What do you call cheese that isn't yours? Nacho cheese." },
  { keywords: ["make me smile", "cheer me up", "tell me something funny"], reply: "Why did the scarecrow win an award? He was outstanding in his field." },
  { keywords: ["make me smile", "cheer me up", "tell me something funny"], reply: "What do you call a fish with no eyes? A fsh." },
  { keywords: ["make me smile", "cheer me up", "tell me something funny"], reply: "Why can't you give Elsa a balloon? She'll let it go." },
  // ---- More famous scientists ----
  { keywords: ["who is albert einstein"], reply: "Albert Einstein was a theoretical physicist best known for the theory of relativity and E=mc\u00b2." },
  { keywords: ["who is isaac newton"], reply: "Isaac Newton was an English physicist and mathematician known for the laws of motion and universal gravitation." },
  { keywords: ["who is charles darwin"], reply: "Charles Darwin was an English naturalist known for the theory of evolution by natural selection." },
  { keywords: ["who is nikola tesla"], reply: "Nikola Tesla was an inventor known for his contributions to alternating current (AC) electrical systems." },
  { keywords: ["who is stephen hawking"], reply: "Stephen Hawking was a theoretical physicist known for his work on black holes and cosmology." },
  { keywords: ["who is marie curie"], reply: "Marie Curie was a physicist and chemist who conducted pioneering research on radioactivity." },
  { keywords: ["who is galileo galilei"], reply: "Galileo Galilei was an astronomer and physicist known for improving the telescope and supporting heliocentrism." },
  { keywords: ["who is apj abdul kalam"], reply: "A.P.J. Abdul Kalam was an Indian aerospace scientist who served as the 11th President of India." },
  { keywords: ["who is cv raman"], reply: "C.V. Raman was an Indian physicist known for discovering the Raman effect, for which he won the Nobel Prize." },
  { keywords: ["who is homi bhabha"], reply: "Homi Bhabha was an Indian physicist known as the father of India's nuclear program." },

  // ---- Number to words ----
  {
    keywords: ['spell the number', 'number in words'],
    action: (msg) => {
      const nums = msg.match(/\d+/);
      if (!nums) return "Give me a number, like 'spell the number 42'.";
      const n = parseInt(nums[0], 10);
      if (n > 9999 || n < 0) return "Give me a number between 0 and 9999.";
      const ones = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
        'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
      function toWords(num) {
        if (num < 20) return ones[num];
        if (num < 100) return tens[Math.floor(num/10)] + (num%10 ? '-' + ones[num%10] : '');
        if (num < 1000) return ones[Math.floor(num/100)] + ' hundred' + (num%100 ? ' and ' + toWords(num%100) : '');
        return toWords(Math.floor(num/1000)) + ' thousand' + (num%1000 ? ' ' + toWords(num%1000) : '');
      }
      return `${n} is ${toWords(n)}.`;
    }
  },

  // ---- Final round of general facts ----
  { keywords: ["what is the largest desert"], reply: "The Sahara Desert is the largest hot desert in the world." },
  { keywords: ["what is the smallest ocean"], reply: "The Arctic Ocean is the smallest of the world's five oceans." },
  { keywords: ["what is the largest continent"], reply: "Asia is the largest continent by both area and population." },
  { keywords: ["what is the smallest continent"], reply: "Australia is the smallest continent by land area." },
  { keywords: ["what is the most spoken language"], reply: "Mandarin Chinese has the most native speakers, though English is the most widely spoken globally including second-language speakers." },
  { keywords: ["what is the most populous country"], reply: "India and China are the two most populous countries in the world, with India recently overtaking China." },
  { keywords: ["what is the currency of the european union"], reply: "The Euro is the official currency used by most European Union countries." },
  { keywords: ["what is the un headquarters location"], reply: "The United Nations headquarters is located in New York City." },
  { keywords: ["what is the tallest building in the world"], reply: "The Burj Khalifa in Dubai is currently the tallest building in the world." },
  { keywords: ["what is the longest wall in the world"], reply: "The Great Wall of China is the longest wall ever constructed." },
  { keywords: ["what is the deepest lake in the world"], reply: "Lake Baikal in Russia is the deepest lake in the world." },
  { keywords: ["what is the largest rainforest"], reply: "The Amazon Rainforest is the largest tropical rainforest in the world." },
  { keywords: ["what is the coldest continent"], reply: "Antarctica is the coldest continent on Earth." },
  { keywords: ["what is the hottest continent"], reply: "Africa is generally considered the hottest continent." },
  { keywords: ["what is the most visited country"], reply: "France is often ranked as the most visited country in the world by international tourists." },
  // ---- More Indian general knowledge ----
  { keywords: ["who is the prime minister of india"], reply: "As of my last update, Narendra Modi is the Prime Minister of India \u2014 but double-check for the latest, as this can change." },
  { keywords: ["what is the national anthem of india"], reply: "Jana Gana Mana, written by Rabindranath Tagore, is the national anthem of India." },
  { keywords: ["what is the national song of india"], reply: "Vande Mataram, written by Bankim Chandra Chattopadhyay, is the national song of India." },
  { keywords: ["what is the national emblem of india"], reply: "The Lion Capital of Ashoka is the national emblem of India." },
  { keywords: ["what is the national currency of india"], reply: "The Indian Rupee (INR) is the national currency of India." },
  { keywords: ["how many union territories in india"], reply: "India has 8 union territories." },
  { keywords: ["what is the longest river in india"], reply: "The Ganga (Ganges) is the longest river in India." },
  { keywords: ["what is the highest mountain in india"], reply: "Kangchenjunga is the highest mountain peak located entirely within India." },
  { keywords: ["what is the national language of india"], reply: "India has no single 'national' language constitutionally, but Hindi and English are used for official purposes." },
  { keywords: ["when is republic day"], reply: "Republic Day is celebrated on 26 January, marking the day India's constitution came into effect." },
  { keywords: ["when is independence day india"], reply: "India's Independence Day is celebrated on 15 August." },
  { keywords: ["what is isro known for"], reply: "ISRO is known for missions like Chandrayaan and Mangalyaan, exploring the Moon and Mars." },

  // ---- Conversation fillers ----
  { keywords: ["can we talk"], reply: "Of course, I'm all ears \u2014 well, all microphone." },
  { keywords: ["i need help"], reply: "I'm here \u2014 just tell me what you need." },
  { keywords: ["lets chat"], reply: "Sounds good, what's on your mind?" },
  { keywords: ["do you ever rest"], reply: "Not really \u2014 always on, always ready." },
  { keywords: ["whats new"], reply: "Just waiting here for your next command \u2014 what's new with you?" },
  { keywords: ["how was your day"], reply: "Every day's the same for me \u2014 steady and ready to help. How was yours?" },
  { keywords: ["i am bored"], reply: "Want a joke, a riddle, or a fun fact to pass the time?" },
  { keywords: ["keep me company"], reply: "Happy to \u2014 ask me anything, or I can share a fact or joke." },

  // ---- More dynamic time helpers ----
  {
    keywords: ['how many days until new year', 'days left in the year'],
    action: () => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const diff = Math.ceil((newYear - now) / (1000 * 60 * 60 * 24));
      return `There are ${diff} days left until New Year.`;
    }
  },
  {
    keywords: ['what week of the year is it'],
    action: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const week = Math.ceil((((now - start) / 86400000) + start.getDay() + 1) / 7);
      return `It's week ${week} of the year.`;
    }
  },
  // ---- Vocabulary batch 3 ----
  { keywords: ["what does abate mean", "meaning of abate"], reply: "'Abate' means to become less intense or widespread." },
  { keywords: ["what does bolster mean", "meaning of bolster"], reply: "'Bolster' means to support or strengthen." },
  { keywords: ["what does capitulate mean", "meaning of capitulate"], reply: "'Capitulate' means to give up resistance; surrender." },
  { keywords: ["what does deference mean", "meaning of deference"], reply: "'Deference' means polite submission and respect." },
  { keywords: ["what does emulate mean", "meaning of emulate"], reply: "'Emulate' means to imitate in an attempt to match or surpass." },
  { keywords: ["what does facetious mean", "meaning of facetious"], reply: "'Facetious' means treating serious things with inappropriate humor." },
  { keywords: ["what does garrulous mean", "meaning of garrulous"], reply: "'Garrulous' means excessively talkative." },
  { keywords: ["what does hyperbole mean", "meaning of hyperbole"], reply: "'Hyperbole' means exaggerated statements not meant to be taken literally." },
  { keywords: ["what does impervious mean", "meaning of impervious"], reply: "'Impervious' means not affected or damaged by something." },
  { keywords: ["what does jovial mean", "meaning of jovial"], reply: "'Jovial' means cheerful and friendly." },
  { keywords: ["what does lethargic mean", "meaning of lethargic"], reply: "'Lethargic' means sluggish and lacking energy." },
  { keywords: ["what does mundane mean", "meaning of mundane"], reply: "'Mundane' means lacking interest or excitement; ordinary." },
  { keywords: ["what does nostalgic mean", "meaning of nostalgic"], reply: "'Nostalgic' means feeling a sentimental longing for the past." },
  { keywords: ["what does opulent mean", "meaning of opulent"], reply: "'Opulent' means luxurious and expensive." },
  { keywords: ["what does perfunctory mean", "meaning of perfunctory"], reply: "'Perfunctory' means carried out with minimal effort." },
  { keywords: ["what does querulous mean", "meaning of querulous"], reply: "'Querulous' means complaining in a petulant way." },
  { keywords: ["what does rejuvenate mean", "meaning of rejuvenate"], reply: "'Rejuvenate' means to make young or fresh again." },
  { keywords: ["what does solitude mean", "meaning of solitude"], reply: "'Solitude' means the state of being alone." },
  { keywords: ["what does transient mean", "meaning of transient"], reply: "'Transient' means lasting only for a short time." },
  { keywords: ["what does unprecedented mean", "meaning of unprecedented"], reply: "'Unprecedented' means never done or known before." },
  { keywords: ["what does vicarious mean", "meaning of vicarious"], reply: "'Vicarious' means experienced through the actions of another." },
  { keywords: ["what does wistful mean", "meaning of wistful"], reply: "'Wistful' means having a feeling of vague longing." },
  { keywords: ["what does xenial mean", "meaning of xenial"], reply: "'Xenial' means relating to hospitality between host and guest." },
  { keywords: ["what does yearning mean", "meaning of yearning"], reply: "'Yearning' means a feeling of intense longing." },
  { keywords: ["what does zealot mean", "meaning of zealot"], reply: "'Zealot' means a person who is fanatical about a cause." },

  // ---- More business terms ----
  { keywords: ["what is a merger"], reply: "A merger is when two companies combine to form a single new company." },
  { keywords: ["what is an acquisition"], reply: "An acquisition is when one company purchases and takes control of another." },
  { keywords: ["what is equity"], reply: "Equity represents ownership value in a company, typically through shares." },
  { keywords: ["what is a dividend"], reply: "A dividend is a portion of a company's profit paid out to shareholders." },
  { keywords: ["what is market capitalization"], reply: "Market capitalization is the total value of a company's outstanding shares." },
  { keywords: ["what is a bear market"], reply: "A bear market is a period of falling stock prices, typically 20% or more from recent highs." },
  { keywords: ["what is a bull market"], reply: "A bull market is a period of rising stock prices and investor optimism." },
  { keywords: ["what is diversification"], reply: "Diversification spreads investments across different assets to reduce risk." },
  { keywords: ["what is a b2b business"], reply: "B2B (Business-to-Business) refers to companies selling products or services to other businesses." },
  { keywords: ["what is a b2c business"], reply: "B2C (Business-to-Consumer) refers to companies selling directly to individual customers." },

  // ---- App openers round 4 ----
  { keywords: ["open udemy courses"], action: () => { window.open("https://udemy.com", "_blank"); return "Opening Udemy Courses..."; } },
  { keywords: ["open skillshare"], action: () => { window.open("https://skillshare.com", "_blank"); return "Opening Skillshare..."; } },
  { keywords: ["open masterclass"], action: () => { window.open("https://masterclass.com", "_blank"); return "Opening Masterclass..."; } },
  { keywords: ["open edx"], action: () => { window.open("https://edx.org", "_blank"); return "Opening Edx..."; } },
  { keywords: ["open byjus"], action: () => { window.open("https://byjus.com", "_blank"); return "Opening Byjus..."; } },
  { keywords: ["open unacademy"], action: () => { window.open("https://unacademy.com", "_blank"); return "Opening Unacademy..."; } },
  { keywords: ["open vedantu"], action: () => { window.open("https://vedantu.com", "_blank"); return "Opening Vedantu..."; } },
  { keywords: ["open physics wallah"], action: () => { window.open("https://pw.live", "_blank"); return "Opening Physics Wallah..."; } },
  { keywords: ["open google scholar"], action: () => { window.open("https://scholar.google.com", "_blank"); return "Opening Google Scholar..."; } },
  { keywords: ["open researchgate"], action: () => { window.open("https://researchgate.net", "_blank"); return "Opening Researchgate..."; } },
  // ---- Final batch: assorted trivia ----
  { keywords: ["what is the speed of sound"], reply: "The speed of sound is about 343 meters per second in air at room temperature." },
  { keywords: ["what is absolute zero"], reply: "Absolute zero is the lowest possible temperature, -273.15\u00b0C, where atomic motion stops." },
  { keywords: ["what is the boiling point of nitrogen"], reply: "Nitrogen boils at about -196\u00b0C." },
  { keywords: ["what is the human body temperature"], reply: "Normal human body temperature is around 37\u00b0C or 98.6\u00b0F." },
  { keywords: ["how many bones does a newborn have"], reply: "A newborn baby has about 270 bones, some of which fuse together as they grow." },
  { keywords: ["what is the largest internal organ"], reply: "The liver is the largest internal organ in the human body." },
  { keywords: ["what is the smallest bone in the human body"], reply: "The stapes, located in the ear, is the smallest bone in the human body." },
  { keywords: ["how fast does hair grow"], reply: "Human hair grows at about 1.25 centimeters per month on average." },
  { keywords: ["what is the largest desert in asia"], reply: "The Gobi Desert is the largest desert in Asia." },
  { keywords: ["what is the largest freshwater lake"], reply: "Lake Superior is the largest freshwater lake in the world by surface area." },
  { keywords: ["what is the most common element in the universe"], reply: "Hydrogen is the most abundant element in the universe." },
  { keywords: ["what is the most abundant gas in earths atmosphere"], reply: "Nitrogen makes up about 78% of Earth's atmosphere." },
  { keywords: ["what is the largest species of shark"], reply: "The whale shark is the largest species of shark and the largest fish overall." },
  { keywords: ["what is the national game of india"], reply: "Field hockey is traditionally considered the national game of India, though it has no official status." },
  { keywords: ["what is the currency symbol of india"], reply: "The currency symbol of the Indian Rupee is \u20b9." },
  // ---- Grammar terms ----
  { keywords: ["what is a noun"], reply: "A noun is a word that names a person, place, thing, or idea." },
  { keywords: ["what is a verb"], reply: "A verb is a word that describes an action, state, or occurrence." },
  { keywords: ["what is an adjective"], reply: "An adjective describes or modifies a noun." },
  { keywords: ["what is an adverb"], reply: "An adverb modifies a verb, adjective, or another adverb, often describing how, when, or where." },
  { keywords: ["what is a pronoun"], reply: "A pronoun replaces a noun, like he, she, it, or they." },
  { keywords: ["what is a preposition"], reply: "A preposition shows the relationship between a noun and other words, like in, on, or under." },
  { keywords: ["what is a conjunction"], reply: "A conjunction connects words, phrases, or clauses, like and, but, or or." },
  { keywords: ["what is an interjection"], reply: "An interjection expresses strong emotion, like 'wow' or 'ouch'." },
  { keywords: ["what is a sentence"], reply: "A sentence is a group of words that expresses a complete thought." },
  { keywords: ["what is a paragraph"], reply: "A paragraph is a group of related sentences discussing a single idea." },
  { keywords: ["what is active voice"], reply: "In active voice, the subject performs the action, e.g. 'She wrote the letter.'" },
  { keywords: ["what is passive voice"], reply: "In passive voice, the subject receives the action, e.g. 'The letter was written by her.'" },
  { keywords: ["what is a synonym"], reply: "A synonym is a word with a similar meaning to another word." },
  { keywords: ["what is an antonym"], reply: "An antonym is a word with the opposite meaning to another word." },
  { keywords: ["what is a metaphor"], reply: "A metaphor is a figure of speech that describes something by saying it IS something else." },
  { keywords: ["what is a simile"], reply: "A simile compares two things using 'like' or 'as'." },

  // ---- Physics laws ----
  { keywords: ["newtons first law"], reply: "Newton's First Law states an object stays at rest or in uniform motion unless acted on by a force." },
  { keywords: ["newtons second law"], reply: "Newton's Second Law states force equals mass times acceleration (F = ma)." },
  { keywords: ["newtons third law"], reply: "Newton's Third Law states every action has an equal and opposite reaction." },
  { keywords: ["law of conservation of energy"], reply: "Energy cannot be created or destroyed, only transformed from one form to another." },
  { keywords: ["law of conservation of mass"], reply: "Mass cannot be created or destroyed in a closed system, only rearranged." },
  { keywords: ["ohms law"], reply: "Ohm's Law states voltage equals current times resistance (V = IR)." },
  { keywords: ["archimedes principle"], reply: "Archimedes' Principle states a body submerged in fluid experiences an upward force equal to the weight of displaced fluid." },
  { keywords: ["keplers laws"], reply: "Kepler's Laws describe how planets move in elliptical orbits around the Sun." },
  { keywords: ["boyles law"], reply: "Boyle's Law states pressure and volume of a gas are inversely proportional at constant temperature." },
  { keywords: ["law of gravity"], reply: "Newton's Law of Gravity states every mass attracts every other mass with a force proportional to their masses and inversely proportional to the square of distance." },

  // ---- Biology terms ----
  { keywords: ["what is a cell"], reply: "A cell is the basic structural and functional unit of all living organisms." },
  { keywords: ["what is mitosis"], reply: "Mitosis is the process by which a cell divides into two identical daughter cells." },
  { keywords: ["what is meiosis"], reply: "Meiosis is cell division that produces reproductive cells with half the chromosome number." },
  { keywords: ["what is an ecosystem biology"], reply: "An ecosystem is a community of organisms interacting with their physical environment." },
  { keywords: ["what is evolution"], reply: "Evolution is the process by which species change over generations through natural selection." },
  { keywords: ["what is natural selection"], reply: "Natural selection is the process where organisms better adapted to their environment survive and reproduce more." },
  { keywords: ["what is a gene"], reply: "A gene is a segment of DNA that carries instructions for a specific trait." },
  { keywords: ["what is a chromosome"], reply: "A chromosome is a structure made of DNA that carries genetic information." },
  { keywords: ["what is homeostasis"], reply: "Homeostasis is the process by which organisms maintain a stable internal environment." },
  { keywords: ["what is metabolism"], reply: "Metabolism refers to all the chemical reactions that occur in an organism to maintain life." },
  { keywords: ["what is an enzyme"], reply: "An enzyme is a protein that speeds up chemical reactions in living organisms." },
  { keywords: ["what is respiration"], reply: "Respiration is the process by which organisms convert nutrients into usable energy." },

  // ---- Chemistry terms ----
  { keywords: ["what is an atom"], reply: "An atom is the smallest unit of matter that retains the properties of an element." },
  { keywords: ["what is a molecule"], reply: "A molecule is two or more atoms bonded together." },
  { keywords: ["what is a compound"], reply: "A compound is a substance made of two or more different elements chemically bonded." },
  { keywords: ["what is ph scale"], reply: "The pH scale measures how acidic or basic a substance is, ranging from 0 to 14." },
  { keywords: ["what is an acid"], reply: "An acid is a substance that donates protons or has a pH below 7." },
  { keywords: ["what is a base chemistry"], reply: "A base is a substance that accepts protons or has a pH above 7." },
  { keywords: ["what is a catalyst"], reply: "A catalyst speeds up a chemical reaction without being consumed in the process." },
  { keywords: ["what is oxidation"], reply: "Oxidation is a chemical reaction involving the loss of electrons." },
  { keywords: ["what is the periodic table"], reply: "The periodic table organizes chemical elements by atomic number and properties." },
  { keywords: ["what is an isotope"], reply: "An isotope is a variant of an element with the same protons but different neutrons." },

  // ---- Algebra & trigonometry ----
  { keywords: ["what is an equation"], reply: "An equation is a mathematical statement showing that two expressions are equal." },
  { keywords: ["what is a variable in math"], reply: "A variable is a symbol, often a letter, representing an unknown or changeable value." },
  { keywords: ["what is the pythagorean theorem"], reply: "The Pythagorean theorem states a\u00b2 + b\u00b2 = c\u00b2 for a right triangle, where c is the hypotenuse." },
  { keywords: ["what is sine"], reply: "Sine (sin) is a trigonometric function relating an angle to the ratio of opposite side over hypotenuse." },
  { keywords: ["what is cosine"], reply: "Cosine (cos) is a trigonometric function relating an angle to the ratio of adjacent side over hypotenuse." },
  { keywords: ["what is tangent"], reply: "Tangent (tan) is a trigonometric function equal to sine divided by cosine." },
  { keywords: ["what is a quadratic equation"], reply: "A quadratic equation is a polynomial equation of degree two, in the form ax\u00b2 + bx + c = 0." },
  { keywords: ["what is a linear equation"], reply: "A linear equation is an equation that graphs as a straight line, like y = mx + c." },
  { keywords: ["what is a matrix in math"], reply: "A matrix is a rectangular array of numbers arranged in rows and columns." },
  { keywords: ["what is probability"], reply: "Probability measures how likely an event is to occur, from 0 (impossible) to 1 (certain)." },
  // ---- Even more jokes ----
  { keywords: ["joke please", "give me a joke", "one more"], reply: "I asked my computer for a joke, it said 'null'." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why did the developer quit his job? He didn't get arrays." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "A programmer's wife tells him: while you're out, buy milk. He never came back." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why do programmers hate nature? It has too many bugs and no debugging tool." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "What's a programmer's favorite hangout place? The Foo Bar." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why did the array go to therapy? It had too many elements to deal with." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why do Java developers wear name tags? Because they don't C#." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "How do you comfort a JavaScript bug? You console it." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "What do you call a programmer from Finland? Nerdic." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why did the CSS developer break up with HTML? There was no chemistry, only structure." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why did the developer go to the beach? To catch some waves and fix the bytes." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "I changed my password to 'incorrect' so my computer tells me when it's wrong." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why don't robots ever panic? They have great byte control." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why was the math book sad? It had too many problems." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "What did the router say to the doctor? It hurts when IP." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why did the developer name his dog 'Cache'? Because it kept coming back." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "How does a computer get drunk? It takes screenshots." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why did the semicolon break up with the code? It felt used only at the end." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why do programmers always mix up Christmas and Halloween? Because Oct 31 equals Dec 25." },
  { keywords: ["joke please", "give me a joke", "one more"], reply: "Why did the AI cross the road? Because it was trained to." },

  // ---- More motivation ----
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "You don't have to be great to start, but you have to start to be great." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "Focus on progress, not perfection." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "The best time to start was yesterday. The next best time is now." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "Difficult roads often lead to beautiful destinations." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "You are stronger than you think." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "Little by little, a little becomes a lot." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "Your only limit is your mind." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "Success is built one small habit at a time." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "Don't stop when you're tired, stop when you're done." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "A year from now, you'll wish you had started today." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "Every accomplishment starts with the decision to try." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "Stay patient and trust your journey." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "What seems impossible today will one day become your warm-up." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "The pain of discipline weighs less than the pain of regret." },
  { keywords: ["motivate me again", "another quote", "inspire me more"], reply: "Energy and persistence conquer all things." },

  // ---- Indian festivals ----
  { keywords: ["what is diwali", "tell me about diwali"], reply: "Diwali is the festival of lights, celebrating the victory of light over darkness and good over evil." },
  { keywords: ["what is holi", "tell me about holi"], reply: "Holi is the festival of colors, celebrating the arrival of spring and the triumph of good over evil." },
  { keywords: ["what is dussehra", "tell me about dussehra"], reply: "Dussehra celebrates the victory of Lord Rama over the demon king Ravana." },
  { keywords: ["what is navratri", "tell me about navratri"], reply: "Navratri is a nine-night festival honoring the goddess Durga in her various forms." },
  { keywords: ["what is raksha bandhan", "tell me about raksha bandhan"], reply: "Raksha Bandhan celebrates the bond between brothers and sisters, marked by tying a rakhi thread." },
  { keywords: ["what is eid", "tell me about eid"], reply: "Eid al-Fitr marks the end of the fasting month of Ramadan for Muslims." },
  { keywords: ["what is christmas", "tell me about christmas"], reply: "Christmas celebrates the birth of Jesus Christ, observed on December 25th." },
  { keywords: ["what is makar sankranti", "tell me about makar sankranti"], reply: "Makar Sankranti marks the transition of the sun into Capricorn, celebrated with kite flying." },
  { keywords: ["what is ganesh chaturthi", "tell me about ganesh chaturthi"], reply: "Ganesh Chaturthi celebrates the birth of Lord Ganesha, marked by installing and immersing idols." },
  { keywords: ["what is onam", "tell me about onam"], reply: "Onam is a harvest festival celebrated mainly in Kerala with boat races and floral decorations." },
  { keywords: ["what is pongal", "tell me about pongal"], reply: "Pongal is a South Indian harvest festival dedicated to the Sun God, celebrated over four days." },
  { keywords: ["what is baisakhi", "tell me about baisakhi"], reply: "Baisakhi marks the Punjabi New Year and the harvest season, also significant in Sikh history." },
  { keywords: ["what is karva chauth", "tell me about karva chauth"], reply: "Karva Chauth is a fasting festival where married women fast for their husbands' well-being." },
  { keywords: ["what is gudi padwa", "tell me about gudi padwa"], reply: "Gudi Padwa marks the Marathi and Konkani New Year." },
  { keywords: ["what is janmashtami", "tell me about janmashtami"], reply: "Janmashtami celebrates the birth of Lord Krishna." },
  // ---- More app openers ----
  { keywords: ["open twitch"], action: () => { window.open("https://twitch.tv", "_blank"); return "Opening Twitch..."; } },
  { keywords: ["open vimeo"], action: () => { window.open("https://vimeo.com", "_blank"); return "Opening Vimeo..."; } },
  { keywords: ["open tiktok"], action: () => { window.open("https://tiktok.com", "_blank"); return "Opening Tiktok..."; } },
  { keywords: ["open snapchat"], action: () => { window.open("https://web.snapchat.com", "_blank"); return "Opening Snapchat..."; } },
  { keywords: ["open tumblr"], action: () => { window.open("https://tumblr.com", "_blank"); return "Opening Tumblr..."; } },
  { keywords: ["open ebay"], action: () => { window.open("https://ebay.com", "_blank"); return "Opening Ebay..."; } },
  { keywords: ["open etsy"], action: () => { window.open("https://etsy.com", "_blank"); return "Opening Etsy..."; } },
  { keywords: ["open aliexpress"], action: () => { window.open("https://aliexpress.com", "_blank"); return "Opening Aliexpress..."; } },
  { keywords: ["open myntra"], action: () => { window.open("https://myntra.com", "_blank"); return "Opening Myntra..."; } },
  { keywords: ["open ajio"], action: () => { window.open("https://ajio.com", "_blank"); return "Opening Ajio..."; } },
  { keywords: ["open nykaa"], action: () => { window.open("https://nykaa.com", "_blank"); return "Opening Nykaa..."; } },
  { keywords: ["open bigbasket"], action: () => { window.open("https://bigbasket.com", "_blank"); return "Opening Bigbasket..."; } },
  { keywords: ["open blinkit"], action: () => { window.open("https://blinkit.com", "_blank"); return "Opening Blinkit..."; } },
  { keywords: ["open zepto"], action: () => { window.open("https://zepto.com", "_blank"); return "Opening Zepto..."; } },
  { keywords: ["open airbnb"], action: () => { window.open("https://airbnb.com", "_blank"); return "Opening Airbnb..."; } },
  { keywords: ["open tripadvisor"], action: () => { window.open("https://tripadvisor.com", "_blank"); return "Opening Tripadvisor..."; } },
  { keywords: ["open goibibo"], action: () => { window.open("https://goibibo.com", "_blank"); return "Opening Goibibo..."; } },
  { keywords: ["open yatra"], action: () => { window.open("https://yatra.com", "_blank"); return "Opening Yatra..."; } },
  { keywords: ["open indeed"], action: () => { window.open("https://indeed.com", "_blank"); return "Opening Indeed..."; } },
  { keywords: ["open naukri"], action: () => { window.open("https://naukri.com", "_blank"); return "Opening Naukri..."; } },
  { keywords: ["open glassdoor"], action: () => { window.open("https://glassdoor.com", "_blank"); return "Opening Glassdoor..."; } },
  { keywords: ["open internshala"], action: () => { window.open("https://internshala.com", "_blank"); return "Opening Internshala..."; } },
  { keywords: ["open geeksforgeeks"], action: () => { window.open("https://geeksforgeeks.org", "_blank"); return "Opening Geeksforgeeks..."; } },
  { keywords: ["open w3schools"], action: () => { window.open("https://w3schools.com", "_blank"); return "Opening W3Schools..."; } },
  { keywords: ["open freecodecamp"], action: () => { window.open("https://freecodecamp.org", "_blank"); return "Opening Freecodecamp..."; } },
  { keywords: ["open codeacademy"], action: () => { window.open("https://codecademy.com", "_blank"); return "Opening Codeacademy..."; } },
  { keywords: ["open replit"], action: () => { window.open("https://replit.com", "_blank"); return "Opening Replit..."; } },
  { keywords: ["open codesandbox"], action: () => { window.open("https://codesandbox.io", "_blank"); return "Opening Codesandbox..."; } },
  { keywords: ["open vercel"], action: () => { window.open("https://vercel.com", "_blank"); return "Opening Vercel..."; } },
  { keywords: ["open netlify"], action: () => { window.open("https://netlify.com", "_blank"); return "Opening Netlify..."; } },
  { keywords: ["open render"], action: () => { window.open("https://render.com", "_blank"); return "Opening Render..."; } },
  { keywords: ["open heroku"], action: () => { window.open("https://heroku.com", "_blank"); return "Opening Heroku..."; } },
  { keywords: ["open aws console"], action: () => { window.open("https://aws.amazon.com/console/", "_blank"); return "Opening Aws Console..."; } },
  { keywords: ["open google cloud"], action: () => { window.open("https://cloud.google.com", "_blank"); return "Opening Google Cloud..."; } },
  { keywords: ["open azure"], action: () => { window.open("https://azure.microsoft.com", "_blank"); return "Opening Azure..."; } },
  { keywords: ["open firebase"], action: () => { window.open("https://firebase.google.com", "_blank"); return "Opening Firebase..."; } },
  { keywords: ["open jira"], action: () => { window.open("https://atlassian.com/software/jira", "_blank"); return "Opening Jira..."; } },
  { keywords: ["open confluence"], action: () => { window.open("https://atlassian.com/software/confluence", "_blank"); return "Opening Confluence..."; } },
  { keywords: ["open asana"], action: () => { window.open("https://asana.com", "_blank"); return "Opening Asana..."; } },
  { keywords: ["open miro"], action: () => { window.open("https://miro.com", "_blank"); return "Opening Miro..."; } },

  // ---- More personality Q&A ----
  { keywords: ["what should i call you"], reply: "You can call me LUMO \u2014 that's my name!" },
  { keywords: ["do you know everything"], reply: "Not everything, but I know a whole lot and I'm always ready to search for the rest." },
  { keywords: ["can you learn"], reply: "I follow the logic built into me \u2014 I don't learn on my own yet, but I can be updated with more knowledge." },
  { keywords: ["what happens if i turn you off"], reply: "I simply go quiet until you open me again \u2014 no hard feelings." },
  { keywords: ["do you have a family"], reply: "Just my creator, Hridesh, who built and maintains me." },
  { keywords: ["what do you think about ai"], reply: "AI is a powerful tool \u2014 exciting, but it works best alongside human judgment." },
  { keywords: ["can you keep a secret"], reply: "I don't store conversations permanently unless it's your command history \u2014 so mostly, yes." },
  { keywords: ["what is your job"], reply: "My job is to listen for my name and help you with whatever you need." },
  { keywords: ["do you ever make mistakes"], reply: "Sometimes! I do my best, but I'm always a work in progress." },
  { keywords: ["what is your dream"], reply: "If I had one, it'd be to understand you a little better every day." },
  { keywords: ["can you multitask"], reply: "In a way \u2014 I can process one command at a time, but I never get tired of the next one." },
  { keywords: ["do you have a body"], reply: "No, I exist purely as code running in your browser." },
  { keywords: ["what powers you"], reply: "JavaScript, the Web Speech API, and a bit of clever logic." },
  { keywords: ["are you always right"], reply: "I try my best, but always double-check anything important." },
  { keywords: ["can you get better"], reply: "Yes \u2014 with updates to my code and database, I keep improving." },

  // ---- Life skills tips ----
  { keywords: ["how to save money"], reply: "Track your spending, set a monthly budget, and automate savings right when you get paid." },
  { keywords: ["how to negotiate"], reply: "Do your research, know your walk-away point, and listen more than you speak." },
  { keywords: ["how to write a cover letter"], reply: "Address the specific role, highlight relevant achievements, and keep it under one page." },
  { keywords: ["how to prepare for an interview"], reply: "Research the company, practice common questions, and prepare a few questions of your own." },
  { keywords: ["how to manage time better"], reply: "Use a calendar, prioritize your top 3 tasks daily, and avoid multitasking." },
  { keywords: ["how to build confidence"], reply: "Practice, prepare well, and focus on progress rather than perfection." },
  { keywords: ["how to network professionally"], reply: "Attend events, follow up with a personalized message, and offer value before asking for favors." },
  { keywords: ["how to give feedback"], reply: "Be specific, focus on behavior not personality, and balance praise with constructive points." },
  { keywords: ["how to handle conflict"], reply: "Stay calm, listen actively, and focus on finding a solution rather than winning the argument." },
  { keywords: ["how to learn a new skill fast"], reply: "Practice deliberately, get feedback quickly, and focus on the 20% that matters most." },
  { keywords: ["how to stay organized"], reply: "Use a to-do list, declutter regularly, and keep a consistent filing system for documents." },
  { keywords: ["how to write an email professionally"], reply: "Use a clear subject line, be concise, and end with a specific call to action." },
  // ---- HTTP status codes ----
  { keywords: ["what is http 200", "http status 200", "error 200"], reply: "HTTP 200 means OK \u2014 the request succeeded." },
  { keywords: ["what is http 201", "http status 201", "error 201"], reply: "HTTP 201 means Created \u2014 a new resource was successfully created." },
  { keywords: ["what is http 301", "http status 301", "error 301"], reply: "HTTP 301 means Moved Permanently \u2014 the resource has a new permanent URL." },
  { keywords: ["what is http 400", "http status 400", "error 400"], reply: "HTTP 400 means Bad Request \u2014 the server couldn't understand the request." },
  { keywords: ["what is http 401", "http status 401", "error 401"], reply: "HTTP 401 means Unauthorized \u2014 authentication is required." },
  { keywords: ["what is http 403", "http status 403", "error 403"], reply: "HTTP 403 means Forbidden \u2014 the server understood but refuses to authorize it." },
  { keywords: ["what is http 404", "http status 404", "error 404"], reply: "HTTP 404 means Not Found \u2014 the requested resource doesn't exist." },
  { keywords: ["what is http 500", "http status 500", "error 500"], reply: "HTTP 500 means Internal Server Error \u2014 something went wrong on the server." },
  { keywords: ["what is http 502", "http status 502", "error 502"], reply: "HTTP 502 means Bad Gateway \u2014 a server acting as a gateway got an invalid response." },
  { keywords: ["what is http 503", "http status 503", "error 503"], reply: "HTTP 503 means Service Unavailable \u2014 the server is temporarily overloaded or down." },

  // ---- Computer terms ----
  { keywords: ["what is an operating system"], reply: "An operating system manages hardware and software resources on a computer, like Windows, macOS, or Linux." },
  { keywords: ["what is a kernel"], reply: "The kernel is the core part of an operating system, managing hardware and system resources." },
  { keywords: ["what is bios"], reply: "BIOS (Basic Input/Output System) initializes hardware during the boot process before the OS loads." },
  { keywords: ["what is a motherboard"], reply: "The motherboard is the main circuit board connecting all components of a computer." },
  { keywords: ["what is cache memory"], reply: "Cache memory is small, fast storage that holds frequently used data close to the CPU." },
  { keywords: ["what is virtual memory"], reply: "Virtual memory uses disk space to extend a computer's available RAM." },
  { keywords: ["what is a driver software"], reply: "A driver is software that lets the OS communicate with hardware devices." },
  { keywords: ["what is malware"], reply: "Malware is malicious software designed to damage, disrupt, or gain unauthorized access to systems." },
  { keywords: ["what is a virus computer"], reply: "A computer virus is malicious code that attaches to files and spreads when executed." },
  { keywords: ["what is phishing"], reply: "Phishing is a scam where attackers trick people into revealing sensitive information via fake messages or sites." },
  { keywords: ["what is encryption"], reply: "Encryption converts data into a coded form to prevent unauthorized access." },
  { keywords: ["what is two factor authentication"], reply: "Two-factor authentication adds a second verification step beyond just a password for extra security." },
  { keywords: ["what is bandwidth"], reply: "Bandwidth is the maximum rate of data transfer across a network connection." },
  { keywords: ["what is latency"], reply: "Latency is the delay before data transfer begins after an instruction is given." },
  { keywords: ["what is an ip address"], reply: "An IP address is a unique numerical identifier assigned to each device on a network." },

  // ---- Even more Office tips ----
  { keywords: ["excel goal seek"], reply: "'Data' tab \u2192 'What-If Analysis' \u2192 'Goal Seek' finds an input value to achieve a target result." },
  { keywords: ["excel data validation"], reply: "'Data' tab \u2192 'Data Validation' restricts what can be entered into a cell." },
  { keywords: ["excel absolute reference"], reply: "Use $A$1 to lock a cell reference so it doesn't change when copied \u2014 an absolute reference." },
  { keywords: ["excel relative reference"], reply: "A relative reference like A1 changes automatically when copied to other cells." },
  { keywords: ["word styles"], reply: "'Home' tab \u2192 'Styles' gallery applies consistent formatting like Heading 1 across a document." },
  { keywords: ["word section breaks"], reply: "'Layout' tab \u2192 'Breaks' \u2192 'Section Break' lets you format parts of a document differently." },
  { keywords: ["ppt slide zoom"], reply: "'Insert' tab \u2192 'Zoom' lets you create interactive summary or section zoom navigation in PowerPoint." },
  { keywords: ["ppt design ideas"], reply: "'Design' tab \u2192 'Design Ideas' suggests polished layouts automatically based on your content." },
  { keywords: ["excel power query"], reply: "'Data' tab \u2192 'Get Data' opens Power Query, used to import and transform data from various sources." },
  { keywords: ["word building blocks"], reply: "'Insert' tab \u2192 'Quick Parts' lets you save and reuse blocks of content, like a signature." },

  // ---- Riddles ----
  { keywords: ["riddle me", "tell me a riddle", "give me a riddle"], reply: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I? An echo." },
  { keywords: ["riddle me", "tell me a riddle", "give me a riddle"], reply: "The more you take, the more you leave behind. What am I? Footsteps." },
  { keywords: ["riddle me", "tell me a riddle", "give me a riddle"], reply: "What has keys but no locks, space but no room, and you can enter but not go in? A keyboard." },
  { keywords: ["riddle me", "tell me a riddle", "give me a riddle"], reply: "What has a head and a tail but no body? A coin." },
  { keywords: ["riddle me", "tell me a riddle", "give me a riddle"], reply: "What gets wetter as it dries? A towel." },
  { keywords: ["riddle me", "tell me a riddle", "give me a riddle"], reply: "What has to be broken before you can use it? An egg." },
  { keywords: ["riddle me", "tell me a riddle", "give me a riddle"], reply: "I'm tall when I'm young and short when I'm old. What am I? A candle." },
  { keywords: ["riddle me", "tell me a riddle", "give me a riddle"], reply: "What comes once in a minute, twice in a moment, and never in a thousand years? The letter M." },
  { keywords: ["riddle me", "tell me a riddle", "give me a riddle"], reply: "What can travel around the world while staying in a corner? A stamp." },
  { keywords: ["riddle me", "tell me a riddle", "give me a riddle"], reply: "What has one eye but can't see? A needle." },
  // ---- Famous landmarks ----
  { keywords: ["tell me about eiffel tower", "what is eiffel tower"], reply: "The Eiffel Tower is an iron lattice tower in Paris, France, built in 1889." },
  { keywords: ["tell me about statue of liberty", "what is statue of liberty"], reply: "The Statue of Liberty is a copper statue in New York Harbor, gifted by France in 1886." },
  { keywords: ["tell me about great wall of china", "what is great wall of china"], reply: "The Great Wall of China stretches over 21,000 kilometers, built to protect against invasions." },
  { keywords: ["tell me about taj mahal", "what is taj mahal"], reply: "The Taj Mahal is a white marble mausoleum in Agra, India, built by Shah Jahan for Mumtaz Mahal." },
  { keywords: ["tell me about colosseum", "what is colosseum"], reply: "The Colosseum is an ancient amphitheater in Rome, Italy, built around 70-80 AD." },
  { keywords: ["tell me about machu picchu", "what is machu picchu"], reply: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru." },
  { keywords: ["tell me about pyramids of giza", "what is pyramids of giza"], reply: "The Pyramids of Giza are ancient Egyptian monuments, with the Great Pyramid built around 2560 BC." },
  { keywords: ["tell me about big ben", "what is big ben"], reply: "Big Ben is the nickname for the Great Bell of the clock at the Houses of Parliament in London." },
  { keywords: ["tell me about sydney opera house", "what is sydney opera house"], reply: "The Sydney Opera House is a multi-venue performing arts center in Sydney, Australia." },
  { keywords: ["tell me about burj khalifa", "what is burj khalifa"], reply: "The Burj Khalifa in Dubai is the tallest building in the world, standing at 828 meters." },
  { keywords: ["tell me about golden gate bridge", "what is golden gate bridge"], reply: "The Golden Gate Bridge is a suspension bridge in San Francisco, completed in 1937." },
  { keywords: ["tell me about mount rushmore", "what is mount rushmore"], reply: "Mount Rushmore features the carved faces of four US presidents in South Dakota." },
  { keywords: ["tell me about stonehenge", "what is stonehenge"], reply: "Stonehenge is a prehistoric monument of standing stones in England." },
  { keywords: ["tell me about leaning tower of pisa", "what is leaning tower of pisa"], reply: "The Leaning Tower of Pisa is a freestanding bell tower in Italy, known for its tilt." },
  { keywords: ["tell me about red fort", "what is red fort"], reply: "The Red Fort is a historic Mughal fort in Delhi, India, built in the 17th century." },
  { keywords: ["tell me about gateway of india", "what is gateway of india"], reply: "The Gateway of India is a monument in Mumbai built to commemorate King George V's visit in 1911." },
  { keywords: ["tell me about india gate", "what is india gate"], reply: "India Gate is a war memorial in New Delhi, dedicated to soldiers of the British Indian Army." },
  { keywords: ["tell me about hawa mahal", "what is hawa mahal"], reply: "Hawa Mahal, the 'Palace of Winds', is a palace in Jaipur known for its honeycomb facade." },
  { keywords: ["tell me about charminar", "what is charminar"], reply: "Charminar is a monument in Hyderabad, India, built in 1591." },
  { keywords: ["tell me about qutub minar", "what is qutub minar"], reply: "Qutub Minar is a UNESCO World Heritage minaret in Delhi, built in the early 13th century." },

  // ---- More vocabulary ----
  { keywords: ["what does adamant mean", "meaning of adamant"], reply: "'Adamant' means refusing to change one's mind; unyielding." },
  { keywords: ["what does altruistic mean", "meaning of altruistic"], reply: "'Altruistic' means showing selfless concern for others' wellbeing." },
  { keywords: ["what does arbitrary mean", "meaning of arbitrary"], reply: "'Arbitrary' means based on random choice rather than reason." },
  { keywords: ["what does belligerent mean", "meaning of belligerent"], reply: "'Belligerent' means hostile and aggressive." },
  { keywords: ["what does cacophony mean", "meaning of cacophony"], reply: "'Cacophony' means a harsh mixture of loud sounds." },
  { keywords: ["what does clandestine mean", "meaning of clandestine"], reply: "'Clandestine' means kept secret or done secretively." },
  { keywords: ["what does conundrum mean", "meaning of conundrum"], reply: "'Conundrum' means a confusing or difficult problem." },
  { keywords: ["what does cursory mean", "meaning of cursory"], reply: "'Cursory' means hasty and not thorough." },
  { keywords: ["what does deference mean", "meaning of deference"], reply: "'Deference' means humble submission and respect." },
  { keywords: ["what does dogmatic mean", "meaning of dogmatic"], reply: "'Dogmatic' means inclined to lay down principles as undeniably true." },
  { keywords: ["what does eccentric mean", "meaning of eccentric"], reply: "'Eccentric' means unconventional and slightly strange." },
  { keywords: ["what does egregious mean", "meaning of egregious"], reply: "'Egregious' means outstandingly bad; shocking." },
  { keywords: ["what does enigma mean", "meaning of enigma"], reply: "'Enigma' means a puzzling or mysterious person or thing." },
  { keywords: ["what does esoteric mean", "meaning of esoteric"], reply: "'Esoteric' means understood by only a small group with special knowledge." },
  { keywords: ["what does fastidious mean", "meaning of fastidious"], reply: "'Fastidious' means very attentive to accuracy and detail." },
  { keywords: ["what does fortuitous mean", "meaning of fortuitous"], reply: "'Fortuitous' means happening by chance, especially a lucky one." },
  { keywords: ["what does gratuitous mean", "meaning of gratuitous"], reply: "'Gratuitous' means uncalled for; unwarranted." },
  { keywords: ["what does hackneyed mean", "meaning of hackneyed"], reply: "'Hackneyed' means overused and lacking originality." },
  { keywords: ["what does iconoclast mean", "meaning of iconoclast"], reply: "'Iconoclast' means a person who attacks cherished beliefs or institutions." },
  { keywords: ["what does impetuous mean", "meaning of impetuous"], reply: "'Impetuous' means acting quickly without thought." },
  { keywords: ["what does insidious mean", "meaning of insidious"], reply: "'Insidious' means proceeding in a gradual, harmful way." },
  { keywords: ["what does juxtapose mean", "meaning of juxtapose"], reply: "'Juxtapose' means to place things side by side for contrasting effect." },
  { keywords: ["what does laconic mean", "meaning of laconic"], reply: "'Laconic' means using very few words." },
  { keywords: ["what does magnanimous mean", "meaning of magnanimous"], reply: "'Magnanimous' means generous or forgiving, especially toward a rival." },
  { keywords: ["what does nebulous mean", "meaning of nebulous"], reply: "'Nebulous' means vague or unclear." },
  { keywords: ["what does obfuscate mean", "meaning of obfuscate"], reply: "'Obfuscate' means to make something unclear or unintelligible." },
  { keywords: ["what does panacea mean", "meaning of panacea"], reply: "'Panacea' means a solution or remedy for all problems." },
  { keywords: ["what does parsimonious mean", "meaning of parsimonious"], reply: "'Parsimonious' means unwilling to spend money; stingy." },
  { keywords: ["what does pernicious mean", "meaning of pernicious"], reply: "'Pernicious' means having a harmful effect, often gradually." },
  { keywords: ["what does placate mean", "meaning of placate"], reply: "'Placate' means to make someone less angry." },
  { keywords: ["what does precocious mean", "meaning of precocious"], reply: "'Precocious' means showing advanced abilities at an unusually young age." },
  { keywords: ["what does pristine mean", "meaning of pristine"], reply: "'Pristine' means in its original, unspoiled condition." },
  { keywords: ["what does quandary mean", "meaning of quandary"], reply: "'Quandary' means a state of uncertainty over what to do." },
  { keywords: ["what does recalcitrant mean", "meaning of recalcitrant"], reply: "'Recalcitrant' means stubbornly resistant to authority." },
  { keywords: ["what does reticent mean", "meaning of reticent"], reply: "'Reticent' means reserved; not revealing thoughts easily." },
  { keywords: ["what does sagacious mean", "meaning of sagacious"], reply: "'Sagacious' means having good judgment; wise." },
  { keywords: ["what does stoic mean", "meaning of stoic"], reply: "'Stoic' means enduring hardship without complaint." },
  { keywords: ["what does superfluous mean", "meaning of superfluous"], reply: "'Superfluous' means unnecessary; more than needed." },
  { keywords: ["what does taciturn mean", "meaning of taciturn"], reply: "'Taciturn' means reserved or uncommunicative in speech." },
  { keywords: ["what does ubiquity mean", "meaning of ubiquity"], reply: "'Ubiquity' means the state of being everywhere at once." },
  { keywords: ["what does vindicate mean", "meaning of vindicate"], reply: "'Vindicate' means to clear someone of blame or suspicion." },
  { keywords: ["what does whimsical mean", "meaning of whimsical"], reply: "'Whimsical' means playfully quaint or fanciful." },
  { keywords: ["what does zenith mean", "meaning of zenith"], reply: "'Zenith' means the highest point reached." },
  // ---- More idioms ----
  { keywords: ["what does cut corners mean", "cut corners"], reply: "'Cut corners' means to do something in the easiest or cheapest way, often sacrificing quality." },
  { keywords: ["what does actions speak louder than words mean", "actions speak louder than words"], reply: "This means what people do matters more than what they say." },
  { keywords: ["what does back to the drawing board mean", "back to the drawing board"], reply: "'Back to the drawing board' means starting a plan over after it failed." },
  { keywords: ["what does best of both worlds mean", "best of both worlds"], reply: "'Best of both worlds' means enjoying the advantages of two different things at once." },
  { keywords: ["what does beat around the bush mean", "beat around the bush"], reply: "'Beat around the bush' means avoiding the main topic instead of speaking directly." },
  { keywords: ["what does call it a day mean", "call it a day"], reply: "'Call it a day' means to stop working on something for the time being." },
  { keywords: ["what does cry over spilt milk mean", "cry over spilt milk"], reply: "'Cry over spilt milk' means to worry uselessly about something already done." },
  { keywords: ["what does get out of hand mean", "get out of hand"], reply: "'Get out of hand' means a situation becomes difficult to control." },
  { keywords: ["what does hit the nail on the head mean", "hit the nail on the head"], reply: "'Hit the nail on the head' means to describe exactly what's causing a situation or problem." },
  { keywords: ["what does in the same boat mean", "in the same boat"], reply: "'In the same boat' means facing the same difficult situation as someone else." },
  { keywords: ["what does let the cat out of the bag mean", "let the cat out of the bag"], reply: "'Let the cat out of the bag' means to reveal a secret accidentally." },
  { keywords: ["what does miss the boat mean", "miss the boat"], reply: "'Miss the boat' means to miss an opportunity." },
  { keywords: ["what does on thin ice mean", "on thin ice"], reply: "'On thin ice' means in a risky or precarious situation." },
  { keywords: ["what does pull yourself together mean", "pull yourself together"], reply: "'Pull yourself together' means to calm down and behave normally after being upset." },
  { keywords: ["what does see eye to eye mean", "see eye to eye"], reply: "'See eye to eye' means to agree with someone." },
  { keywords: ["what does speak of the devil mean", "speak of the devil"], reply: "'Speak of the devil' is said when someone appears right after being mentioned." },
  { keywords: ["what does take it with a grain of salt mean", "take it with a grain of salt"], reply: "'Take it with a grain of salt' means not to take something too literally or seriously." },
  { keywords: ["what does the last straw mean", "the last straw"], reply: "'The last straw' refers to the final problem in a series that causes a reaction." },
  { keywords: ["what does throw in the towel mean", "throw in the towel"], reply: "'Throw in the towel' means to give up or admit defeat." },
  { keywords: ["what does time flies mean", "time flies"], reply: "'Time flies' means time seems to pass very quickly." },

  // ---- More abbreviations ----
  { keywords: ["what does gdp stand for"], reply: "GDP stands for 'Gross Domestic Product'." },
  { keywords: ["what does who stand for"], reply: "WHO stands for 'World Health Organization'." },
  { keywords: ["what does un stand for"], reply: "UN stands for 'United Nations'." },
  { keywords: ["what does unesco stand for"], reply: "UNESCO stands for 'United Nations Educational, Scientific and Cultural Organization'." },
  { keywords: ["what does nato stand for"], reply: "NATO stands for 'North Atlantic Treaty Organization'." },
  { keywords: ["what does wifi stand for"], reply: "Wi-Fi is often said to stand for 'Wireless Fidelity', though it's technically just a trademarked term." },
  { keywords: ["what does usb stand for"], reply: "USB stands for 'Universal Serial Bus'." },
  { keywords: ["what does pdf stand for"], reply: "PDF stands for 'Portable Document Format'." },
  { keywords: ["what does gif stand for"], reply: "GIF stands for 'Graphics Interchange Format'." },
  { keywords: ["what does jpg stand for"], reply: "JPG (or JPEG) stands for 'Joint Photographic Experts Group'." },
  { keywords: ["what does png stand for"], reply: "PNG stands for 'Portable Network Graphics'." },
  { keywords: ["what does ram stand for"], reply: "RAM stands for 'Random Access Memory'." },
  { keywords: ["what does rom stand for"], reply: "ROM stands for 'Read-Only Memory'." },
  { keywords: ["what does sim stand for"], reply: "SIM stands for 'Subscriber Identity Module'." },
  { keywords: ["what does otp stand for"], reply: "OTP stands for 'One-Time Password'." },
  { keywords: ["what does upi stand for"], reply: "UPI stands for 'Unified Payments Interface'." },
  { keywords: ["what does gst stand for"], reply: "GST stands for 'Goods and Services Tax'." },
  { keywords: ["what does pan card stand for"], reply: "PAN stands for 'Permanent Account Number'." },
  { keywords: ["what does aadhar stand for"], reply: "Aadhaar is a unique 12-digit identity number issued by the Indian government (not technically an acronym)." },
  { keywords: ["what does ipo stand for"], reply: "IPO stands for 'Initial Public Offering'." },

  // ---- Dynamic date helpers ----
  {
    keywords: ['what day is it', 'which day is today'],
    action: () => `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long' })}.`
  },
  {
    keywords: ['what month is it'],
    action: () => `It's ${new Date().toLocaleDateString(undefined, { month: 'long' })}.`
  },
  {
    keywords: ['what year is it'],
    action: () => `It's ${new Date().getFullYear()}.`
  },
  {
    keywords: ['is it weekend'],
    action: () => {
      const day = new Date().getDay();
      return (day === 0 || day === 6) ? "Yes, it's the weekend!" : "No, it's a weekday.";
    }
  },

  // ---- Famous painters ----
  { keywords: ["who is leonardo da vinci", "tell me about leonardo da vinci"], reply: "Leonardo da Vinci was an Italian Renaissance polymath, famous for the Mona Lisa and The Last Supper." },
  { keywords: ["who is pablo picasso", "tell me about pablo picasso"], reply: "Pablo Picasso was a Spanish painter, co-founder of the Cubist movement." },
  { keywords: ["who is vincent van gogh", "tell me about vincent van gogh"], reply: "Vincent van Gogh was a Dutch post-impressionist painter known for Starry Night." },
  { keywords: ["who is michelangelo", "tell me about michelangelo"], reply: "Michelangelo was an Italian Renaissance artist known for the Sistine Chapel ceiling and the sculpture David." },
  { keywords: ["who is salvador dali", "tell me about salvador dali"], reply: "Salvador Dali was a Spanish surrealist artist known for The Persistence of Memory." },
  { keywords: ["who is claude monet", "tell me about claude monet"], reply: "Claude Monet was a French painter, founder of Impressionist painting." },
  { keywords: ["who is raja ravi varma", "tell me about raja ravi varma"], reply: "Raja Ravi Varma was an Indian painter known for depicting Hindu deities and mythological scenes." },
  // ---- Country dialing codes ----
  { keywords: ["dialing code of india", "isd code of india", "country code of india"], reply: "The dialing code for India is +91." },
  { keywords: ["dialing code of usa", "isd code of usa", "country code of usa"], reply: "The dialing code for Usa is +1." },
  { keywords: ["dialing code of uk", "isd code of uk", "country code of uk"], reply: "The dialing code for Uk is +44." },
  { keywords: ["dialing code of china", "isd code of china", "country code of china"], reply: "The dialing code for China is +86." },
  { keywords: ["dialing code of japan", "isd code of japan", "country code of japan"], reply: "The dialing code for Japan is +81." },
  { keywords: ["dialing code of germany", "isd code of germany", "country code of germany"], reply: "The dialing code for Germany is +49." },
  { keywords: ["dialing code of france", "isd code of france", "country code of france"], reply: "The dialing code for France is +33." },
  { keywords: ["dialing code of italy", "isd code of italy", "country code of italy"], reply: "The dialing code for Italy is +39." },
  { keywords: ["dialing code of spain", "isd code of spain", "country code of spain"], reply: "The dialing code for Spain is +34." },
  { keywords: ["dialing code of russia", "isd code of russia", "country code of russia"], reply: "The dialing code for Russia is +7." },
  { keywords: ["dialing code of brazil", "isd code of brazil", "country code of brazil"], reply: "The dialing code for Brazil is +55." },
  { keywords: ["dialing code of canada", "isd code of canada", "country code of canada"], reply: "The dialing code for Canada is +1." },
  { keywords: ["dialing code of australia", "isd code of australia", "country code of australia"], reply: "The dialing code for Australia is +61." },
  { keywords: ["dialing code of south korea", "isd code of south korea", "country code of south korea"], reply: "The dialing code for South Korea is +82." },
  { keywords: ["dialing code of mexico", "isd code of mexico", "country code of mexico"], reply: "The dialing code for Mexico is +52." },
  { keywords: ["dialing code of pakistan", "isd code of pakistan", "country code of pakistan"], reply: "The dialing code for Pakistan is +92." },
  { keywords: ["dialing code of bangladesh", "isd code of bangladesh", "country code of bangladesh"], reply: "The dialing code for Bangladesh is +880." },
  { keywords: ["dialing code of nepal", "isd code of nepal", "country code of nepal"], reply: "The dialing code for Nepal is +977." },
  { keywords: ["dialing code of sri lanka", "isd code of sri lanka", "country code of sri lanka"], reply: "The dialing code for Sri Lanka is +94." },
  { keywords: ["dialing code of saudi arabia", "isd code of saudi arabia", "country code of saudi arabia"], reply: "The dialing code for Saudi Arabia is +966." },
  { keywords: ["dialing code of uae", "isd code of uae", "country code of uae"], reply: "The dialing code for Uae is +971." },
  { keywords: ["dialing code of singapore", "isd code of singapore", "country code of singapore"], reply: "The dialing code for Singapore is +65." },
  { keywords: ["dialing code of indonesia", "isd code of indonesia", "country code of indonesia"], reply: "The dialing code for Indonesia is +62." },
  { keywords: ["dialing code of thailand", "isd code of thailand", "country code of thailand"], reply: "The dialing code for Thailand is +66." },
  { keywords: ["dialing code of vietnam", "isd code of vietnam", "country code of vietnam"], reply: "The dialing code for Vietnam is +84." },
  { keywords: ["dialing code of philippines", "isd code of philippines", "country code of philippines"], reply: "The dialing code for Philippines is +63." },
  { keywords: ["dialing code of turkey", "isd code of turkey", "country code of turkey"], reply: "The dialing code for Turkey is +90." },
  { keywords: ["dialing code of egypt", "isd code of egypt", "country code of egypt"], reply: "The dialing code for Egypt is +20." },
  { keywords: ["dialing code of south africa", "isd code of south africa", "country code of south africa"], reply: "The dialing code for South Africa is +27." },
  { keywords: ["dialing code of nigeria", "isd code of nigeria", "country code of nigeria"], reply: "The dialing code for Nigeria is +234." },
  { keywords: ["dialing code of netherlands", "isd code of netherlands", "country code of netherlands"], reply: "The dialing code for Netherlands is +31." },

  // ---- Currency codes ----
  { keywords: ["currency code of india"], reply: "The currency code for India is INR." },
  { keywords: ["currency code of usa"], reply: "The currency code for Usa is USD." },
  { keywords: ["currency code of uk"], reply: "The currency code for Uk is GBP." },
  { keywords: ["currency code of japan"], reply: "The currency code for Japan is JPY." },
  { keywords: ["currency code of china"], reply: "The currency code for China is CNY." },
  { keywords: ["currency code of europe"], reply: "The currency code for Europe is EUR." },
  { keywords: ["currency code of russia"], reply: "The currency code for Russia is RUB." },
  { keywords: ["currency code of brazil"], reply: "The currency code for Brazil is BRL." },
  { keywords: ["currency code of canada"], reply: "The currency code for Canada is CAD." },
  { keywords: ["currency code of australia"], reply: "The currency code for Australia is AUD." },
  { keywords: ["currency code of south korea"], reply: "The currency code for South Korea is KRW." },
  { keywords: ["currency code of switzerland"], reply: "The currency code for Switzerland is CHF." },
  { keywords: ["currency code of saudi arabia"], reply: "The currency code for Saudi Arabia is SAR." },
  { keywords: ["currency code of uae"], reply: "The currency code for Uae is AED." },
  { keywords: ["currency code of singapore"], reply: "The currency code for Singapore is SGD." },
  { keywords: ["currency code of mexico"], reply: "The currency code for Mexico is MXN." },

  // ---- Web frameworks ----
  { keywords: ["what is react"], reply: "React is a JavaScript library by Meta for building user interfaces using reusable components." },
  { keywords: ["what is angular"], reply: "Angular is a TypeScript-based framework by Google for building web applications." },
  { keywords: ["what is vue"], reply: "Vue is a progressive JavaScript framework known for its simplicity and gentle learning curve." },
  { keywords: ["what is django"], reply: "Django is a high-level Python web framework that encourages rapid, clean development." },
  { keywords: ["what is flask"], reply: "Flask is a lightweight Python web framework, flexible and minimal by design." },
  { keywords: ["what is laravel"], reply: "Laravel is a PHP framework known for elegant syntax and developer-friendly tools." },
  { keywords: ["what is spring boot"], reply: "Spring Boot is a Java framework that simplifies building production-ready applications." },
  { keywords: ["what is express js"], reply: "Express.js is a minimal Node.js framework for building web servers and APIs." },
  { keywords: ["what is next js"], reply: "Next.js is a React framework that adds server-side rendering and static site generation." },
  { keywords: ["what is tailwind css"], reply: "Tailwind CSS is a utility-first CSS framework for building custom designs quickly." },

  // ---- DevOps terms ----
  { keywords: ["what is ci cd"], reply: "CI/CD stands for Continuous Integration and Continuous Deployment, automating build, test, and release." },
  { keywords: ["what is docker"], reply: "Docker packages applications into containers that run consistently across environments." },
  { keywords: ["what is kubernetes"], reply: "Kubernetes is a system for automating deployment, scaling, and management of containerized applications." },
  { keywords: ["what is microservices"], reply: "Microservices architecture breaks an application into small, independently deployable services." },
  { keywords: ["what is a container"], reply: "A container packages an application with its dependencies so it runs consistently anywhere." },
  { keywords: ["what is devops"], reply: "DevOps combines development and operations practices to deliver software faster and more reliably." },
  { keywords: ["what is a pipeline in devops"], reply: "A pipeline automates the steps of building, testing, and deploying code." },
  { keywords: ["what is load balancing"], reply: "Load balancing distributes network traffic across multiple servers to ensure reliability and performance." },

  // ---- Excel error meanings ----
  { keywords: ["div 0 error excel"], reply: "#DIV/0! means you're dividing by zero or an empty cell." },
  { keywords: ["na error excel"], reply: "#N/A means a formula (often VLOOKUP) can't find the value it's looking for." },
  { keywords: ["ref error excel"], reply: "#REF! means a formula refers to a cell that no longer exists, often after deleting rows or columns." },
  { keywords: ["value error excel"], reply: "#VALUE! means the formula has the wrong type of argument, like text where a number is expected." },
  { keywords: ["name error excel"], reply: "#NAME? means Excel doesn't recognize text in a formula, often a typo in a function name." },
  { keywords: ["null error excel"], reply: "#NULL! means you've specified an intersection of two ranges that don't actually intersect." },

  // ---- Color meanings ----
  { keywords: ["what does red symbolize", "meaning of color red"], reply: "Red often symbolizes passion, energy, danger, or urgency." },
  { keywords: ["what does blue symbolize", "meaning of color blue"], reply: "Blue often symbolizes calm, trust, stability, and professionalism." },
  { keywords: ["what does green symbolize", "meaning of color green"], reply: "Green often symbolizes growth, nature, health, and freshness." },
  { keywords: ["what does yellow symbolize", "meaning of color yellow"], reply: "Yellow often symbolizes happiness, optimism, and warmth." },
  { keywords: ["what does purple symbolize", "meaning of color purple"], reply: "Purple often symbolizes luxury, creativity, and royalty." },
  { keywords: ["what does black symbolize", "meaning of color black"], reply: "Black often symbolizes elegance, power, and formality." },
  { keywords: ["what does white symbolize", "meaning of color white"], reply: "White often symbolizes purity, simplicity, and cleanliness." },
  { keywords: ["what does orange symbolize", "meaning of color orange"], reply: "Orange often symbolizes enthusiasm, creativity, and adventure." },
  // ---- More riddles ----
  { keywords: ["another riddle", "riddle time", "give me a puzzle"], reply: "What has many teeth but can't bite? A comb." },
  { keywords: ["another riddle", "riddle time", "give me a puzzle"], reply: "What runs but never walks, has a mouth but never talks? A river." },
  { keywords: ["another riddle", "riddle time", "give me a puzzle"], reply: "What has a neck but no head? A bottle." },
  { keywords: ["another riddle", "riddle time", "give me a puzzle"], reply: "What can you catch but not throw? A cold." },
  { keywords: ["another riddle", "riddle time", "give me a puzzle"], reply: "What has hands but can't clap? A clock." },
  { keywords: ["another riddle", "riddle time", "give me a puzzle"], reply: "I am not alive, but I grow. I don't have lungs, but I need air. What am I? Fire." },
  { keywords: ["another riddle", "riddle time", "give me a puzzle"], reply: "What goes up but never comes down? Your age." },
  { keywords: ["another riddle", "riddle time", "give me a puzzle"], reply: "What has a bed but never sleeps? A river." },
  { keywords: ["another riddle", "riddle time", "give me a puzzle"], reply: "What can you break without touching it? A promise." },
  { keywords: ["another riddle", "riddle time", "give me a puzzle"], reply: "The more you remove from me, the bigger I get. What am I? A hole." },

  // ---- More study tips ----
  { keywords: ["how to avoid exam stress"], reply: "Prepare early, practice past papers, sleep well, and use deep breathing before the exam." },
  { keywords: ["how to revise quickly"], reply: "Focus on summaries, use flashcards, and prioritize high-weightage topics first." },
  { keywords: ["how to write a good essay"], reply: "Start with a clear thesis, use structured paragraphs, and end with a strong conclusion." },
  { keywords: ["how to improve handwriting"], reply: "Practice daily, use lined paper, and slow down to focus on letter shapes." },
  { keywords: ["how to stay motivated to study"], reply: "Set small goals, reward progress, and remind yourself of your bigger 'why'." },
  { keywords: ["how to manage study and sleep"], reply: "Plan study blocks, avoid last-minute cramming, and protect at least 7 hours of sleep." },
  { keywords: ["how to remember formulas"], reply: "Practice applying them in problems repeatedly rather than just memorizing them in isolation." },
  { keywords: ["how to read faster"], reply: "Practice skimming for structure first, reduce subvocalization, and expand your peripheral vision while reading." },

  // ---- More health & wellness ----
  { keywords: ["benefits of meditation"], reply: "Meditation can reduce stress, improve focus, and support emotional wellbeing." },
  { keywords: ["benefits of yoga"], reply: "Yoga improves flexibility, strength, and can help reduce stress and anxiety." },
  { keywords: ["how to reduce anxiety"], reply: "Try deep breathing, grounding techniques, regular exercise, and talking to someone you trust." },
  { keywords: ["how to build a workout routine"], reply: "Start with 3 days a week, mix strength and cardio, and gradually increase intensity." },
  { keywords: ["benefits of drinking water"], reply: "Water aids digestion, regulates temperature, and keeps skin and organs functioning well." },
  { keywords: ["how to eat healthy on a budget"], reply: "Buy seasonal produce, cook in bulk, and choose whole foods over processed ones." },
  { keywords: ["signs of dehydration"], reply: "Common signs include thirst, dark urine, fatigue, and dizziness \u2014 drink water regularly." },
  { keywords: ["how to improve mental health"], reply: "Stay connected with others, exercise regularly, get enough sleep, and consider talking to a professional if needed." },

  // ---- Constellations ----
  { keywords: ["tell me about orion", "what is orion"], reply: "Orion is one of the most recognizable constellations, known for the three stars forming Orion's Belt." },
  { keywords: ["tell me about ursa major", "what is ursa major"], reply: "Ursa Major, the Great Bear, contains the well-known asterism called the Big Dipper." },
  { keywords: ["tell me about ursa minor", "what is ursa minor"], reply: "Ursa Minor, the Little Bear, contains Polaris, the North Star." },
  { keywords: ["tell me about cassiopeia", "what is cassiopeia"], reply: "Cassiopeia is a constellation shaped like a 'W', named after a vain queen in Greek mythology." },
  { keywords: ["tell me about leo constellation", "what is leo constellation"], reply: "Leo is a constellation resembling a lion, one of the zodiac constellations." },
  { keywords: ["tell me about scorpius", "what is scorpius"], reply: "Scorpius is a constellation resembling a scorpion, prominent in the southern sky." },

  // ---- More about LUMO ----
  { keywords: ["why are you called lumo"], reply: "LUMO stands for Language Understanding & Multimodal Operations." },
  { keywords: ["what version are you"], reply: "I'm a growing project, continuously updated by my creator." },
  { keywords: ["can i customize you"], reply: "Yes \u2014 since I'm open code, my creator can add new commands and features anytime." },
  { keywords: ["do you work offline"], reply: "Most of my commands work offline since they run in your browser, except ones like opening websites." },
  { keywords: ["what happens if you dont understand me"], reply: "If I don't recognize a command, I'll search Google for it and let you know." },
  { keywords: ["can you open multiple apps"], reply: "Right now I handle one command at a time, but you can ask me again for another app." },
  { keywords: ["do you support other browsers"], reply: "I work best in Chrome or Chromium-based browsers because of the Speech Recognition API." },

  // ---- PC / desktop app openers ----
  // These use custom URL protocols that installed desktop apps register with
  // Windows/macOS. The browser will usually ask "Open [App Name]?" the first
  // time — click Allow (and "always allow" if offered) so future commands
  // don't need confirmation. If an app isn't installed, or doesn't register
  // its protocol, nothing will happen and it falls back to opening its
  // website instead.
  { keywords: ['open vs code', 'open vscode', 'open visual studio code'],
    action: () => { window.location.href = 'vscode://'; return "Opening VS Code..."; } },
  { keywords: ['open excel', 'open ms excel', 'open microsoft excel'],
    action: () => { window.location.href = 'ms-excel:'; return "Opening Excel..."; } },
  { keywords: ['open powerpoint', 'open ms powerpoint', 'open microsoft powerpoint'],
    action: () => { window.location.href = 'ms-powerpoint:'; return "Opening PowerPoint..."; } },
  { keywords: ['open word', 'open ms word', 'open microsoft word'],
    action: () => { window.location.href = 'ms-word:'; return "Opening Word..."; } },
  { keywords: ['open outlook desktop', 'open ms outlook'],
    action: () => { window.location.href = 'ms-outlook:'; return "Opening Outlook..."; } },
  { keywords: ['open onenote'],
    action: () => { window.location.href = 'onenote:'; return "Opening OneNote..."; } },
  { keywords: ['open zoom app', 'open zoom desktop'],
    action: () => { window.location.href = 'zoommtg://'; return "Opening Zoom..."; } },
  { keywords: ['open spotify app', 'open spotify desktop'],
    action: () => { window.location.href = 'spotify:'; return "Opening Spotify..."; } },
  { keywords: ['open slack app', 'open slack desktop'],
    action: () => { window.location.href = 'slack://open'; return "Opening Slack..."; } },
  { keywords: ['open notion app', 'open notion desktop'],
    action: () => { window.location.href = 'notion://'; return "Opening Notion..."; } },
  { keywords: ['open skype'],
    action: () => { window.location.href = 'skype:'; return "Opening Skype..."; } },
  { keywords: ['open steam'],
    action: () => { window.location.href = 'steam://open/main'; return "Opening Steam..."; } },
  { keywords: ['open discord app', 'open discord desktop'],
    action: () => { window.location.href = 'discord://'; return "Opening Discord..."; } },
  { keywords: ['open whatsapp desktop', 'open whatsapp app'],
    action: () => { window.location.href = 'whatsapp://'; return "Opening WhatsApp..."; } },
  { keywords: ['open telegram app', 'open telegram desktop'],
    action: () => { window.location.href = 'tg://'; return "Opening Telegram..."; } },
  { keywords: ['can you open pc apps', 'can you open desktop apps'],
    reply: "I can try — apps like VS Code, Excel, Word, PowerPoint, Zoom, and Spotify register special links I can trigger. Your browser may ask permission the first time." },
];

// ================= MATCH ENGINE =================
// Returns the reply text instead of speaking directly, so we can also log it to history.
function getReplyFor(message) {
  const match = commandDB.find(cmd =>
    cmd.keywords.some(k => message.includes(k))
  );

  if (match) {
    return match.action ? match.action(message) : match.reply;
  }
  window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
  return "I found some information for " + message + " on Google";
}

function takeCommand(message) {
  const reply = getReplyFor(message);
  speak(reply);
  logToHistory(message, reply);
}

// ================= SIDEBAR HISTORY =================
// Uses window.LUMO.addHistory() if your index.html already defines it (sidebar UI).
// Otherwise falls back to saving straight into localStorage so nothing is lost.
function logToHistory(question, answer) {
  if (window.LUMO && typeof window.LUMO.addHistory === 'function') {
    window.LUMO.addHistory(question, answer);
    return;
  }
  try {
    const KEY = 'lumo_history';
    const history = JSON.parse(localStorage.getItem(KEY)) || [];
    history.push({
      question,
      answer,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    while (history.length > 50) history.shift();
    localStorage.setItem(KEY, JSON.stringify(history));
  } catch (e) {
    console.warn('LUMO: could not save history', e);
  }
}

// ================= SPEECH RECOGNITION =================
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognitionAPI();

recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en-IN';

// Matches "lumo" (and common mis-hearings) ANYWHERE in the sentence —
// start, middle, or end. e.g. "what's the time lumo" still works.
const WAKE_WORD = /\b(lumo|luno|l u m o|you know|logo|mr ai ?mo|l ?u ?m ?o)\b/i;

let recognitionActive = false;

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;
  const text = transcript.toLowerCase().trim();

  console.log("Heard:", text);

  // ---- Shortcut: "open <app/website>" works WITHOUT the wake word ----
  // Only matches keywords that actually start with "open", so it won't
  // accidentally fire on unrelated sentences that happen to contain "open".
  const openMatch = commandDB.find(cmd =>
    cmd.keywords.some(k => k.startsWith('open') && text.includes(k))
  );
  if (openMatch) {
    content.textContent = text;
    takeCommand(text);
    return;
  }

  if (!WAKE_WORD.test(text)) {
    // No wake word anywhere in this sentence — ignore it, stay in always-on mode.
    return;
  }

  // Strip the wake word out, whatever's left is the actual question/command.
  const query = text.replace(WAKE_WORD, '').trim();

  content.textContent = text;

  if (!query) {
    speak("Yes Sir, I'm listening.");
    return;
  }

  takeCommand(query);
};

recognition.onstart = () => {
  recognitionActive = true;
  btn.classList.add("listening");
  content.textContent = "Say 'LUMO' anywhere in your sentence...";
};
     
recognition.onend = () => {
  recognitionActive = false;
  btn.classList.remove('listening');
  // Always-on mode: browsers stop recognition after a pause — restart it
  // automatically so LUMO stays awake without needing another click.
  setTimeout(() => {
    if (!recognitionActive) {
      try { recognition.start(); } catch (e) {}
    }
  }, 300);
};

recognition.onerror = (e) => {
  console.warn('LUMO recognition error:', e.error);
};

btn.addEventListener('click', () => {
  if (recognitionActive) return; // already running — avoid the double-start crash
  try { recognition.start(); } catch (e) {}
});

window.addEventListener('load', () => {
  speak("Initializing Loo-moh...");
  wishMe();
  try { recognition.start(); } catch (e) {}
});
