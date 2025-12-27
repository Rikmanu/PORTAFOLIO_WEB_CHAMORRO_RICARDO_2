document.addEventListener('DOMContentLoaded', () => {
    // 1. SCROLL SUAVE PARA ENLACES DE NAVEGACIÓN
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. INICIAR EFECTO DE TIPADO EN LA SECCIÓN HERO
    startTypingAnimation();
});


// Función para la animación de texto auto-tipado
function startTypingAnimation() {
    // 💥 AHORA ESTO COINCIDE CON EL HTML MODIFICADO
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    // Lista de roles a mostrar (edita estas frases si lo necesitas)
    const roles = [
        "Especialista en Soluciones Tecnológicas (Web/IA).",
        "Investigador de Alto Impacto.",
        "Programador de Investigación Certificado."
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        // Texto completo del rol actual
        const currentRole = roles[roleIndex];
        
        // Determina la acción: escribir o borrar
        if (isDeleting) {
            textElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Borra más rápido
        } else {
            textElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Escribe a velocidad normal
        }

        // Lógica de transición (Terminó de escribir o borrar)
        if (!isDeleting && charIndex === currentRole.length) {
            // Espera al final de la frase y empieza a borrar
            typingSpeed = 2000; // Espera 2 segundos
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Terminó de borrar, pasa al siguiente rol y empieza a escribir
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pausa antes de empezar la siguiente frase
        }

        setTimeout(type, typingSpeed);
    }

    // Iniciar la animación
    type();
}