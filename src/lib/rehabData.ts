export type Region = 'Hombro' | 'Brazo' | 'Pecho' | 'Core' | 'Espalda' | 'Cadera' | 'Muslo' | 'Pierna';
export type Difficulty = 'Suave' | 'Moderado' | 'Avanzado';

export interface ExerciseStep {
  id: string;
  title: string;
  instruction: string;
  pose: 'stand' | 'lie' | 'sit' | 'bridge' | 'raise' | 'wall' | 'lunge';
}

export interface Exercise {
  id: string;
  muscleId: string;
  name: string;
  sets: number;
  reps: string;
  restSec: number;
  difficulty: Difficulty;
  durationMin: number;
  summary: string;
  steps: ExerciseStep[];
  precautions: string[];
}

export interface Muscle {
  id: string;
  name: string;
  latin: string;
  region: Region;
  view: 'front' | 'back';
  fn: string;
  origin: string;
  insertion: string;
  commonInjuries: string[];
  restHint: string;
}

export const muscles: Muscle[] = [
  { id: 'deltoides', name: 'Deltoides', latin: 'Musculus deltoideus', region: 'Hombro', view: 'front', fn: 'Eleva el brazo en todas las direcciones y estabiliza la articulación del hombro durante movimientos cotidianos como alcanzar un estante.', origin: 'Clavícula, acromion y espina de la escápula', insertion: 'Tuberosidad deltoidea del húmero', commonInjuries: ['Tendinitis del manguito', 'Desgarro leve', 'Bursitis subacromial'], restHint: 'Descansa 48 h entre sesiones intensas' },
  { id: 'pectoral', name: 'Pectoral mayor', latin: 'Musculus pectoralis major', region: 'Pecho', view: 'front', fn: 'Acerca el brazo al cuerpo y lo rota hacia adentro; participa al empujar una puerta o levantarse de una silla con los brazos.', origin: 'Clavícula, esternón y cartílagos costales', insertion: 'Cresta del tubérculo mayor del húmero', commonInjuries: ['Sobrecarga muscular', 'Contractura', 'Rigidez posquirúrgica'], restHint: 'Descansa 24–48 h entre series de fuerza' },
  { id: 'biceps', name: 'Bíceps braquial', latin: 'Musculus biceps brachii', region: 'Brazo', view: 'front', fn: 'Flexiona el codo y gira el antebrazo con la palma hacia arriba; esencial para cargar bolsas o llevar objetos.', origin: 'Escápula (cabeza corta y larga)', insertion: 'Tuberosidad del radio', commonInjuries: ['Tendinopatía del bíceps', 'Distensión', 'Rigidez de codo'], restHint: 'Descansa 24 h entre sesiones' },
  { id: 'abdominal', name: 'Recto abdominal', latin: 'Musculus rectus abdominis', region: 'Core', view: 'front', fn: 'Flexiona el tronco y estabiliza la pelvis; protege la zona lumbar al caminar, levantarse y cargar peso.', origin: 'Pubis y sínfisis púbica', insertion: 'Apófisis xifoides y cartílagos costales', commonInjuries: ['Diástasis', 'Dolor posquirúrgico', 'Debilidad del core'], restHint: 'Descansa 24 h; evita retener la respiración' },
  { id: 'oblicuos', name: 'Oblicuos', latin: 'Musculus obliquus externus', region: 'Core', view: 'front', fn: 'Rotan e inclinan el tronco y ayudan a mantener la postura erguida al estar de pie o sentado.', origin: 'Costillas 5 a 12', insertion: 'Cresta ilíaca y línea alba', commonInjuries: ['Distensión lateral', 'Contractura', 'Dolor al toser'], restHint: 'Descansa 24 h entre rotaciones' },
  { id: 'cuadriceps', name: 'Cuádriceps', latin: 'Musculus quadriceps femoris', region: 'Muslo', view: 'front', fn: 'Extiende la rodilla y soporta el peso al levantarse, subir escaleras o caminar; clave tras lesiones de rodilla.', origin: 'Pelvis y fémur', insertion: 'Rótula y tuberosidad de la tibia', commonInjuries: ['Rehabilitación de LCA', 'Condromalacia', 'Distensión'], restHint: 'Descansa 48 h tras fortalecimiento' },
  { id: 'tibial', name: 'Tibial anterior', latin: 'Musculus tibialis anterior', region: 'Pierna', view: 'front', fn: 'Levanta la punta del pie y evita que se arrastre al caminar; estabiliza el tobillo.', origin: 'Cóndilo lateral de la tibia', insertion: 'Cuneiforme medial y primer metatarsiano', commonInjuries: ['Periostitis tibial', 'Esguince de tobillo', 'Pie caído'], restHint: 'Descansa 24 h entre sesiones' },
  { id: 'trapecio', name: 'Trapecio', latin: 'Musculus trapezius', region: 'Espalda', view: 'back', fn: 'Eleva y retrae los omóplatos y sostiene el cuello; se sobrecarga con la postura frente a pantallas.', origin: 'Occipital y vértebras cervicales y torácicas', insertion: 'Clavícula y escápula', commonInjuries: ['Contractura cervical', 'Tensión por postura', 'Cervicalgia'], restHint: 'Descansa 24 h; alterna con estiramientos' },
  { id: 'dorsal', name: 'Dorsal ancho', latin: 'Musculus latissimus dorsi', region: 'Espalda', view: 'back', fn: 'Tira del brazo hacia atrás y abajo, como al remar o subir a una barra; estabiliza la espalda baja.', origin: 'Vértebras torácicas inferiores y cresta ilíaca', insertion: 'Surco intertubercular del húmero', commonInjuries: ['Distensión dorsal', 'Dolor lumbar alto', 'Rigidez'], restHint: 'Descansa 48 h tras trabajo de tracción' },
  { id: 'triceps', name: 'Tríceps braquial', latin: 'Musculus triceps brachii', region: 'Brazo', view: 'back', fn: 'Extiende el codo; permite empujar, apoyarse al levantarse y alcanzar objetos por encima de la cabeza.', origin: 'Escápula y húmero', insertion: 'Olécranon del cúbito', commonInjuries: ['Tendinopatía tricipital', 'Codo de golfista', 'Debilidad posfractura'], restHint: 'Descansa 24–48 h' },
  { id: 'lumbar', name: 'Erector lumbar', latin: 'Musculus erector spinae', region: 'Espalda', view: 'back', fn: 'Mantiene la columna erguida y extiende el tronco; protege los discos lumbares al agacharse y levantar peso.', origin: 'Sacro, cresta ilíaca y vértebras lumbares', insertion: 'Costillas y vértebras superiores', commonInjuries: ['Lumbalgia mecánica', 'Contractura lumbar', 'Hernia discal leve'], restHint: 'Descansa 24 h; evita flexiones bruscas' },
  { id: 'gluteo', name: 'Glúteo mayor', latin: 'Musculus gluteus maximus', region: 'Cadera', view: 'back', fn: 'Extiende y rota la cadera; impulsa al subir escaleras, levantarse y caminar con estabilidad.', origin: 'Ilion, sacro y cóccix', insertion: 'Tracto iliotibial y fémur', commonInjuries: ['Debilidad posquirúrgica de cadera', 'Dolor lumbar asociado', 'Síndrome piriforme'], restHint: 'Descansa 48 h tras fortalecimiento' },
  { id: 'isquios', name: 'Isquiotibiales', latin: 'Musculus biceps femoris', region: 'Muslo', view: 'back', fn: 'Flexionan la rodilla y extienden la cadera; frenan la pierna al caminar y correr.', origin: 'Tuberosidad isquiática', insertion: 'Cabeza del peroné y tibia', commonInjuries: ['Distensión', 'Rigidez posterior', 'Tendinopatía proximal'], restHint: 'Descansa 48 h tras estiramientos intensos' },
  { id: 'gemelos', name: 'Gemelos', latin: 'Musculus gastrocnemius', region: 'Pierna', view: 'back', fn: 'Flexionan la planta del pie y la rodilla; impulsan al caminar, subir escalones y ponerse de puntillas.', origin: 'Cóndilos del fémur', insertion: 'Calcáneo (tendón de Aquiles)', commonInjuries: ['Tendinitis de Aquiles', 'Calambres', 'Distensión de gemelo'], restHint: 'Descansa 24–48 h' },
];

