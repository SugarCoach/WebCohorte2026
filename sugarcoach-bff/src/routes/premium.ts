import type { FastifyInstance } from "fastify";
import { randomBytes } from "node:crypto";
import { z } from "zod";

const premiumRequestSchema = z.object({
  patientName: z.string().trim().min(1).max(120),
  patientEmail: z.string().trim().email(),
  patientDni: z.string().trim().min(6).max(10),
  doctorName: z.string().trim().min(1).max(120),
  institutionOrLicense: z.string().trim().max(160).optional(),
  province: z.string().trim().min(1).max(60),
});

function generateCoupon(): string {
  // 4 bytes -> 8 caracteres hex, en mayúsculas -- suficiente para no colisionar
  // en este volumen; si esto escala mucho, pasar a un generador con chequeo
  // de unicidad contra la base antes de devolverlo.
  return `SUGAR-ARG-${randomBytes(4).toString("hex").toUpperCase()}`;
}

/**
 * Formulario de /premium: vincula paciente + médico tratante y otorga el
 * cupón de 6 meses sin cargo (beneficio Argentina). Guarda el registro en
 * Strapi (pendiente de mapear al content type real) y devuelve el cupón.
 */
export async function premiumRoutes(app: FastifyInstance) {
  app.post("/api/premium/coupon", async (request, reply) => {
    const parsed = premiumRequestSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "Solicitud inválida", issues: parsed.error.issues });
    }

    const coupon = generateCoupon();

    // TODO: persistir en Strapi vía strapiClient.request(...) contra el
    // content type de "beneficios" una vez que exista en el CMS. Por ahora
    // solo se loguea (sin datos sensibles) y se devuelve el cupón generado.
    request.log.info({ province: parsed.data.province }, "Cupón premium generado");

    return reply.send({ coupon });
  });
}
