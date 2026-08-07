
// //   LUMO — always-listening wake word engine 

// (function () {
//     if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
//         console.warn('LUMO: SpeechRecognition not supported in this browser.');
//         return;
//     }

//     const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SR();
//     recognition.lang = 'en-IN';
//     recognition.continuous = true;
//     recognition.interimResults = true;

//     const WAKE_WORD = /\blumo\b/i;
//     const BACKEND_URL = 'http://localhost:3000/ask'; // change if you host it elsewhere
//     let restarting = false;
//     let processing = false; // avoid firing two requests while one is in flight

//     // ---------- ask Claude via the backend ----------
//     async function answerQuery(query) {
//         query = query.trim();
//         if (!query) return "Yes? I'm listening.";

//         try {
//             const res = await fetch(BACKEND_URL, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ question: query }),
//             });
//             if (!res.ok) throw new Error(`Server responded ${res.status}`);
//             const data = await res.json();
//             return data.answer || "I couldn't find an answer for that.";
//         } catch (err) {
//             console.error('LUMO: backend request failed:', err);
//             return "I couldn't reach my brain right now — check if the server is running.";
//         }
//     }

//     function speak(text) {
//         if (window.LUMO) window.LUMO.setState('speaking');
//         const utter = new SpeechSynthesisUtterance(text);
//         utter.rate = 1;
//         utter.onend = () => {
//             if (window.LUMO) window.LUMO.setState('listening');
//         };
//         speechSynthesis.speak(utter);
//     }

//     recognition.onresult = async (event) => {
//         let finalText = '';
//         let interimText = '';

//         for (let i = event.resultIndex; i < event.results.length; i++) {
//             const text = event.results[i][0].transcript;
//             if (event.results[i].isFinal) finalText += text;
//             else interimText += text;
//         }

//         if (window.LUMO) window.LUMO.setTranscript(finalText || interimText);

//         if (finalText && WAKE_WORD.test(finalText) && !processing) {
//             processing = true;
//             if (window.LUMO) window.LUMO.setState('speaking'); // show "thinking" via the speaking glow
//             const query = finalText.replace(WAKE_WORD, '').trim();
//             const answer = await answerQuery(query);
//             speak(answer);
//             processing = false;
//         }
//     };

//     recognition.onstart = () => {
//         if (window.LUMO) window.LUMO.setState('listening');
//     };

//     recognition.onerror = (e) => {
//         console.warn('LUMO recognition error:', e.error);
//     };

//     recognition.onend = () => {
//         if (restarting) return;
//         restarting = true;
//         setTimeout(() => {
//             try { recognition.start(); } catch (e) {}
//             restarting = false;
//         }, 250);
//     };

//     function begin() {
//         window.LUMO_WIRED = true;
//         try { recognition.start(); } catch (e) {}
//     }

//     document.getElementById('talkBtn')?.addEventListener('click', begin, { once: true });
// })();