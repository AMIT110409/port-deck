import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   DESIGN TOKENS
   bg        #0A0D12   near-black, faint blue cast
   panel     #11151C
   panel-2   #161B23
   border    #232A35
   text      #E7ECF2
   muted     #8A95A5
   signal    #3DDC97   terminal green
   signal-2  #5B8DEF   signal blue
   warn      #E8A33D   amber
   cloud     #00B4D8   azure cyan
   k8s       #326CE5   kubernetes blue
   docker    #2496ED   docker blue
   ============================================================ */

/* ── Profile ── */
const PROFILE = {
  name: "Amit Rathore",
  initials: "AR",
  role: "Senior AI Engineer",
  roleAlt: "Agentic Systems & Enterprise AI",
  tagline:
    "I design and ship production AI pipelines that sit inside real ERP, BI, and process-mining stacks — not demos.",
  location: "Bengaluru, India · Remote-friendly",
  email: "amitrathore110409@gmail.com",
  linkedin: "linkedin.com/in/amit-rathore-942a841b1",
  github: "github.com/AMIT110409",
  availability: "Open for select freelance engagements",
};


/* ── Stats ── */
const STATS = [
  { value: "50+", label: "K8s clusters managed" },
  { value: "200+", label: "Docker images shipped" },
  { value: "99.97%", label: "Avg. uptime SLA" },
  { value: "8+", label: "Enterprise clients" },
];

/* ── Pipeline stages ── */
const PIPELINE_STAGES = [
  { label: "CODE", detail: "Git push / PR merge", icon: "⬡" },
  { label: "BUILD", detail: "Docker multi-stage build", icon: "🐳" },
  { label: "TEST", detail: "Automated test suite", icon: "✓" },
  { label: "PUSH", detail: "Registry / ECR / ACR", icon: "↑" },
  { label: "DEPLOY", detail: "Helm chart → K8s cluster", icon: "⎈" },
  { label: "OBSERVE", detail: "Prometheus + Grafana", icon: "◉" },
];

/* ── Kubernetes architecture nodes ── */
const K8S_NODES = [
  { id: "master", label: "Control Plane", sub: "API Server · etcd · Scheduler", x: 50, y: 10, color: "#326CE5" },
  { id: "node1", label: "Worker Node 1", sub: "Pod · Pod · Pod", x: 15, y: 60, color: "#3DDC97" },
  { id: "node2", label: "Worker Node 2", sub: "Pod · Pod · Pod", x: 50, y: 60, color: "#3DDC97" },
  { id: "node3", label: "Worker Node 3", sub: "Pod · Pod · Pod", x: 85, y: 60, color: "#3DDC97" },
  { id: "lb", label: "Load Balancer", sub: "Ingress · Service Mesh", x: 50, y: 85, color: "#E8A33D" },
];

/* ── Cloud services ── */
const CLOUD_SERVICES = [
  {
    provider: "Azure",
    color: "#00B4D8",
    icon: "☁",
    services: ["AKS (Azure K8s Service)", "Azure Container Registry", "Azure Blob & Queue Storage", "Azure Bastion & VMs", "Azure DevOps CI/CD", "Azure Monitor & Log Analytics"],
  },
  {
    provider: "AWS",
    color: "#FF9900",
    icon: "⚡",
    services: ["EKS (Elastic K8s Service)", "ECR (Container Registry)", "S3 & SQS", "EC2 Auto Scaling Groups", "CodePipeline CI/CD", "CloudWatch & X-Ray"],
  },
  {
    provider: "GCP",
    color: "#4285F4",
    icon: "◈",
    services: ["GKE (Google K8s Engine)", "Cloud Run & Artifact Registry", "Cloud Storage & Pub/Sub", "GCE & Managed Instance Groups", "Cloud Build CI/CD", "Cloud Monitoring & Trace"],
  },
];

/* ── Docker workflow steps ── */
const DOCKER_STEPS = [
  {
    step: "01",
    title: "Dockerfile Design",
    desc: "Multi-stage builds to minimise image size. Separate build and runtime layers. Non-root user, minimal base images (distroless/alpine).",
    code: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\n\nFROM gcr.io/distroless/nodejs20\nCOPY --from=builder /app .`,
  },
  {
    step: "02",
    title: "Registry & Scanning",
    desc: "Push to private registries (ACR/ECR/GCR). Trivy vulnerability scans on every build. Image signing with cosign for supply-chain security.",
    code: `# Trivy scan in CI\ntrivy image --exit-code 1 \\\n  --severity HIGH,CRITICAL \\\n  myregistry.azurecr.io/app:latest\n\n# Sign with cosign\ncosign sign myregistry.azurecr.io/app:latest`,
  },
  {
    step: "03",
    title: "Helm Deployment",
    desc: "Helm charts for every service. GitOps-driven deployments via ArgoCD. Blue/green and canary strategies with traffic splitting.",
    code: `# Deploy via Helm + ArgoCD\nhelm upgrade --install myapp ./chart \\\n  --namespace production \\\n  --set image.tag=$COMMIT_SHA \\\n  --set replicas=3 \\\n  --wait`,
  },
  {
    step: "04",
    title: "Observability Stack",
    desc: "Prometheus metrics, Grafana dashboards, Loki log aggregation, Jaeger distributed tracing. Alertmanager for on-call routing.",
    code: `# Prometheus scrape config\n- job_name: 'kubernetes-pods'\n  kubernetes_sd_configs:\n  - role: pod\n  relabel_configs:\n  - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]\n    action: keep`,
  },
];

