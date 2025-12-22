// Simple interactive logic with randomization and confetti
const prompts = [
  "Will you go out with me tonight",
  "Hey you I have to ask something small",
  "This is awkward but honest Will you go out with me",
  "Funny question but serious Will you say yes",
  "I like you Would you go out with me",
  "If you could say yes now Would you",
  "Small ask big heart Will you go out with me",
  "I will try my best Would you go out with me",
  "No pressure but I had to ask Will you",
  "One tiny chance Will you go out with me"
];

const compliments = [
  "You look beautiful today",
  "Hi gorgeous",
  "You shine a little brighter right now",
  "Your smile is unfair",
  "You got that glow today",
  "I like how you move through the room",
  "You are quietly stunning",
  "That outfit suits you perfectly",
  "You grabbed my attention without trying",
  "There is something kind about your face",
  "You make this look easy",
  "You brought the light with you",
  "I can tell you laugh like you mean it",
  "Your energy is oddly calming",
  "You are the part I did not expect"
];

const youDexterEaster = [
  "You",
  "Dexter",
  "You",
  "Dexter",
  "You"
];

const rizzTitles = [
  "Will you go out with me I will make it worth your while",
  "Will you go out with me and let me try my best",
  "Will you go out with me I promise a bad joke or two",
  "Will you go out with me I will bring the sun",
  "Will you go out with me I will make it simple"
];

const yesResponses = [
  "You said yes Already grinning like a fool",
  "You said yes I cant stop smiling like an idiot",
  "You said yes Already smiling and thinking of a terrible joke",
  "You said yes My day just got brighter I am grinning hard",
  "You said yes Already grinning like a fool and blushing a bit"
];

const postYesLines = [
  "Cant wait to see you I owe you at least one terrible joke",
  "See you soon I will try to make you laugh",
  "Cant wait to meet you I will bring snacks and bad jokes",
  "See you soon I am already planning a small hello",
  "Cant wait I will do my best to make you smile"
];

// elements
const promptEl = document.getElementById("prompt");
const titleEl = document.getElementById("mainTitle");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const resultEl = document.getElementById("result");
const faqToggle = document.getElementById("faqToggle");
const faqPanel = document.getElementById("faq");
const closeFaq = document.getElementById("closeFaq");
const easter = document.getElementById("easter");
const confettiCanvas = document.getElementById("confettiCanvas");
const showFormBtn = document.getElementById("showFormBtn");
const tinyForm = document.querySelector(".tinyForm");
const hideForm = document.getElementById("hideForm");
const flying = document.createElement("div");
flying.className = "flying";
flying.textContent = "💛";

// set some initial randomized content
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function initContent(){
  promptEl.textContent = pick(prompts);
  titleEl.textContent = pick(rizzTitles);
  // show random easter egg sometimes
  if(Math.random() < 0.6){
    easter.textContent = pick(youDexterEaster);
    easter.style.opacity = 0.06 + Math.random()*0.18;
  } else {
    easter.textContent = "";
  }
}
initContent();

// No button escape behavior
let escapes = 0;
noBtn.addEventListener("mouseenter", () => {
  escapes++;
  const w = window.innerWidth - noBtn.offsetWidth - 40;
  const h = window.innerHeight - noBtn.offsetHeight - 40;
  const x = Math.max(10, Math.floor(Math.random() * w));
  const y = Math.max(60, Math.floor(Math.random() * h));
  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  // shape and size change
  const scale = Math.max(0.45, 1 - escapes * 0.12);
  noBtn.style.transform = `scale(${scale}) rotate(${(Math.random()*40-20)}deg)`;
  noBtn.style.borderRadius = `${10 + Math.floor(Math.random()*50)}%`;
  // yes grows a bit and gets a different text sometimes
  yesBtn.style.transform = `scale(${1 + Math.min(0.6, escapes * 0.12)})`;
});

// if click no -> playful message
noBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  resultEl.textContent = "You cannot just say no that easily";
  promptEl.textContent = pick(prompts);
  setTimeout(()=> {
    resultEl.textContent = "Click a button. Be honest.";
  }, 1300);
});

// Yes click -> confetti and flying creature and rizz lines
yesBtn.addEventListener("click", ()=>{
  // randomize rizz line
  const yLine = pick(yesResponses);
  const pLine = pick(postYesLines);
  resultEl.textContent = yLine;
  // show small flying creature
  document.body.appendChild(flying);
  flying.style.display = "flex";
  flying.style.left = (window.innerWidth/2 + (Math.random()*200-100)) + "px";
  flying.style.top = (window.innerHeight/2 + (Math.random()*200-100)) + "px";
  flying.animate([
    { transform: "translateY(0) scale(0.9)", opacity: 0 },
    { transform: "translateY(-180px) scale(1.1)", opacity: 1 },
    { transform: "translateY(-360px) scale(0.7)", opacity: 0 }
  ], { duration: 1500, easing: "cubic-bezier(.2,.9,.2,1)"});
  setTimeout(()=>{ if(flying.parentNode) flying.parentNode.removeChild(flying); }, 1500);

  // confetti
  launchConfetti();

  // small post yes message change after short delay
  setTimeout(()=>{ resultEl.textContent = pLine; }, 800);

  // change prompt to a random compliment once yes
  setTimeout(()=>{ promptEl.textContent = pick(compliments); }, 900);
});

// FAQ open / close
faqToggle.addEventListener("click", ()=> {
  faqPanel.setAttribute("aria-hidden", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
closeFaq.addEventListener("click", ()=> {
  faqPanel.setAttribute("aria-hidden", "true");
});

// tiny form open/close
showFormBtn.addEventListener("click", ()=> {
  tinyForm.style.display = "block";
});
hideForm.addEventListener("click", ()=> {
  tinyForm.style.display = "none";
});

// keyboard escape to close
document.addEventListener("keydown", (e)=> {
  if(e.key === "Escape") {
    faqPanel.setAttribute("aria-hidden", "true");
    tinyForm.style.display = "none";
  }
});

// Confetti simple implementation
function launchConfetti(){
  const ctx = confettiCanvas.getContext("2d");
  resizeCanvas();
  const pieces = [];
  const count = 70;
  for(let i=0;i<count;i++){
    pieces.push({
      x: Math.random()*confettiCanvas.width,
      y: Math.random()*confettiCanvas.height - confettiCanvas.height,
      w: 8 + Math.random()*8,
      h: 6 + Math.random()*6,
      color: `hsl(${Math.floor(Math.random()*60)+40},90%,55%)`,
      vy: 2 + Math.random()*5,
      vx: -2 + Math.random()*4,
      rot: Math.random()*360,
      vr: -6 + Math.random()*12
    });
  }
  let t=0;
  const anim = setInterval(()=>{
    t+=1;
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    for(const p of pieces){
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rot * Math.PI/180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
    }
    if(t>120){ clearInterval(anim); ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height); }
  },1000/60);
}

function resizeCanvas(){
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
