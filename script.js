// main interactivity
(function(){
  const yesBtn = document.getElementById('yesBtn');
  const noBtn  = document.getElementById('noBtn');
  const subQ   = document.getElementById('subQ');
  const result = document.getElementById('resultText');
  const faqBtn = document.getElementById('faqOpen');
  const modal  = document.getElementById('modal');
  const modalCloseTop = document.getElementById('modalCloseTop');
  const modalNever = document.getElementById('modalNever');
  const confettiCanvas = document.getElementById('confettiCanvas');
  const ambient = document.getElementById('ambient');
  const soundToggle = document.getElementById('soundToggle');
  const floating = document.getElementById('floatingCompliments');
  const contactForm = document.getElementById('contactForm');
  const mailtoBtn = document.getElementById('mailtoBtn');

  // --- data arrays ---
  const subQuestions = [
    "Can I steal one of your nights?",
    "Wanna be the reason I delete this site?",
    "Can I be the smile you didn’t see coming?",
    "What if tonight starts something good?",
    "May I take you out and try to make you laugh?",
    "Would you let me buy you a coffee sometime?",
    "If I asked nicely, would you say yes?",
    "I promise to bring bad jokes and good music.",
    "Are you the kind of person who likes surprises?",
    "Could I be your favorite small thing this week?"
  ];

  const yesPhrases = [
    "Already grinning like a fool",
    "You just made my whole week",
    "Did you just say yes? I’m writing your name in my notebook now",
    "Okay wow, big smile incoming",
    "You said yes. I’m floating a little",
    "This is the best kind of chaos",
    "My playlist just got a new reason",
    "Heart beat increased by 37%. Not medical advice",
    "You made the right choice, clearly",
    "I’ll owe you at least one terrible joke",
    "You just turned my day into a song",
    "Small victory, huge smile",
    "I’m already imagining coffee dates",
    "You picked the correct button tbh",
    "I’m blushing in binary",
    "You’ve been archived in my good thoughts",
    "I’ll bring snacks next time",
    "I can’t stop smiling now, thanks to you",
    "I already said your name out loud by accident",
    "You’ve unlocked my goofy mode"
  ];

  const noTeases = [
    "Still trying?",
    "Cute how you're resisting",
    "You're really committed huh?",
    "It’s okay, take a breath",
    "Plot twist: yes wins",
    "Maybe later?",
    "Nice try tho",
    "Persisting is adorable",
    "You keep coming back, huh?",
    "The no button is tired"
  ];

  const randomCompliments = [
    "You look beautiful today",
    "Hi gorgeous",
    "That color suits you",
    "You have a nice smile",
    "You're giving warm vibes",
    "Your laugh must be contagious",
    "Cute energy detected",
    "You make ordinary things feel nice",
    "You smell like good decisions",
    "You got a good taste in music"
  ];

  const modalClosers = [
    "Ok I’ll pretend you never saw this",
    "Don’t judge me pls",
    "I regret everything and nothing",
    "This is awkward fuck it",
    "Fine. I’ll act like this never happened"
  ];

  // choose random helper
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  // set random sub-question on load
  function setRandomSubQ(){
    subQ.textContent = pick(subQuestions);
  }
  setRandomSubQ();

  // -----------------
  // animate confetti/hearts on yes
  const ctx = confettiCanvas.getContext && confettiCanvas.getContext('2d');
  let confettiParticles = [];

  function resizeCanvas(){
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createConfetti(x,y){
    const count = 26 + Math.floor(Math.random()*14);
    for(let i=0;i<count;i++){
      confettiParticles.push({
        x: x + (Math.random()*60-30),
        y: y,
        vx: Math.random()*6-3,
        vy: - (4 + Math.random()*6),
        size: 6 + Math.random()*8,
        life: 60 + Math.floor(Math.random()*40),
        color: ['#ff5d7a','#ffb86b','#ffd43b','#ff8bd8','#ff6f91'][Math.floor(Math.random()*5)]
      });
    }
  }

  function tickConfetti(){
    if(!ctx) return;
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    for(let i=confettiParticles.length-1;i>=0;i--){
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18; // gravity
      p.life--;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size*0.6);
      if(p.life<=0 || p.y>confettiCanvas.height+50){ confettiParticles.splice(i,1); }
    }
    requestAnimationFrame(tickConfetti);
  }
  tickConfetti();

  // yes click handler
  yesBtn.addEventListener('click', (e) => {
    // show a random rizz text
    const phrase = pick(yesPhrases);
    result.textContent = phrase;

    // small cat emoji that floats briefly
    spawnFloatingEmoji('😺');

    // create confetti at center-ish or at button
    const rect = yesBtn.getBoundingClientRect();
    createConfetti(rect.left + rect.width/2, rect.top);

    // small pulse
    yesBtn.style.transform = 'scale(1.08)';
    setTimeout(()=> yesBtn.style.transform = '', 700);
  });

  // spawn floating emoji in center
  function spawnFloatingEmoji(emoji){
    const el = document.createElement('div');
    el.textContent = emoji;
    el.style.position='fixed';
    el.style.left = (window.innerWidth/2 + (Math.random()*120-60)) + 'px';
    el.style.top  = (window.innerHeight/2 + (Math.random()*40-60)) + 'px';
    el.style.fontSize = '34px';
    el.style.opacity = '0';
    el.style.zIndex = '160';
    document.body.appendChild(el);
    el.animate([
      {transform:'translateY(0) scale(0.6)', opacity:0},
      {transform:'translateY(-60px) scale(1.1)', opacity:1},
      {transform:'translateY(-120px) scale(0.9)', opacity:0}
    ], {duration:1400, easing:'cubic-bezier(.2,.8,.2,1)'});
    setTimeout(()=> el.remove(),1500);
    // also show a textual rizz overlay near result
    showRizzOverlay(pick(yesPhrases));
  }

  // show rizz overlay text (big, centered) and fade
  function showRizzOverlay(text){
    const el = document.createElement('div');
    el.className = 'rizzOverlay';
    el.style.position='fixed';
    el.style.left='50%';
    el.style.top='40%';
    el.style.transform='translate(-50%,-50%)';
    el.style.padding='12px 18px';
    el.style.background='rgba(6,16,36,0.06)';
    el.style.borderRadius='12px';
    el.style.fontWeight='800';
    el.style.zIndex = 180;
    el.style.color = '#061024';
    el.textContent = text;
    document.body.appendChild(el);
    el.animate([{opacity:0, transform:'translate(-50%,-40%) scale(0.9)'},{opacity:1, transform:'translate(-50%,-50%) scale(1)'},{opacity:0, transform:'translate(-50%,-60%) scale(0.95)'}], {duration:1800, easing:'ease-out'});
    setTimeout(()=> el.remove(),1800);
  }

  // --- No button dodge behavior ---
  let noEscapes = 0;
  function dodgeNo(){
    noEscapes++;
    const w = window.innerWidth - noBtn.offsetWidth - 40;
    const h = window.innerHeight - noBtn.offsetHeight - 80;
    const x = Math.max(8, Math.floor(Math.random() * w));
    const y = Math.max(60, Math.floor(Math.random() * h));
    noBtn.style.position='fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top  = y + 'px';
    // shape change and shrink
    noBtn.style.transition = 'transform .18s ease, left .18s ease, top .18s ease';
    const scale = Math.max(0.45, 1 - noEscapes*0.08);
    const radius = 12 + Math.floor(Math.random()*40);
    noBtn.style.transform = `scale(${scale})`;
    noBtn.style.borderRadius = radius + 'px';
    // show small tease popups
    showTeasePopup();
  }

  noBtn.addEventListener('mouseenter', (e) => {
    dodgeNo();
  });

  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // temporarily disable, play playful message
    noBtn.disabled = true;
    result.textContent = "You can't just say no that easily.";
    setTimeout(()=> { noBtn.disabled = false; result.textContent = "Click a button. Be honest."; }, 1300);
  });

  // show small teasing text near edges
  function showTeasePopup(){
    const t = pick(noTeases);
    const el = document.createElement('div');
    el.className = 'tease';
    el.textContent = t;
    el.style.position='fixed';
    // random side
    if(Math.random()>0.5){
      el.style.left = (Math.random()*20 + 10) + 'px';
      el.style.top = (Math.random()*80 + 10) + 'vh';
    } else {
      el.style.right = (Math.random()*20 + 10) + 'px';
      el.style.top = (Math.random()*80 + 10) + 'vh';
    }
    el.style.padding='8px 10px';
    el.style.background='rgba(255,255,255,0.9)';
    el.style.borderRadius='10px';
    el.style.boxShadow='0 10px 30px rgba(6,16,36,0.06)';
    el.style.color='#061024';
    el.style.fontWeight='700';
    el.style.zIndex = 140;
    el.style.pointerEvents = 'none';
    document.body.appendChild(el);
    // fade out
    setTimeout(()=> { el.style.transition='opacity .9s'; el.style.opacity=0; }, 900);
    setTimeout(()=> el.remove(), 1900);
  }

  // occasional floating compliments behind UI
  function spawnFloatingCompliment(){
    const text = pick(randomCompliments);
    const el = document.createElement('div');
    el.className = 'floatComp';
    el.textContent = text;
    el.style.position='absolute';
    el.style.left = (10 + Math.random()*80) + '%';
    el.style.top  = (30 + Math.random()*50) + '%';
    el.style.padding='6px 8px';
    el.style.background='rgba(255,255,255,0.6)';
    el.style.borderRadius='10px';
    el.style.fontWeight='700';
    el.style.color='#061024';
    el.style.transform='translateY(0)';
    el.style.opacity = 0;
    floating.appendChild(el);
    // animate in/out
    requestAnimationFrame(()=> {
      el.style.transition = 'opacity .6s, transform 3.4s';
      el.style.opacity = 1;
      el.style.transform = 'translateY(-40px)';
    });
    setTimeout(()=> {
      el.style.opacity = 0;
    }, 2600);
    setTimeout(()=> el.remove(), 3300);
  }
  setInterval(()=> {
    if(Math.random() < 0.45) spawnFloatingCompliment();
  }, 2700);

  // ----------------------------
  // Cursor heart trail (red hearts)
  let heartThrottle = 0;
  document.addEventListener('mousemove', (e) => {
    heartThrottle++;
    if(heartThrottle % 3 !== 0) return; // throttle
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.color = '#ff3b6b';
    heart.style.fontSize = (10 + Math.random()*12) + 'px';
    document.body.appendChild(heart);
    const dx = (Math.random()*60-30);
    const anim = heart.animate([
      { transform: 'translate(0,0) scale(1)', opacity:1 },
      { transform: `translate(${dx}px,-60px) scale(0.6)`, opacity:0 }
    ], { duration: 900 + Math.random()*500, easing:'cubic-bezier(.2,.8,.2,1)'});
    anim.onfinish = ()=> heart.remove();
  });

  // --- modal open/close and fix scrolling ---
  faqBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
  modalCloseTop.addEventListener('click', closeModal);
  document.getElementById('modalNever').addEventListener('click', () => {
    closeModal(true);
  });

  function openModal(){
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // randomize bottom never button text
    modalNever.textContent = pick(modalClosers);
    // ensure modal content scroll is enabled
    const mb = document.querySelector('.modal-body');
    mb.scrollTop = 0;
  }
  function closeModal(flag){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(flag) {
      // small shrug/funny feedback
      result.textContent = "This is awkward... but okay.";
    }
  }

  // clicking outside modal-content closes
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
  });

  // Tell me more link inside main correctly focuses/opens modal
  // (already mapped)

  // --- contact form: basic handling (no backend) ---
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // just show a little thank you overlay
    showRizzOverlay("Thanks! I might not see i still working on this thing");
    // clear
    contactForm.reset();
  });
  mailtoBtn.addEventListener('click', ()=> {
    const subject = encodeURIComponent("Hello from the site");
    const body = encodeURIComponent("Hi Kayra,\n\nI wanted to say hello.\n\n—");
    window.location.href = `mailto:koztr58@gmail.com?subject=${subject}&body=${body}`;
  });

  // ambient toggle
  soundToggle.addEventListener('click', ()=>{
    if(ambient.paused){ ambient.volume = 0.12; ambient.play(); soundToggle.textContent = '🔊'; }
    else { ambient.pause(); soundToggle.textContent = '🔈'; }
  });

  // random compliments when hovering yes? or periodic handled above
  // update title rizz variants each load
  const titleVariants = [
    "Will you go out with me? — I'll make it worth your while",
    "Will you go out with me? — I promise bad jokes and good snacks",
    "Will you go out with me? — Could be fun, could be chaos",
    "Will you go out with me? — For real this time",
    "Will you go out with me? — Say yes and let’s find out"
  ];
  document.getElementById('mainTitle').textContent = pick(titleVariants);

  // small helper overlay rizz on page load
  setTimeout(()=> showRizzOverlay(pick(yesPhrases)), 1400);

  // ensure modal content scroll works on touch by preventing passive issues (mostly OK)
  // also fix small layout for mobile on load
  window.addEventListener('load', ()=> {
    // quick positioning fix for noBtn if it overlaps header
    const nr = noBtn.getBoundingClientRect();
    if(nr.top < 80){ noBtn.style.top = (window.innerHeight/2 + 40) + 'px'; noBtn.style.left = (window.innerWidth/2 + 40) + 'px'; }
  });
})();
