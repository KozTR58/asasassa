// ====== Utility arrays and random helpers ======
const headerQuestions = [
  "Can I steal one of your nights?",
  "Wanna be the reason I delete this site?",
  "Can I be the smile you did not see coming?",
  "What if this is the start of something?",
  "Can I borrow your next Saturday?",
  "Do you like bad jokes and good coffee?",
  "Want to come watch a movie and judge it with me?",
  "Will you let me learn your favorite song?",
  "Could I be your unexpected favorite?",
  "Do you want to hear a terrible pickup line?"
];

const yesPhrases = [
  "Already grinning like a fool",
  "You just made my whole week",
  "Did you just say yes I am writing your name in my head",
  "I am smiling so much my face hurts",
  "You will forever be the hero of my dumb stories",
  "This feels like the start of something nice",
  "You owe me a coffee and I will happily accept",
  "My playlist just got an upgrade thanks to you",
  "I am floating a little right now",
  "Ok now I will definitely try to make you laugh"
];

const noTeases = [
  "Still trying",
  "Cute how you resist",
  "You are persistent huh",
  "Okay drama queen",
  "Try again with feelings",
  "That is a bold strategy",
  "I approve your effort",
  "Is that the best you got",
  "Stop making me admire you",
  "You are adorable when stubborn",
  "Really going for it",
  "Almost there"
];

const compliments = [
  "You look beautiful today",
  "Hi gorgeous",
  "Your smile is unfair",
  "How are you this radiant",
  "Hey good looking",
  "You are glowing",
  "Love that vibe you have",
  "You wear kindness well",
  "Looking like a masterpiece",
  "Can I keep you in my favorites",
  "Seriously stunning",
  "You make this page brighter",
  "Hello sunshine",
  "Wow you clean up nice",
  "Day made better by you"
];

const modalClosers = [
  "Ok I will pretend you never saw this",
  "Dont judge me please",
  "I regret everything and nothing",
  "Fine I am ashamed and proud",
  "Alright I will act normal now"
];

function rand(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

// ====== Elements ======
const subQuestionEl = document.getElementById('subQuestion');
const randomQEl = document.getElementById('randomQ');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hint = document.getElementById('hint');
const curiousBtn = document.getElementById('curiousBtn');
const modal = document.getElementById('modal');
const modalCloseTop = document.querySelector('.modalCloseTop');
const modalCloseBottom = document.getElementById('modalCloseBottom');
const modalBottomBtn = document.querySelector('.bigClose');
const savedMsg = document.getElementById('savedMsg');
const saveNote = document.getElementById('saveNote');
const noteName = document.getElementById('noteName');
const noteText = document.getElementById('noteText');
const celebration = document.getElementById('celebrationLayer');
const confettiCanvas = document.getElementById('confettiCanvas');
const floatingSmileContainer = document.getElementById('floatingSmileContainer');

// ====== Setup initial state ======
function setInitialTexts(){
  subQuestionEl.textContent = rand(headerQuestions);
  randomQEl.textContent = "Wanna know which show I rewatch often?";
  // set modal bottom button text random
  modalBottomBtn.textContent = rand(modalClosers);
}
setInitialTexts();

// floating smileys creation
function spawnSmiles(){
  const count = 8;
  for(let i=0;i<count;i++){
    const s = document.createElement('div');
    s.className = 'floatingSmile';
    s.style.left = (Math.random()*100) + '%';
    s.style.top = (Math.random()*100) + '%';
    s.style.fontSize = (24 + Math.random()*36) + 'px';
    s.style.opacity = (0.03 + Math.random()*0.12).toString();
    s.textContent = '😊';
    const delay = Math.random()*8;
    s.style.animationDelay = (delay) + 's';
    floatingSmileContainer.appendChild(s);
  }
}
spawnSmiles();

// ====== Cursor hearts trail ======
document.addEventListener('mousemove', (e) => {
  const heart = document.createElement('div');
  heart.className = 'cursorHeart';
  heart.style.left = e.clientX + 'px';
  heart.style.top = e.clientY + 'px';
  heart.textContent = '💛';
  document.body.appendChild(heart);
  setTimeout(()=> heart.remove(), 900);
});

// ====== No button dodge + tease texts ======
let noEscapeCount = 0;
noBtn.addEventListener('mouseenter', (ev) => {
  noEscapeCount++;
  // move to random spot
  const w = window.innerWidth - noBtn.offsetWidth - 40;
  const h = window.innerHeight - noBtn.offsetHeight - 40;
  const x = Math.max(10, Math.floor(Math.random() * w));
  const y = Math.max(60, Math.floor(Math.random() * h));
  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  // shape change and shrink
  const scale = Math.max(0.5, 1 - noEscapeCount*0.08);
  noBtn.style.transform = `scale(${scale}) rotate(${(Math.random()*30-15)}deg)`;
  noBtn.style.borderRadius = (10 + Math.floor(Math.random()*40)) + 'px';

  // show a tease text near edges
  const tease = document.createElement('div');
  tease.className = 'tease';
  tease.textContent = rand(noTeases) + '...';
  // position random near button
  const rx = x + (Math.random()*140 - 70);
  const ry = y + (Math.random()*140 - 70);
  tease.style.left = Math.min(Math.max(6, rx), window.innerWidth - 120) + 'px';
  tease.style.top = Math.min(Math.max(60, ry), window.innerHeight - 60) + 'px';
  document.body.appendChild(tease);
  setTimeout(()=> tease.remove(), 1500);
});

// if user clicks no, do a playful denial
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  hint.textContent = "You can't just say no that easily";
  noBtn.disabled = true;
  noBtn.style.opacity = '0.5';
  setTimeout(()=> {
    noBtn.disabled = false;
    noBtn.style.opacity = '1';
    hint.textContent = "Choose honestly";
  }, 1200);
});

