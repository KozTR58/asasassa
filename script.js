// simpler helper
const el = id => document.getElementById(id);

// content arrays
const prompts = [
  "Will you go out with me",
  "Care to grab a coffee sometime",
  "Wanna go on a stupid little adventure",
  "Can I take you out",
  "Would you like to try dinner with me",
  "Do you want to hang out soon",
  "How about we watch something together",
  "Is tonight a good night for a bad decision",
  "Can I steal one of your nights",
  "Could I have the honor of a date"
];

const compliments = [
  "You look beautiful today",
  "Hey gorgeous",
  "You got that smile that stops time",
  "Everything suits you so easily",
  "You glow even when lights are off",
  "I think your laugh could save days",
  "There is a calm in your chaos",
  "You make ordinary feel like luck",
  "You wear confidence well",
  "You have a way of making rooms softer",
  "That color looks made for you",
  "Your energy is quietly loud",
  "You look stunning like you own the sky",
  "Im lowkey jealous of your vibe",
  "You make the little things nicer",
  "You are a rare kind of lovely",
  "I cant lie you are pretty unforgettable",
  "You look like my favorite song",
  "Your smile should be illegal"
];

const yesResponses = [
  "You said yes Already grinning like a fool",
  "You said yes I am already plotting a lame first date",
  "You said yes Cant wait to make you smile",
  "You said yes My heart did a weird jump",
  "You said yes I owe you a terrible joke and a good night"
];

const easterEggs = [
  "HEY YOU",
  "TONIGHT IS THE NIGHT",
  "DEX"
];

// questions for info box
const infoQuestions = [
  "Are you curious about my games",
  "Do you want to know my favorite song",
  "Wanna know which show I rewatch often",
  "Would you like to hear one weird fact about me",
];

// random helpers
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function randInt(n){ return Math.floor(Math.random()*n); }

// elements
const promptEl = el('prompt');
const afterEl = el('after');
const yesBtn = el('yes');
const noBtn = el('no');
const faqOpen = el('faqOpen');
const faq = el('faq');
const faqClose = el('faqClose');
const randomQuestionEl = el('randomQuestion');
const miniBio = el('miniBio');
const easter = el('easter');
const confettiCanvas = el('confettiCanvas');
const catFly = el('catFly');
const floatingHearts = document.querySelector('.floatingHearts');
const form = el('noteForm');
const formRes = el('formResult');

// init
function init(){
  // pick prompt and set
  const p = pick(prompts);
  promptEl.textContent = p + " ?";
  // set a random question in box
  randomQuestionEl.textContent = pick(infoQuestions) + "?";
  // set mini bio (small tweak as requested)
  miniBio.textContent = "I am Kayra. I play games I overthink things and yeah sometimes I am a little slow. In quiet moments I find myself thinking about you sometimes";
  // random easter overlay occasionally
  if(Math.random() < 0.45){
    showEaster();
  }
}

function showEaster(){
  const txt = pick(easterEggs);
  easter.textContent = txt;
  easter.style.opacity = 1;
  easter.classList.add('pop');
  setTimeout(()=>{ easter.style.opacity = 0; easter.classList.remove('pop') }, 1800);
}

// No button hover escape
let escapes = 0;
noBtn.addEventListener('mouseenter', () => {
  escapes++;
  // random shape transform
  noBtn.style.position = 'fixed';
  const w = window.innerWidth - noBtn.offsetWidth - 40;
  const h = window.innerHeight - noBtn.offsetHeight - 80;
  const left = Math.max(12, Math.floor(Math.random()*w));
  const top = Math.max(80, Math.floor(Math.random()*h));
  noBtn.style.left = left + 'px';
  noBtn.style.top = top + 'px';
  const scale = Math.max(0.5, 1 - escapes*0.09);
  const rotate = (Math.random()*40 - 20);
  noBtn.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
  // slight yes grow
  yesBtn.style.transform = `scale(${1 + Math.min(0.6, escapes*0.09)})`;
});

// If user clicks No quickly, playful message
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  promptEl.textContent = "No is a mood but not the whole story";
  afterEl.textContent = pick(compliments);
  setTimeout(()=> {
    promptEl.textContent = pick(prompts) + " ?";
    afterEl.textContent = "Choose honestly";
  }, 1500);
});

