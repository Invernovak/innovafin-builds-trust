/**
 * Botón flotante de WhatsApp (esquina inferior derecha, en todas las páginas).
 *
 * PARA ACTIVARLO: escribe el número con indicativo y sin espacios ni "+",
 * por ejemplo '573001234567'. Mientras esté vacío, el botón se muestra pero no abre nada.
 */
const WHATSAPP_NUMBER = '';
const WHATSAPP_MESSAGE = 'Hola, quiero más información sobre Innovafin.';

const WhatsAppButton = () => {
  const href = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : '#';

  return (
    <a
      href={href}
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      {...(WHATSAPP_NUMBER
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : { onClick: (e: React.MouseEvent) => e.preventDefault() })}
      className="group fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40"
    >
      {/* Onda animada alrededor */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
      <span className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] ring-4 ring-white/80 shadow-xl transition-transform duration-300 group-hover:scale-110">
        {/* Logotipo de WhatsApp */}
        <svg viewBox="0 0 32 32" className="w-7 h-7 md:w-8 md:h-8 fill-white" aria-hidden="true">
          <path d="M16.004 3C8.82 3 3 8.82 3 16.002c0 2.293.6 4.53 1.74 6.5L3 29l6.66-1.716a12.95 12.95 0 0 0 6.34 1.62h.004C23.184 28.904 29 23.084 29 15.902 29 8.72 23.184 3 16.004 3Zm0 23.71h-.004a10.77 10.77 0 0 1-5.49-1.503l-.394-.234-3.952 1.018 1.056-3.85-.257-.395a10.73 10.73 0 0 1-1.65-5.744c0-5.936 4.832-10.766 10.776-10.766 5.94 0 10.77 4.73 10.77 10.666 0 5.936-4.83 10.808-10.855 10.808Zm5.906-8.07c-.324-.162-1.916-.946-2.212-1.054-.297-.108-.513-.162-.729.162-.216.324-.837 1.054-1.026 1.27-.189.216-.378.243-.702.081-.324-.162-1.368-.504-2.606-1.608-.963-.859-1.613-1.92-1.802-2.244-.189-.324-.02-.499.142-.66.146-.145.324-.378.486-.567.162-.189.216-.324.324-.54.108-.216.054-.405-.027-.567-.081-.162-.729-1.756-.999-2.404-.263-.632-.53-.546-.729-.556l-.621-.011a1.19 1.19 0 0 0-.864.405c-.297.324-1.134 1.108-1.134 2.702 0 1.594 1.161 3.134 1.323 3.35.162.216 2.285 3.488 5.535 4.892.773.334 1.377.533 1.848.683.776.247 1.483.212 2.041.129.623-.093 1.916-.783 2.186-1.54.27-.756.27-1.404.189-1.54-.081-.135-.297-.216-.621-.378Z" />
        </svg>
      </span>
    </a>
  );
};

export default WhatsAppButton;
