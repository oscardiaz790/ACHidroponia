// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MENÚ HAMBURGUESA =====
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('activo');
  navLinks.classList.toggle('abierto');
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('activo');
    navLinks.classList.remove('abierto');
  });
});

// ===== SCROLL SUAVE A SECCIONES =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute('href'));
    if (destino) {
      const offsetTop = destino.offsetTop - 70;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ===== ANIMACIONES FADE-IN AL HACER SCROLL =====
const elementosFadeIn = document.querySelectorAll('.fade-in');

const observador = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      observador.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

elementosFadeIn.forEach(el => observador.observe(el));

// ===== CONTADOR ANIMADO EN HERO =====
function animarContador(elemento, fin, duracion) {
  let inicio = 0;
  const incremento = fin / (duracion / 16);
  const intervalo = setInterval(() => {
    inicio += incremento;
    if (inicio >= fin) {
      elemento.textContent = fin + (elemento.dataset.sufijo || '');
      clearInterval(intervalo);
    } else {
      elemento.textContent = Math.floor(inicio) + (elemento.dataset.sufijo || '');
    }
  }, 16);
}

const statsObservador = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-numero').forEach(stat => {
        const valor = parseInt(stat.dataset.valor);
        animarContador(stat, valor, 1500);
      });
      statsObservador.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObservador.observe(heroStats);

// ===== FORMULARIO DE CONTACTO =====
const formulario = document.getElementById('formularioContacto');
const mensajeExito = document.getElementById('mensajeExito');

if (formulario) {
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const btnEnviar = formulario.querySelector('.btn-enviar');
    btnEnviar.textContent = 'Enviando...';
    btnEnviar.disabled = true;

    // Simulación de envío (aquí puedes conectar tu backend o EmailJS)
    setTimeout(() => {
      formulario.reset();
      btnEnviar.textContent = '✓ Mensaje Enviado';
      btnEnviar.style.backgroundColor = 'var(--verde-oscuro)';
      mensajeExito.style.display = 'block';

      setTimeout(() => {
        btnEnviar.textContent = 'Enviar Mensaje';
        btnEnviar.disabled = false;
        btnEnviar.style.backgroundColor = '';
        mensajeExito.style.display = 'none';
      }, 4000);
    }, 1500);
  });
}

// ===== BADGE HORARIO (Abierto / Cerrado) =====
function actualizarHorario() {
  const badge = document.getElementById('badgeHorario');
  if (!badge) return;

  // Hora actual en Paraguay (UTC-4)
  const ahora = new Date();
  const py = new Date(ahora.toLocaleString('en-US', { timeZone: 'America/Asuncion' }));
  const dia = py.getDay();   // 0=Domingo, 1=Lunes ... 6=Sábado
  const hora = py.getHours();
  const minutos = py.getMinutes();
  const horaDecimal = hora + minutos / 60;

  // Lunes(1) a Sábado(6), de 7:00 a 18:00
  const esDiaLaboral = dia >= 1 && dia <= 6;
  const esHoraLaboral = horaDecimal >= 7 && horaDecimal < 18;

  if (esDiaLaboral && esHoraLaboral) {
    badge.textContent = '✅ Abierto ahora';
    badge.style.backgroundColor = 'var(--verde-menta)';
    badge.style.color = 'var(--verde-medio)';
    badge.style.borderColor = 'var(--verde-suave)';
  } else {
    badge.textContent = '🔴 Cerrado ahora';
    badge.style.backgroundColor = '#fdecea';
    badge.style.color = '#c0392b';
    badge.style.borderColor = '#f5c6c2';
  }
}

actualizarHorario();
setInterval(actualizarHorario, 60000); // revisa cada minuto
const anioEl = document.getElementById('anioActual');
if (anioEl) anioEl.textContent = new Date().getFullYear();
