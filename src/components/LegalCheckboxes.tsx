
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
    const defaultItemClass = "flex items-start space-x-3 bg-muted/30 rounded-xl p-4";
    const finalItemClass = itemClassName !== undefined ? itemClassName : defaultItemClass;

    const defaultLabelClass = "text-sm text-muted-foreground cursor-pointer leading-relaxed";
    const finalLabelClass = labelClassName !== undefined ? labelClassName : defaultLabelClass;

    const defaultLinkClass = "p-0 h-auto font-normal text-xs text-primary underline justify-start";
    const finalLinkClass = linkClassName !== undefined ? linkClassName : defaultLinkClass;

    return (
        <div className={cn("space-y-4", className)}>
            {/* Authorization Checkbox */}
            <div className={finalItemClass}>
                <Checkbox
                    id="authHandling"
                    checked={authChecked}
                    onCheckedChange={(checked) => onAuthChange(checked === true)}
                    className="mt-0.5 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground border-white/20"
                    required
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="authHandling"
                        className={finalLabelClass}
                    >
                        Autorizo el tratamiento de mis datos personales. *
                    </label>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" className={finalLinkClass}>
                                Ver Autorización de Manejo de Datos
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
                                    <p>InnovaFin S.A.S. ("InnovaFin"), en cumplimiento de la Ley 1581 de 2012 y demás normas concordantes, es responsable del tratamiento de sus datos personales.</p>

                                    <h3 className="font-bold text-foreground">1. Tratamiento y Finalidad</h3>
                                    <p>Los datos personales que InnovaFin solicita serán utilizados para los siguientes fines:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Efectuar las gestiones pertinentes para el desarrollo del objeto social de la compañía en lo que tiene que ver con el cumplimiento del objeto del contrato celebrado con el Titular de la información.</li>
                                        <li>Realizar invitaciones a eventos y ofrecer nuevos productos y servicios.</li>
                                        <li>Gestionar trámites (solicitudes, quejas, reclamos).</li>
                                        <li>Efectuar encuestas de satisfacción respecto de los bienes y servicios ofrecidos por InnovaFin.</li>
                                        <li>Suministrar información de contacto a la fuerza comercial y/o red de distribución, telemercadeo, investigación de mercados y cualquier tercero con el cual InnovaFin tenga un vínculo contractual para el desarrollo de actividades de ese tipo.</li>
                                        <li>Contactar al Titular a través de medios telefónicos, electrónicos (SMS, chat, correo electrónico y demás medios considerados electrónicos), físicos y/o personales.</li>
                                    </ul>

                                    <h3 className="font-bold text-foreground">2. Derechos del Titular</h3>
                                    <p>Como titular de sus datos personales usted tiene derecho a:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Acceder de forma gratuita a los datos proporcionados que hayan sido objeto de tratamiento.</li>
                                        <li>Conocer, actualizar y rectificar su información frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o a aquellos cuyo tratamiento esté prohibido o no haya sido autorizado.</li>
                                        <li>Solicitar prueba de la autorización otorgada.</li>
                                        <li>Presentar ante la Superintendencia de Industria y Comercio (SIC) quejas por infracciones a lo dispuesto en la normatividad vigente.</li>
                                        <li>Revocar la autorización y/o solicitar la supresión del dato, siempre que no exista un deber legal o contractual que impida eliminarlos.</li>
                                    </ul>

                                    <p className="italic text-muted-foreground mt-4 border-t pt-2 text-xs">
                                        [Nota: Este texto es un marcador de posición. El administrador del sitio debe proporcionar el texto legal completo.]
                                    </p>
                                </div>
                            </ScrollArea>
                            <div className="flex justify-end pt-2">
                                <Button onClick={() => onAuthChange(true)} className="bg-primary text-primary-foreground">
                                    Aceptar y Cerrar
                                </Button>
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
                    className="mt-0.5 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground border-white/20"
                    required
                />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="termsConditions"
                        className={finalLabelClass}
                    >
                        Acepto los términos y condiciones. *
                    </label>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" className={finalLinkClass}>
                                Ver Términos y Condiciones
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
                                    <h3 className="font-bold text-foreground">1. Aceptación de los Términos</h3>
                                    <p>Al acceder y utilizar este sitio web y los servicios ofrecidos por InnovaFin, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones. Si no está de acuerdo con estos términos, por favor no utilice nuestros servicios.</p>

                                    <h3 className="font-bold text-foreground">2. Uso del Sitio</h3>
                                    <p>El contenido de las páginas de este sitio web es para su información general y uso solamente. Está sujeto a cambios sin previo aviso.</p>

                                    <h3 className="font-bold text-foreground">3. Propiedad Intelectual</h3>
                                    <p>Este sitio web contiene material que es propiedad de o licenciado a nosotros. Este material incluye, pero no se limita a, el diseño, la disposición, la apariencia y los gráficos. La reproducción está prohibida salvo de conformidad con el aviso de copyright, que forma parte de estos términos y condiciones.</p>

                                    <h3 className="font-bold text-foreground">4. Limitación de Responsabilidad</h3>
                                    <p>El uso de cualquier información o material en este sitio web es bajo su propio riesgo, por lo cual no seremos responsables. Será su propia responsabilidad asegurarse de que cualquier producto, servicio o información disponible a través de este sitio web cumpla con sus requisitos específicos.</p>

                                    <p className="italic text-muted-foreground mt-4 border-t pt-2 text-xs">
                                        [Nota: Este texto es un marcador de posición. El administrador del sitio debe proporcionar el texto legal completo.]
                                    </p>
                                </div>
                            </ScrollArea>
                            <div className="flex justify-end pt-2">
                                <Button onClick={() => onTermsChange(true)} className="bg-primary text-primary-foreground">
                                    Aceptar y Cerrar
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
