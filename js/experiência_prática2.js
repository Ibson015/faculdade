const hambtn = document.getElementById('hambtn');
    const mobileMenu = document.getElementById('mobileMenu');

    hambtn && hambtn.addEventListener('click', ()=>{
      const open = mobileMenu.hasAttribute('hidden');
      if(open){ mobileMenu.removeAttribute('hidden'); hambtn.setAttribute('aria-expanded','true'); } else { mobileMenu.setAttribute('hidden',''); hambtn.setAttribute('aria-expanded','false'); }
    });

    function showToast(message = 'Mensagem'){
      const wrap = document.getElementById('toastWrap');
      const t = document.createElement('div');
      t.className = 'toast';
      t.textContent = message;
      wrap.appendChild(t);
      setTimeout(()=>{ t.style.opacity = '0'; t.style.transform = 'translateY(12px)'; setTimeout(()=>t.remove(),400) }, 3000);
    }

    const modal = document.getElementById('modal');
    function openModal(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
    function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow='auto'; }
    modal && modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

    const form = document.getElementById('demoForm');
    form && form.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      let valid=true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const nameErr = document.getElementById('nameErr');
      const emailErr = document.getElementById('emailErr');
      nameErr.textContent=''; emailErr.textContent='';
      name.classList.remove('field-error'); email.classList.remove('field-error');

      if(name.value.trim().length < 2){ valid=false; name.classList.add('field-error'); nameErr.textContent='Digite seu nome (min 2 caracteres)'; }
      const mailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if(!mailRe.test(email.value)){ valid=false; email.classList.add('field-error'); emailErr.textContent='Email inválido'; }

      if(valid){ showToast('Formulário enviado com sucesso!'); form.reset(); }
    });

    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){ closeModal(); }
    });
