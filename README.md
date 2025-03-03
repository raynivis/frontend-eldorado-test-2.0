# Eldorado Brasil - Gerenciador de Usuários

Este projeto foi desenvolvido como parte de uma avaliação técnica, com o objetivo de criar uma aplicação web que consuma a API fornecida, implementando todas as funcionalidades descritas na documentação.
O sistema utiliza **Angular v19** para a interface.

## Interface
![Image](https://github.com/user-attachments/assets/3da1e906-d60a-4b49-be5a-904ca4273b3c)

---
## Instalação e Execução
1. Navegue até a pasta do projeto: `eldorado-gerenciador/`
2. Execute os seguintes comandos (caso já tenha o Angular 19 instalado):
   ```sh
   npm install  # Apenas na primeira execução, para instalar as dependências
   npm start    # Para iniciar o sistema/Interface
   ```

---
## Tecnologias Utilizadas
### Interface Inicial e Documentação
- [Anotações do Teste - Google Docs](https://docs.google.com/document/d/15pm9e35xxMDw6d4Iczvp9bmgvKPvAkmQ3bUWTPQyEGk/edit?usp=sharing)
- [Figma - Ideia Inicial da Interface](https://www.figma.com/design/fd3Qwvoif8UMsNUBn0T97F/Teste-T%C3%A9cnico---Eldorado?node-id=0-1&t=UALCHMO7d9OYJnes-1)

![Protótipo Inicial](https://github.com/user-attachments/assets/78542d63-7628-4a18-871b-9c74d83e5a58)

### Interface Final
- [Node.js (Interface)](https://nodejs.org/)
- [Angular v19 (Interface)](https://angular.io/)
- [Bootstrap (Interface)](https://getbootstrap.com/)

---
## Requisitos do Sistema
### **Gerenciamento de Usuários**
- Criar um novo usuário *(POST /usuario/)*
- Listar usuários ativos *(GET /usuarios/ativos)*
- Desativar usuários *(PUT /usuario/{user_id}/status/)*
- Listar usuários inativos *(GET /usuarios/inativos)*
- Ativar usuários *(PUT /usuario/{user_id}/status/)*

### **Gerenciamento de Tipos**
- Criar um novo tipo *(POST /tipo/)*
- Listar tipos ativos *(GET /tipos/ativos/)*
- Desativar tipos *(PUT /tipo/{tipo_id}/status/)*
- Listar tipos inativos *(GET /tipos/inativos/)*
- Ativar tipos *(PUT /tipo/{tipo_id}/status/)*

### **Gerenciamento de Contatos**
- Criar um novo contato *(POST /contato/)*
- Listar contatos ativos *(GET /contatos/ativos/)*
- Desativar contatos *(PUT /contato/{contato_id}/status/)*
- Listar contatos inativos *(GET /contatos/inativos/)*
- Ativar contatos *(PUT /contato/{contato_id}/status/)*

---
## Limitações Conhecidas
- O Toast **não** é está responsivo para dispositivos móveis.

---
## Referências e Templates Utilizados
- Logo: [Flaticon](https://cdn-icons-png.flaticon.com/512/9131/9131478.png)
- Footer: [CodePen Template](https://codepen.io/scanfcode/pen/MEZPNd)
- Estética e Usabilidade: [Eldorado Brasil](https://www.eldoradobrasil.com.br/pb/)

