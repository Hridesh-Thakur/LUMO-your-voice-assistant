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
  if (hour < 12) speak("Good Morning Boss...");
  else if (hour < 17) speak("Good Afternoon Master...");
  else speak("Good Evening Sir...");
  speak("How may I help you?");
}
 
window.addEventListener('load', () => {
    speak("Initializing Loo-moh...");
    // speak("Hello! I am Lumo. How can I help you?");   
    wishMe();

    recognition.start(); 
});


// opening apps
const commandDB = [
  { keywords: ['hey', 'hello'], reply: "Hello Sir, How May I Help You?" },
  { keywords: ['open google'], action: () => { window.open("https://google.com", "_blank"); return "Opening Google..."; } },
  { keywords: ['open instagram'], action: () => { window.open("https://www.instagram.com/", "_blank"); return "Opening Instagram..."; } },
  { keywords: ['open youtube'], action: () => { window.open("https://youtube.com", "_blank"); return "Opening Youtube..."; } },
  { keywords: ['open facebook'], action: () => { window.open("https://facebook.com", "_blank"); return "Opening Facebook..."; } },
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
  { keywords: ['how to use powerpoint', 'learn ppt', 'powerpoint basics'], reply: "PowerPoint lets you add slides, text/images, and transitions for presentations." },
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
];

// ================= MATCH ENGINE =================
function takeCommand(message) {
  const match = commandDB.find(cmd =>
    cmd.keywords.some(k => message.includes(k))
  );

  if (match) {
    const reply = match.action ? match.action(message) : match.reply;
    speak(reply);
  } else {
    window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
    speak("I found some information for " + message + " on Google");
  }
}

// ================= SPEECH RECOGNITION =================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;

let wakeWordDetected = false;

recognition.onresult = (event) => {

recognition.onresult = (event) => {

    const transcript = event.results[event.results.length - 1][0].transcript;
    const text = transcript.toLowerCase().trim();

    console.log("Heard:", text);

    // ================= Wake Word =================
    if (!wakeWordDetected) {

        if (
            text.includes("lumo") ||
            text.includes("lu mo") ||
            text.includes("lumo.") ||
            text.includes("L U M O") ||
            text.includes("l umo") ||
            text.includes("lumo!") ||
            text.includes("l u m o") ||
            text.includes("lumo lumo") ||
            text.startsWith("lumo")
        ) {

            wakeWordDetected = true;

            content.textContent = "Listening...";
            speak("Yes Sir, I'm listening.");

            return;
        }

        return;
    }

    // ================= Command =================
    content.textContent = text;

    takeCommand(text);

    wakeWordDetected = false;

};

    // Command Mode
    content.textContent = transcript;
    takeCommand(transcript);

    wakeWordDetected = false;
};

btn.addEventListener('click', () => {
    recognition.start();
    btn.classList.add("listening");
    content.textContent = "Say 'LUMO'";
});

recognition.onend = () => btn.classList.remove('listening');