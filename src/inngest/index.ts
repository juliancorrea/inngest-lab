import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-test-app" });

// Your new function:
const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
    // // Controla a vazão de processamento
    // concurrency: {
    //   limit: 20, // Máximo 5 execuções simultâneas
    // },
    // // Rate limiting - limita a taxa de execução
    // rateLimit: {
    //   limit: 100, // Máximo 100 execuções
    //   period: "1m", // Por minuto (1m, 1h, 1d)
    // },
    // // Throttle - adiciona delay entre execuções
    // throttle: {
    //   limit: 20, // Máximo 20 execuções
    //   period: "0.5s", // A cada 1 segundo
    //   key: "event.data.email", // Agrupa por email (opcional)
    // },
  },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    console.log(`Triggered hello-world for ${event.data.email}`);
    return { message: `Hello ${event.data.email}!` };
  }
);

// Add the function to the exported array:
export const functions = [helloWorld];
