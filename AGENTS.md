# Regras de atualização e publicação

## Pacote estático obrigatório

Este projeto é publicado no cPanel a partir da pasta `ftp-static/`.

Sempre que qualquer arquivo do site for alterado:

1. instale as dependências com `npm run install:ci` quando necessário;
2. execute `npm run export:ftp`;
3. valide que `ftp-static/index.html`, `ftp-static/.htaccess`, `ftp-static/robots.txt` e os sitemaps foram gerados;
4. inclua no mesmo commit todas as alterações correspondentes em `ftp-static/`;
5. faça o commit e o push para a branch `main` quando a solicitação do usuário incluir publicação ou atualização do repositório.

Não considere uma atualização do site concluída enquanto o código-fonte e o pacote `ftp-static/` não estiverem sincronizados no mesmo commit.

## Segurança da publicação

- Não inclua credenciais, senhas ou tokens no repositório.
- Não remova `.well-known/` do servidor.
- Não edite diretamente os arquivos publicados no cPanel; altere o código-fonte e gere novamente `ftp-static/`.
