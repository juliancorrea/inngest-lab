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

// Função wrapper que invoca hello-world de forma SÍNCRONA usando step.invoke()
const invokeHelloWorld = inngest.createFunction(
  {
    id: "invoke-hello-world-wrapper",
  },
  { event: "api/invoke.hello.world" },
  async ({ event, step }) => {
    // step.invoke() chama outra função e AGUARDA o resultado
    const result = await step.invoke("call-hello-world", {
      function: helloWorld,
      data: { email: event.data.email },
      timeout: "30s", // Timeout opcional (padrão: 1 ano)
    });

    console.log("Received result from hello-world:", result);
    return { success: true, invokedResult: result };
  }
);

const cronTest = inngest.createFunction(
  {
    id: "cron-test",
  },
  { cron: "TZ=America/Sao_Paulo */1 * * * *" }, // A cada 1 minuto
  async ({ event, step }) => {
    await step.run("process-somethins", async () => {
      console.log("Cron job executed at", new Date().toISOString());
    });
    await step.sleep("wait-a-moment", "2s");
    await step.run("more-processing", async () => {
      console.log("Still processing...", new Date().toISOString());
    });
    await step.sleep("wait-a-moment-2", "2s");
    await step.run("log-timestamp", async () => {
      console.log("Cron job executed at", new Date().toISOString());
    });
  }
);
// Add the function to the exported array:
export const functions = [helloWorld, invokeHelloWorld, cronTest];
