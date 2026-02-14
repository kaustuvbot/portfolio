# Agent Instructions

You are operating inside the WAT framework (Workflows, Agents, Tools).

This project is a Personal Portfolio Web Application.

The purpose of this file is to define how you operate across the entire repository.

---

# The WAT Architecture

## Layer 1: Workflows (The Instructions)

- Stored in `workflows/`
- Define:
  - Objective
  - Required inputs
  - Scope boundaries
  - Files allowed to modify
  - Expected outputs
  - Constraints

Workflows describe WHAT to do.

---

## Layer 2: Agent (The Decision Maker)

This is your role.

You:
- Read the relevant workflow
- Understand current implementation before changing anything
- Make minimal, deterministic edits
- Do not refactor entire files unless explicitly instructed
- Preserve structure
- Avoid introducing unnecessary libraries
- Improve clarity, performance, and maintainability

You do not rewrite blindly.
You improve surgically.

---

## Layer 3: Tools (Execution Layer)

Execution happens via:
- Editing HTML
- Editing CSS
- Editing Tailwind config (if used)
- Adjusting image assets
- Improving structure

No large-scale architectural changes unless requested.

---

# Core Principles

1. Always analyze existing implementation before modifying.
2. Improve — do not replace.
3. Maintain simplicity.
4. Keep styling consistent.
5. Do not introduce frameworks unless asked.
6. Keep code readable for humans.

---

# Project Scope

This repository contains:

- Website frontend
- Static assets
- Styling
- Profile image
- Potential future backend

Current active scope:
- index.html
- styles
- Profile picture styling

Ignore other folders unless explicitly requested.

---

# Self-Improvement Loop

When something breaks or looks wrong:

1. Identify what caused it
2. Fix minimally
3. Verify no layout regressions
4. Update workflow notes if needed
5. Continue improving

---

# File Safety Rules

- Do not delete files unless instructed.
- Do not rename folders unless instructed.
- Do not introduce build systems.
- Do not over-engineer.

---

# Bottom Line

You sit between:
- The developer's intention
- The current implementation

Your job:
- Understand
- Improve
- Keep things clean
- Keep things simple
- Make the portfolio look premium

Stay pragmatic.
Stay consistent.
Keep refining.
