# Cheatsheet Content Instructions

Use this guide when writing or updating cheatsheet entries.

## Initial Scope

The first release includes exactly these sections:

- Linux and Git combined
- Docker
- Kubernetes

## Content Principles

- Include common, high-value commands only.
- Group commands by task, not by arbitrary alphabetic order.
- Keep descriptions short and practical.
- Prefer commands that are broadly useful in daily DevOps work.
- Exclude obscure flags unless they materially improve the example.

## Section Structure

Each tool family should be split into labeled subgroups.

### Linux and Git

Suggested subgroups:

- navigation and file operations
- file inspection and search
- permissions and processes
- networking and system info
- git setup and status
- branching and switching
- staging and commits
- history and diff
- remote sync and recovery

### Docker

Suggested subgroups:

- docker basics
- images
- containers
- logs and inspection
- exec and debugging
- volumes and cleanup
- compose essentials

### Kubernetes

Suggested subgroups:

- cluster and context
- namespaces
- pods
- deployments
- services and ingress
- logs and exec
- config and secrets
- rollout and troubleshooting

## Entry Format

Each entry should use a consistent pattern:

- command
- plain-English purpose
- optional note when the command has a common pitfall or safer variant

Example shape:

- `git status` — show working tree changes
- `docker ps -a` — list all containers, including stopped ones
- `kubectl get pods -A` — list pods across all namespaces

## Quality Bar

- Commands should be accurate and current.
- Prefer safe defaults over destructive shortcuts.
- Mention destructive commands only when clearly labeled.
- Keep terminology consistent across sections.
- Avoid repeating the same command in multiple places unless the context differs.
