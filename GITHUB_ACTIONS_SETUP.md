# Configuração do GitHub Actions para API Tests

## 📋 Pré-requisitos

Antes de configurar o GitHub Actions, certifique-se de que:

- Você tem permissões de administrador no repositório
- O código está no branch `main` (ou ajuste o workflow conforme necessário)

## 🔐 1. Configurar Secrets no GitHub

Acesse: `Settings` → `Secrets and variables` → `Actions` → `Secrets`

### Secret necessário:

**`CONFIG_STAGE`** - Conteúdo do arquivo `.env.stage`

```
ENV_NAME="STAGE"
BASE_URL="http://automationexercise.com"
BASE_URL_API="https://automationexercise.com/api/"
```

> **Como adicionar**: Clique em "New repository secret" → Nome: `CONFIG_STAGE` → Value: cole o conteúdo acima → Save

---

## 📝 2. Configurar Variables no GitHub

Acesse: `Settings` → `Secrets and variables` → `Actions` → `Variables`

### Variables necessárias:

| Nome da Variável              | Valor Sugerido                                                                  | Descrição                                   |
| ----------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------- |
| `API_TESTS_STAGE`             | `api_tests_stage`                                                               | Nome do comando npm para executar os testes |
| `TZ`                          | `America/New_York`                                                              | Timezone para logs (opcional)               |
| `SLACK_CHANNEL`               | `#automation-tests`                                                             | Canal do Slack (se usar notificações)       |
| `SLACK_WEBHOOK`               | `https://hooks.slack.com/services/...`                                          | Webhook do Slack (se usar notificações)     |
| `SLACK_USER`                  | `@seu-usuario`                                                                  | Usuário do Slack (se usar notificações)     |
| `HTML_REPORT_API_TESTS_STAGE` | `https://seu-usuario.github.io/playwright_automation_practice/api_tests_stage/` | URL do relatório HTML                       |

> **Como adicionar**: Clique em "New repository variable" → preencha nome e valor → Add variable

### Variables obrigatórias (mínimo):

- ✅ **API_TESTS_STAGE**: Deve ser `api_tests_stage` (comando do package.json)

### Variables opcionais (para Slack):

- SLACK_CHANNEL
- SLACK_WEBHOOK
- SLACK_USER
- TZ

---

## 📄 3. Habilitar GitHub Pages

Para publicar os relatórios HTML:

1. Vá em `Settings` → `Pages`
2. Em **Source**, selecione: `Deploy from a branch`
3. Em **Branch**, selecione: `gh-pages` / `root`
4. Clique em **Save**

> **Nota**: O branch `gh-pages` será criado automaticamente na primeira execução do workflow.

---

## 🔑 4. Configurar Permissões do GITHUB_TOKEN

Para permitir que o workflow publique no GitHub Pages:

1. Vá em `Settings` → `Actions` → `General`
2. Role até **Workflow permissions**
3. Selecione: **Read and write permissions**
4. Marque: ☑️ **Allow GitHub Actions to create and approve pull requests**
5. Clique em **Save**

---

## 🚀 5. Testar a Configuração

### Executar manualmente:

1. Vá em `Actions` → `api_tests_stage`
2. Clique em `Run workflow` → Selecione branch → `Run workflow`

### Executar automaticamente:

- O workflow será executado automaticamente a cada push no branch `main`
- (O cron está comentado no YAML - descomente se quiser execução agendada)

---

## 🔍 6. Verificar Logs

Se o workflow falhar:

1. Vá em `Actions` → selecione a execução falhada
2. Clique no job `⚙️ API tests STAGE`
3. Revise os logs de cada step para identificar o problema

### Problemas comuns:

❌ **Erro: "Cannot find module"**

- **Solução**: Verifique se todos os imports no código estão corretos

❌ **Erro: "BASE_URL_API is undefined"**

- **Solução**: Verifique se o secret `CONFIG_STAGE` está configurado corretamente

❌ **Erro: "Permission denied" no GitHub Pages**

- **Solução**: Configure as permissões do GITHUB_TOKEN (passo 4)

❌ **Erro: "TEST_SUITE is not set"**

- **Solução**: Adicione a variable `API_TESTS_STAGE` com valor `api_tests_stage`

---

## 📊 7. Acessar o Relatório HTML

Após a primeira execução bem-sucedida:

- URL: `https://SEU-USUARIO.github.io/playwright_automation_practice/api_tests_stage/`
- Substitua `SEU-USUARIO` pelo seu username do GitHub

Atualize a variable `HTML_REPORT_API_TESTS_STAGE` com esta URL.

---

## 🎯 Checklist Rápido

- [ ] Secret `CONFIG_STAGE` criado com conteúdo do .env.stage
- [ ] Variable `API_TESTS_STAGE` = `api_tests_stage`
- [ ] GitHub Pages habilitado (branch gh-pages)
- [ ] GITHUB_TOKEN com permissões de escrita
- [ ] Código commitado e enviado para o branch `main`
- [ ] Primeira execução manual do workflow testada

---

## 📞 Notificações Slack (Opcional)

Se quiser receber notificações no Slack:

1. Crie um [Incoming Webhook no Slack](https://api.slack.com/messaging/webhooks)
2. Configure as variables:
   - `SLACK_WEBHOOK`: URL do webhook
   - `SLACK_CHANNEL`: Nome do canal (ex: `#automation`)
   - `SLACK_USER`: Seu @ para mencionar em falhas

Se **não quiser** notificações Slack:

- Você pode remover ou comentar os últimos 3 steps do workflow
- Ou simplesmente não configurar as variables - o workflow vai falhar nesses steps, mas os testes vão executar normalmente

---

## 🛠️ Estrutura do Workflow

O workflow `api_tests_stage.yaml` executa:

1. ✅ Setup do Node.js
2. ✅ Instalação de dependências
3. ✅ Criação do arquivo `.env.stage` com o secret
4. ✅ Execução dos testes API
5. ✅ Publicação do relatório HTML no GitHub Pages
6. ✅ Notificações Slack (sucesso/falha/cancelamento)