// Yes click behavior
yesBtn.addEventListener('click', () => {
  // show rizz line
  const r = pick(yesResponses);
  promptEl.textContent = r;
  // show confetti
  launchConfetti();
  // floating hearts
  spawnHearts();
  // show cat fly animation
  flyCat();
  // slight reset after a bit
  setTimeout(()=> {
    promptEl.textContent = pick(prompts) + " ?";
    afterEl.textContent = pick(compliments);
    yesBtn.style.transform = '';
    noBtn.style.transform = '';
  }, 4000);
});

// FAQ open close
faqOpen.addEventListener('click', () => {
  faq.setAttribute('aria-hidden','false');
  window.scrollTo(0,0);
});
faqClose.addEventListener('click', () => {
  faq.setAttribute('aria-hidden','true');
});

// simple local save form
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const name = el('name').value || 'Anon';
  const note = el('note').value || '';
  if(!note.trim()){
    formRes.textContent = 'Write something first';
    formRes.style.color = '#ffd43b';
    formRes.setAttribute('aria-hidden','false');
    return;
  }
  // store in localStorage
  const key = 'kayraNotes';
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push({name, note, at:new Date().toISOString()});
  localStorage.setItem(key, JSON.stringify(existing));
  formRes.textContent = 'Saved locally thank you';
  formRes.style.color = '#61FF87';
  formRes.setAttribute('aria-hidden','false');
  form.reset();
  setTimeout(()=> formRes.setAttribute('aria-hidden','true'), 3000);
});

// confetti implementation (simple)
function launchConfetti(){
  const c = confettiCanvas;
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  const ctx = c.getContext('2d');
  const pieces = [];
  for(let i=0;i<120;i++){
    pieces.push({
      x: Math.random()*c.width,
      y: Math.random()*-c.height,
      vx: (Math.random()-0.5)*6,
      vy: Math.random()*6+2,
      size: Math.random()*6+4,
      color: `hsl(${Math.floor(Math.random()*60)+40},90%,60%)`
    });
  }
  let t = 0;
  function frame(){
    t++;
    ctx.clearRect(0,0,c.width,c.height);
    for(const p of pieces){
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size*0.6);
    }
    if(t < 120) requestAnimationFrame(frame);
    else ctx.clearRect(0,0,c.width,c.height);
  }
  frame();
}

// floating hearts spawn
function spawnHearts(){
  const container = floatingHearts;
  for(let i=0;i<16;i++){
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = (20 + Math.random()*60) + '%';
    h.style.top = (60 + Math.random()*20) + '%';
    h.style.opacity = 0.9;
    h.style.transform = `scale(${0.6+Math.random()*0.8})`;
    container.appendChild(h);
    // animate
    setTimeout(()=> h.classList.add('fly'), 60);
    setTimeout(()=> h.remove(), 2500);
  }
}

// cat fly animation
function flyCat(){
  const c = catFly;
  c.style.transition = 'transform 1400ms cubic-bezier(.12,.8,.24,1)';
  c.style.transform = 'translateX(-50%) translateY(-120vh)';
  setTimeout(()=> {
    c.style.transform = 'translateX(-50%) translateY(110%)';
  }, 1800);
}

// initial call
init();

// small styles injection for dynamic elements like hearts and easter
const style = document.createElement('style');
style.textContent = `
.easter{position:absolute;right:18px;top:18px;color:rgba(255,255,255,0.08);font-weight:800;letter-spacing:1px;z-index:20;transition:opacity .3s ease;opacity:0}
.easter.pop{transform:scale(1.06);opacity:1}
.heart{position:absolute;width:18px;height:18px;transform-origin:center;pointer-events:none}
.heart:before,.heart:after{content:"";position:absolute;width:12px;height:18px;background:#ff6b9a;border-radius:10px}
.heart:before{left:6px;transform:rotate(-45deg)}
.heart:after{right:6px;transform:rotate(45deg)}
.heart.fly{animation:heartUp 2s linear forwards}
@keyframes heartUp{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-140px) scale(1.6)}}
`;
document.head.appendChild(style);

