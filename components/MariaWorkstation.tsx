"use client";

import { useState, useTransition } from "react";
import { getCapabilitiesByGroup, mariaAgent, type AgentCapability } from "@/config/agents";

const statusLabels = {
  live: "Live",
  prepared: "Prepared",
  future: "Future",
};

const executionModeLabels = {
  pre_job: "Guide",
  job_required: "Creates Job",
  artifact_access: "Artifacts",
};

type ChatMessage = {
  role: "user" | "maria";
  text: string;
};

function RailButton({
  capability,
  onSelect,
}: {
  capability: AgentCapability;
  onSelect: (capability: AgentCapability) => void;
}) {
  const className = ["rail-button", capability.tone, capability.status, capability.executionMode].join(" ");
  const title = [
    capability.prompt,
    `Mode: ${executionModeLabels[capability.executionMode]}`,
    `Runtime: ${capability.runtime}`,
    `Creates job: ${capability.createsJob ? "yes" : "no"}`,
  ].join("\n");

  return (
    <button
      className={className}
      type="button"
      data-agent-id={capability.id}
      onClick={() => onSelect(capability)}
      title={title}
    >
      {capability.eyebrow ? <span>{capability.eyebrow}</span> : null}
      <strong>{capability.label}</strong>
      <em>
        {statusLabels[capability.status]} · {executionModeLabels[capability.executionMode]}
      </em>
    </button>
  );
}

export function MariaWorkstation() {
  const leftCapabilities = getCapabilitiesByGroup("left");
  const rightCapabilities = getCapabilitiesByGroup("right");
  const [selectedAgentId, setSelectedAgentId] = useState(mariaAgent.id);
  const [prompt, setPrompt] = useState(
    "Use Maria to frame a market research task, identify the right evidence, and prepare a decision-ready output.",
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "user",
      text:
        "Start with a company, market, question, or decision. Maria will help frame the research and route the work to specialized capabilities when they are connected.",
    },
    {
      role: "maria",
      text:
        "Hello Anastacio. I am Maria, your executive research assistant at researchworkstation.com. I help turn vague questions into traceable research, findings, recommendations, reports, PDFs, and one-page visuals.",
    },
  ]);
  const [status, setStatus] = useState("Ready for beta workflow");
  const [isPending, startTransition] = useTransition();

  function selectCapability(capability: AgentCapability) {
    setSelectedAgentId(capability.id);
    setPrompt(capability.prompt);
    setStatus(
      `${capability.label} selected · ${executionModeLabels[capability.executionMode]} · ${
        capability.createsJob ? "job starts only after confirmation" : "no job created by navigation"
      }`,
    );
  }

  function newSession() {
    setSelectedAgentId(mariaAgent.id);
    setPrompt("Start a new Maria research session. Ask me what I want to research and suggest the first useful step.");
    setMessages([
      {
        role: "maria",
        text:
          "New session prepared. Tell me the decision, market, company, or question you want to research, and I will help structure the work.",
      },
    ]);
    setStatus("New Maria session prepared");
  }

  function sendToMaria() {
    const message = prompt.trim();
    if (!message || isPending) return;

    setMessages((current) => [...current, { role: "user", text: message }]);
    setStatus("Sending to secure Maria bridge");

    startTransition(async () => {
      try {
        const response = await fetch("/api/maria/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            agentId: selectedAgentId,
            sessionId: mariaAgent.sessionKey,
          }),
        });
        const payload = (await response.json()) as { reply?: string; message?: string };
        const reply = payload.reply || payload.message || "Maria bridge responded without text.";
        setMessages((current) => [...current, { role: "maria", text: reply }]);
        setStatus("Maria response received");
      } catch {
        setMessages((current) => [
          ...current,
          {
            role: "maria",
            text:
              "The local interface is ready, but the secure Maria bridge could not be reached. Check the deployment environment before live use.",
          },
        ]);
        setStatus("Bridge unavailable");
      }
    });
  }

  return (
    <section className="workstation" aria-label="Research Workstation Maria interface">
      <aside className="rail left-rail" aria-label="Research source and planning capabilities">
        {leftCapabilities.map((capability) => (
          <RailButton capability={capability} key={capability.id} onSelect={selectCapability} />
        ))}
      </aside>

      <section className="maria-console">
        <header className="maria-header">
          <div className="avatar">
            <span>M</span>
            <i aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Research Workstation</p>
            <h1>{mariaAgent.name}</h1>
            <p>{mariaAgent.description}</p>
          </div>
          <div className="live-pill">{mariaAgent.status === "live" ? "Maria is live" : "Prepared"}</div>
        </header>

        <div className="settings-bar" aria-label="Gateway status">
          <span>{status}</span>
          <strong>Vercel front door</strong>
          <span>NemoClaw bridge prepared server-side</span>
        </div>

        <section className="conversation-panel">
          {messages.map((message, index) => (
            <article className={`message-card ${message.role === "maria" ? "maria-message" : "user-message"}`} key={`${message.role}-${index}`}>
              <span>{message.role === "maria" ? "Maria" : "You"}</span>
              <p>{message.text}</p>
            </article>
          ))}
        </section>

        <footer className="composer">
          <label htmlFor="researchPrompt">Research prompt</label>
          <textarea
            id="researchPrompt"
            name="researchPrompt"
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Type a task, a research question, or the name of a public company to begin with Maria."
            rows={3}
            value={prompt}
          />
          <div className="composer-actions">
            <span>Session key: {mariaAgent.sessionKey}</span>
            <div>
              <button className="secondary-action" onClick={newSession} type="button">
                New Session
              </button>
              <button className="primary-action" disabled={isPending} onClick={sendToMaria} type="button">
                {isPending ? "Sending..." : "Send to Maria"}
              </button>
            </div>
          </div>
        </footer>
      </section>

      <aside className="rail right-rail" aria-label="Reporting and output capabilities">
        {rightCapabilities.map((capability) => (
          <RailButton capability={capability} key={capability.id} onSelect={selectCapability} />
        ))}
      </aside>
    </section>
  );
}
