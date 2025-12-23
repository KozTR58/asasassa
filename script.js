// Helpers
const rand = arr => arr[Math.floor(Math.random()*arr.length)];
const range = (n) => [...Array(n).keys()];

// Data arrays
const questions = [
  "Can I steal one of your nights?",
  "Wanna be the reason I delete this site?",
  "Can I be the smile you didn’t see coming?",
  "What if this is the start of something?",
  "Fancy stealing my hoodie and my heart?",
  "Will you let me try to be your favorite mistake?",
  "Do you want to grab a coffee sometime?",
  "Can I make you laugh at least once tonight?",
  "Is tonight the night I ask you out properly?",
  "Could we be each other’s little secret?"
];

const yesPhrases = [
  "Already grinning like a fool",
  "You just made my whole week",
  "Did you really just say yes? I’m writing your name in my notebook",
  "You said yes. I can already see your grin, loud and proud",
  "That 'yes' sounds like music",
  "You made a small human very happy",
  "Okay now I’ll plan something slightly ridiculous",
  "You said yes. My brain is doing a happy dance",
  "I owe you at least one terrible joke",
  "You just turned my day golden"
];

const noTeases = [
  "Still trying?",
  "Cute how you're resisting",
  "You really like a challenge, huh?",
  "Is this committed denial?",
  "Trying your best to say no, I see you",
  "Nah, come on, try again",
  "You're a fighter, I respect that",
  "That no is... dramatic",
  "You almost got me worried for a sec",
  "Plot twist: you can't resist forever"
];

const closings = [
  "Nevermind, this is awkward, but it's ok ❤️",
  "Ok I'll pretend you never saw this",
  "Don't judge me pls",
  "I regret everything and nothing",
  "This is embarrassing but fine"
];

const compliments = [
  "Hey you look beautiful today",
  "Hi gorgeous",
  "That smile fits you",
  "You light up the room",
  "You're doing great, trust me",
  "Looking radiant as always",
  "You have a killer laugh",
  "Honestly that outfit? Chef's kiss",
  "Your vibe is immaculate",
  "You're a whole mood"
];

// DOM
const subQuestion = document.getElementById('subQuestion');
const randomPrompt = document.getElementById('randomPrompt');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const resultText = document.getElementById('resultText');
const particleLayer = document.getElementById('particleLayer');
const faqModal = document.getElementById('faqModal');
const faqCloseTop = document.getElementById('faqCloseTop');
const faqCloseBottom = document.getElementById('faqCloseBottom');
const curiousBtn = document.getElementById('curiousBtn');
const tellMore = document.getElementById('tellMore');
const smiley = document.getElementById('smiley');

// set random content on load
function setRandoms(){
  subQuestion.textContent = rand(questions);
  randomPrompt.textContent = rand(questions);
  document.querySelector('.modal-bottom .small').textContent = rand(closings);
}
setRandoms();

// Open/close FAQ modal
function openFAQ(){
  faqModal.setAttribute('aria-hidden','false');
  // ensure modal scroll top
  const body = faqModal.querySelector('.modal-body');
  body.scrollTop = 0;
  // randomize bottom button text
  document.getElementById('faqCloseBottom').textContent = rand(closings);
}
function closeFAQ(){
  faqModal.setAttribute('aria-hidden','true');
}
curiousBtn.addEventListener('click', openFAQ);
tellMore.addEventListener('click', openFAQ);
faqCloseTop.addEventListener('click', closeFAQ);
faqCloseBottom.addEventListener('click', closeFAQ);
window.addEventListener('keydown', e => { if(e.key === 'Escape') closeFAQ(); });
faqModal.addEventListener('click', e => {
  if(e.target === faqModal) closeFAQ();
});

// throttle for mouse hearts
let lastHeart = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if(now - lastHeart < 40) return; // limit particle creation
  lastHeart = now;
  createHeart(e.clientX, e.clientY);
});

