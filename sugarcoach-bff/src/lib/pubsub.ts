import { EventEmitter } from "node:events";

/**
 * Pub/sub mínimo para las actualizaciones en vivo del dashboard médico.
 * Hoy es en memoria (alcanza con una sola instancia del BFF). El día que
 * se despliegue en más de una instancia, reemplazar esta implementación
 * por Redis pub/sub sin tocar las rutas que la consumen -- la interfaz
 * (publish/subscribe) queda igual.
 */
export type PatientUpdateEvent = {
  patientId: string;
  kind: "glucose" | "insulin" | "meal" | "activity";
  recordedAt: string;
};

const emitter = new EventEmitter();
const CHANNEL = "patient-updates";

export function publishPatientUpdate(event: PatientUpdateEvent) {
  emitter.emit(CHANNEL, event);
}

export function subscribeToPatientUpdates(
  onEvent: (event: PatientUpdateEvent) => void,
): () => void {
  emitter.on(CHANNEL, onEvent);
  return () => emitter.off(CHANNEL, onEvent);
}
