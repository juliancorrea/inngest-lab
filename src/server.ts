import express from "express";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest";

const app = express();
const PORT = 3000;

app.use(express.json());

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Endpoint para invocar a função hello-world
app.get("/trigger/hello-world", async (req, res) => {
  try {
    const result = await inngest.send({
      name: "test/hello.world",
      data: { email: `${new Date().toISOString()}@gmail.com` },
    });

    console.log("Event sent:", result);
    res.json({ success: true, message: "Event sent to Inngest", result });
  } catch (error) {
    console.error("Error sending event:", error);
    res.status(500).json({ error: "Failed to send event" });
  }
});

// Endpoint para invocar a função hello-world
app.get("/trigger/cron-test", async (req, res) => {
  try {
    const result = await inngest.send({
      name: "test/cron.test",
      data: { message: `I'm the timestamp ${new Date().toISOString()}` },
    });

    console.log("Event sent:", result);
    res.json({ success: true, message: "Event sent to Inngest", result });
  } catch (error) {
    console.error("Error sending event:", error);
    res.status(500).json({ error: "Failed to send event" });
  }
});

// Endpoint para consultar status de uma execução
app.get("/status/:runId", async (req, res) => {
  try {
    const { runId } = req.params;
    const response = await fetch(`http://inngest:8288/v1/runs/${runId}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching run status:", error);
    res.status(500).json({ error: "Failed to fetch run status" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