function createHeart(x,y){
  const el = document.createElement('div');
  el.className = 'heart';
  el.textContent = '❤️';
  el.style.left = (x - 8) + 'px';
  el.style.top = (y - 8) + 'px';
  el.style.fontSize = (10 + Math.random()*18) + 'px';
  particleLayer.appendChild(el);
  setTimeout(()=> el.remove(), 1400);
}

// NO button dodge + tease
noBtn.addEventListener('mouseenter', (e) => {
  // reposition randomly
  const w = window.innerWidth - noBtn.offsetWidth - 40;
  const h = window.innerHeight - noBtn.offsetHeight - 40;
  const x = Math.max(10, Math.floor(Math.random() * w));
  const y = Math.max(60, Math.floor(Math.random() * h));
  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  // shape change and shrink
  noBtn.style.transform = `scale(${(0.6 + Math.random()*0.3).toFixed(2)}) rotate(${(Math.random()*40-20).toFixed(0)}deg)`;
  // show a tease
  showTease();
});

noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  resultText.textContent = "You can't just say no that easily.";
  setTimeout(()=> {
    resultText.textContent = "Choose honestly";
  }, 1400);
});

// create tease bubble near random corner
function showTease(){
  const msg = rand(noTeases);
  const t = document.createElement('div');
  t.className = 'tease';
  t.textContent = msg;
  // random pos near edges
  const left = Math.floor(Math.random() * (window.innerWidth - 200));
  const top = Math.floor(Math.random() * (window.innerHeight - 140));
  t.style.left = left + 'px';
  t.style.top = top + 'px';
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 1600);
}

// YES button: hearts + cat + random rizz message + bigger confetti
yesBtn.addEventListener('click', () => {
  const phrase = rand(yesPhrases);
  resultText.textContent = `You said yes. ${phrase}.`;
  // small scale reaction
  yesBtn.style.transform = 'scale(1.08)';
  setTimeout(()=> yesBtn.style.transform = '', 700);

  // spawn many hearts
  for(let i=0;i<14;i++){
    spawnFloatingHeart(Math.random()*window.innerWidth, window.innerHeight - 140 - Math.random()*40, 12 + Math.random()*36, 500 + Math.random()*900);
  }

  // show cat gif popup (requires cat.gif in folder)
  showCatPopup();
});

// spawn a floating heart from (x,y)
function spawnFloatingHeart(x,y,size,dur){
  const el = document.createElement('div');
  el.className = 'heart';
  el.textContent = '💖';
  el.style.left = (x - (size/2)) + 'px';
  el.style.top = (y - (size/2)) + 'px';
  el.style.fontSize = size + 'px';
  el.style.animationDuration = (dur/1000) + 's';
  particleLayer.appendChild(el);
  setTimeout(()=> el.remove(), dur + 300);
}

// cat popup
function showCatPopup(){
  const wrap = document.createElement('div');
  wrap.className = 'cat-popup';
  const img = document.createElement('img');
  img.alt = 'happy cat';
  img.src = 'cat.gif'; // put cat.gif in project root for this to show
  wrap.appendChild(img);
  document.body.appendChild(wrap);
  setTimeout(()=> wrap.remove(), 1600);
}

// randomize compliments text near top occasionally (optional)
setInterval(()=> {
  const sm = rand(compliments);
  smiley.textContent = '😊';
  // small tooltip pop can be implemented, but keep smiley simple
}, 6000);

// Save locally (basic)
document.getElementById('saveLoc').addEventListener('click', () => {
  const name = document.getElementById('noteName').value || 'anon';
  const txt = document.getElementById('noteText').value || '';
  const prev = JSON.parse(localStorage.getItem('notes') || '[]');
  prev.push({name,txt,date:Date.now()});
  localStorage.setItem('notes', JSON.stringify(prev));
  alert('Saved locally. Thanks.');
});

// on load ensure FAQ modal scroll works (no extra code needed; CSS allows overflow-y)
window.addEventListener('load', ()=> {
  // nothing else necessary; kept for later debugging
});