const mkSteps = (items: [string, string, ExerciseStep['pose']][], prefix: string): ExerciseStep[] =>
  items.map(([title, instruction, pose], i) => ({ id: `${prefix}-step-${i + 1}`, title, instruction, pose }));

export const exercises: Exercise[] = [
  { id: 'ex-001', muscleId: 'deltoides', name: 'Elevación lateral con banda suave', sets: 3, reps: '10–12', restSec: 45, difficulty: 'Suave', durationMin: 8, summary: 'Fortalece el deltoides medio sin sobrecargar el manguito rotador.', steps: mkSteps([['Posición inicial', 'De pie, pies al ancho de hombros. Pisa la banda y sujeta un extremo con la mano, codo ligeramente flexionado.', 'stand'], ['Elevación', 'Levanta el brazo hacia un lado hasta la altura del hombro, sin encoger el cuello. Exhala al subir.', 'raise'], ['Control', 'Baja lentamente en 3 segundos hasta la posición inicial. Evita balancear el tronco.', 'stand']], 'ex-001'), precautions: ['No subas por encima del hombro si hay dolor punzante', 'Detén el ejercicio si el dolor supera 5/10', 'Mantén el cuello relajado'] },
  { id: 'ex-002', muscleId: 'deltoides', name: 'Péndulo de Codman', sets: 2, reps: '30 s por dirección', restSec: 30, difficulty: 'Suave', durationMin: 5, summary: 'Movilidad pasiva inicial del hombro tras cirugía o tendinitis.', steps: mkSteps([['Inclínate', 'Apoya la mano sana sobre una mesa e inclina el tronco unos 45°.', 'stand'], ['Deja caer el brazo', 'Relaja el brazo afectado hacia el suelo sin tensión muscular.', 'stand'], ['Círculos pequeños', 'Mueve el cuerpo para que el brazo dibuje círculos pequeños, 30 s en cada sentido.', 'raise']], 'ex-002'), precautions: ['Movimiento mínimo, sin forzar', 'Evita si el cirujano indicó inmovilización', 'Respira con normalidad'] },
  { id: 'ex-003', muscleId: 'deltoides', name: 'Rotación externa con toalla', sets: 3, reps: '12', restSec: 40, difficulty: 'Moderado', durationMin: 7, summary: 'Activa el manguito rotador de forma controlada.', steps: mkSteps([['Postura', 'Sentado, codo pegado al costado a 90° con una toalla enrollada bajo el brazo.', 'sit'], ['Rota hacia afuera', 'Gira el antebrazo hacia afuera sin separar el codo, con una banda ligera.', 'raise'], ['Regresa', 'Vuelve lento al inicio, contando 3 segundos.', 'sit']], 'ex-003'), precautions: ['Mantén la toalla firme contra el costado', 'No compensar con el tronco'] },
  { id: 'ex-004', muscleId: 'pectoral', name: 'Flexión en pared', sets: 3, reps: '10', restSec: 45, difficulty: 'Suave', durationMin: 7, summary: 'Versión de bajo impacto para recuperar fuerza de empuje.', steps: mkSteps([['Apoyo', 'De pie frente a la pared, manos a la altura del pecho y un poco más abiertas que los hombros.', 'wall'], ['Baja el pecho', 'Flexiona los codos acercando el pecho a la pared, cuerpo recto.', 'wall'], ['Empuja', 'Estira los brazos y vuelve al inicio exhalando.', 'stand']], 'ex-004'), precautions: ['No arquees la espalda baja', 'Detén si sientes pinchazo en el hombro'] },
  { id: 'ex-005', muscleId: 'pectoral', name: 'Apertura de pecho con toalla', sets: 2, reps: '8 (15 s)', restSec: 30, difficulty: 'Suave', durationMin: 5, summary: 'Estiramiento suave para mejorar movilidad torácica.', steps: mkSteps([['Sujeta la toalla', 'De pie, sujeta una toalla con ambas manos delante del cuerpo.', 'stand'], ['Abre', 'Lleva los brazos hacia atrás abriendo el pecho, hombros abajo.', 'raise'], ['Sostén', 'Mantén 15 segundos respirando profundo.', 'stand']], 'ex-005'), precautions: ['Estiramiento leve, nunca doloroso'] },
  { id: 'ex-006', muscleId: 'biceps', name: 'Flexión de codo con botella', sets: 3, reps: '12', restSec: 40, difficulty: 'Suave', durationMin: 6, summary: 'Fortalecimiento progresivo con carga ligera casera.', steps: mkSteps([['Postura', 'Sentado con una botella de 500 ml en la mano, codo pegado al torso.', 'sit'], ['Flexiona', 'Sube la botella hacia el hombro sin mover el codo.', 'raise'], ['Baja', 'Desciende lento en 3 segundos.', 'sit']], 'ex-006'), precautions: ['No balancees el cuerpo', 'Aumenta carga solo si no hay dolor'] },
  { id: 'ex-007', muscleId: 'abdominal', name: 'Activación del transverso en supino', sets: 3, reps: '10 (hold 5 s)', restSec: 30, difficulty: 'Suave', durationMin: 6, summary: 'Reeduca el core profundo con mínimo estrés lumbar.', steps: mkSteps([['Acuéstate', 'Boca arriba, rodillas flexionadas y pies apoyados en el suelo.', 'lie'], ['Activa', 'Exhala y lleva el ombligo hacia la columna sin mover la pelvis.', 'lie'], ['Sostén', 'Mantén 5 segundos respirando con normalidad y relaja.', 'lie']], 'ex-007'), precautions: ['No contengas la respiración', 'Evita si hay hernia sin autorización médica'] },
  { id: 'ex-008', muscleId: 'abdominal', name: 'Puente pélvico suave', sets: 3, reps: '10', restSec: 40, difficulty: 'Moderado', durationMin: 7, summary: 'Combina activación del core y glúteos.', steps: mkSteps([['Posición', 'Boca arriba, rodillas flexionadas, brazos a los lados.', 'lie'], ['Eleva', 'Sube la cadera hasta formar una línea hombros–rodillas.', 'bridge'], ['Baja', 'Desciende vértebra por vértebra.', 'lie']], 'ex-008'), precautions: ['No hiperextender la zona lumbar', 'Detén ante dolor lumbar punzante'] },
  { id: 'ex-009', muscleId: 'cuadriceps', name: 'Extensión isométrica de rodilla', sets: 3, reps: '10 (hold 6 s)', restSec: 40, difficulty: 'Suave', durationMin: 7, summary: 'Activa el cuádriceps sin movimiento articular.', steps: mkSteps([['Siéntate', 'En el piso con la pierna estirada y una toalla enrollada bajo la rodilla.', 'sit'], ['Presiona', 'Empuja la rodilla contra la toalla contrayendo el muslo.', 'lie'], ['Sostén', 'Mantén 6 segundos y relaja.', 'sit']], 'ex-009'), precautions: ['Contrae sin dolor en la rótula', 'Respira sin contener'] },
  { id: 'ex-010', muscleId: 'cuadriceps', name: 'Sentadilla asistida en silla', sets: 3, reps: '8–10', restSec: 50, difficulty: 'Moderado', durationMin: 9, summary: 'Patrón funcional de levantarse y sentarse con control.', steps: mkSteps([['Preparación', 'Frente a una silla firme, pies al ancho de caderas.', 'stand'], ['Descenso', 'Lleva la cadera hacia atrás y baja hasta rozar el asiento.', 'sit'], ['Ascenso', 'Empuja con los talones y vuelve a la postura erguida.', 'stand']], 'ex-010'), precautions: ['Rodillas alineadas con los pies', 'No sobrepases 90° de flexión si hay dolor'] },
  { id: 'ex-011', muscleId: 'trapecio', name: 'Retracción escapular sentado', sets: 3, reps: '12', restSec: 30, difficulty: 'Suave', durationMin: 5, summary: 'Alivia la tensión cervical por postura prolongada.', steps: mkSteps([['Sentado', 'Espalda recta, brazos relajados.', 'sit'], ['Junta omóplatos', 'Lleva los omóplatos hacia atrás y abajo, como guardándolos en el bolsillo.', 'raise'], ['Suelta', 'Relaja lentamente tras 3 segundos.', 'sit']], 'ex-011'), precautions: ['No eleves los hombros hacia las orejas'] },
  { id: 'ex-012', muscleId: 'lumbar', name: 'Gato–camello', sets: 2, reps: '10', restSec: 30, difficulty: 'Suave', durationMin: 6, summary: 'Movilidad segmentaria suave de la columna lumbar.', steps: mkSteps([['Cuatro apoyos', 'Manos bajo hombros y rodillas bajo caderas.', 'lie'], ['Arquea', 'Exhala redondeando la espalda y mirando al ombligo.', 'bridge'], ['Extiende', 'Inhala bajando el abdomen y levantando la mirada con suavidad.', 'lie']], 'ex-012'), precautions: ['Rango pequeño y sin dolor', 'Evita si hay dolor irradiado a la pierna'] },
  { id: 'ex-013', muscleId: 'gluteo', name: 'Puente de glúteo', sets: 3, reps: '12', restSec: 40, difficulty: 'Moderado', durationMin: 8, summary: 'Fortalece el glúteo mayor y estabiliza la pelvis.', steps: mkSteps([['Posición', 'Acostado boca arriba con pies firmes en el suelo.', 'lie'], ['Eleva', 'Aprieta glúteos y sube la cadera.', 'bridge'], ['Pausa y baja', 'Mantén 2 s y baja con control.', 'lie']], 'ex-013'), precautions: ['No empujes con la zona lumbar'] },
  { id: 'ex-014', muscleId: 'isquios', name: 'Estiramiento de isquios con toalla', sets: 2, reps: '3 × 20 s', restSec: 20, difficulty: 'Suave', durationMin: 6, summary: 'Recupera flexibilidad posterior del muslo.', steps: mkSteps([['Acuéstate', 'Boca arriba, toalla alrededor del pie.', 'lie'], ['Eleva la pierna', 'Estira la rodilla llevando la pierna hacia el techo.', 'raise'], ['Sostén', 'Mantén 20 s sintiendo tensión leve.', 'lie']], 'ex-014'), precautions: ['Tensión suave, nunca dolor agudo'] },
  { id: 'ex-015', muscleId: 'gemelos', name: 'Elevación de talones', sets: 3, reps: '12', restSec: 40, difficulty: 'Moderado', durationMin: 6, summary: 'Fortalece gemelos y tendón de Aquiles de forma progresiva.', steps: mkSteps([['De pie', 'Apoyado levemente en una pared.', 'wall'], ['Sube', 'Eleva los talones hasta quedar de puntillas.', 'raise'], ['Baja', 'Desciende en 3 segundos.', 'stand']], 'ex-015'), precautions: ['Si hay dolor en el Aquiles, reduce el rango'] },
  { id: 'ex-016', muscleId: 'tibial', name: 'Dorsiflexión con banda', sets: 3, reps: '15', restSec: 30, difficulty: 'Suave', durationMin: 5, summary: 'Mejora el control de la punta del pie al caminar.', steps: mkSteps([['Sentado', 'Pierna estirada y banda anclada al pie.', 'sit'], ['Tira', 'Lleva la punta del pie hacia ti.', 'raise'], ['Vuelve', 'Regresa lento al inicio.', 'sit']], 'ex-016'), precautions: ['No fuerces el tobillo si hay esguince reciente'] },
];

