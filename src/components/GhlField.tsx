/**
 * Campo invisible para enviar un dato al seguimiento de GHL.
 *
 * "name" debe ser la clave del campo en GHL (Configuración → Campos personalizados → Clave única,
 * la parte después de "contact."). Se usa un campo de texto (no "hidden") porque el script de GHL
 * ignora los campos de tipo "hidden".
 */
const GhlField = ({ name, value }: { name: string; value: string }) => (
  <input
    type="text"
    name={name}
    value={value}
    readOnly
    tabIndex={-1}
    aria-hidden="true"
    autoComplete="off"
    className="sr-only"
  />
);

export default GhlField;
