#!/bin/bash
# Reset completo da demo — volta ao estado inicial do main

set -e

echo "=== Reset Demo Pipeline ==="

# 1. Garante que está no main atualizado
git checkout main
git pull origin main

# 2. Fecha PRs abertos (requer gh autenticado)
echo "Fechando PRs abertos..."
gh pr list --state open --json number --jq '.[].number' | while read pr; do
  gh pr close "$pr" --comment "Reset de demo" --delete-branch
  echo "  PR #$pr fechado"
done

# 3. Remove branches de demo locais e remotos
for branch in feat/add-e2e-tests fix/break-unit-test fix/break-e2e-test; do
  git branch -D "$branch" 2>/dev/null && echo "  branch local $branch removida" || true
  git push origin --delete "$branch" 2>/dev/null && echo "  branch remota $branch removida" || true
done

# 4. Remove arquivos gerados pela demo do main (se existirem)
E2E_FILES=(
  "simple-project-robot 4/resources/pages/agent_finder_page.robot"
  "simple-project-robot 4/resources/steps/agent_finder_steps.robot"
  "simple-project-robot 4/tests/features/agent_finder.robot"
  "agent-finder/qa-artifacts/"
)

CHANGED=0
for f in "${E2E_FILES[@]}"; do
  if [ -e "$f" ]; then
    git rm -rf "$f" 2>/dev/null || rm -rf "$f"
    echo "  removido: $f"
    CHANGED=1
  fi
done

if [ $CHANGED -eq 1 ]; then
  git commit -m "chore: reset demo — remove arquivos gerados"
  git push origin main
  echo "  commit de reset enviado"
fi

echo ""
echo "✅ Demo resetada. Estado inicial restaurado no main."
echo "   Próximo passo: rode os skills /1-analisa-frontend ... /4-gera-robot"
echo "   e suba os arquivos gerados numa branch feat/add-e2e-tests"
