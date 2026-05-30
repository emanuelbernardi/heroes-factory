# Heroes Factory

Plataforma de gestão de heróis. CRUD completo com paginação, busca, ativação/desativação.

## Stack
- **Backend:** Node.js + TypeScript + Express + TypeORM
- **Frontend:** React + TypeScript + Vite + Tailwind CSS + Lucide-React
- **Database:** MySQL 8.0 (Docker)

## Como rodar

# 1. Suba o banco
docker-compose up -d

# 2. Backend
cd backend && npm install && npm run dev

# 3. Frontend
cd frontend && npm install && npm run dev

## Arquitetura
Controller → Service → Repository → Entity

## Decisões técnicas
- TypeScript nos dois lados para consistência de tipos
- Separação em camadas seguindo princípios SOLID
- Repository pattern para desacoplar acesso a dados
- Hook customizado no frontend para isolar lógica de estado

## Por que essas tecnologias?

**Backend:** Express + TypeORM escolhidos pela simplicidade,
produtividade e amplo suporte da comunidade. TypeScript
em ambos os lados garante consistência de tipos e
reduz bugs em runtime.

**Frontend:** React + Vite pelo setup moderno e rápido.
Tailwind CSS pela agilidade na estilização sem
dependências pesadas.

**Arquitetura:** Separação em camadas Controller → Service
→ Repository seguindo princípios SOLID, facilitando
testes unitários e manutenção.

## Melhorias propostas para produção
- Substituir `synchronize: true` por migrations do TypeORM
- Adicionar autenticação JWT
- Implementar cache com Redis para a listagem
- CI/CD com GitHub Actions