/* ── Stack groups ── */
const STACK_GROUPS = [
  {
    label: "Container & Orchestration",
    color: "#326CE5",
    items: ["Kubernetes (EKS/AKS/GKE)", "Helm Charts", "Docker & Compose", "ArgoCD / GitOps", "Istio Service Mesh", "Kustomize"],
  },
  {
    label: "Agentic AI / LLM",
    color: "#3DDC97",
    items: [
      "LangChain · LangGraph",
      "RAG / FAISS / Qdrant",
      "AWS Bedrock · Claude · GPT",
      "n8n · Airflow orchestration",
      "LLMOps (MLflow · LangSmith)",
      "Prompt engineering & Eval",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    color: "#00B4D8",
    items: [
      "Azure · AWS · GCP",
      "Terraform · Pulumi",
      "Azure Data Factory (ADF)",
      "CI/CD (GitHub Actions / ADO)",
      "Vault secrets mgmt",
      "Kong API Gateway",
    ],
  },
  {
    label: "Observability & Data",
    color: "#E8A33D",
    items: [
      "Microsoft Fabric · Databricks",
      "Kafka · Azure Event Hubs",
      "Prometheus · Grafana · Loki",
      "Celonis · Power BI",
      "PostgreSQL · Redis · MongoDB",
      "Jaeger distributed tracing",
    ],
  },
  {
    label: "Enterprise Integration",
    color: "#5B8DEF",
    items: ["SAP (SOAP/BAPI)", "SAGE X3", "WebMethods middleware", "REST & GraphQL APIs", "Message queues", "EDI / B2B connectors"],
  },
  {
    label: "Security & DevSecOps",
    color: "#FF6B6B",
    items: ["Trivy · Snyk", "OPA / Kyverno policies", "RBAC & Network Policies", "Secrets management", "SAST / DAST in CI", "SOC2 / ISO 27001 ready"],
  },
];

/* ── Projects ── */
const PROJECTS = [
  {
    code: "01",
    name: "Multi-Cloud K8s Platform",
    client: "Global FMCG — AB InBev",
    summary:
      "Designed and delivered a unified multi-cloud Kubernetes platform spanning Azure AKS and AWS EKS, enabling 200+ microservices to deploy across regions with a single Helm chart and ArgoCD GitOps pipeline.",
    points: [
      "Reduced deployment lead time from 3 days to 45 minutes end-to-end",
      "Implemented Istio service mesh for zero-trust mTLS between all services",
      "Built custom Kubernetes operators for database provisioning and secret rotation",
      "99.97% uptime SLA maintained across 18 months in production",
    ],
    stack: ["Kubernetes", "ArgoCD", "Istio", "Helm", "Azure AKS", "AWS EKS", "Terraform"],
    status: "Live in production",
    category: "infra",
    links: [
      { label: "Platform Console", url: "https://web-production-60f07c.up.railway.app/" }
    ],
  },
  {
    code: "02",
    name: "Touchless Order Creation Agent",
    client: "Enterprise — Chemicals / FMCG",
    summary:
      "End-to-end agentic pipeline converting inbound PDF purchase orders into SAP sales orders with zero manual entry — running in a containerised microservice on Azure AKS.",
    points: [
      "Dockerised OCR + LLM pipeline deployed as a K8s CronJob + event-driven worker",
      "Orchestrated custom data flows via n8n integration and Apache Airflow DAGs",
      "Full audit trail via structured logging to Azure Log Analytics",
    ],
    stack: ["Claude API", "n8n", "Airflow", "Celonis", "SAP SOAP/BAPI", "Azure AKS", "Docker", "FastAPI"],
    status: "Live in UAT",
    category: "ai",
    links: [
      { label: "Agent Portal", url: "https://pca-modified-production-05fb.up.railway.app/" }
    ],
  },
  {
    code: "03",
    name: "Pharma RAG Compliance Platform",
    client: "Johnson & Johnson",
    summary:
      "FAISS-backed retrieval-augmented Q&A over regulated pharma documentation, with MLflow and LangSmith integrated for LLM evaluation, running in a secure Kubernetes cluster.",
    points: [
      "Air-gapped K8s cluster with OPA policies enforcing data residency rules",
      "LangSmith tracers and MLflow logs for strict compliance audit trails",
      "Reduced manual query resolution time by 60% across pilot users",
    ],
    stack: ["RAG", "FAISS", "LangChain", "MLflow", "LangSmith", "Kubernetes", "OPA", "Vault"],
    status: "Delivered",
    category: "ai",
    links: [
      { label: "RAG Portal", url: "https://j-j-frontend.vercel.app/" }
    ],
  },
  {
    code: "04",
    name: "Zero-Downtime Migration to GKE",
    client: "SaaS Platform — FinTech",
    summary:
      "Migrated a monolithic Rails application to a containerised microservices architecture on Google Kubernetes Engine, with zero downtime and full traffic migration using Istio canary deployments.",
    points: [
      "Strangler-fig pattern: 12 microservices extracted over 6 months",
      "Istio-based canary: traffic shifted 1% → 10% → 50% → 100% per service",
      "Reduced infrastructure cost by 42% through right-sizing and spot node pools",
    ],
    stack: ["GKE", "Istio", "Helm", "Terraform", "Cloud Build", "Prometheus", "Grafana"],
    status: "Delivered",
    category: "infra",
    links: [
      { label: "Migration Dashboard", url: "https://reverse-migration-ui.vercel.app/dashboard" }
    ],
  },
  {
    code: "05",
    name: "AgentOS — Enterprise Agent Platform",
    client: "Internal Platform",
    summary:
      "Reusable enterprise agent platform — the shared backbone behind multiple client AI deployments — utilizing AWS Bedrock and Claude APIs, packaged as a multi-tenant Kubernetes deployment.",
    points: [
      "Helm umbrella chart with per-tenant value overrides and RBAC isolation",
      "LangGraph orchestration running as long-lived K8s Deployments with leader election",
      "Integrated with Azure Key Vault for per-tenant secret injection at pod start",
    ],
    stack: ["LangGraph", "AWS Bedrock", "Claude API", "Azure AKS", "Helm", "Vault", "Redis", "PostgreSQL"],
    status: "Active development",
    category: "ai",
    links: [
      { label: "AI Call Intel", url: "https://ai-call-intelligence-red.vercel.app/" }
    ],
  },
  {
    code: "06",
    name: "Celonis to Azure Real-Time Data Pipeline",
    client: "FrieslandCampina",
    summary:
      "Real-time supply chain data ingestion pipeline from Celonis process mining to Microsoft Fabric, orchestrated via Azure Data Factory (ADF) and Apache Airflow.",
    points: [
      "Ingested 50k+ process events/min via Azure Event Hubs and Apache Kafka streaming",
      "Built delta lake tables in Microsoft Fabric for real-time BI dashboarding in Power BI",
      "Orchestrated complex ETL jobs using Azure Data Factory pipelines and Airflow DAGs",
    ],
    stack: ["Microsoft Fabric", "Azure Event Hubs", "Kafka", "ADF Pipelines", "Airflow", "Power BI", "Celonis"],
    status: "Delivered",
    category: "infra",
    links: [
      { label: "SCNV Portal", url: "https://scnv-frontend.vercel.app/login" },
      { label: "SCNV Console", url: "https://scnv-frontend-daksihtedit-production.up.railway.app/login" }
    ],
  },
];

/* ── Approach cards ── */
const APPROACH = [
  {
    num: "01",
    icon: "🏗",
    title: "Infrastructure as Code, always",
    desc: "Every cluster, every namespace, every IAM policy is in Git. Terraform for cloud resources, Helm for K8s workloads, ArgoCD for GitOps sync. If it's not in code, it doesn't exist.",
  },
  {
    num: "02",
    icon: "🔒",
    title: "Security is a day-one concern",
    desc: "OPA admission controllers, network policies, Vault secret injection, image scanning in CI — baked into the platform before the first workload lands. Not bolted on later.",
  },
  {
    num: "03",
    icon: "📊",
    title: "Observe everything, alert on signal",
    desc: "Prometheus + Grafana + Loki + Jaeger on every cluster. SLOs defined before deployment. Alertmanager routes to the right person. Dashboards that tell a story, not just show metrics.",
  },
  {
    num: "04",
    icon: "⚡",
    title: "Build for the failure path",
    desc: "PodDisruptionBudgets, readiness probes, circuit breakers, graceful shutdown — the happy path is easy. I design systems that degrade gracefully and recover automatically.",
  },
];

/* ════════════════════════════════════════════════════════════
   COMPONENTS
   ════════════════════════════════════════════════════════════ */

/* Particle canvas background */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: ["#3DDC97", "#5B8DEF", "#326CE5", "#00B4D8"][Math.floor(Math.random() * 4)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(91,141,239,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", opacity: 0.6 }} />;
}

/* Animated pipeline */
function PipelineSignature() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % PIPELINE_STAGES.length), 1300);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="pipeline" role="img" aria-label="CI/CD pipeline diagram">
      <div className="pipeline-track">
        {PIPELINE_STAGES.map((stage, i) => {
          const isActive = i === active;
          return (
            <React.Fragment key={stage.label}>
              <div className={`pl-node ${isActive ? "pl-node-active" : ""}`}>
                <span className="pl-icon">{stage.icon}</span>
                <span className="pl-label">{stage.label}</span>
                <span className="pl-detail">{stage.detail}</span>
              </div>
              {i < PIPELINE_STAGES.length - 1 && (
                <div className={`pl-edge ${active > i ? "pl-edge-done" : ""}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* K8s architecture diagram */
function K8sDiagram() {
  const [activeNode, setActiveNode] = useState(null);
  return (
    <div className="k8s-diagram">
      <div className="k8s-header">
        <span className="k8s-badge">⎈ Kubernetes Cluster</span>
      </div>
      <div className="k8s-canvas">
        {/* SVG connections */}
        <svg className="k8s-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[1, 2, 3].map((n) => {
            const node = K8S_NODES[n];
            const master = K8S_NODES[0];
            return (
              <line key={n} x1={`${master.x}%`} y1={`${master.y + 8}%`} x2={`${node.x}%`} y2={`${node.y - 8}%`}
                stroke="#232A35" strokeWidth="0.5" strokeDasharray="2,2" />
            );
          })}
          {[1, 2, 3].map((n) => {
            const node = K8S_NODES[n];
            const lb = K8S_NODES[4];
            return (
              <line key={`lb-${n}`} x1={`${node.x}%`} y1={`${node.y + 8}%`} x2={`${lb.x}%`} y2={`${lb.y - 4}%`}
                stroke="#232A35" strokeWidth="0.5" strokeDasharray="2,2" />
            );
          })}
        </svg>
        {K8S_NODES.map((node) => (
          <div
            key={node.id}
            className={`k8s-node ${activeNode === node.id ? "k8s-node-active" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%`, "--node-color": node.color }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="k8s-node-dot" />
            <div className="k8s-node-label">{node.label}</div>
            <div className="k8s-node-sub">{node.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Docker step card */
function DockerStep({ step }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`docker-step ${open ? "docker-step-open" : ""}`} onClick={() => setOpen((o) => !o)}>
      <div className="docker-step-head">
        <div className="docker-step-num">{step.step}</div>
        <div>
          <div className="docker-step-title">🐳 {step.title}</div>
          <div className="docker-step-desc">{step.desc}</div>
        </div>
        <div className="docker-step-toggle">{open ? "▲" : "▼"}</div>
      </div>
      {open && (
        <pre className="docker-code"><code>{step.code}</code></pre>
      )}
    </div>
  );
}

/* Cloud provider card */
function CloudCard({ provider }) {
  return (
    <div className="cloud-card" style={{ "--provider-color": provider.color }}>
      <div className="cloud-card-header">
        <span className="cloud-icon">{provider.icon}</span>
        <span className="cloud-name">{provider.provider}</span>
      </div>
      <ul className="cloud-services">
        {provider.services.map((s) => (
          <li key={s}>
            <span className="cloud-bullet" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Status pill */
function StatusPill({ status }) {
  const isLive = /live|active/i.test(status);
  return <span className={`pill ${isLive ? "pill-active" : "pill-done"}`}>{status}</span>;
}

/* Category badge */
function CategoryBadge({ category }) {
  const map = { infra: { label: "Infrastructure", color: "#326CE5" }, ai: { label: "AI / LLM", color: "#3DDC97" } };
  const c = map[category] || { label: category, color: "#8A95A5" };
  return <span className="cat-badge" style={{ "--cat-color": c.color }}>{c.label}</span>;
}

/* Eyebrow */
function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

/* Section heading */
function SectionHeading({ eyebrow, title, lede }) {
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}

/* Typing effect */
function TypingText({ texts }) {
  const [display, setDisplay] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[textIdx];
    const delay = deleting ? 50 : 100;
    const id = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setTextIdx((t) => (t + 1) % texts.length);
        }
      }
    }, delay);
    return () => clearTimeout(id);
  }, [charIdx, deleting, textIdx, texts]);
  return <span>{display}<span className="cursor-blink">|</span></span>;
}

/* ════════════════════════════════════════════════════════════
   MAIN APP
   ════════════════════════════════════════════════════════════ */

export default function App() {
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProjects = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="page">
      <style>{CSS}</style>
      <ParticleCanvas />

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-mark">
            <span className="nav-initials">{PROFILE.initials}</span>
            <span className="nav-slash">/</span>
            cloud-k8s-ai
          </div>
          <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
            {["work", "cloud", "docker", "k8s", "stack", "contact"].map((s) => (
              <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)}>
                {s}
              </a>
            ))}
          </div>
          <div className="nav-right">
            <div className="status-chip">
              <span className="blip" />
              {PROFILE.availability}
            </div>
            <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="menu">
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="hero">
        <div className="wrap">
          <div className="hero-kicker">
            <span className="hero-prompt">root@cloud-cluster:~$</span>
            <span className="hero-cmd">
              <TypingText texts={["kubectl get pods --all-namespaces", "docker build -t portfolio:latest .", "terraform apply --auto-approve", "helm upgrade --install app ./chart"]} />
            </span>
          </div>

          <h1 className="hero-title">
            {PROFILE.name}
            <br />
            <span className="accent-cloud">{PROFILE.role}</span>
          </h1>
          <p className="hero-sub">{PROFILE.roleAlt}</p>
          <p className="hero-tagline">{PROFILE.tagline}</p>

          <div className="stats-row">
            {STATS.map((s) => (
              <div key={s.label} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="hero-meta">
            <span><b>Stack</b> K8s · Docker · Cloud · AI</span>
            <span><b>Based in</b> {PROFILE.location}</span>
            <span><b>Shipped</b> 8+ enterprise programs</span>
          </div>

          <div className="cta-row">
            <a className="btn btn-primary" href="#contact">Start a project</a>
            <a className="btn btn-k8s" href="#k8s">K8s Portfolio ⎈</a>
            <a className="btn btn-ghost" href="#work">See all work →</a>
          </div>
        </div>
      </header>

      {/* ── CI/CD PIPELINE ── */}
      <div className="pipeline-section">
        <div className="wrap">
          <Eyebrow>CI/CD Pipeline</Eyebrow>
          <PipelineSignature />
          <p className="pipeline-caption">
            Every service I build ships through this pipeline: code → Docker build → vulnerability scan → Helm deploy → Prometheus monitoring.
          </p>
        </div>
      </div>

      {/* ── PROJECTS ── */}
      <section id="work">
        <div className="wrap">
          <SectionHeading
            eyebrow="Selected work"
            title="Cloud infrastructure & AI, shipped to production"
            lede="Eight programs across FMCG, pharma, FinTech, and enterprise SaaS — each one a containerised, Kubernetes-native workload running in a real cloud environment."
          />
          <div className="filter-row">
            {["all", "infra", "ai"].map((f) => (
              <button key={f} className={`filter-btn ${filter === f ? "filter-btn-active" : ""}`} onClick={() => setFilter(f)}>
                {f === "all" ? "All projects" : f === "infra" ? "⎈ Infrastructure" : "🤖 AI / LLM"}
              </button>
            ))}
          </div>
          <div className="projects-list">
            {filteredProjects.map((p) => (
              <article className="project" key={p.code}>
                <div className="project-code">{p.code}</div>
                <div>
                  <div className="project-head">
                    <h3>{p.name}</h3>
                    <div className="project-badges">
                      <CategoryBadge category={p.category} />
                      <StatusPill status={p.status} />
                    </div>
                  </div>
                  <p className="project-client">{p.client}</p>
                  <p className="project-summary">{p.summary}</p>
                  <ul className="project-points">
                    {p.points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                  <div className="project-stack">
                    {p.stack.map((s) => <span className="tag" key={s}>{s}</span>)}
                  </div>
                  {p.links && p.links.length > 0 && (
                    <div className="project-links" style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {p.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-ghost"
                          style={{
                            fontSize: "12px",
                            padding: "6px 14px",
                            height: "auto",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            textDecoration: "none",
                            lineHeight: "1.2",
                          }}
                        >
                          <span>🔗</span> {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOUD ── */}
      <section id="cloud">
        <div className="wrap">
          <SectionHeading
            eyebrow="Multi-cloud expertise"
            title="Azure · AWS · GCP"
            lede="Certified across all three major cloud platforms — designing and operating production workloads at scale on managed Kubernetes, serverless, and IaaS layers."
          />
          <div className="cloud-grid">
            {CLOUD_SERVICES.map((p) => <CloudCard key={p.provider} provider={p} />)}
          </div>
        </div>
      </section>

      {/* ── DOCKER ── */}
      <section id="docker">
        <div className="wrap">
          <SectionHeading
            eyebrow="Container Engineering"
            title="Docker done right"
            lede="From Dockerfile design to registry management, image scanning, and GitOps deployment — containers built for production security and minimal attack surface."
          />
          <div className="docker-steps">
            {DOCKER_STEPS.map((s) => <DockerStep key={s.step} step={s} />)}
          </div>
        </div>
      </section>

      {/* ── KUBERNETES ── */}
      <section id="k8s">
        <div className="wrap">
          <SectionHeading
            eyebrow="Kubernetes Architecture"
            title="Production K8s clusters at scale"
            lede="Multi-tenant cluster design with network policies, RBAC, Istio service mesh, and GitOps-driven deployments. Every cluster is reproducible from code."
          />
          <K8sDiagram />
          <div className="k8s-features">
            {[
              { icon: "⎈", title: "Multi-tenant RBAC", desc: "Namespace isolation with role-based access control per team and environment." },
              { icon: "🔒", title: "Network Policies", desc: "Default-deny with explicit allow rules. Zero-trust pod-to-pod communication." },
              { icon: "📦", title: "Helm + ArgoCD GitOps", desc: "All deployments declarative in Git. ArgoCD syncs cluster state continuously." },
              { icon: "📊", title: "Full Observability", desc: "Prometheus, Grafana, Loki, Jaeger — full MELT stack on every cluster." },
              { icon: "⚡", title: "HPA & KEDA Autoscaling", desc: "CPU/memory-based HPA plus KEDA event-driven scaling from Kafka queues." },
              { icon: "🛡", title: "OPA / Kyverno Policies", desc: "Admission controller policies enforcing security baselines on every workload." },
            ].map((f) => (
              <div className="k8s-feature" key={f.title}>
                <div className="k8s-feature-icon">{f.icon}</div>
                <div>
                  <div className="k8s-feature-title">{f.title}</div>
                  <div className="k8s-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section id="stack">
        <div className="wrap">
          <SectionHeading
            eyebrow="Toolkit"
            title="Full-stack: Cloud · K8s · AI · Observability"
            lede="The differentiator isn't any single tool — it's connecting Kubernetes infrastructure cleanly to AI pipelines, enterprise ERP systems, and real-time data stacks."
          />
          <div className="stack-grid">
            {STACK_GROUPS.map((g) => (
              <div className="stack-card" key={g.label} style={{ "--group-color": g.color }}>
                <h3>{g.label}</h3>
                <ul>
                  {g.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section id="approach">
        <div className="wrap">
          <SectionHeading eyebrow="How I work" title="Infrastructure as craft, not commodity" />
          <div className="approach-grid">
            {APPROACH.map((a) => (
              <div className="approach-card" key={a.num}>
                <div className="approach-icon">{a.icon}</div>
                <div className="num">{a.num}</div>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="wrap contact">
          <div className="contact-panel">
            <div>
              <Eyebrow>Get in touch</Eyebrow>
              <h2>Have a cloud or AI problem worth solving properly?</h2>
              <p>
                I take on a small number of engagements at a time — Kubernetes platform builds, cloud architecture reviews, AI pipeline deployments, and enterprise integrations.
              </p>
              <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}>
                Email {PROFILE.email}
              </a>
            </div>
            <div className="contact-links">
              <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noreferrer">↗ {PROFILE.linkedin}</a>
              <a href={`https://${PROFILE.github}`} target="_blank" rel="noreferrer">↗ {PROFILE.github}</a>
              <div className="contact-tech-badges">
                <span className="tech-badge" style={{ "--c": "#326CE5" }}>⎈ Kubernetes</span>
                <span className="tech-badge" style={{ "--c": "#2496ED" }}>🐳 Docker</span>
                <span className="tech-badge" style={{ "--c": "#00B4D8" }}>☁ Cloud</span>
                <span className="tech-badge" style={{ "--c": "#3DDC97" }}>🤖 AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap footer-row">
          <span>© {new Date().getFullYear()} {PROFILE.name} — cloud-native, AI-powered, built with intent.</span>
          <span>
            <span className="footer-dot" style={{ "--c": "#326CE5" }} /> K8s
            <span className="footer-dot" style={{ "--c": "#2496ED" }} /> Docker
            <span className="footer-dot" style={{ "--c": "#3DDC97" }} /> AI
            &nbsp;·&nbsp;
            status: <span style={{ color: "var(--signal)" }}>available</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ALL CSS — embedded in component
   ════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --bg: #0A0D12;
  --panel: #11151C;
  --panel-2: #161B23;
  --border: #232A35;
  --text: #E7ECF2;
  --muted: #8A95A5;
  --signal: #3DDC97;
  --signal-2: #5B8DEF;
  --warn: #E8A33D;
  --cloud: #00B4D8;
  --k8s: #326CE5;
  --docker: #2496ED;
  --mono: "IBM Plex Mono", ui-monospace, monospace;
  --sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

.page {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  line-height: 1.6;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.page::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(35,42,53,0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(35,42,53,0.4) 1px, transparent 1px);
  background-size: 64px 64px;
  background-position: -1px -1px;
  pointer-events: none;
  z-index: 0;
}

.page > * { position: relative; z-index: 1; }

a { color: var(--signal-2); text-decoration: none; }
a:hover { text-decoration: underline; color: var(--signal); }

.wrap { max-width: 1120px; margin: 0 auto; padding: 0 28px; }

/* ── EYEBROW ── */
.eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--signal);
  margin-bottom: 12px;
}
.eyebrow::before { content: "// "; color: var(--muted); }

/* ── NAV ── */
.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(10,13,18,0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: 1120px; margin: 0 auto; padding: 14px 28px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
}
.nav-mark {
  font-family: var(--mono); font-weight: 600; font-size: 14px; color: var(--text);
  display: flex; align-items: center; gap: 6px; white-space: nowrap;
}
.nav-initials {
  background: linear-gradient(135deg, var(--k8s), var(--signal));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  font-weight: 700;
}
.nav-slash { color: var(--border); }
.nav-links {
  display: flex; gap: 20px;
  font-family: var(--mono); font-size: 12px;
}
.nav-links a {
  color: var(--muted); transition: color .15s;
  text-transform: lowercase; letter-spacing: 0.04em;
}
.nav-links a:hover { color: var(--signal); text-decoration: none; }
.nav-right { display: flex; align-items: center; gap: 12px; }
.status-chip {
  display: flex; align-items: center; gap: 7px;
  font-family: var(--mono); font-size: 11px; color: var(--signal);
  border: 1px solid rgba(61,220,151,0.3); border-radius: 100px; padding: 5px 12px;
  white-space: nowrap;
}
.blip {
  width: 6px; height: 6px; border-radius: 50%; background: var(--signal);
  animation: blip 2s ease infinite;
}
@keyframes blip {
  0%,100% { box-shadow: 0 0 0 0 rgba(61,220,151,0.5); }
  50% { box-shadow: 0 0 0 6px rgba(61,220,151,0); }
}
.hamburger {
  display: none;
  background: none; border: 1px solid var(--border); border-radius: 6px;
  color: var(--text); font-size: 16px; padding: 6px 10px; cursor: pointer;
}

/* ── HERO ── */
.hero {
  padding: 96px 0 64px;
  position: relative;
}
.hero-kicker {
  font-family: var(--mono); font-size: 13px; color: var(--muted);
  margin-bottom: 28px;
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
}
.hero-prompt { color: var(--signal); }
.hero-cmd { color: var(--text); min-height: 1.4em; }
.cursor-blink { animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

h1.hero-title {
  font-family: var(--mono);
  font-weight: 700;
  font-size: clamp(34px, 5.5vw, 62px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}
.accent-cloud {
  background: linear-gradient(90deg, var(--k8s) 0%, var(--signal) 50%, var(--cloud) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-sub {
  font-family: var(--mono); font-size: 15px; color: var(--muted);
  margin-bottom: 20px; letter-spacing: 0.04em;
}
.hero-tagline {
  font-size: 18px; color: var(--muted); max-width: 60ch; margin-bottom: 36px;
  line-height: 1.65;
}

.stats-row {
  display: flex; gap: 0; flex-wrap: wrap;
  border: 1px solid var(--border); border-radius: 12px;
  overflow: hidden; margin-bottom: 28px;
  background: var(--panel);
  width: fit-content;
}
.stat-item {
  padding: 18px 28px; text-align: center;
  border-right: 1px solid var(--border);
}
.stat-item:last-child { border-right: none; }
.stat-value {
  font-family: var(--mono); font-size: 24px; font-weight: 700;
  background: linear-gradient(90deg, var(--signal), var(--k8s));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.stat-label { font-size: 12px; color: var(--muted); margin-top: 4px; }

.hero-meta {
  display: flex; flex-wrap: wrap; gap: 8px 28px;
  font-family: var(--mono); font-size: 12px; color: var(--muted);
  border-top: 1px solid var(--border); padding-top: 18px; margin-bottom: 24px;
}
.hero-meta b { color: var(--text); font-weight: 500; }

.cta-row { display: flex; gap: 12px; flex-wrap: wrap; }

.btn {
  font-family: var(--mono); font-size: 13px;
  padding: 12px 22px; border-radius: 8px;
  border: 1px solid var(--border); cursor: pointer;
  transition: all .18s ease; display: inline-flex; align-items: center; gap: 6px;
  text-decoration: none;
}
.btn-primary {
  background: linear-gradient(135deg, var(--signal), #2DC880);
  color: #06140E; border-color: transparent; font-weight: 700;
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(61,220,151,0.3); text-decoration: none; color: #06140E; }
.btn-k8s {
  background: linear-gradient(135deg, var(--k8s), #2050D0);
  color: #fff; border-color: transparent; font-weight: 600;
}
.btn-k8s:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(50,108,229,0.35); text-decoration: none; color: #fff; }
.btn-ghost { background: transparent; color: var(--text); }
.btn-ghost:hover { border-color: var(--signal-2); color: var(--signal-2); text-decoration: none; transform: translateY(-1px); }

/* ── PIPELINE ── */
.pipeline-section { padding: 16px 0 72px; }
.pipeline {
  border: 1px solid var(--border); border-radius: 12px;
  background: linear-gradient(180deg, var(--panel), var(--panel-2));
  padding: 28px 24px; overflow-x: auto; margin-bottom: 14px;
}
.pipeline-track {
  display: flex; align-items: stretch; gap: 0; min-width: 700px;
}
.pl-node {
  flex: 1; min-width: 100px;
  border: 1px solid var(--border); border-radius: 8px;
  background: var(--bg); padding: 14px 12px;
  transition: border-color .3s, box-shadow .3s, transform .3s;
  cursor: default;
}
.pl-icon { display: block; font-size: 18px; margin-bottom: 8px; }
.pl-label {
  display: block; font-family: var(--mono); font-size: 11px; font-weight: 700;
  letter-spacing: 0.08em; color: var(--text); margin-bottom: 5px; text-transform: uppercase;
}
.pl-detail { display: block; font-size: 11px; color: var(--muted); line-height: 1.4; }
.pl-node-active {
  border-color: var(--signal);
  box-shadow: 0 0 0 1px var(--signal), 0 0 28px -4px rgba(61,220,151,0.5);
  transform: translateY(-3px);
}
.pl-edge {
  width: 28px; align-self: center; height: 1px;
  background: var(--border); flex-shrink: 0;
  transition: background .3s;
  position: relative;
}
.pl-edge::after {
  content: '›';
  position: absolute; right: -4px; top: 50%; transform: translateY(-50%);
  color: var(--border); font-size: 14px; line-height: 1;
}
.pl-edge-done { background: var(--signal); }
.pl-edge-done::after { color: var(--signal); }
.pipeline-caption { font-family: var(--mono); font-size: 12px; color: var(--muted); }

/* ── SECTIONS ── */
section { padding: 80px 0; border-top: 1px solid var(--border); }
.section-heading { max-width: 68ch; margin-bottom: 48px; }
.section-heading h2 {
  font-family: var(--mono);
  font-size: clamp(24px, 3.2vw, 34px);
  letter-spacing: -0.01em; margin-bottom: 14px;
}
.lede { color: var(--muted); font-size: 16px; line-height: 1.65; }

/* ── FILTER ── */
.filter-row { display: flex; gap: 10px; margin-bottom: 36px; flex-wrap: wrap; }
.filter-btn {
  font-family: var(--mono); font-size: 12px;
  padding: 8px 16px; border-radius: 100px;
  border: 1px solid var(--border); background: transparent; color: var(--muted);
  cursor: pointer; transition: all .15s;
}
.filter-btn:hover { border-color: var(--signal-2); color: var(--signal-2); }
.filter-btn-active { border-color: var(--signal); color: var(--signal); background: rgba(61,220,151,0.08); }

/* ── PROJECTS ── */
.projects-list {}
.project {
  display: grid; grid-template-columns: 56px 1fr; gap: 28px;
  padding: 36px 0; border-bottom: 1px solid var(--border);
  transition: background .15s;
}
.project:last-child { border-bottom: none; }
.project:hover { }
.project-code { font-family: var(--mono); color: var(--muted); font-size: 13px; padding-top: 4px; }
.project-head {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 12px; flex-wrap: wrap; margin-bottom: 4px;
}
.project-head h3 { font-family: var(--mono); font-size: 20px; margin: 0; }
.project-badges { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.project-client { font-size: 13px; color: var(--muted); margin-bottom: 14px; }
.project-summary { color: var(--text); font-size: 15px; max-width: 72ch; margin-bottom: 16px; line-height: 1.65; }
.project-points { padding-left: 18px; color: var(--muted); font-size: 14px; margin-bottom: 18px; }
.project-points li { margin-bottom: 7px; }
.project-stack { display: flex; flex-wrap: wrap; gap: 8px; }

.tag {
  font-family: var(--mono); font-size: 11px; color: var(--signal-2);
  border: 1px solid rgba(91,141,239,0.25); border-radius: 100px; padding: 4px 10px;
  background: rgba(91,141,239,0.06);
}
.pill {
  font-family: var(--mono); font-size: 11px; padding: 4px 10px; border-radius: 100px;
  border: 1px solid var(--border); white-space: nowrap;
}
.pill-active { color: var(--signal); border-color: rgba(61,220,151,0.35); background: rgba(61,220,151,0.06); }
.pill-done { color: var(--muted); }

.cat-badge {
  font-family: var(--mono); font-size: 11px;
  color: var(--cat-color, var(--signal));
  border: 1px solid color-mix(in srgb, var(--cat-color, var(--signal)) 30%, transparent);
  border-radius: 100px; padding: 4px 10px;
  background: color-mix(in srgb, var(--cat-color, var(--signal)) 8%, transparent);
}

/* ── CLOUD ── */
.cloud-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
}
.cloud-card {
  border: 1px solid var(--border); border-radius: 12px;
  background: var(--panel); padding: 28px;
  transition: border-color .2s, transform .2s;
  border-top: 3px solid var(--provider-color, var(--signal));
}
.cloud-card:hover { border-color: var(--provider-color, var(--signal)); transform: translateY(-3px); }
.cloud-card-header {
  display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
}
.cloud-icon { font-size: 22px; }
.cloud-name {
  font-family: var(--mono); font-weight: 700; font-size: 16px;
  color: var(--provider-color, var(--text));
}
.cloud-services { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.cloud-services li {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; color: var(--muted);
}
.cloud-bullet {
  width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
  background: var(--provider-color, var(--signal));
}

/* ── DOCKER ── */
.docker-steps { display: flex; flex-direction: column; gap: 12px; }
.docker-step {
  border: 1px solid var(--border); border-radius: 12px;
  background: var(--panel); overflow: hidden;
  cursor: pointer; transition: border-color .2s;
}
.docker-step:hover, .docker-step-open { border-color: var(--docker); }
.docker-step-head {
  display: grid; grid-template-columns: 48px 1fr 32px;
  gap: 16px; padding: 24px; align-items: start;
}
.docker-step-num {
  font-family: var(--mono); font-size: 22px; font-weight: 700;
  color: var(--docker); line-height: 1;
}
.docker-step-title {
  font-family: var(--mono); font-size: 16px; font-weight: 600;
  color: var(--text); margin-bottom: 6px;
}
.docker-step-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }
.docker-step-toggle { font-size: 12px; color: var(--muted); padding-top: 4px; text-align: right; }
.docker-code {
  background: #060911; border-top: 1px solid var(--border);
  padding: 20px 24px; font-family: var(--mono); font-size: 12.5px;
  color: var(--signal); line-height: 1.7; overflow-x: auto;
  white-space: pre;
}

/* ── KUBERNETES ── */
.k8s-diagram {
  border: 1px solid var(--border); border-radius: 12px;
  background: var(--panel); overflow: hidden; margin-bottom: 36px;
}
.k8s-header {
  padding: 14px 20px; border-bottom: 1px solid var(--border);
  background: rgba(50,108,229,0.07);
}
.k8s-badge {
  font-family: var(--mono); font-size: 13px; font-weight: 600;
  color: var(--k8s); letter-spacing: 0.04em;
}
.k8s-canvas {
  position: relative; height: 260px; padding: 16px;
}
.k8s-svg {
  position: absolute; inset: 0; width: 100%; height: 100%;
}
.k8s-node {
  position: absolute; transform: translate(-50%, -50%);
  background: var(--bg); border: 1px solid var(--border);
  border-radius: 10px; padding: 12px 16px;
  text-align: center; width: 140px;
  cursor: pointer; transition: border-color .2s, box-shadow .2s, transform .2s;
}
.k8s-node:hover, .k8s-node-active {
  border-color: var(--node-color, var(--signal));
  box-shadow: 0 0 24px -4px color-mix(in srgb, var(--node-color, var(--signal)) 50%, transparent);
  transform: translate(-50%, -50%) scale(1.05);
}
.k8s-node-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--node-color, var(--signal));
  margin: 0 auto 8px;
  box-shadow: 0 0 8px var(--node-color, var(--signal));
}
.k8s-node-label {
  font-family: var(--mono); font-size: 12px; font-weight: 600;
  color: var(--text); margin-bottom: 4px;
}
.k8s-node-sub { font-size: 11px; color: var(--muted); }

.k8s-features {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}
.k8s-feature {
  display: flex; gap: 14px; align-items: flex-start;
  border: 1px solid var(--border); border-radius: 10px;
  padding: 20px; background: var(--panel);
  transition: border-color .2s;
}
.k8s-feature:hover { border-color: var(--k8s); }
.k8s-feature-icon { font-size: 20px; flex-shrink: 0; }
.k8s-feature-title {
  font-family: var(--mono); font-size: 13px; font-weight: 600;
  color: var(--text); margin-bottom: 5px;
}
.k8s-feature-desc { font-size: 13px; color: var(--muted); line-height: 1.55; }

/* ── STACK ── */
.stack-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
  background: var(--border); border: 1px solid var(--border);
  border-radius: 12px; overflow: hidden;
}
.stack-card {
  background: var(--panel); padding: 26px;
  border-top: 2px solid var(--group-color, var(--signal));
}
.stack-card h3 {
  font-family: var(--mono); font-size: 12px;
  color: var(--group-color, var(--signal));
  text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;
}
.stack-card ul { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
.stack-card li {
  font-size: 13px; color: var(--text);
  background: var(--bg); border: 1px solid var(--border);
  border-radius: 6px; padding: 5px 10px;
  transition: border-color .15s;
}
.stack-card li:hover { border-color: var(--group-color, var(--signal)); }

/* ── APPROACH ── */
.approach-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.approach-card {
  border: 1px solid var(--border); border-radius: 12px;
  padding: 28px; background: var(--panel);
  transition: border-color .2s, transform .2s;
}
.approach-card:hover { border-color: var(--signal-2); transform: translateY(-2px); }
.approach-icon { font-size: 28px; margin-bottom: 12px; }
.num { font-family: var(--mono); color: var(--signal); font-size: 12px; margin-bottom: 10px; }
.approach-card h4 { font-family: var(--mono); font-size: 16px; margin-bottom: 12px; }
.approach-card p { color: var(--muted); font-size: 14px; line-height: 1.65; }

/* ── CONTACT ── */
.contact-panel {
  border: 1px solid var(--border); border-radius: 14px;
  background: linear-gradient(135deg, var(--panel) 0%, var(--bg) 100%);
  padding: 52px; display: flex; justify-content: space-between;
  gap: 40px; flex-wrap: wrap;
  border-top: 3px solid var(--signal);
}
.contact-panel h2 {
  font-family: var(--mono); font-size: clamp(22px, 3.5vw, 32px);
  margin-bottom: 16px; max-width: 22ch; line-height: 1.25;
}
.contact-panel p {
  color: var(--muted); max-width: 44ch; margin-bottom: 28px; font-size: 15px;
}
.contact-links {
  display: flex; flex-direction: column; gap: 14px;
  font-family: var(--mono); font-size: 14px; min-width: 220px;
}
.contact-links a { color: var(--text); transition: color .15s; }
.contact-links a:hover { color: var(--signal); text-decoration: none; }

.contact-tech-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
.tech-badge {
  font-family: var(--mono); font-size: 11px;
  color: var(--c, var(--signal));
  border: 1px solid color-mix(in srgb, var(--c, var(--signal)) 35%, transparent);
  border-radius: 100px; padding: 5px 12px;
  background: color-mix(in srgb, var(--c, var(--signal)) 8%, transparent);
}

/* ── FOOTER ── */
footer { padding: 28px 0 56px; }
.footer-row {
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 12px;
  font-family: var(--mono); font-size: 12px; color: var(--muted);
}
.footer-dot {
  display: inline-block; width: 6px; height: 6px; border-radius: 50%;
  background: var(--c, var(--signal)); margin: 0 3px 0 10px; vertical-align: middle;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .cloud-grid { grid-template-columns: 1fr; }
  .k8s-features { grid-template-columns: repeat(2, 1fr); }
  .stack-grid { grid-template-columns: repeat(2, 1fr); }
  .approach-grid { grid-template-columns: 1fr; }
}
@media (max-width: 680px) {
  .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: rgba(10,13,18,0.97); border-bottom: 1px solid var(--border); padding: 16px 28px; gap: 16px; }
  .nav-links-open { display: flex; }
  .hamburger { display: block; }
  .project { grid-template-columns: 1fr; }
  .project-code { display: none; }
  .stats-row { width: 100%; }
  .stat-item { flex: 1; padding: 14px 16px; }
  .stack-grid { grid-template-columns: 1fr; }
  .k8s-features { grid-template-columns: 1fr; }
  .contact-panel { padding: 28px; flex-direction: column; }
  .k8s-canvas { height: 320px; }
  .k8s-node { width: 110px; }
}
`;