export const exercisesForMuscle = (muscleId: string): Exercise[] => {
  const own = exercises.filter((e) => e.muscleId === muscleId);
  return own.length ? own : exercises.slice(0, 3);
};

export const getMuscle = (id: string | null | undefined): Muscle => muscles.find((m) => m.id === id) ?? muscles[0];
export const getExercise = (id: string | null | undefined): Exercise => exercises.find((e) => e.id === id) ?? exercises[0];

export const regionColors: Record<Region, string> = {
  Hombro: 'bg-primary', Brazo: 'bg-accent', Pecho: 'bg-primary', Core: 'bg-accent',
  Espalda: 'bg-primary', Cadera: 'bg-accent', Muslo: 'bg-primary', Pierna: 'bg-accent',
};

export interface TodayPlanItem { id: string; exerciseId: string; time: string; status: 'Pendiente' | 'En curso' | 'Completado' | 'Omitido'; }

export const todayPlan: TodayPlanItem[] = [
  { id: 'plan-001', exerciseId: 'ex-002', time: '08:00', status: 'Completado' },
  { id: 'plan-002', exerciseId: 'ex-001', time: '08:15', status: 'Completado' },
  { id: 'plan-003', exerciseId: 'ex-007', time: '13:00', status: 'En curso' },
  { id: 'plan-004', exerciseId: 'ex-012', time: '18:30', status: 'Pendiente' },
  { id: 'plan-005', exerciseId: 'ex-013', time: '19:00', status: 'Pendiente' },
];

