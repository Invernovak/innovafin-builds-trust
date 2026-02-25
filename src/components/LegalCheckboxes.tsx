
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LegalCheckboxesProps {
    authChecked: boolean;
    onAuthChange: (checked: boolean) => void;
    termsChecked: boolean;
    onTermsChange: (checked: boolean) => void;
    className?: string;
    itemClassName?: string;
    labelClassName?: string;
    linkClassName?: string;
}

export function LegalCheckboxes({
    authChecked,
    onAuthChange,
    termsChecked,
    onTermsChange,
    className = "",
    itemClassName,
    labelClassName,
    linkClassName,
}: LegalCheckboxesProps) {
    const defaultItemClass = "flex items-start space-x-3";
    const finalItemClass = itemClassName !== undefined ? itemClassName : defaultItemClass;

    const defaultLabelClass = "text-xs text-muted-foreground/90 cursor-pointer leading-tight";
    const finalLabelClass = labelClassName !== undefined ? labelClassName : defaultLabelClass;

    const defaultLinkClass = "p-0 h-auto font-normal text-xs text-muted-foreground/90 underline underline-offset-4 decoration-muted-foreground/50 hover:text-foreground hover:decoration-foreground justify-start transition-colors";
    const finalLinkClass = linkClassName !== undefined ? linkClassName : defaultLinkClass;

    return (
        <div className={cn("space-y-4", className)}>
            {/* Authorization Checkbox */}
            <div className={finalItemClass}>
                <Checkbox
                    id="authHandling"
                    checked={authChecked}
                    onCheckedChange={(checked) => onAuthChange(checked === true)}
                    className="mt-0.5 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground border-primary/50 dark:border-white/20"
                    required
                />
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 leading-tight mt-0.5">
                    <label
                        htmlFor="authHandling"
                        className={finalLabelClass}
                    >
                        Autorizo el tratamiento de mis datos personales. *
                    </label>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" className={finalLinkClass}>
                                (Ver Autorización de Manejo de Datos)
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh]">
                            <DialogHeader>
                                <DialogTitle>Autorización de Tratamiento de Datos Personales</DialogTitle>
                                <DialogDescription>
                                    Por favor lea detenidamente nuestra política de tratamiento de datos.
                                </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh] w-full rounded-md border p-4 bg-background">
                                <div className="text-sm space-y-4 text-foreground/80">
                                    <p>La presente política se aplicará a todos los datos personales, bases de datos y/o archivos que contengan datos personales que sean objeto de tratamiento por parte de Innovafin S.A.S. (en adelante simplemente “Innovafin”) y cualquier otro dato que sea susceptible de ser tratado por Innovafin en desarrollo de su objeto social o con ocasión de cualquier tipo de relación civil, laboral o comercial que llegue a surgir en virtud de sus actividades conexas o propias de su actividad empresarial.</p>

                                    <h3 className="font-bold text-foreground">1. RESPONSABLE DEL TRATAMIENTO DE DATOS PERSONALES</h3>
                                    <p>
                                        <strong>Nombre:</strong> Innovafin S.A.S.<br />
                                        <strong>NIT:</strong> 901.165.197-9<br />
                                        <strong>Domicilio:</strong> Santiago de Cali – Colombia<br />
                                        <strong>Dirección:</strong> Calle 25 # 98-414 Piso 15 – Edificio Empresarial Jardín Central 2<br />
                                        <strong>Correo Electrónico:</strong> juridico@innovafin.com.co
                                    </p>

                                    <h3 className="font-bold text-foreground">2. TRATAMIENTO Y FINALIDAD</h3>
                                    <h4 className="font-semibold text-foreground">2.1. TRATAMIENTO DE DATOS PERSONALES Y FINALIDADES</h4>
                                    <p>De acuerdo con las disposiciones legales y conforme a las autorizaciones impartidas por los titulares, Innovafin realizará operaciones o conjunto de operaciones que incluyen la recolección de datos, su almacenamiento, uso, circulación y supresión de datos personales exclusivamente para las finalidades autorizadas y previstas en la presente política, así como las específicas otorgadas por parte de los titulares. De la misma forma, Innovafin tratará los datos personales cuando exista una obligación legal o contractual para ello, siempre bajo los lineamientos internos y con plena observancia del marco legal aplicable.</p>
                                    <p>De manera general, Innovafin tratará los datos personales de los titulares para los siguientes fines:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Tramitar la vinculación ante la compañía en cumplimiento a las políticas internas y disposiciones legales en materia de conocimiento del cliente y la prevención del riesgo de lavado de activos, la financiación del terrorismo y la financiación de la proliferación de armas de destrucción masiva.</li>
                                        <li>(b) Conformar bases de datos necesarias para el desarrollo de los procesos interno de la compañía y el mantenimiento de las relaciones legales o contractuales. Asimismo, para actualizar bases de bases de datos, incluyendo los casos en que se requiera transmitir o transferir a un tercero, la información para la validación, depuración, enriquecimiento y homogenización de datos, previo cumplimiento de las exigencias legales.</li>
                                        <li>(c) Efectuar labores de mercadeo, estudios, estadísticas, realizar muestreos, análisis de tendencias, encuestas e investigaciones comerciales y de servicio, de riesgos, realizar pruebas, utilizar modelos matemáticos, identificar, recolectar y asociar información sobre intereses y hábitos de utilización de los productos o servicios y derivar conclusiones o determinar tendencias para ser aprovechadas por la compañía o compartidas con aliados comerciales para los fines previstos en la presente finalidad.</li>
                                        <li>(d) Comunicar, publicitar u ofrecer servicios de las empresas o entidades filiales, subsidiarias, vinculadas o partes relacionadas, actuales y futuras de Innovafin, para generar contacto comercial con el titular y darle a conocer los beneficios de dichas empresas o entidades.</li>
                                        <li>(e) Manejar cualquier información personal, financiera, crediticia, comercial, sensible, privada y semiprivada del titular en una o varias bases de datos para identificar al titular, hacer perfilamientos o segmentaciones a partir de la utilización de productos o servicios.</li>
                                        <li>(f) Transmitir, transferir, enviar, procesar, almacenar o enviar a proveedores de Innovafin nacionales o internacionales que presten servicios logísticos, oferta de seguros, administrativos, tecnológicos, de distribución, marketing, contact center, que actuarán como encargados del tratamiento.</li>
                                        <li>(g) Establecer, mantener, cumplir o terminar la relación contractual con el titular de los datos personales y aprovechar dichos datos como medio de prueba en controversias entre las partes.</li>
                                        <li>(h) Programar y celebrar reuniones presenciales o no presenciales.</li>
                                        <li>(i) Contactar a los titulares que visiten la página web de la compañía, diligencien formularios electrónicos, o interactúen a través de canales digitales, con el fin de atender solicitudes, ampliar información sobre los servicios ofrecidos, realizar seguimiento comercial y mantener comunicación posterior sobre productos, servicios, eventos o novedades de la compañía.</li>
                                    </ul>
                                    <p>Por otra parte, los datos personales serán tratados de acuerdo con el grupo de interés y en proporción a la finalidad o finalidades que tenga cada tratamiento como se describe a continuación:</p>

                                    <h4 className="font-semibold text-foreground">2.1.1. CLIENTES Y USUARIOS</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Para la individualización e interacción con Innovafin en las tratativas preliminares o etapa previa a cualquier relación comercial.</li>
                                        <li>(b) Para el manejo de la relación comercial y el cumplimiento de las obligaciones legales y contractuales.</li>
                                        <li>(c) Controlar las solicitudes relacionadas con los servicios prestados por la compañía.</li>
                                        <li>(d) Gestionar, analizar y responder a los derechos de petición formulados a la entidad.</li>
                                        <li>(e) Adelantar las acciones judiciales o extrajudiciales originadas en controversias de origen contractual o extracontractual.</li>
                                        <li>(f) Actualizar bases de bases de datos, incluyendo los casos en que se requiera transmitir o transferir a un tercero, la información para la validación, depuración, enriquecimiento y homogenización de datos, previo cumplimiento de las exigencias legales.</li>
                                        <li>(g) Presentar reportes e informes a entidades de supervisión y control que permitan dar cumplimiento a las exigencias legales.</li>
                                        <li>(h) Gestionar la información necesaria para el cumplimiento de las obligaciones tributarias, contractuales, comerciales y de registros comerciales, corporativos y contables, tales como el reporte de información exógena, la presentación de declaraciones tributarias, entre otras.</li>
                                        <li>(i) Transmitir la información a encargados nacionales o internacionales con los que se tenga una relación operativa que provean los servicios necesarios para la debida operación de la compañía, tales como cloud computing, outsourcing, proveedores de softwares, entre otros.</li>
                                        <li>(j) Evaluar la calidad de los servicios prestados.</li>
                                        <li>(k) Grabar las imágenes o cualquier otro registro que sirva de soporte y evidencia de los eventos o reuniones realizadas, controlar el acceso de ingreso a las instalaciones físicas, monitorear la seguridad física, higiene e industrial en las instalaciones físicas, y en general mantener soporte de la interacción entre las partes.</li>
                                    </ul>

                                    <h4 className="font-semibold text-foreground">2.1.2. VISITANTES DEL SITIO WEB Y CANALES DIGITALES</h4>
                                    <p>Innovafin podrá recolectar datos personales a través de su página web, formularios electrónicos, suscripciones a boletines informativos, canales de contacto, chats, correo electrónico corporativo y demás medios digitales.</p>
                                    <p>Los datos personales recopilados a través de estos medios serán tratados para:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Atender y responder solicitudes, consultas o requerimientos.</li>
                                        <li>(b) Establecer y mantener contacto comercial presente o futuro.</li>
                                        <li>(c) Enviar información institucional, comercial o publicitaria sobre los servicios de la compañía.</li>
                                        <li>(d) Remitir boletines informativos (newsletter), invitaciones a eventos, actualizaciones normativas o contenidos de interés.</li>
                                        <li>(e) Realizar análisis estadísticos y medición del uso del sitio web, cuando aplique.</li>
                                    </ul>

                                    <h4 className="font-semibold text-foreground">2.1.3. CANDIDATOS DE TRABAJO, EMPLEADOS Y EXEMPLEADOS</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Para evaluar la posibilidad de celebrar un contrato de trabajo, lo cual incluye, pero sin limitar el estudio de los antecedentes del candidato, la verificación de la información de la hoja de vida, la confirmación de los títulos académicos y experiencia, la preparación y práctica de evaluaciones de conocimiento, ordenar exámenes médicos de ingreso, entre otros.</li>
                                        <li>(b) Realizar las actividades necesarias orientadas a dar cumplimiento de las obligaciones legales que le corresponden a Innovafin como empleador.</li>
                                        <li>(c) Conformar, organizar y administrar la historia laboral de los empleados y conservar los archivos de los exempleados.</li>
                                        <li>(d) Cumplir con las obligaciones, cotizaciones, contribuciones parafiscales y novedades del Sistema General de Seguridad Social.</li>
                                        <li>(e) Conformar el directorio interno con la finalidad de comunicación con y entre los empleados.</li>
                                        <li>(f) Informar y comunicar las generalidades de los eventos desarrollados por Innovafin por los medios y en las formas que se consideren convenientes.</li>
                                        <li>(g) Impartir instrucciones y comunicar directrices de carácter general o particular a los empleados.</li>
                                        <li>(h) Gestionar los presupuestos de las áreas y posiciones al interior de la compañía, y en general, gestionar el proceso contable de Innovafin.</li>
                                        <li>(i) Asignar usuarios de acceso y controlar la actividad de estos dentro de los aplicativos y redes de Innovafin.</li>
                                        <li>(j) Adelantar las actividades de control interno.</li>
                                        <li>(k) Reportar información y atender requerimientos de las autoridades fiscales y parafiscales en cumplimiento de las disposiciones legales aplicables a la materia.</li>
                                        <li>(l) Generar, enviar o entregar certificados de índole laboral, incluyendo pero sin limitar a: certificados laborales, tipo de contrato de trabajo, certificados de ingresos y retenciones, certificado de antigüedad, certificado de funciones, entre otros.</li>
                                        <li>(m) Presentar y hacer valer pruebas en procesos judiciales o administrativos adelantados por o en contra de la entidad.</li>
                                        <li>(n) Adelantar investigaciones y procedimientos disciplinarios en el marco de la legislación laboral, del reglamento interno de trabajo y de los procedimientos internos asociados a la administración del recurso humano.</li>
                                        <li>(o) Compartir los datos personales a clientes o proveedores con el propósito de interactuar en la ejecución de las relaciones comerciales, efectuar visitas, ejecutar auditorías, investigar faltas disciplinarias, facilitar el acceso a las instalaciones, programar y llevar a cabo reuniones de trabajo, programar y llevar a cabo eventos sociales, celebrar alianzas comerciales.</li>
                                        <li>(p) Compartir los datos a proveedores de servicios de nómina con los cuales Innovafin establezca relación comercial con el propósito de procesar la liquidación de salarios, deducciones y retenciones, liquidación de los contratos de trabajo por terminación, elaboración y generación de reportes de nómina que se deban transmitir a las autoridades fiscales, generación de certificados laborales, generación de certificados de ingresos y retenciones, la afiliación y reporte de novedades ante las entidades de la seguridad social, parafiscal y prestacional (EPS, ARL, AFP, Caja de Compensación, Fondo de Cesantías, entre otros), y en general, toda clase de servicios que implique la tercerización de la nómina.</li>
                                    </ul>
                                    <p>Para el caso de los participantes en convocatorias de selección de personal, los datos personales tratados tendrán la finalidad adelantar las gestiones de los procesos de selección; las hojas de vida se gestionarán garantizando el principio de acceso restringido. Los datos personales recopilados en procesos de selección se tratarán únicamente durante el tiempo que dure la convocatoria y hasta un año adicional.</p>
                                    <p>En caso de datos biométricos capturados a través de sistemas de videovigilancia, grabación o especiales, su tratamiento tendrá como finalidad la identificación, seguridad y la prevención de fraude interno y externo.</p>
                                    <p>Los datos personales de empleados podrán ser compartidos con (i) proveedores de servicios de nómina para el procesamiento, liquidación y pago de salarios, prestaciones sociales, retenciones, indemnizaciones, bonificaciones y demás cargos asociados a la nómina; (ii) abogados para adelantar acciones judiciales o ejercer la defensa de la compañía en procesos judiciales o administrativos; y, (iii) clientes y proveedores para adelantar procesos de auditoría o desarrollar actividades propias de las relaciones comerciales con estos. Todos estos tendrán la condición de encargados de tratamiento y estarán sujetos a la aplicación de esta política.</p>

                                    <h4 className="font-semibold text-foreground">2.1.4. PROVEEDORES Y CONTRATISTAS</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Para todos los fines relacionados con el objeto de los procesos de selección, contractuales o relacionados con éstos.</li>
                                        <li>(b) Realizar todos los trámites internos y el cumplimiento de obligaciones contables, tributarias y de ley.</li>
                                        <li>(c) Gestionar los pagos que se ocasionen como consecuencia de la relación comercial o el pago de indemnizaciones, emisión de certificados de ingresos y retenciones y relaciones de pagos.</li>
                                        <li>(d) Gestionar el proceso contable de la entidad.</li>
                                        <li>(e) Realizar todas las actividades necesarias para el cumplimiento de las diferentes etapas contractuales en las relaciones con proveedores y contratistas.</li>
                                        <li>(f) Expedir las certificaciones contractuales solicitadas por los contratistas de la entidad o solicitudes de los entes de control.</li>
                                        <li>(g) Mantener un archivo digital que permita contar con la información correspondiente a cada contrato.</li>
                                        <li>(h) Reportar información a las autoridades fiscales o administrativas en cumplimiento de obligaciones legales.</li>
                                        <li>(i) Cumplir con las políticas internas en materia de seguridad de la información y de prevención de lavado de activos.</li>
                                    </ul>

                                    <h4 className="font-semibold text-foreground">2.1.5. ACCIONISTAS, MIEMBROS DE JUNTA DIRECTIVA Y MIEMBROS EXTERNOS DE COMITÉS</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Para todos los fines relacionados con la convocatoria a reuniones.</li>
                                        <li>(b) La autorización al ingreso de reuniones, incluyendo la individualización de la persona al momento de verificación de la identidad para efectos de establecer el quorum.</li>
                                        <li>(c) Efectuar la inscripción de los nombramientos en el registro mercantil cuando corresponda según disposición legal.</li>
                                        <li>(d) Conformar el libro de registro de accionistas de conformidad con las previsiones legales aplicables.</li>
                                        <li>(e) Generar las certificaciones que correspondan a favor de terceros en cumplimiento de las disposiciones legales en materia de conocimiento del cliente y prevención del lavado de activos y la financiación del terrorismo.</li>
                                        <li>(f) Para conformar el registro de beneficiarios finales de conformidad con las disposiciones legales aplicables y transmitir a las autoridades correspondientes.</li>
                                        <li>(g) Realizar todos los trámites internos y el cumplimiento de obligaciones contables, tributarias y de ley.</li>
                                        <li>(h) Gestionar los pagos que se ocasionen como consecuencia de la relación con Innovafin o el pago de indemnizaciones, emisión de certificados de ingresos y retenciones y relaciones de pagos.</li>
                                    </ul>

                                    <h4 className="font-semibold text-foreground">2.1.6. REPRESENTANTES, APODERADOS O DIPUTADOS DE PERSONAS JURÍDICAS</h4>
                                    <p>Los datos personales relativos a los representantes legales, apoderados o cualquier diputado de una persona jurídica que entable una relación comercial con Innovafin serán recopilados y tratados únicamente con el propósito de determinar las facultades para representar a la persona jurídica, conocer sus atribuciones y limitaciones, así como también para cumplir las disposiciones legales asociadas a la prevención del lavado de activos. Sin perjuicio de que la información de los representantes legales o apoderados de personas jurídicas consten en registros públicos como el registro mercantil o en instrumentos públicos como las escrituras públicas, Innovafin dará tratamiento a los datos personales acorde con esta política y conforme a sus manuales y procedimientos internos. La suscripción de contratos y otros documentos con Innovafin por parte de los representantes legales, apoderados o diputados serán considerados como conductas inequívocas a través de las cuales confieren su autorización para efectuar el tratamiento de sus datos personales al amparo de esta política.</p>

                                    <h3 className="font-bold text-foreground">2.2. SUMINISTRO DE DATOS PERSONALES A TERCEROS</h3>
                                    <p>Innovafin podrán compartir con terceros los datos personales en los casos en que sea necesario para el cumplimiento de una obligación legal o contractual, o por iniciativa concertada con el destinatario, y bajo las finalidades previstas en esta política, entre otros, en los siguientes casos:</p>

                                    <h4 className="font-semibold text-foreground">2.2.7. PROVEEDORES DE SERVICIOS</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Casas de cobranza o abogados externos.</li>
                                        <li>(b) Centrales de información.</li>
                                        <li>(c) Proveedores de mensajería.</li>
                                        <li>(d) Proveedores de comunicaciones masivas.</li>
                                        <li>(e) Centros de procesamiento de información.</li>
                                        <li>(f) Administradores de Redes Sociales.</li>
                                        <li>(g) Análisis de datos.</li>
                                        <li>(h) Uso de red.</li>
                                        <li>(i) Evaluadores.</li>
                                        <li>(j) Auditores.</li>
                                        <li>(k) Revisoría Fiscal.</li>
                                    </ul>

                                    <h4 className="font-semibold text-foreground">2.2.8. ALIADOS COMERCIALES</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Establecimientos de crédito.</li>
                                        <li>(b) Sociedades de servicios financieros.</li>
                                        <li>(c) Originadores de cartera.</li>
                                        <li>(d) Proveedores de telefonía.</li>
                                        <li>(e) Cajas de compensación.</li>
                                        <li>(f) Instituciones educativas.</li>
                                        <li>(g) Aseguradoras</li>
                                        <li>(h) Comercio y marketing</li>
                                    </ul>
                                    <p>Innovafin garantiza que para compartir los datos personales con terceros (encargados del tratamiento), se toman las medidas de seguridad para evitar el mal uso de la información, que se suscriban los contratos de transmisión de información personal en los caos que se requiere y en todos los contratos de servicios se incluya una cláusula de protección de datos personales.</p>
                                    <p>En el evento que un titular de datos personales decida conocer información específica de alguna de las entidades a las que Innovafin pudiera compartir o haya compartido sus datos personales, puede solicitar dicha información mediante los canales dispuestos en esta política para el ejercicio de sus derechos.</p>
                                    <p>En todo caso, Innovafin exigirá que los terceros que reciban los datos personales asuman la condición de encargados de tratamiento se ocupen de observar diligentemente esta política para efectos de su tratamiento. Asimismo, Innovafin velará porque los encargados de tratamiento supriman los datos personales que le sean compartidos cuando el titular solicite su rectificación o supresión, o cuando culmine la causa que haya dado lugar a compartir los datos personales.</p>

                                    <h3 className="font-bold text-foreground">2.3. TRATAMIENTO DE DATOS SENSIBLES</h3>
                                    <p>Para efectos de esta política se entiende que son datos personales sensibles aquellos que afectan la intimidad del titular o cuyo uso indebido puede generar su discriminación, tales como aquellos que revelen el origen racial o étnico, la orientación política, las convicciones religiosas o filosóficas, la pertenencia a sindicatos, organizaciones sociales, de derechos humanos o que promuevan intereses de cualquier partido político o que garanticen los derechos y garantías de partidos políticos de oposición, así como los datos relativos a la salud, a vida sexual, y datos biométricos.</p>
                                    <p>Adicionalmente, se consideran datos sensibles sin limitar a estos, los datos recolectados y tratados a través de las pruebas psicotécnicas, visitas domiciliarias, estudios de seguridad, que tienen como finalidad determinar el nivel de ajuste entre el perfil y competencias del candidato a la vacante; las imágenes y grabaciones obtenidas por diferentes medios, que tienen como finalidad brindar seguridad de las personas, los bienes e instalaciones, y el monitoreo de las actividades propias de seguridad, las cuales pueden ser empleadas como prueba en cualquier tipo de proceso ante cualquier autoridad, los datos biométricos, los patrones de la voz, la geometría de la mano, el iris, entre otros. Innovafin informará a los titulares que es facultativo responder preguntas sobre datos sensibles y autorizar su tratamiento.</p>
                                    <p>Innovafin no podrá realizar el tratamiento de datos sensibles, excepto cuando (i) el titular haya dado su autorización explícita a dicho tratamiento, salvo en los casos que por ley no sea requerido el otorgamiento de dicha autorización, (ii) el tratamiento sea necesario para salvaguardar el interés vital del titular y este se encuentre física o jurídicamente incapacitado. En estos eventos, los representantes legales deberán otorgar su autorización, (iii) el tratamiento se refiera a datos que sean necesarios para el reconocimiento, ejercicio o defensa de un derecho en un proceso judicial, (iv) el tratamiento tenga una finalidad histórica, estadística o científica. En este evento deberán adoptarse las medidas conducentes a la supresión de identidad de los titulares.</p>
                                    <p>Innovafin informará a través de los diversos medios de obtención de la autorización a todos los titulares de datos personales, que no están obligados a otorgar la autorización para el tratamiento de datos sensibles.</p>

                                    <h4 className="font-semibold text-foreground">2.3.9. FINALIDADES DEL TRATAMIENTO DE ALGUNOS DATOS SENSIBLES</h4>
                                    <p>Los datos sensibles que sean recopilados por Innovafin tienen como finalidad la identificación de las personas, la seguridad, el cumplimiento de obligaciones legales y la adecuada prestación de sus servicios. Sin perjuicio de lo anterior, se establece que los siguientes datos sensibles tendrán las finalidades que a continuación se señalan:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Datos Biométricos: La huella dactilar, la morfología de facial, el iris, la geometría de la mano, la retina, la información vascular, el patrón de escritura, el patrón de la voz, y en general cualquier otra clase de dato biométrico que llegare a ser recopilado por Innovafin, serán tratados con la finalidad de verificar la identidad de la persona, otorgar acceso a las instalaciones de la compañía, formalizar acuerdos o contratos, efectuar la vigilancia y seguridad de las personas, prevenir la comisión de delitos, utilizarlos como medios de prueba en actuaciones judiciales o extrajudiciales, y para efectuar estudios de antecedentes judiciales.</li>
                                        <li>(b) Datos Relativos a la Salud: Los datos relativos a la salud de los empleados de Innovafin serán tratados con la finalidad de efectuar medicina preventiva laboral, evaluación de la capacidad laboral del trabajador, conocer su diagnóstico médico de acuerdo a las funciones desempeñadas en la compañía, para la prestación de asistencia médica en caso de accidentes, para el tratamiento de tipo sanitario o social en cumplimiento de las políticas en materia de higiene y seguridad de la compañía o para el cumplimiento de disposiciones legales en materia de prevención de contagio de enfermedades, para el otorgamiento de licencias de conformidad con la legislación aplicable, para el trámite de incapacidades médicas, para la constitución o toma de pólizas de seguro de vida o de riesgos laborales, utilizarlos como medios de prueba en actuaciones judiciales o extrajudiciales, y para garantizar el cumplimiento de las disposiciones legales relativas a la seguridad y salud en el trabajo. Estos datos también podrán ser tratados sobre los contratistas y empleados de los proveedores de Innovafin cuando aquellos deban desempeñar alguna función o se encuentren en misión en las instalaciones de la compañía, los cuales estarán sometidos a las mismas finalidades aquí señaladas.</li>
                                        <li>(c) La Imagen y la Voz: Innovafin desarrollará actividades que involucren la captura de la imagen y el registro fonográfico de las personas a través de tecnologías que permitan su visualización y reproducción. Tanto la imagen como la voz de las personas podrán ser tratados para la celebración de reuniones virtuales o no presenciales en las que deban interactuar las personas en desarrollo de las actividades de la compañía, lo cual podrá implicar que Innovafin efectúe la grabación en video o en audio de la reunión para su posterior reproducción con fines de consulta, con fines probatorios en trámites judiciales o extrajudiciales, y con fines de registro de la reunión en el marco del sistema de calidad. Las instalaciones de Innovafin estarán sometidas a grabación de videovigilancia con el fin de monitorear la seguridad e integridad de las personas y los activos de información de la compañía; el ingreso de las personas a las instalaciones de Innovafin se manejará como consentimiento del tratamiento de la imagen y de la voz, en el claro entendido de que Innovafin deberá informar a las personas que están siendo grabadas para estos fines y de la facultad de no ingresar a las instalaciones en caso de no autorizar el tratamiento de dichos datos sensibles. Las telecomunicaciones a través de medios provistos por Innovafin podrán ser objeto de grabación; la voz de los empleados de Innovafin podrá ser tratada para el control del flujo de información de la compañía y la protección de la información confidencial. La imagen de los empleados podrá ser retratada para ser publicada en afiches, avisos, tableros, pancartas, folletos, anuarios, calendarios, carteleras y en la página web, para la promoción de los servicios de Innovafin, para la organización de actividades lúdicas, académicas o administrativas al interior de la compañía, la distribución de material de trabajo, lúdico o académico a los trabajadores de la compañía.</li>
                                    </ul>

                                    <h4 className="font-semibold text-foreground">2.3.10. TRATAMIENTO DE DATOS A TRAVÉS DE SISTEMAS DE VIDEOVIGILANCIA</h4>
                                    <p>La Entidad cuenta con cámaras de video vigilancia que tienen como finalidad dar cumplimiento a las políticas de seguridad física, cumpliendo con los parámetros establecidos en la Guía para la Protección de Datos Personales en Sistemas de Videovigilancia expedidas por la Superintendencia de Industria y Comercio. Las imágenes deberán ser conservadas por un tiempo máximo de 90 días. En caso de que la imagen respectiva sea objeto o soporte de una reclamación, queja, o cualquier proceso de tipo judicial, las imágenes se conservarán también hasta el momento en que sea resuelto.</p>

                                    <h4 className="font-semibold text-foreground">2.3.11. DATOS DE MENORES DE EDAD</h4>
                                    <p>Innovafin no podrá efectuar el tratamiento de datos personales menores de edad, excepto cuando se trate de datos de naturaleza pública, y cuando dicho tratamiento cumpla con los siguientes parámetros y/o requisitos: (i) que respondan y respeten el interés superior de los niños, niñas y adolescentes, y (ii) que se asegure el respeto de sus derechos fundamentales.</p>
                                    <p>Cumplidos los anteriores requisitos, el representante legal de los niños, niñas o adolescentes otorgará la autorización, previo ejercicio del menor de su derecho a ser escuchado, opinión que será valorada teniendo en cuenta la madurez, autonomía y capacidad para entender el asunto.</p>

                                    <h3 className="font-bold text-foreground">3. DERECHOS DE LOS TITULARES DE DATOS PERSONALES Y VALIDEZ DEL TRATAMIENTO</h3>
                                    <h4 className="font-semibold text-foreground">3.1. DERECHOS DE LOS TITULARES</h4>
                                    <p>En el tratamiento de datos personales por parte de Innovafin se respetarán en todo momento los derechos de los titulares de datos personales que son:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Conocer, actualizar y rectificar los datos frente a él o los encargados del tratamiento de datos.</li>
                                        <li>(b) Solicitar prueba de la autorización otorgada, o cualquier otra que suscriba el titular de los datos personales para el efecto, salvo cuando expresamente se exceptúe como requisito para el tratamiento de datos de conformidad con la ley.</li>
                                        <li>(c) Ser informado por la entidad o el encargado del tratamiento, previa solicitud, respecto del uso que se le ha dado a los datos.</li>
                                        <li>(d) Presentar ante la autoridad competente quejas por infracciones a lo dispuesto en la ley y las demás normas que la modifiquen, sustituyan o adicionen.</li>
                                        <li>(e) Revocar la autorización y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales. La revocatoria y/o supresión procederá cuando la autoridad competente haya determinado que, en el tratamiento Innovafin o los encargados del tratamiento de datos personales, han incurrido en conductas contrarias a la ley y a la constitución. La revocatoria procederá siempre y cuando no exista la obligación legal o contractual de conservar el dato personal.</li>
                                        <li>(f) Acceder en forma gratuita a los datos personales que hayan sido objeto de tratamiento.</li>
                                    </ul>

                                    <h4 className="font-semibold text-foreground">3.2. AUTORIZACIÓN DEL TITULAR</h4>
                                    <p>Sin perjuicio de las excepciones previstas en la ley, en el tratamiento se requiere la autorización previa e informada del titular, la cual deberá ser obtenida por cualquier medio que pueda ser objeto de consulta posterior. Se entenderá que la autorización cumple con estos requisitos cuando se manifieste (i) por escrito, (ii) de forma oral o (iii) mediante conductas inequívocas del titular que permitan concluir de forma razonable que otorgó la autorización, como cuando, por ejemplo, se remite a la entidad una hoja de vida para participar en procesos de selección o cuando se ingresa a las instalaciones a sabiendas de la existencia de sistemas de videovigilencia.</p>
                                    <p>En todo caso, Innovafin diseñará y dispondrá en formularios, contratos o avisos los textos mediante los cuales se obtenga la autorización del tratamiento de los datos personales de los titulares, los cuales deberán indicar las finalidades a las cuales estarán sometidos los datos personales según el grupo de interés al que corresponda el titular, las cuales en todo caso serán acordes a las definidas en esta política. Tratándose de autorizaciones obtenidas mediante conductas inequívocas, Innovafin deberá informar a los titulares sobre la existencia de esta política y el canal de su consulta.</p>
                                    <p>En el caso de datos recolectados a través del sitio web o canales digitales, la autorización podrá obtenerse mediante mecanismos electrónicos tales como casillas de aceptación, botones de consentimiento, formularios digitales u otros medios tecnológicos que permitan su conservación y posterior consulta. Innovafin podrá utilizar herramientas tecnológicas como cookies o tecnologías similares para mejorar la experiencia de navegación y obtener información estadística sobre el uso del sitio web. Cuando dichas herramientas impliquen el tratamiento de datos personales, se informará al usuario y se obtendrá la autorización correspondiente conforme a la normativa aplicable.</p>

                                    <h3 className="font-bold text-foreground">4. CANAL DE ATENCIÓN DE PETICIONES, CONSULTAS Y RECLAMOS</h3>
                                    <p>La Dirección Jurídica de Innovafin será el área de responsable de la atención de peticiones, consultas y reclamos ante la cual los titulares de información pueden ejercer sus derechos a conocer, actualizar, rectificar y suprimir los datos personales o revocar la autorización. Los canales a través se pueden presentar las peticiones, consultas y reclamos serán los siguientes:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li><strong>Dirección Jurídica:</strong> Calle 25 # 98-414 Piso 15 – Santiago de Cali</li>
                                        <li><strong>Correo electrónico:</strong> juridico@innovafin.co</li>
                                        <li><strong>Página web:</strong> www.innovafin.co opción “Contacto”</li>
                                    </ul>
                                    <p>El área antes mencionada será el contacto de los titulares de datos personales, para todos los efectos previstos en esta política.</p>

                                    <h3 className="font-bold text-foreground">5. PROCEDIMIENTO PARA EJERCER EL DERECHO DE HABEAS DATA</h3>
                                    <p>Los titulares de datos personales, sin importar el tipo de vinculación que tengan con Innovafin, pueden ejercer sus derechos a conocer, actualizar, rectificar y suprimir información y/o revocar la autorización otorgada, de acuerdo con los siguientes procedimientos:</p>

                                    <h4 className="font-semibold text-foreground">5.1. PROCEDIMIENTO DE CONSULTAS</h4>
                                    <p>Innovafin y/o los encargados de tratamiento, garantizan a los titulares de datos personales contenidos en sus bases de datos o a sus causahabientes o personas autorizadas, el derecho de consultar toda la información contenida en su registro individual o toda aquella que esté vinculada con su identificación conforme se establece en la presente política.</p>

                                    <h4 className="font-semibold text-foreground">5.1.1. RESPONSABLE DE ATENCIÓN DE LAS CONSULTAS</h4>
                                    <p>El empleado designado de la Dirección Jurídica será el responsable de recibir y dar trámite a las solicitudes remitidas, en los términos, plazos y condiciones establecidos en la Ley 1581 de 2012 y en la presente política. Las consultas dirigidas a Innovafin deberán contener como mínimo la siguiente información:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Nombres y apellidos del titular y/o su representante y/o causahabientes</li>
                                        <li>(b) Lo que se pretende consultar</li>
                                        <li>(c) Dirección física, electrónica y teléfono de contacto del titular y/o sus causahabientes o representantes</li>
                                        <li>(d) Firma, número de identificación o procedimiento de validación correspondiente</li>
                                        <li>(e) Haber sido presentada por los canales de comunicación indicados en esta política</li>
                                    </ul>
                                    <p>Una vez sea recibida la solicitud de consulta de información por parte del titular de los datos o su representante o tercero debidamente autorizado, a través de los canales establecidos, el área respectiva procederá a verificar que la solicitud contenga todas las especificaciones requeridas a efectos de poder valorar que el derecho se ejerza por un interesado o por un representante de éste, acreditando con ello, que se cuenta con la legitimidad legal para hacerlo.</p>
                                    <p>En caso de que la consulta se presente sin el cumplimiento de los anteriores requisitos, se informará al solicitante dentro de los cinco (5) días siguientes a la recepción de la consulta, para que subsane las fallas y presente la información o documentos faltantes. Transcurridos dos (2) meses desde la fecha del requerimiento sin que el solicitante presente la información requerida, se entenderá que ha desistido de la consulta.</p>

                                    <h4 className="font-semibold text-foreground">5.1.2. PLAZO DE RESPUESTA A LAS CONSULTAS</h4>
                                    <p>Las consultas serán atendidas en un término máximo de diez (10) días hábiles contados a partir de la fecha de su recibo. En caso de imposibilidad de atender la consulta dentro de dicho término, se informará al interesado antes del vencimiento de los diez (10) días, expresando los motivos de la demora y señalando la fecha en que se atenderá su consulta, la cual en ningún caso podrá superar los cinco (5) días hábiles siguientes al vencimiento del primer plazo.</p>

                                    <h4 className="font-semibold text-foreground">5.2. PROCEDIMIENTO DE RECLAMOS</h4>
                                    <h4 className="font-semibold text-foreground">5.2.3. DERECHOS GARANTIZADOS MEDIANTE EL PROCEDIMIENTO DE RECLAMOS:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>(a) Corrección o Actualización: Innovafin y/o los encargados de tratamiento, garantizarán a los titulares de datos personales contenidos en sus bases de datos o a sus causahabientes, el derecho de corregir o actualizar los datos personales que reposen en sus bases de datos, mediante presentación de reclamación, cuando consideren que se cumplen los parámetros establecidos por la ley o los señalados en la presente política para que sea procedente la solicitud de corrección o actualización.</li>
                                        <li>(b) Revocatoria de la Autorización o Supresión de los Datos Personales: Innovafin y/o los encargados de tratamiento garantizarán a los titulares de datos personales contenidos en sus bases de datos o a sus causahabientes el derecho a solicitar la revocatoria de la autorización y la supresión de sus datos personales.</li>
                                    </ul>
                                </div>
                            </ScrollArea>
                            <div className="flex justify-end pt-2">
                                <DialogClose asChild>
                                    <Button onClick={() => onAuthChange(true)} className="bg-primary text-primary-foreground">
                                        Aceptar y Cerrar
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className={finalItemClass}>
                <Checkbox
                    id="termsConditions"
                    checked={termsChecked}
                    onCheckedChange={(checked) => onTermsChange(checked === true)}
                    className="mt-0.5 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground border-primary/50 dark:border-white/20"
                    required
                />
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 leading-tight mt-0.5">
                    <label
                        htmlFor="termsConditions"
                        className={finalLabelClass}
                    >
                        Acepto los términos y condiciones. *
                    </label>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" className={finalLinkClass}>
                                (Ver Términos y Condiciones)
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh]">
                            <DialogHeader>
                                <DialogTitle>Términos y Condiciones</DialogTitle>
                                <DialogDescription>
                                    Condiciones de uso de los servicios de InnovaFin.
                                </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh] w-full rounded-md border p-4 bg-background">
                                <div className="text-sm space-y-4 text-foreground/80">
                                    <p>Al acceder este sitio www.innovafin.co (en adelante el “Portal Web”) y todas las páginas que lo conforman usted está de acuerdo con los términos y condiciones expuestas a continuación. Si usted no está de acuerdo con estos términos y condiciones no ingrese al sitio ni a ninguna de las páginas que lo conforman.</p>

                                    <h3 className="font-bold text-foreground">1. CONDICIONES DE USO PORTAL WEB</h3>
                                    <p>Los siguientes términos de uso (que se denominarán en adelante los “Términos”) regulan el acceso y uso del sitio internet cuyo recurso localizador uniforme (URL) es innovafin.co. Al acceder, leer y/o usar el Portal Web, usted admite haber leído y entendido estos Términos y acuerda obligarse a los mismos, así como a cumplir con todas las leyes y reglamentos que sean aplicables. En consecuencia, al acceder, usar y/o adquirir cualquiera de los productos o servicios ofrecidos en el Portal Web, usted libremente acepta y adhiere expresamente a estos Términos así como todas sus modificaciones y adendas. En el evento en que usted no acepte o se encuentre en desacuerdo con ellos, deberá abandonar el Portal Web de inmediato.</p>
                                    <p>Innovafin S.A.S. (en adelante simplemente “Innovafin”), por intermedio del Portal Web pone, de manera gratuita, su sitio a disposición de los usuarios de la red Internet y en particular a disposición de clientes y proveedores. Sin perjuicio de lo anterior, el acceso o uso de ciertos productos o servicios ofrecidos a través del Portal Web, se podrá realizar a título oneroso y se encuentra sujeto al cumplimiento de las condiciones de reserva y los navegantes se someten en su totalidad a los siguientes Términos:</p>

                                    <h3 className="font-bold text-foreground">2. USO DEL PORTAL WEB</h3>
                                    <p>El usuario se compromete a utilizar Portal Web de conformidad con las leyes de la República de Colombia y con lo dispuesto en estos Términos. El Usuario se abstendrá de utilizar Portal Web con fines o efectos ilícitos, lesivos de los derechos e intereses de terceros, o de realizar actos que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir el normal funcionamiento del Portal Web.</p>
                                    <p>El usuario se abstendrá de utilizar mecanismos automatizados tales como robots, spiders, scrapers u otros dispositivos destinados a extraer, recopilar o reproducir información del Portal Web sin autorización previa y expresa de Innovafin.</p>

                                    <h3 className="font-bold text-foreground">3. MODIFICACIÓN</h3>
                                    <p>Innovafin se reserva el derecho a modificar estos Términos en cualquier momento y sin previo aviso. Toda modificación a estos, entrará en vigencia y tendrá efectos frente a los usuarios desde el momento en que sean publicados en Portal Web. En consecuencia, será obligación del usuario revisar estos Términos cada vez que acceda a Portal Web. Los avisos, reglamentos, circulares o instrucciones de cualquier naturaleza expedidas por Innovafin, publicados en Portal Web, y relacionadas de cualquier forma con el acceso, navegación o uso del Portal Web, así como con el acceso y uso de los productos y/o servicios que en él se ofrecen, serán parte integral de estos Términos y prevalecerán sobre cualquier otra disposición relacionada aun cuando ésta le sea contraria. Las modificaciones entrarán en vigencia a partir de su publicación en el Portal Web y aplicarán hacia el futuro. El uso continuo del Portal Web después de la publicación de cualquier modificación constituirá aceptación de los nuevos términos.</p>

                                    <h3 className="font-bold text-foreground">4. PROPIEDAD INTELECTUAL</h3>
                                    <p>Innovafin ha dispuesto en el Portal Web ciertos contenidos (en adelante los “Contenidos”) tales como mensajes, diseños, banners, botones, códigos fuente, códigos objeto, animaciones, gráficos, archivos de sonido y/o imagen, fotografías, grabaciones, software, marcas, lemas y todas las creaciones del intelecto humano protegidos y protegibles por las normas de Propiedad Intelectual.</p>
                                    <p>Los derechos sobre los signos distintivos, las nuevas creaciones y los derechos de autor sobre los Contenidos son de propiedad de Innovafin o del creador original de los mismos y están plenamente protegidos por las normas nacionales e internacionales de derechos de autor y propiedad intelectual. En consecuencia, salvo lo expresamente señalado en los Términos, el Usuario deberá abstenerse de copiar, divulgar o reproducir de cualquier forma y por cualquier medio los Contenidos y, en general, cualquier clase de material accesible a través del Portal Web, salvo aquellos casos en que Innovafin haya autorizado expresamente su copia o reproducción. Los usuarios deberán abstenerse en todo momento de:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Utilizar los Contenidos con fines contrarios a la ley, a la moral y a las buenas costumbres generalmente aceptadas o al orden público;</li>
                                        <li>Reproducir, copiar, distribuir, permitir el acceso del público a través de cualquier modalidad de comunicación pública, transformar o modificar los Contenidos, a menos que se cuente con la autorización del titular de los correspondientes derechos o ello resulte legalmente permitido;</li>
                                        <li>Suprimir, eludir o manipular cualquiera clase de textos, leyendas o mensajes cuyo objeto sea la protección de los derechos de propiedad intelectual sobre los Contenidos, así como los dispositivos técnicos de protección que pudieren contener los Contenidos;</li>
                                        <li>Emplear los Contenidos y, en particular, la información de cualquier clase obtenida a través del Portal Web para remitir publicidad, comunicaciones con fines de venta directa o con cualquier otra clase de finalidad comercial, mensajes no solicitados dirigidos a una pluralidad de personas con independencia de su finalidad, así como a abstenerse de comercializar los Contenidos.</li>
                                    </ul>
                                    <p>Se autoriza a los usuarios para desplegar en pantalla, copiar los Contenidos únicamente para uso personal no comercial, siempre que los Contenidos no sean modificados de ninguna forma y conserven todas las leyendas de derechos de autor y de otro tipo de propiedad contenidas en los mismos. Esta autorización se revocará de manera automática por la mera liberalidad de Innovafin y con el propósito de proteger los derechos de propiedad intelectual propios o de terceros. Cualquier uso no autorizado de los Contenidos constituye una violación a estos Términos, a las leyes y tratados internacionales en materia de propiedad intelectual.</p>

                                    <h3 className="font-bold text-foreground">5. LICENCIA</h3>
                                    <p>Salvo lo expresamente dispuesto por Innovafin no se concede ninguna licencia o autorización de uso de ninguna clase sobre sus derechos de propiedad intelectual o sobre cualquier otra propiedad o derecho relacionado con Portal Web o sus Contenidos.</p>

                                    <h3 className="font-bold text-foreground">6. DERECHOS DE TERCEROS</h3>
                                    <p>En el caso que cualquier Usuario o un tercero considere que cualquiera de los Contenidos ha sido introducido en el Portal Web con violación de sus derechos de propiedad intelectual, dicho tercero deberá enviar una notificación a Innovafin en la que se informen los siguientes aspectos:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Datos personales: nombre, dirección, número de teléfono y dirección de correo electrónico del reclamante;</li>
                                        <li>Firma auténtica o equivalente, con los datos personales del titular de los derechos de propiedad intelectual que de manera probable fueren infringidos o de la persona autorizada para actuar en nombre y por cuenta del titular de los derechos de propiedad intelectual;</li>
                                        <li>Indicación precisa y completa de los Contenidos protegidos mediante los derechos de propiedad intelectual supuestamente infringidos, así como de su localización en Portal Web;</li>
                                        <li>Declaración expresa y clara de que la utilización de los Contenidos indicados se ha realizado sin el consentimiento del titular de los derechos de propiedad intelectual supuestamente infringidos; y</li>
                                        <li>Declaración expresa, clara y bajo la responsabilidad del reclamante de que la información proporcionada en la notificación es exacta y de que la utilización de los Contenidos constituye una violación de sus derechos de propiedad intelectual.</li>
                                    </ul>

                                    <h3 className="font-bold text-foreground">7. HIPERVÍNCULOS</h3>
                                    <p>Los Usuarios y, en general, todas aquellas personas que pretendan establecer un hipervínculo que desde sus páginas direccionen su navegador (Browser) al Portal Web deberán cumplir con las siguientes condiciones:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>El hipervínculo únicamente permitirá el acceso a la página principal (Home) del Portal Web;</li>
                                        <li>No se creará un browse, frame o border enviroment sobre las páginas web del Portal Web;</li>
                                        <li>La inclusión del hipervínculo no tendrá como objeto o efecto que las páginas del Portal Web sean mostradas en un sitio no controlado por Innovafin;</li>
                                        <li>No se realizarán manifestaciones o indicaciones falsas, inexactas o incorrectas sobre Portal Web, en particular, no se declarará ni dará a entender que Innovafin ha autorizado el hipervínculo o que ha supervisado o asumido de cualquier forma los Contenidos o servicios ofrecidos o puestos a disposición en la página web que contiene el hipervínculo;</li>
                                        <li>Excepción hecha de aquellos signos que formen parte del mismo hipervínculo, la página web en la que se establezca el hipervínculo no contendrá ninguna marca, nombre comercial, rótulo de establecimiento, denominación, logotipo, eslogan u otros signos distintivos pertenecientes a los de Innovafin;</li>
                                        <li>La página web en la que se establezca el hipervínculo no contendrá informaciones o contenidos ilícitos, contrarios a la moral y buenas costumbres generalmente aceptadas y al orden público, así como tampoco contendrá contenidos contrarios a cualesquiera derechos de terceros.</li>
                                    </ul>
                                    <p>El Portal Web podrá contener enlaces a sitios web de terceros. Innovafin no controla ni asume responsabilidad alguna por el contenido, políticas o prácticas de dichos sitios. El acceso a los mismos será responsabilidad exclusiva del usuario.</p>

                                    <h3 className="font-bold text-foreground">8. POLÍTICA DE PRIVACIDAD</h3>
                                    <p>Todo usuario que pretenda acceder y/o utilizar los servicios ofrecidos por Innovafin en el Portal Web, deberá cumplir en todo con estos Términos y la política de privacidad de Innovafin.</p>

                                    <h3 className="font-bold text-foreground">9. TRATAMIENTO DE DATOS PERSONALES EN EL PORTAL WEB</h3>
                                    <p>El uso de formularios, canales de contacto, suscripciones o cualquier mecanismo de recolección de información dispuesto en el Portal Web implica el tratamiento de datos personales conforme a la política de tratamiento de datos personales de Innovafin.</p>
                                    <p>El usuario declara que los datos suministrados son veraces, completos y actualizados, y autoriza su tratamiento para las finalidades allí previstas.</p>
                                    <p>Innovafin podrá conservar prueba de la autorización otorgada mediante mecanismos electrónicos que permitan su consulta posterior.</p>
                                    <p>El Portal Web podrá utilizar cookies o tecnologías similares con fines estadísticos, de seguridad y mejora de la experiencia de navegación. Cuando dichas herramientas impliquen el tratamiento de datos personales, se informará al usuario y se obtendrá su autorización conforme a la normativa aplicable.</p>
                                    <p>El usuario podrá configurar su navegador para aceptar o rechazar cookies.</p>

                                    <h3 className="font-bold text-foreground">10. RESPONSABILIDAD DEL USUARIO</h3>
                                    <p>El usuario responderá por los daños y perjuicios que Innovafin pueda sufrir, directa o indirectamente, como consecuencia del mero incumplimiento de estos Términos o de la ley. De igual forma, el usuario reconoce y acepta que el acceso y utilización del Portal Web se realiza bajo su propia cuenta, riesgo y responsabilidad.</p>
                                    <p>El usuario se compromete a no suministrar información falsa, inexacta o incompleta a través de los formularios o canales dispuestos en el Portal Web, y responderá por los daños o perjuicios derivados del suministro de información incorrecta o fraudulenta.</p>

                                    <h3 className="font-bold text-foreground">11. RESPONSABILIDAD DE INNOVAFIN</h3>
                                    <p>Innovafin no garantiza la disponibilidad, continuidad o buen funcionamiento del Portal Web. En consecuencia, en cualquier tiempo y sin previo aviso, Innovafin, por mera liberalidad podrá bloquear el acceso al Portal Web o interrumpirlo en su funcionamiento sin que por ello se derive responsabilidad alguna dicha situación. Por lo anterior, Innovafin no será responsable por los daños que el usuario pudiere sufrir con ocasión de cualesquiera restricciones de acceso o interrupciones en el funcionamiento del Portal Web.</p>

                                    <h3 className="font-bold text-foreground">12. EXCLUSIÓN DE GARANTÍAS Y DE RESPONSABILIDAD POR LOS CONTENIDOS</h3>
                                    <p>Innovafin no controla ni garantiza que los Contenidos se encuentren libres de errores, virus u otros elementos de similar naturaleza que puedan producir alteraciones en el sistema informático del usuario (software y hardware) o en los documentos electrónicos y ficheros almacenados en el mismo. En consecuencia, Innovafin no será responsable por los daños que pudiere sufrir usuario como resultado de errores, problemas de compatibilidad, virus informáticos, gusanos, troyanos o cualesquiera otros elementos de similar naturaleza que afecten la funcionalidad de los Contenidos.</p>
                                    <p>En ningún caso Innovafin será responsable por daños indirectos, consecuenciales, lucro cesante, pérdida de oportunidad, pérdida de datos o cualquier otro daño derivado del uso o imposibilidad de uso del Portal Web, incluso si se hubiera advertido sobre la posibilidad de tales daños.</p>

                                    <h3 className="font-bold text-foreground">13. DENEGACIÓN Y RETIRADA DEL ACCESO AL PORTAL WEB</h3>
                                    <p>Innovafin se reserva el derecho a denegar o retirar el acceso al Portal Web, en cualquier momento y sin necesidad de preaviso, a aquellos usuarios que incumplan estos Términos o cualesquiera otras disposiciones que resulten de aplicación.</p>

                                    <h3 className="font-bold text-foreground">14. LEY APLICABLE Y JURISDICCIÓN</h3>
                                    <p>Estos términos y condiciones generales se rigen por las leyes de la República de Colombia.</p>

                                    <h3 className="font-bold text-foreground">15. RESPONSABILIDAD CIVIL EXTRACONTRACTUAL</h3>
                                    <p>El usuario reconoce y acepta expresamente que Portal Web no es responsable por las conductas difamatorias, ofensivas, ilegales y/o delictivas de sus usuarios.</p>

                                    <h3 className="font-bold text-foreground">16. USO INTERNACIONAL</h3>
                                    <p>Innovafin no garantiza que los Contenidos y materiales en el Portal Web sean apropiados o estén disponibles para su uso en otras ubicaciones. El acceso a los mismos desde territorios donde su contenido sea ilegal o esté restringido está prohibido.</p>
                                </div>
                            </ScrollArea>
                            <div className="flex justify-end pt-2">
                                <DialogClose asChild>
                                    <Button onClick={() => onTermsChange(true)} className="bg-primary text-primary-foreground">
                                        Aceptar y Cerrar
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
