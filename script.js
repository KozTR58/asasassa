// casual and modular script
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const promptText = document.getElementById('promptText');
const afterText = document.getElementById('afterText');
const faqTrigger = document.getElementById('faqTrigger');
const faqSection = document.getElementById('faqSection');
const closeFaqTop = document.getElementById('closeFaqTop');
const closeFaqBottom = document.getElementById('closeFaqBottom');
const confettiCanvas = document.getElementById('confetti');
const cuteFly = document.getElementById('cuteFly');

let escapes = 0;

// 10 prompt variations
const prompts = [
  "Will you go out with me tonight",
  "Hey want to hang out sometime",
  "Would you be my date this week",
  "Do you want to grab a coffee soon",
  "Can I take you out on a real date",
  "How about we try dinner together",
  "Want to watch a movie with me sometime",
  "Would you like to come with me to that thing",
  "Do you want to catch a show together",
  "Hey you want to go out just us two"
];

// Rizz variations for yes result
const yesRizz = [
  "You said yes Already grinning like a fool",
  "You said yes Already smiling like an idiot and I love it",
  "You said yes Already grinning like crazy I cannot hide it",
  "You said yes Already flashing a stupid smile and it feels nice"
];

// small set of no responses
const noReplies = [
  "You cannot just say no that easily",
  "Try again or be kind and press yes",
  "That was rude but okay maybe later"
];

// random Easter egg texts show sometimes
const eggs = [
  "HEY YOU",
  "You are the one",
  "Dexter vibes",
  "small hello from the show",
  "did you see that twist"
];

// choose a random prompt each load
function setRandomPrompt(){
  const p = prompts[Math.floor(Math.random() * prompts.length)];
  promptText.textContent = p;
}
setRandomPrompt();

// randomize labels sometimes too so it feels alive
function randomizeLabels(){
  if(Math.random() < 0.25){
    yesBtn.textContent = "Yes please";
  } else {
    yesBtn.textContent = "Yes";
  }
  if(Math.random() < 0.15){
    noBtn.textContent = "No thanks";
  } else {
    noBtn.textContent = "No";
  }
}
randomizeLabels();

// No button hover escape
noBtn.addEventListener('mouseenter', () => {
  escapes++;
  const w = window.innerWidth - noBtn.offsetWidth - 60;
  const h = window.innerHeight - noBtn.offsetHeight - 60;
  const x = Math.max(10, Math.floor(Math.random() * Math.max(20, w)));
  const y = Math.max(60, Math.floor(Math.random() * Math.max(20, h)));
  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  // shrink
  const scale = Math.max(0.6, 1 - escapes * 0.07);
  noBtn.style.transform = 'scale(' + scale + ')';
  // grow yes
  yesBtn.style.transform = 'scale(' + (1 + Math.min(0.6, escapes * 0.07)) + ')';
  // tiny chance an Easter egg appears
  if(Math.random() < 0.15) spawnEgg();
});

// No click
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  noBtn.disabled = true;
  promptText.textContent = noReplies[Math.floor(Math.random() * noReplies.length)];
  afterText.textContent = "Try again or choose nicer";
  noBtn.style.opacity = '0.45';
  yesBtn.style.transform = 'scale(1.5)';
  setTimeout(() => {
    noBtn.disabled = false;
    noBtn.style.opacity = '1';
    setRandomPrompt();
    afterText.textContent = "Click a button Be honest";
    yesBtn.style.transform = '';
  }, 1200);
});

// Yes click -> confetti and cute fly and rizz lines
yesBtn.addEventListener('click', () => {
  // random rizz line
  const line = yesRizz[Math.floor(Math.random() * yesRizz.length)];
  promptText.textContent = line;
  afterText.textContent = "Can’t wait to see you I owe you at least one terrible joke";
  // make confetti
  launchConfetti();
  // show cute flyer
  flyCute();
  // small extra: update prompt for next time
  setTimeout(() => {
    setRandomPrompt();
    afterText.textContent = "Click a button Be honest";
    promptText.textContent = "Hey I have something to ask";
  }, 4000);
});

// FAQ open and close
faqTrigger.addEventListener('click', () => {
  faqSection.setAttribute('aria-hidden', 'false');
  // tiny chance show egg when opening FAQ
  if(Math.random() < 0.25) spawnEgg();
  window.scrollTo(0,0);
});
closeFaqTop.addEventListener('click', () => {
  faqSection.setAttribute('aria-hidden', 'true');
});
closeFaqBottom.addEventListener('click', () => {
  faqSection.setAttribute('aria-hidden', 'true');
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') faqSection.setAttribute('aria-hidden', 'true');
});

// Easter egg spawn small toast
function spawnEgg(){
  const t = document.createElement('div');
  t.className = 'egg';
  t.textContent = eggs[Math.floor(Math.random() * eggs.length)];
  Object.assign(t.style, {
    position: 'fixed',
    right: (10 + Math.random() * 200) + 'px',
    top: (10 + Math.random() * 200) + 'px',
    padding: '8px 10px',
    background: '#061024',
    color: '#ffd43b',
    borderRadius: '8px',
    zIndex: 120,
    fontWeight: 700,
    opacity: 0,
    transform: 'translateY(-10px)'
  });
  document.body.appendChild(t);
  // animate in
  requestAnimationFrame(() => {
    t.style.transition = 'all 450ms ease';
    t.style.opacity = 1;
    t.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = 0;
    t.style.transform = 'translateY(-10px)';
    setTimeout(() => t.remove(), 400);
  }, 1600);
}

// Cute flyer animation
function flyCute(){
  cuteFly.style.opacity = 1;
  cuteFly.style.bottom = '20vh';
  cuteFly.style.transform = 'translateX(-50%) scale(1.1)';
  setTimeout(() => {
    cuteFly.style.transform = 'translateX(-50%) translateY(-120px) scale(1.2)';
    cuteFly.style.opacity = 1;
  }, 300);
  setTimeout(() => {
    cuteFly.style.bottom = '-120px';
    cuteFly.style.opacity = 0;
  }, 2800);
}

// minimal confetti
function launchConfetti(){
  const ctx = confettiCanvas.getContext('2d');
  const w = confettiCanvas.width = window.innerWidth;
  const h = confettiCanvas.height = window.innerHeight;
  const pieces = [];
  for(let i = 0; i < 80; i++){
    pieces.push({
      x: Math.random() * w,
      y: Math.random() * -h,
      r: 6 + Math.random() * 8,
      vx: -2 + Math.random() * 4,
      vy: 2 + Math.random() * 5,
      color: randomColor()
    });
  }
  let t0 = performance.now();
  function frame(t){
    const dt = (t - t0) / 1000;
    t0 = t;
    ctx.clearRect(0,0,w,h);
    for(const p of pieces){
      p.x += p.vx * 60 * dt;
      p.y += p.vy * 60 * dt;
      p.vy += 60 * 0.05 * dt;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.r, p.r * 0.6);
    }
    // stop when all off screen
    if(pieces.every(p => p.y > h + 50)) {
      ctx.clearRect(0,0,w,h);
      return;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
function randomColor(){
  const palette = ['#ffd43b','#ff9f1c','#ff6b6b','#7bed9f','#70a1ff'];
  return palette[Math.floor(Math.random() * palette.length)];
}

// make canvas full size on resize
window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

// small accessibility focus
yesBtn.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') yesBtn.click();
});
noBtn.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') noBtn.click();
});