// ====== Yes button behavior: hearts confetti cat and rizz text ======
yesBtn.addEventListener('click', (e) => {
  // random rizz text
  const phrase = rand(yesPhrases);
  hint.textContent = phrase;

  // small pop effect on yes
  yesBtn.style.transform = 'scale(1.08)';
  setTimeout(()=> yesBtn.style.transform = '', 650);

  // spawn some rising heart particles
  for(let i=0;i<12;i++){
    spawnParticle('💛', 300 + Math.random()*500);
  }

  // show animated cat
  showCat();

  // run confetti on canvas
  runConfetti();

});

// spawn upward particle
function spawnParticle(char, duration=1000){
  const el = document.createElement('div');
  el.className = 'particle';
  el.textContent = char;
  el.style.left = (window.innerWidth/2 + (Math.random()*240 - 120)) + 'px';
  el.style.top = (window.innerHeight - 140 + (Math.random()*40 - 20)) + 'px';
  el.style.fontSize = (18 + Math.random()*18) + 'px';
  celebration.appendChild(el);
  setTimeout(()=> el.remove(), duration);
}

// animated cat (emoji) that flies up
function showCat(){
  let cat = document.querySelector('.cat');
  if(!cat){
    cat = document.createElement('div');
    cat.className = 'cat';
    cat.innerHTML = '🐱‍👤';
    document.body.appendChild(cat);
  }
  // reset position and trigger fly
  cat.classList.remove('fly');
  // small delay to allow reflow
  setTimeout(()=> cat.classList.add('fly'), 50);
  // remove after animation
  setTimeout(()=> {
    cat.classList.remove('fly');
  }, 1800);
}

// ====== confetti using canvas (simple) ======
const ctx = confettiCanvas.getContext ? confettiCanvas.getContext('2d') : null;
let confettiPieces = [];
function resizeCanvas(){
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function runConfetti(){
  if(!ctx) return;
  confettiPieces = [];
  const count = 80;
  for(let i=0;i<count;i++){
    confettiPieces.push({
      x: window.innerWidth/2 + (Math.random()*300 - 150),
      y: window.innerHeight - 120 + Math.random()*20,
      vx: (Math.random()*6 - 3),
      vy: (-6 - Math.random()*8),
      size: 6 + Math.random()*8,
      color: `hsl(${Math.random()*60 + 30}, 90%, 60%)`,
      rot: Math.random()*360,
      vr: Math.random()*8 - 4
    });
  }
  requestAnimationFrame(confettiTick);
  setTimeout(()=> confettiPieces = [], 2200);
}
function confettiTick(){
  ctx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
  for(let p of confettiPieces){
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.24; // gravity
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot * Math.PI/180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*1.6);
    ctx.restore();
  }
  if(confettiPieces.length) requestAnimationFrame(confettiTick);
}

// ====== Modal open close ======
function openModal(){
  modal.setAttribute('aria-hidden', 'false');
  // randomize bottom button each open
  modalBottomBtn.textContent = rand(modalClosers);
}
function closeModal(){
  modal.setAttribute('aria-hidden', 'true');
}
curiousBtn.addEventListener('click', (e)=> { e.preventDefault(); openModal(); });
modalCloseTop.addEventListener('click', closeModal);
modalBottomBtn.addEventListener('click', closeModal);

// also close when click outside content
modal.addEventListener('click', (e) => {
  if(e.target === modal) closeModal();
});

// ESC closes
document.addEventListener('keydown', (e)=> {
  if(e.key === 'Escape') closeModal();
});

// ====== Save note locally ======
saveNote.addEventListener('click', ()=>{
  const name = noteName.value.trim();
  const text = noteText.value.trim();
  if(!name && !text){ savedMsg.textContent = 'Write something first'; return; }
  const notes = JSON.parse(localStorage.getItem('kayraNotes') || '[]');
  notes.push({name, text, at: new Date().toISOString()});
  localStorage.setItem('kayraNotes', JSON.stringify(notes));
  savedMsg.textContent = 'Saved locally';
  setTimeout(()=> savedMsg.textContent = '', 1800);
  noteName.value = '';
  noteText.value = '';
});

// ====== occasional small spark texts near edges for no hover attempts ======
// Already handled in noBtn mouseenter -> tease creation

// ====== Random complements that appear around yes/no attempts ======
function spawnCompliment(){
  const el = document.createElement('div');
  el.className = 'tease';
  el.textContent = rand(compliments);
  const x = 60 + Math.random()*(window.innerWidth - 120);
  const y = 80 + Math.random()*(window.innerHeight - 160);
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 1600);
}

// sometimes spawn compliments as subtle pop
setInterval(()=> {
  if(Math.random() < 0.12) spawnCompliment();
}, 1400);

// ====== ensure no button not stuck under header on small screens ======
window.addEventListener('load', ()=> {
  const rect = noBtn.getBoundingClientRect();
  if(rect.top < 80){
    noBtn.style.top = (window.innerHeight/2 + 40) + 'px';
    noBtn.style.left = (window.innerWidth/2 + 60) + 'px';
  }
});