export interface ProgressEntry {
  id: string;
  date: string;
  exerciseIds: string[];
  pain: number;
  minutes: number;
  notes: string;
}

export const progressSeed: ProgressEntry[] = [
  { id: 'log-001', date: '2026-10-16', exerciseIds: ['ex-002', 'ex-001'], pain: 7, minutes: 14, notes: 'Dolor al elevar el brazo por la mañana.' },
  { id: 'log-002', date: '2026-10-17', exerciseIds: ['ex-002', 'ex-007'], pain: 7, minutes: 12, notes: 'Sin cambios, hielo 15 min después.' },
  { id: 'log-003', date: '2026-10-18', exerciseIds: ['ex-002', 'ex-001', 'ex-007'], pain: 6, minutes: 20, notes: 'Mejor movilidad del hombro.' },
  { id: 'log-004', date: '2026-10-19', exerciseIds: ['ex-007'], pain: 6, minutes: 8, notes: 'Día de descanso parcial.' },
  { id: 'log-005', date: '2026-10-20', exerciseIds: ['ex-002', 'ex-001', 'ex-012'], pain: 8, minutes: 22, notes: 'Pico de dolor tras cargar una bolsa pesada.' },
  { id: 'log-006', date: '2026-10-21', exerciseIds: ['ex-002'], pain: 7, minutes: 6, notes: 'Solo ejercicios suaves, bajé intensidad.' },
  { id: 'log-007', date: '2026-10-22', exerciseIds: ['ex-002', 'ex-007', 'ex-012'], pain: 5, minutes: 19, notes: 'Dolor bajó, buena sesión.' },
  { id: 'log-008', date: '2026-10-23', exerciseIds: ['ex-001', 'ex-007', 'ex-013'], pain: 5, minutes: 21, notes: 'Estable.' },
  { id: 'log-009', date: '2026-10-24', exerciseIds: ['ex-002', 'ex-001', 'ex-013'], pain: 4, minutes: 23, notes: 'Primera vez con dolor leve-moderado.' },
  { id: 'log-010', date: '2026-10-25', exerciseIds: ['ex-007', 'ex-012'], pain: 4, minutes: 13, notes: 'Rigidez matinal menor.' },
  { id: 'log-011', date: '2026-10-26', exerciseIds: ['ex-002', 'ex-001', 'ex-007', 'ex-013'], pain: 3, minutes: 28, notes: 'Sesión completa sin molestias.' },
  { id: 'log-012', date: '2026-10-27', exerciseIds: ['ex-001', 'ex-012', 'ex-013'], pain: 3, minutes: 22, notes: 'Buen día.' },
  { id: 'log-013', date: '2026-10-28', exerciseIds: ['ex-002', 'ex-001', 'ex-007'], pain: 3, minutes: 20, notes: 'Dolor leve al final del día.' },
];

export const painLabel = (p: number): { label: string; tone: 'success' | 'warning' | 'destructive' } =>
  p <= 3 ? { label: 'Leve', tone: 'success' } : p <= 6 ? { label: 'Moderado', tone: 'warning' } : { label: 'Intenso', tone: 'destructive' };

export const formatDateEs = (iso: string): string => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

export const LEGAL_NOTE = 'Esta herramienta ofrece orientación y seguimiento de ejercicios terapéuticos en casa, no reemplaza la consulta ni el diagnóstico médico profesional';