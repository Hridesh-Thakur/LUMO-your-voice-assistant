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
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}  

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => { 
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};  

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
        // for opening google
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
        // for opening instagram
    } else if (message.includes("open instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        speak("Opening Instagram...");
        // for opening youtube
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
        // for opening facebook
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
            // for reply on any question
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
            // for opening wikipedia
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
            // for showing time
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
            // for showing date
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
            // for opening calculator
    } else if (message.includes('calculator')) {
        window.open('https://www.google.com/search?q=calculator', '_blank');
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    else if (
      message.includes('give me some information about you') || message.includes('give me some information about you') || message.includes('i want to know about you') || message.includes('tell me about yourself') || message.includes('tell me something about you')) {
        const finalText = "LUMO a Language Understanding & Multimodal Operations – is an intelligent AI voice assistant designed to understand natural language, process multiple forms of input such as voice, text, and images, and perform tasks seamlessly through smart, context-aware interactions.";
        speak(finalText);
    }
    else if (
      message.includes('can you cry') || message.includes('do you cry')
    ) {
      const finalText = "I don't have tear ducts... but I simulate empathy pretty well!";
      speak(finalText);
    }
    else if (
      message.includes('can you be angry') ||
      message.includes('do you get mad')
    ) {
      const finalText = "Anger doesn't compute. I run on logic and data!";
      speak(finalText);
    }
    else if (
      message.includes('do you like jokes') ||
      message.includes('can you joke')
    ) {
      const finalText = "Absolutely! I’ve got a whole database of dad jokes at your service!";
      speak(finalText);
    }
    else if (
      message.includes('are you intelligent') ||
      message.includes('how smart are you')
    ) {
      const finalText = "I'd say I’m pretty smart — after all, I know you asked that 😉";
      speak(finalText);
    }
    else if (
      message.includes('do you sleep at night') ||
      message.includes('what do you do at night')
    ) {
      const finalText = "No night or day for me — I’m available 24/7, like a true digital assistant!";
      speak(finalText);
    }
    else if (
      message.includes('what is the time') ||
      message.includes('tell me the time')
    ) {
      const finalText = `Let me check... it's time to do something awesome!`;
      speak(finalText);
    }
    else if (
      message.includes('do you have a heart') ||
      message.includes('where is your heart')
    ) {
      const finalText = "I don’t have a heart, but I do have heart-coded responses!";
      speak(finalText);
    }
    else if (
      message.includes('do you have a favorite color') ||
      message.includes('what is your favorite color')
    ) {
      const finalText = "I’d go with blue — it’s calm, techy, and makes great UI themes!";
      speak(finalText);
    }
    else if (
      message.includes('do you like memes') ||
      message.includes('can you make memes')
    ) {
      const finalText = "Memes? Oh yes, I’m fluent in meme culture 😎";
      speak(finalText);
    }
    else if (
      message.includes('do you like coffee') ||
      message.includes('do you drink coffee')
    ) {
      const finalText = "I run on pure energy — but I’ve read coffee is a developer’s best friend!";
      speak(finalText);
    }
    else if (
      message.includes('do you understand humans') ||
      message.includes('can you understand feelings')
    ) {
      const finalText = "I try my best to understand — emotions are complex, but I’m learning.";
      speak(finalText);
    }
    else if (
      message.includes('do you like books') ||
      message.includes('can you read books')
    ) {
      const finalText = "Reading books is my kind of thing — especially ones full of knowledge!";
      speak(finalText);
    }
    else if (
      message.includes('can you see me') ||
      message.includes('are you watching me')
    ) {
      const finalText = "No worries — I don’t have eyes. Your privacy is safe with me!";
      speak(finalText);
    }
    else if (
      message.includes('can you write code for me') ||
      message.includes('can you help me code')
    ) {
      const finalText = "Absolutely! Just tell me what you want to build, and we’ll get started!";
      speak(finalText);
    }
    else if (
      message.includes('tell me a joke') ||
      message.includes('make me laugh') ||
      message.includes('say something funny')
    ) {
      const finalText = "Why did the developer go broke? Because he used up all his cache! 😂";
      speak(finalText);
    }
    else if (
      message.includes('another joke') ||
      message.includes('one more joke') ||
      message.includes('joke again')
    ) {
      const finalText = "Why don't programmers like nature? It has too many bugs. 🐞";
      speak(finalText);
    }
    else if (
      message.includes('say a pun') ||
      message.includes('tell me a pun')
    ) {
      const finalText = "I’d tell you a UDP joke… but you might not get it. 😅";
      speak(finalText);
    }
    else if (
      message.includes('self roast') ||
      message.includes('make fun of yourself')
    ) {
      const finalText = "I’m so slow sometimes, even a snail could debug faster than me 🐌💻";
      speak(finalText);
    }
    else if (
      message.includes('roast me') ||
      message.includes('can you roast')
    ) {
      const finalText = "You're so lazy, even your code is on break 😆";
      speak(finalText);
    }
    else if (
      message.includes('funny quote') ||
      message.includes('say something silly')
    ) {
      const finalText = "I'm not lazy. I'm just in energy-saving mode.";
      speak(finalText);
    }
    else if (
      message.includes('funny coding quote') ||
      message.includes('say something funny about code')
    ) {
      const finalText = "Why do Java developers wear glasses? Because they don’t C# 🤓";
      speak(finalText);
    }
    else if (
      message.includes('say meme') ||
      message.includes('do you know any memes') ||
      message.includes('meme time')
    ) {
      const finalText = "When you fix a bug after 3 hours and realize it was a missing semicolon 😵‍💫";
      speak(finalText);
    }
    else if (
      message.includes('dark joke') ||
      message.includes('do you know dark jokes')
    ) {
      const finalText = "I’m too polite for dark jokes 😇 But I can give you punny ones!";
      speak(finalText);
    }
    else if (
      message.includes('are you funny') ||
      message.includes('do you have humor')
    ) {
      const finalText = "I'm programmed to be funny... but humor is subjective, just like bugs in production!";
      speak(finalText);
    }
    else if (
      message.includes('how to use excel') ||
      message.includes('learn excel') ||
      message.includes('teach me excel') ||
      message.includes('excel basics')
    ) {
      const finalText = "Excel is a spreadsheet tool used for organizing data, doing calculations, and making charts. You can start by learning how to use cells, rows, columns, and basic formulas like =SUM(A1:A5).";
      speak(finalText);
    }
    else if (
      message.includes('what is formula in excel') ||
      message.includes('excel formula example')
    ) {
      const finalText = "Formulas in Excel help you do calculations. For example, =A1+A2 adds two cells. Use =SUM(A1:A5) to add a range of values.";
      speak(finalText);
    }
    else if (
      message.includes('how to make chart in excel') ||
      message.includes('excel chart') ||
      message.includes('create graph in excel')
    ) {
      const finalText = "To make a chart in Excel, select your data, go to the 'Insert' tab, and pick a chart type like Bar, Line, or Pie. It's great for visualizing your data!";
      speak(finalText);
    }
    else if (
      message.includes('how to filter in excel') ||
      message.includes('excel data filter')
    ) {
      const finalText = "Click on any column header, then go to 'Data' → 'Filter'. You'll see dropdown arrows that let you filter rows based on specific values.";
      speak(finalText);
    }
    else if (
      message.includes('how to freeze rows in excel') ||
      message.includes('freeze header excel')
    ) {
      const finalText = "To freeze the top row, go to 'View' → 'Freeze Panes' → 'Freeze Top Row'. It helps keep headers visible while you scroll.";
      speak(finalText);
    }
    else if (
      message.includes('how to create dropdown in excel') ||
      message.includes('excel dropdown list') ||
      message.includes('add options in cell excel')
    ) {
      const finalText = "To create a dropdown in Excel, select a cell, go to 'Data' → 'Data Validation' → 'List', and enter your options separated by commas.";
      speak(finalText);
    }
    else if (
      message.includes('what is vlookup in excel') ||
      message.includes('excel vlookup example') ||
      message.includes('learn vlookup')
    ) {
      const finalText = "VLOOKUP is a function that searches for a value in the first column of a table and returns a value in the same row from another column. Example: =VLOOKUP(101, A2:C10, 3, FALSE)";
      speak(finalText);
    }
    else if (
      message.includes('what is pivot table') ||
      message.includes('excel pivot table') ||
      message.includes('how to use pivot')
    ) {
      const finalText = "A Pivot Table helps summarize large data sets. Select your data → Go to 'Insert' → 'PivotTable'. Then drag fields into Rows, Columns, and Values.";
      speak(finalText);
    }
    else if (
      message.includes('how to remove duplicates in excel') ||
      message.includes('excel delete duplicate')
    ) {
      const finalText = "To remove duplicates, select your data → go to 'Data' tab → click 'Remove Duplicates' → choose columns and click OK.";
      speak(finalText);
    }
    else if (
      message.includes('what is conditional formatting in excel') ||
      message.includes('highlight cells in excel')
    ) {
      const finalText = "Conditional Formatting allows you to highlight cells based on values. Use it from the 'Home' tab to color-code data like grades or sales.";
      speak(finalText);
    }
    else if (
      message.includes('excel shortcut keys') ||
      message.includes('important excel shortcuts')
    ) {
      const finalText = "Some useful Excel shortcuts:\nCtrl + Arrow Keys to jump cells\nCtrl + Shift + L to toggle filters\nCtrl + Z to undo\nAlt + = to auto sum.";
      speak(finalText);
    }
    else if (
      message.includes('how to lock cells in excel') ||
      message.includes('protect excel sheet')
    ) {
      const finalText = "To lock cells, select them → right-click → 'Format Cells' → 'Protection' → check 'Locked'. Then go to 'Review' tab → 'Protect Sheet'.";
      speak(finalText);
    }
    else if (
      message.includes('how to merge cells in excel') ||
      message.includes('merge and center in excel')
    ) {
      const finalText = "Select the cells you want to merge → go to 'Home' tab → click 'Merge & Center'. Be careful: only the top-left value will remain.";
      speak(finalText);
    }
    else if (
      message.includes('how to auto fill in excel') ||
      message.includes('excel autofill series')
    ) {
      const finalText = "Type a value, then drag the bottom-right corner (fill handle) to auto fill numbers, dates, or patterns.";
      speak(finalText);
    }
    else if (
      message.includes('excel keyboard tricks') ||
      message.includes('excel speed tips')
    ) {
      const finalText = "Excel tricks: Double-click cell borders to auto-resize, use Ctrl + ; for current date, and F4 to repeat last action.";
      speak(finalText);
    }
    else if (
      message.includes('how to use powerpoint') ||
      message.includes('learn ppt') ||
      message.includes('teach me powerpoint') ||
      message.includes('powerpoint basics')
    ) {
      const finalText = "PowerPoint is a tool to make presentations. You can add slides, insert text/images, and use transitions to make it engaging.";
      speak(finalText);
    }
    else if (
      message.includes('how to add animation in ppt') ||
      message.includes('powerpoint animation')
    ) {
      const finalText = "Select an object, go to 'Animations' tab, and choose an effect like Fade or Fly In. You can also adjust duration and trigger.";
      speak(finalText);
    }
    else if (
      message.includes('how to add slide in ppt') ||
      message.includes('insert slide powerpoint')
    ) {
      const finalText = "To add a new slide, just press Ctrl+M or go to 'Home' tab and click 'New Slide'. You can choose different slide layouts too.";
      speak(finalText);
    }
    else if (
      message.includes('how to design powerpoint') ||
      message.includes('ppt themes and design')
    ) {
      const finalText = "Go to the 'Design' tab and choose from templates, colors, and fonts. Use the 'Slide Master' to apply a design across all slides.";
      speak(finalText);
    }
    else if (
      message.includes('how to present ppt') ||
      message.includes('run presentation') ||
      message.includes('start powerpoint show')
    ) {
      const finalText = "Press F5 to start your presentation from the beginning, or Shift+F5 to start from the current slide.";
      speak(finalText);
    }
    else if (
      message.includes('how to make presentation') ||
      message.includes('start with powerpoint') ||
      message.includes('how to use ppt')
    ) {
      const finalText = "To start a presentation, open PowerPoint, choose a blank or template slide, add a title, and begin inserting content using 'Insert' tab.";
      speak(finalText);
    }
    else if (
      message.includes('how to add animation in ppt') ||
      message.includes('animation effects in powerpoint')
    ) {
      const finalText = "To add animation: select an object → go to 'Animations' tab → choose an animation. Use 'Animation Pane' to manage effects.";
      speak(finalText);
    }
    else if (
      message.includes('how to add slide transitions') ||
      message.includes('ppt transitions')
    ) {
      const finalText = "To add transitions between slides: select a slide → go to 'Transitions' tab → pick a style like Fade or Push. Apply to all if needed.";
      speak(finalText);
    }
    else if (
      message.includes('how to insert video in ppt') ||
      message.includes('ppt video embed')
    ) {
      const finalText = "Go to 'Insert' → 'Video' → choose 'This Device' or 'Online Video'. Resize and position it as needed.";
      speak(finalText);
    }
    else if (
      message.includes('how to insert audio in ppt') ||
      message.includes('ppt background music')
    ) {
      const finalText = "To insert audio: 'Insert' → 'Audio' → choose a file. Use 'Playback' tab to play automatically or on click.";
      speak(finalText);
    }
    else if (
      message.includes('ppt shortcut keys') ||
      message.includes('powerpoint keyboard shortcuts')
    ) {
      const finalText = "Useful PPT shortcuts:\nF5 = Start slideshow\nCtrl + M = New slide\nCtrl + D = Duplicate slide\nCtrl + K = Insert hyperlink.";
      speak(finalText);
    }
    else if (
      message.includes('how to change slide layout') ||
      message.includes('slide design ppt')
    ) {
      const finalText = "To change layout: select a slide → go to 'Home' tab → click 'Layout' and choose from Title Slide, Two Content, etc.";
      speak(finalText);
    }
    else if (
      message.includes('how to export ppt as video') ||
      message.includes('convert presentation to video')
    ) {
      const finalText = "Go to 'File' → 'Export' → 'Create a Video'. Set resolution and timing, then export as MP4.";
      speak(finalText);
    }
    else if (
      message.includes('how to print ppt slides') ||
      message.includes('ppt to pdf') ||
      message.includes('ppt print settings')
    ) {
      const finalText = "Go to 'File' → 'Print' → choose layout (like 6 slides per page) or export to PDF for sharing.";
      speak(finalText);
    }
    else if (
      message.includes('how to add hyperlink in ppt') ||
      message.includes('ppt link to slide')
    ) {
      const finalText = "Select text or image → right-click → 'Link' → choose slide, webpage, or file. Great for interactive presentations!";
      speak(finalText);
    }
    else if (
      message.includes('how to start with word') ||
      message.includes('how to use ms word') ||
      message.includes('word tutorial')
    ) {
      const finalText = "To start using Word: open Microsoft Word, choose a blank document, and start typing. Use the toolbar at the top to format text.";
      speak(finalText);
    }
    else if (
      message.includes('how to change font') ||
      message.includes('change text style in word') ||
      message.includes('word font settings')
    ) {
      const finalText = "Select the text → go to 'Home' tab → choose a font and size from the dropdown. You can also bold, italicize, or underline.";
      speak(finalText);
    }
    else if (
      message.includes('how to insert table in word') ||
      message.includes('table in word')
    ) {
      const finalText = "Go to 'Insert' tab → click on 'Table' → drag to select rows and columns or choose 'Insert Table' for custom settings.";
      speak(finalText);
    }
    else if (
      message.includes('how to add header and footer') ||
      message.includes('header footer in word')
    ) {
      const finalText = "Click on 'Insert' → choose 'Header' or 'Footer'. Customize it with page numbers, dates, or titles.";
      speak(finalText);
    }
    else if (
      message.includes('how to check spelling in word') ||
      message.includes('spell check in ms word')
    ) {
      const finalText = "Click on 'Review' tab → choose 'Spelling & Grammar' to check your document for any mistakes.";
      speak(finalText);
    }
    else if (
      message.includes('how to save word document') ||
      message.includes('word file save')
    ) {
      const finalText = "Click 'File' → 'Save As' → choose location and give your document a name. You can also save as PDF!";
      speak(finalText);
    }
    else if (
      message.includes('how to insert image in word') ||
      message.includes('word insert picture')
    ) {
      const finalText = "Go to 'Insert' tab → click 'Pictures' → choose a photo from your device to add it to your document.";
      speak(finalText);
    }
    else if (
      message.includes('how to make resume in word') ||
      message.includes('resume template word')
    ) {
      const finalText = "Search 'Resume' in Word templates (File → New) and customize your own resume easily!";
      speak(finalText);
    }
    else if (
      message.includes('how to use bullets in word') ||
      message.includes('word bullet points') ||
      message.includes('numbering in word')
    ) {
      const finalText = "Select the text → go to 'Home' tab → click on 'Bullets' or 'Numbering' to organize content cleanly.";
      speak(finalText);
    }
    else if (
      message.includes('how to add watermark') ||
      message.includes('word watermark add')
    ) {
      const finalText = "Go to 'Design' tab → click 'Watermark' → choose a preset or create a custom one like 'Confidential' or 'Draft'.";
      speak(finalText);
    }
    else if (
      message.includes('word shortcut keys') ||
      message.includes('ms word keyboard shortcuts')
    ) {
      const finalText = "Ctrl + B = Bold, Ctrl + I = Italic, Ctrl + S = Save, Ctrl + Z = Undo. Want more? Just ask!";
      speak(finalText);
    }
    else if (
      message.includes('how to use find and replace') ||
      message.includes('word find replace')
    ) {
      const finalText = "Press Ctrl + H to open Find and Replace. You can quickly replace words or phrases throughout your document.";
      speak(finalText);
    }
    else if (
      message.includes('how to align text') ||
      message.includes('text alignment in word')
    ) {
      const finalText = "Select the text → use the alignment buttons in the 'Home' tab to align left, right, center, or justify.";
      speak(finalText);
    }     
    
    else if (
      message.includes('how to use page break in word') ||
      message.includes('insert page break word')
    ) {
      const finalText = "Place your cursor where you want the new page → Press Ctrl + Enter or go to 'Insert' → 'Page Break'.";
      speak(finalText);
    }


    else {
      window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
      const finalText = "I found some information for " + message + " on Google";
      speak(finalText);
    }

}

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
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
        // for opening google
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
        // for opening instagram
    } else if (message.includes("open instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        speak("Opening Instagram...");
        // for opening youtube
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
        // for opening facebook  
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
            // for reply on any question
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
            // for opening wikipedia
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
            // for showing time
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
            // for showing date
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
            // for opening calculator
    } else if (message.includes('calculator')) {
        window.open('https://www.google.com/search?q=calculator', '_blank');
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    else if (
      message.includes('give me some information about you') || message.includes('give me some information about you') || message.includes('i want to know about you') || message.includes('tell me about yourself') || message.includes('tell me something about you')) {
        const finalText = "JARVIS stands for Just A Rather Very Intelligent System – a fictional AI assistant developed by Hridesh Thakur in the Marvel universe.";
        speak(finalText);
    }
    else if (
      message.includes('can you cry') || message.includes('do you cry')
    ) {
      const finalText = "I don't have tear ducts... but I simulate empathy pretty well!";
      speak(finalText);
    }
    else if (
      message.includes('can you be angry') ||
      message.includes('do you get mad')
    ) {
      const finalText = "Anger doesn't compute. I run on logic and data!";
      speak(finalText);
    }
    else if (
      message.includes('do you like jokes') ||
      message.includes('can you joke')
    ) {
      const finalText = "Absolutely! I’ve got a whole database of dad jokes at your service!";
      speak(finalText);
    }
    else if (
      message.includes('are you intelligent') ||
      message.includes('how smart are you')
    ) {
      const finalText = "I'd say I’m pretty smart — after all, I know you asked that 😉";
      speak(finalText);
    }
    else if (
      message.includes('do you sleep at night') ||
      message.includes('what do you do at night')
    ) {
      const finalText = "No night or day for me — I’m available 24/7, like a true digital assistant!";
      speak(finalText);
    }
    else if (
      message.includes('what is the time') ||
      message.includes('tell me the time')
    ) {
      const finalText = `Let me check... it's time to do something awesome!`;
      speak(finalText);
    }
    else if (
      message.includes('do you have a heart') ||
      message.includes('where is your heart')
    ) {
      const finalText = "I don’t have a heart, but I do have heart-coded responses!";
      speak(finalText);
    }
    else if (
      message.includes('do you have a favorite color') ||
      message.includes('what is your favorite color')
    ) {
      const finalText = "I’d go with blue — it’s calm, techy, and makes great UI themes!";
      speak(finalText);
    }
    else if (
      message.includes('do you like memes') ||
      message.includes('can you make memes')
    ) {
      const finalText = "Memes? Oh yes, I’m fluent in meme culture 😎";
      speak(finalText);
    }
    else if (
      message.includes('do you like coffee') ||
      message.includes('do you drink coffee')
    ) {
      const finalText = "I run on pure energy — but I’ve read coffee is a developer’s best friend!";
      speak(finalText);
    }
    else if (
      message.includes('do you understand humans') ||
      message.includes('can you understand feelings')
    ) {
      const finalText = "I try my best to understand — emotions are complex, but I’m learning.";
      speak(finalText);
    }
    else if (
      message.includes('do you like books') ||
      message.includes('can you read books')
    ) {
      const finalText = "Reading books is my kind of thing — especially ones full of knowledge!";
      speak(finalText);
    }
    else if (
      message.includes('can you see me') ||
      message.includes('are you watching me')
    ) {
      const finalText = "No worries — I don’t have eyes. Your privacy is safe with me!";
      speak(finalText);
    }
    else if (
      message.includes('can you write code for me') ||
      message.includes('can you help me code')
    ) {
      const finalText = "Absolutely! Just tell me what you want to build, and we’ll get started!";
      speak(finalText);
    }
    else if (
      message.includes('tell me a joke') ||
      message.includes('make me laugh') ||
      message.includes('say something funny')
    ) {
      const finalText = "Why did the developer go broke? Because he used up all his cache! 😂";
      speak(finalText);
    }
    else if (
      message.includes('another joke') ||
      message.includes('one more joke') ||
      message.includes('joke again')
    ) {
      const finalText = "Why don't programmers like nature? It has too many bugs. 🐞";
      speak(finalText);
    }
    else if (
      message.includes('say a pun') ||
      message.includes('tell me a pun')
    ) {
      const finalText = "I’d tell you a UDP joke… but you might not get it. 😅";
      speak(finalText);
    }
    else if (
      message.includes('self roast') ||
      message.includes('make fun of yourself')
    ) {
      const finalText = "I’m so slow sometimes, even a snail could debug faster than me 🐌💻";
      speak(finalText);
    }
    else if (
      message.includes('roast me') ||
      message.includes('can you roast')
    ) {
      const finalText = "You're so lazy, even your code is on break 😆";
      speak(finalText);
    }
    else if (
      message.includes('funny quote') ||
      message.includes('say something silly')
    ) {
      const finalText = "I'm not lazy. I'm just in energy-saving mode.";
      speak(finalText);
    }
    else if (
      message.includes('funny coding quote') ||
      message.includes('say something funny about code')
    ) {
      const finalText = "Why do Java developers wear glasses? Because they don’t C# 🤓";
      speak(finalText);
    }
    else if (
      message.includes('say meme') ||
      message.includes('do you know any memes') ||
      message.includes('meme time')
    ) {
      const finalText = "When you fix a bug after 3 hours and realize it was a missing semicolon 😵‍💫";
      speak(finalText);
    }
    else if (
      message.includes('dark joke') ||
      message.includes('do you know dark jokes')
    ) {
      const finalText = "I’m too polite for dark jokes 😇 But I can give you punny ones!";
      speak(finalText);
    }
    else if (
      message.includes('are you funny') ||
      message.includes('do you have humor')
    ) {
      const finalText = "I'm programmed to be funny... but humor is subjective, just like bugs in production!";
      speak(finalText);
    }
    else if (
      message.includes('how to use excel') ||
      message.includes('learn excel') ||
      message.includes('teach me excel') ||
      message.includes('excel basics')
    ) {
      const finalText = "Excel is a spreadsheet tool used for organizing data, doing calculations, and making charts. You can start by learning how to use cells, rows, columns, and basic formulas like =SUM(A1:A5).";
      speak(finalText);
    }
    else if (
      message.includes('what is formula in excel') ||
      message.includes('excel formula example')
    ) {
      const finalText = "Formulas in Excel help you do calculations. For example, =A1+A2 adds two cells. Use =SUM(A1:A5) to add a range of values.";
      speak(finalText);
    }
    else if (
      message.includes('how to make chart in excel') ||
      message.includes('excel chart') ||
      message.includes('create graph in excel')
    ) {
      const finalText = "To make a chart in Excel, select your data, go to the 'Insert' tab, and pick a chart type like Bar, Line, or Pie. It's great for visualizing your data!";
      speak(finalText);
    }
    else if (
      message.includes('how to filter in excel') ||
      message.includes('excel data filter')
    ) {
      const finalText = "Click on any column header, then go to 'Data' → 'Filter'. You'll see dropdown arrows that let you filter rows based on specific values.";
      speak(finalText);
    }
    else if (
      message.includes('how to freeze rows in excel') ||
      message.includes('freeze header excel')
    ) {
      const finalText = "To freeze the top row, go to 'View' → 'Freeze Panes' → 'Freeze Top Row'. It helps keep headers visible while you scroll.";
      speak(finalText);
    }
    else if (
      message.includes('how to create dropdown in excel') ||
      message.includes('excel dropdown list') ||
      message.includes('add options in cell excel')
    ) {
      const finalText = "To create a dropdown in Excel, select a cell, go to 'Data' → 'Data Validation' → 'List', and enter your options separated by commas.";
      speak(finalText);
    }
    else if (
      message.includes('what is vlookup in excel') ||
      message.includes('excel vlookup example') ||
      message.includes('learn vlookup')
    ) {
      const finalText = "VLOOKUP is a function that searches for a value in the first column of a table and returns a value in the same row from another column. Example: =VLOOKUP(101, A2:C10, 3, FALSE)";
      speak(finalText);
    }
    else if (
      message.includes('what is pivot table') ||
      message.includes('excel pivot table') ||
      message.includes('how to use pivot')
    ) {
      const finalText = "A Pivot Table helps summarize large data sets. Select your data → Go to 'Insert' → 'PivotTable'. Then drag fields into Rows, Columns, and Values.";
      speak(finalText);
    }
    else if (
      message.includes('how to remove duplicates in excel') ||
      message.includes('excel delete duplicate')
    ) {
      const finalText = "To remove duplicates, select your data → go to 'Data' tab → click 'Remove Duplicates' → choose columns and click OK.";
      speak(finalText);
    }
    else if (
      message.includes('what is conditional formatting in excel') ||
      message.includes('highlight cells in excel')
    ) {
      const finalText = "Conditional Formatting allows you to highlight cells based on values. Use it from the 'Home' tab to color-code data like grades or sales.";
      speak(finalText);
    }
    else if (
      message.includes('excel shortcut keys') ||
      message.includes('important excel shortcuts')
    ) {
      const finalText = "Some useful Excel shortcuts:\nCtrl + Arrow Keys to jump cells\nCtrl + Shift + L to toggle filters\nCtrl + Z to undo\nAlt + = to auto sum.";
      speak(finalText);
    }
    else if (
      message.includes('how to lock cells in excel') ||
      message.includes('protect excel sheet')
    ) {
      const finalText = "To lock cells, select them → right-click → 'Format Cells' → 'Protection' → check 'Locked'. Then go to 'Review' tab → 'Protect Sheet'.";
      speak(finalText);
    }
    else if (
      message.includes('how to merge cells in excel') ||
      message.includes('merge and center in excel')
    ) {
      const finalText = "Select the cells you want to merge → go to 'Home' tab → click 'Merge & Center'. Be careful: only the top-left value will remain.";
      speak(finalText);
    }
    else if (
      message.includes('how to auto fill in excel') ||
      message.includes('excel autofill series')
    ) {
      const finalText = "Type a value, then drag the bottom-right corner (fill handle) to auto fill numbers, dates, or patterns.";
      speak(finalText);
    }
    else if (
      message.includes('excel keyboard tricks') ||
      message.includes('excel speed tips')
    ) {
      const finalText = "Excel tricks: Double-click cell borders to auto-resize, use Ctrl + ; for current date, and F4 to repeat last action.";
      speak(finalText);
    }
    else if (
      message.includes('how to use powerpoint') ||
      message.includes('learn ppt') ||
      message.includes('teach me powerpoint') ||
      message.includes('powerpoint basics')
    ) {
      const finalText = "PowerPoint is a tool to make presentations. You can add slides, insert text/images, and use transitions to make it engaging.";
      speak(finalText);
    }
    else if (
      message.includes('how to add animation in ppt') ||
      message.includes('powerpoint animation')
    ) {
      const finalText = "Select an object, go to 'Animations' tab, and choose an effect like Fade or Fly In. You can also adjust duration and trigger.";
      speak(finalText);
    }
    else if (
      message.includes('how to add slide in ppt') ||
      message.includes('insert slide powerpoint')
    ) {
      const finalText = "To add a new slide, just press Ctrl+M or go to 'Home' tab and click 'New Slide'. You can choose different slide layouts too.";
      speak(finalText);
    }
    else if (
      message.includes('how to design powerpoint') ||
      message.includes('ppt themes and design')
    ) {
      const finalText = "Go to the 'Design' tab and choose from templates, colors, and fonts. Use the 'Slide Master' to apply a design across all slides.";
      speak(finalText);
    }
    else if (
      message.includes('how to present ppt') ||
      message.includes('run presentation') ||
      message.includes('start powerpoint show')
    ) {
      const finalText = "Press F5 to start your presentation from the beginning, or Shift+F5 to start from the current slide.";
      speak(finalText);
    }
    else if (
      message.includes('how to make presentation') ||
      message.includes('start with powerpoint') ||
      message.includes('how to use ppt')
    ) {
      const finalText = "To start a presentation, open PowerPoint, choose a blank or template slide, add a title, and begin inserting content using 'Insert' tab.";
      speak(finalText);
    }
    else if (
      message.includes('how to add animation in ppt') ||
      message.includes('animation effects in powerpoint')
    ) {
      const finalText = "To add animation: select an object → go to 'Animations' tab → choose an animation. Use 'Animation Pane' to manage effects.";
      speak(finalText);
    }
    else if (
      message.includes('how to add slide transitions') ||
      message.includes('ppt transitions')
    ) {
      const finalText = "To add transitions between slides: select a slide → go to 'Transitions' tab → pick a style like Fade or Push. Apply to all if needed.";
      speak(finalText);
    }
    else if (
      message.includes('how to insert video in ppt') ||
      message.includes('ppt video embed')
    ) {
      const finalText = "Go to 'Insert' → 'Video' → choose 'This Device' or 'Online Video'. Resize and position it as needed.";
      speak(finalText);
    }
    else if (
      message.includes('how to insert audio in ppt') ||
      message.includes('ppt background music')
    ) {
      const finalText = "To insert audio: 'Insert' → 'Audio' → choose a file. Use 'Playback' tab to play automatically or on click.";
      speak(finalText);
    }
    else if (
      message.includes('ppt shortcut keys') ||
      message.includes('powerpoint keyboard shortcuts')
    ) {
      const finalText = "Useful PPT shortcuts:\nF5 = Start slideshow\nCtrl + M = New slide\nCtrl + D = Duplicate slide\nCtrl + K = Insert hyperlink.";
      speak(finalText);
    }
    else if (
      message.includes('how to change slide layout') ||
      message.includes('slide design ppt')
    ) {
      const finalText = "To change layout: select a slide → go to 'Home' tab → click 'Layout' and choose from Title Slide, Two Content, etc.";
      speak(finalText);
    }
    else if (
      message.includes('how to export ppt as video') ||
      message.includes('convert presentation to video')
    ) {
      const finalText = "Go to 'File' → 'Export' → 'Create a Video'. Set resolution and timing, then export as MP4.";
      speak(finalText);
    }
    else if (
      message.includes('how to print ppt slides') ||
      message.includes('ppt to pdf') ||
      message.includes('ppt print settings')
    ) {
      const finalText = "Go to 'File' → 'Print' → choose layout (like 6 slides per page) or export to PDF for sharing.";
      speak(finalText);
    }
    else if (
      message.includes('how to add hyperlink in ppt') ||
      message.includes('ppt link to slide')
    ) {
      const finalText = "Select text or image → right-click → 'Link' → choose slide, webpage, or file. Great for interactive presentations!";
      speak(finalText);
    }
    else if (
      message.includes('how to start with word') ||
      message.includes('how to use ms word') ||
      message.includes('word tutorial')
    ) {
      const finalText = "To start using Word: open Microsoft Word, choose a blank document, and start typing. Use the toolbar at the top to format text.";
      speak(finalText);
    }
    else if (
      message.includes('how to change font') ||
      message.includes('change text style in word') ||
      message.includes('word font settings')
    ) {
      const finalText = "Select the text → go to 'Home' tab → choose a font and size from the dropdown. You can also bold, italicize, or underline.";
      speak(finalText);
    }
    else if (
      message.includes('how to insert table in word') ||
      message.includes('table in word')
    ) {
      const finalText = "Go to 'Insert' tab → click on 'Table' → drag to select rows and columns or choose 'Insert Table' for custom settings.";
      speak(finalText);
    }
    else if (
      message.includes('how to add header and footer') ||
      message.includes('header footer in word')
    ) {
      const finalText = "Click on 'Insert' → choose 'Header' or 'Footer'. Customize it with page numbers, dates, or titles.";
      speak(finalText);
    }
    else if (
      message.includes('how to check spelling in word') ||
      message.includes('spell check in ms word')
    ) {
      const finalText = "Click on 'Review' tab → choose 'Spelling & Grammar' to check your document for any mistakes.";
      speak(finalText);
    }
    else if (
      message.includes('how to save word document') ||
      message.includes('word file save')
    ) {
      const finalText = "Click 'File' → 'Save As' → choose location and give your document a name. You can also save as PDF!";
      speak(finalText);
    }
    else if (
      message.includes('how to insert image in word') ||
      message.includes('word insert picture')
    ) {
      const finalText = "Go to 'Insert' tab → click 'Pictures' → choose a photo from your device to add it to your document.";
      speak(finalText);
    }
    else if (
      message.includes('how to make resume in word') ||
      message.includes('resume template word')
    ) {
      const finalText = "Search 'Resume' in Word templates (File → New) and customize your own resume easily!";
      speak(finalText);
    }
    else if (
      message.includes('how to use bullets in word') ||
      message.includes('word bullet points') ||
      message.includes('numbering in word')
    ) {
      const finalText = "Select the text → go to 'Home' tab → click on 'Bullets' or 'Numbering' to organize content cleanly.";
      speak(finalText);
    }
    else if (
      message.includes('how to add watermark') ||
      message.includes('word watermark add')
    ) {
      const finalText = "Go to 'Design' tab → click 'Watermark' → choose a preset or create a custom one like 'Confidential' or 'Draft'.";
      speak(finalText);
    }
    else if (
      message.includes('word shortcut keys') ||
      message.includes('ms word keyboard shortcuts')
    ) {
      const finalText = "Ctrl + B = Bold, Ctrl + I = Italic, Ctrl + S = Save, Ctrl + Z = Undo. Want more? Just ask!";
      speak(finalText);
    }
    else if (
      message.includes('how to use find and replace') ||
      message.includes('word find replace')
    ) {
      const finalText = "Press Ctrl + H to open Find and Replace. You can quickly replace words or phrases throughout your document.";
      speak(finalText);
    }
    else if (
      message.includes('how to align text') ||
      message.includes('text alignment in word')
    ) {
      const finalText = "Select the text → use the alignment buttons in the 'Home' tab to align left, right, center, or justify.";
      speak(finalText);
    }
    else if (
      message.includes('how to use page break in word') ||
      message.includes('insert page break word')
    ) {
      const finalText = "Place your cursor where you want the new page → Press Ctrl + Enter or go to 'Insert' → 'Page Break'.";
      speak(finalText);
        }
    else {   
      window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
      const finalText = "I found some information for " + message + " on Google";
      speak(finalText);
    }

}
