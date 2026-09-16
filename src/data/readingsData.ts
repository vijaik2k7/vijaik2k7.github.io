import { ReadingPost } from '../types';

export const initialReadings: ReadingPost[] = [
  {
    id: 'attention-state-space-hybrid',
    title: 'Attention vs. State-Space Models: Mamba & Hybrid Linear Recurrence',
    topic: 'Fundamental Research',
    date: 'Aug 2026',
    readingTime: '9 min read',
    summary: 'Comparing $O(N^2)$ quadratic attention mechanisms with linear-time selective state space models (SSM) for ultra-long context sequences.',
    paperTitle: 'Mamba: Linear-Time Sequence Modeling with Selective State Spaces',
    paperUrl: 'https://arxiv.org/abs/2312.00752',
    takeaways: [
      'Selective State Space Models filter out irrelevant information dynamically while processing sequences in linear $O(N)$ time.',
      'Hybrid architectures combining transformer self-attention with Mamba blocks maintain high recall while drastically reducing KV-cache memory footprints.',
      'Ideal for streaming long-form audio, telemetry signals, and massive document processing.'
    ],
    content: `### The KV-Cache Bottleneck

In standard Transformer architectures, key-value (KV) context memory grows linearly with sequence length. For ultra-long documents or real-time streaming telemetry, $O(N^2)$ attention complexity produces severe GPU HBM memory bottlenecks.

### How Selective SSMs Work

Selective state parameters $(\\mathbf{B}, \\mathbf{C}, \\mathbf{\\Delta})$ are input-dependent functions, allowing the network to selectively remember or discard information at every time step:

$$h_t = \\mathbf{A} h_{t-1} + \\mathbf{B} x_t$$
$$y_t = \\mathbf{C} h_t$$

### Hardware-Aware Computation

Mamba avoids materializing full hidden state matrices in high-bandwidth memory (HBM) by exploiting fast GPU SRAM caches through custom fused kernel operations.`
  },
  {
    id: 'ctr-multi-task-ranking',
    title: 'Multi-Task Learning & Feature Interaction in Modern Ad Ranking Architecture',
    topic: 'Ads & Ranking',
    date: 'Sep 2026',
    readingTime: '6 min read',
    summary: 'Analyzing shared representations, gating networks (MMoE), and dynamic loss balancing in high-throughput advertising prediction systems.',
    paperTitle: 'Modeling Task Relationships in Multi-Task Learning with Multi-gate Mixture-of-Experts',
    paperUrl: 'https://dl.acm.org/doi/10.1145/3219819.3220007',
    takeaways: [
      'Multi-Gate Mixture-of-Experts (MMoE) handles task conflicts far better than shared-bottom architectures by allocating specialized expert networks.',
      'Dynamic gradient weighting prevents dominant loss heads (e.g., CVR) from suppressing sparse objectives (e.g., long-click probability).',
      'Ultra-low latency inference constraints (<10ms p99) dictate embedding table quantization and sparse feature hashing.'
    ],
    content: `### Core Motivation & Problem Statement

In industrial advertising recommendation systems, click-through rate (CTR) and conversion rate (CVR) prediction are simultaneously optimized. Traditional shared-bottom networks struggle when task relationships are complex or conflicting.

### Key Architectural Takeaways

1. **Expert Routing**: Using input-dependent gating networks to weigh expert predictions tailored to specific user contexts.
2. **Feature Hashing**: Compressing multi-billion sparse feature ID spaces without introducing unacceptable collision rates.
3. **Latency Benchmarks**: Real-time scoring within tight SLA constraints requires strict vectorization and memory placement.

### Personal Takeaways for Systems Design

Building scalable ad ranking isn't just about parameter count; it's about minimizing cross-device bandwidth and maximizing embedding cache hit rates.`
  },
  {
    id: 'test-time-compute-reasoning',
    title: 'Scaling Test-Time Compute: Search & Verification vs. Pre-training Scaling',
    topic: 'LLMs',
    date: 'Sep 2026',
    readingTime: '8 min read',
    summary: 'Evaluating Monte Carlo Tree Search (MCTS), Process Reward Models (PRM), and step-by-step verification loops vs. raw model size.',
    paperTitle: 'Scaling LLM Test-Time Compute Optimally with Inference-Time Search',
    paperUrl: 'https://arxiv.org/abs/2408.03314',
    takeaways: [
      'For complex reasoning tasks, allocating 10x compute at inference via Process Reward Models beats increasing pre-training parameters by 3x.',
      'Step-level verification detects logical drift early before erroneous tokens pollute the context window.',
      'Optimal inference budgets balance candidate sampling breadth with deep tree search verification.'
    ],
    content: `### Background & Shift in Scaling Laws

Traditional scaling laws focused almost exclusively on dataset size and parameter count ($N, D$). Modern inference-time scaling shifts focus to inference compute ($C_{test}$), trading test latency for reasoning accuracy.

### Core Mechanics

- **Process Reward Models (PRMs)**: Score individual step-by-step thoughts rather than final answers.
- **Tree Search Over Reasoning Chains**: MCTS explores multiple reasoning paths, pruning hallucinated branches early.

### Why This Matters

For personal tools and autonomous workflows, lightweight 8B–70B models paired with smart verification loops can outperform massive dense models at a fraction of hosting cost.`
  },
  {
    id: 'multi-agent-orchestration-memory',
    title: 'Multi-Agent Systems: Epistemic Memory & Dynamic Delegation Structures',
    topic: 'Agents',
    date: 'Aug 2026',
    readingTime: '7 min read',
    summary: 'A study on state isolation, inter-agent communication protocols, and subagent memory compaction in autonomous multi-agent pipelines.',
    paperTitle: 'Communicative Agents for Software Engineering & Reasoning',
    paperUrl: 'https://arxiv.org/abs/2307.07924',
    takeaways: [
      'Isolating subagent workspaces prevents context overflow and reduces attention decay across long trajectories.',
      'Explicit handoff schemas (typed JSON tool outputs) eliminate ambiguous conversational handoffs.',
      'Compacting conversation logs into structured state summaries preserves long-horizon intent.'
    ],
    content: `### Architecture Patterns for Autonomous Agents

When building complex AI agents, monolithic prompts degrade quickly. Delegating specialized tasks to isolated subagents ensures focus and accuracy.

### 3 Fundamental Pillars

1. **Isolated Execution Contexts**: Each subagent runs with its own scoped prompt, toolset, and state.
2. **Deterministic Handoff Contracts**: Communication happens via schema-validated tool calls rather than freeform text.
3. **Compaction & Trajectory Logs**: Storing full interaction logs locally in JSONL while feeding trimmed summaries to the active model context.`
  }
];
