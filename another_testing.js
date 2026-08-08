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
  { keywords: ['what is your name'], reply: "I'm loo-moh, your voice assistant." },
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
  { keywords: ["git clone"], reply: "git clone url copies a remote repository to your local machine." },
  { keywords: ["git commit"], reply: "git commit -m message saves your staged changes with a message." },
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
  { keywords: ["what is the driest place on earth"], reply: "The Atacama Desert in Chile is considered the driest place on Earth." },];

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
const WAKE_WORD = /\b(lumo|luno|you know|know|lu ?mo|l ?u ?m ?o)\b/i;

let recognitionActive = false;

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;
  const text = transcript.toLowerCase().trim();

  console.log("Heard:", text);

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