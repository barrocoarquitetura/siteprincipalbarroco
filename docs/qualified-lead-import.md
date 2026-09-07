# Importação de Lead qualificado

O cadastro público continua criando leads com status `new`. Não há qualificação automática por envio de formulário, horário ou intenção inferida.

## Fonte HTTPS para o Google Ads

- GET `/api/ads/qualified-leads.csv` no servidor Sites que recebe `/api/leads`.
- Autenticação HTTP Basic: usuário `googleads`, senha no segredo `LEAD_EXPORT_PASSWORD` (mínimo 32 caracteres).
- Configurar no Google Ads uma importação programada HTTPS para a ação existente `Lead qualificado`, usando dados já protegidos com SHA-256.
- O feed inclui somente `status = qualified`, data de qualificação preenchida e consentimento registrado, nos últimos 63 dias. Mantém o mesmo Order ID e horário em consultas repetidas.
- Email é normalizado (inclusive pontos antes de @gmail.com/@googlemail.com) e telefone E.164 é protegido com SHA-256 no servidor. Dados de contato brutos não aparecem no feed.
- Exportação não significa recebimento pelo Google: confirmar prévia, aplicação e diagnóstico de cada importação.

## Confirmar um lead real

POST `/api/ads/qualify`, com Authorization Bearer definido no segredo separado `LEAD_QUALIFICATION_TOKEN`, content-type application/json e campos:

- `id`: UUID de um lead já salvo;
- `confirmedQualified`: true, somente após avaliação comercial;
- `qualifiedAt`: horário real da qualificação em ISO 8601 com fuso horário.

A primeira data é preservada ao repetir a operação. O horário não pode ser futuro nem anterior ao cadastro. Esta rota não envia ao Google; libera o registro para a fonte de importação. Não utilizar contatos fictícios. Não deduzir capacidade financeira apenas pela intenção de contratar.

## Ativação pendente

Configurar os dois segredos no servidor, conectar a fonte HTTPS na conta 164-893-9988, validar a prévia e confirmar a primeira importação real. Nenhum registro histórico é marcado automaticamente. O pacote ftp-static precisa ser enviado ao cPanel para que o ajuste do formulário chegue ao domínio público.
