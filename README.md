# Eldorado Brasil - Gerenciador de Usuários

Este projeto foi desenvolvido como parte de uma avaliação técnica, com o objetivo de criar uma aplicação web que consuma a API fornecida, implementando todas as funcionalidades descritas na documentação.
O sistema utiliza **Angular v19** para a interface.

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

 ### **Relatórios**
 O relatório deve conter:
1. Título e período de referência, indicando o intervalo de tempo e a
granularidade (ex.: mensal, anual).
2. Totais consolidados de contatos e tipos, incluindo valores absolutos e variações
percentuais em relação ao período anterior.
3. Quebras de dados (agregações) por:
o Status dos contatos (ativos x inativos)
o Tipo de contato (Cliente, Fornecedor, Parceiro etc.)
o Situação dos tipos (ativos x inativos)
4. Séries temporais representando a evolução mensal da quantidade de contatos,
destacando:
o Total de contatos
o Contatos ativos
o Contatos inativos
o Novos cadastros no mês
o Variações mensais (delta) em relação ao mês anterior
5. Top indicadores — como o crescimento de cada tipo de contato no período.

Os dados devem ser apresentados em gráficos de acordo com o contexto:

 Série temporal (linha) para evolução dos contatos ao longo dos meses.

 Pizza ou donut para distribuição por status.

 Barras empilhadas para comparação entre tipos e status.

 Barras horizontais para exibir o ranking de crescimento por tipo.


## Referências e Templates Utilizados
- Logo: [Flaticon](https://cdn-icons-png.flaticon.com/512/9131/9131478.png)
- Footer: [CodePen Template](https://codepen.io/scanfcode/pen/MEZPNd)
- Estética e Usabilidade: [Eldorado Brasil](https://www.eldoradobrasil.com.br/pb/)

