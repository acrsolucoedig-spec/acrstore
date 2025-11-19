# ACR ERP + Delivery

Este repositório contém o front-end do ACR ERP + Delivery, uma PWA em React/TypeScript/Tailwind com foco em vendas, delivery e motoboys.

## 1. Iniciar do zero (caso esteja recriando o projeto)

```bash
mkdir acr-erp-delivery
cd acr-erp-delivery

npm create vite@latest . -- --template react-ts
```

## 2. Instalar dependências principais

```bash
npm install @supabase/supabase-js @supabase/auth-ui-react @supabase/auth-ui-shared \
  @tanstack/react-query @tanstack/react-table \
  @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot \
  @radix-ui/react-toast @radix-ui/react-avatar @radix-ui/react-label \
  @radix-ui/react-separator @radix-ui/react-tabs \
  class-variance-authority clsx date-fns lucide-react react-hook-form \
  @hookform/resolvers zod react-router-dom @radix-ui/react-switch

npm install -D @types/node @types/react @types/react-dom \
  @vitejs/plugin-react autoprefixer postcss tailwindcss typescript vite
```

## 3. Inicializar Tailwind

```bash
npx tailwindcss init -p
```

## 4. Estrutura de pastas importante

```bash
mkdir -p src/components/ui
mkdir -p src/{lib,context,hooks,pages,services,assets,styles,utils,types,layouts}
```

## 5. Configurações principais

`tsconfig.json` deve conter:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

`tailwind.config.js` utiliza o tema neon e varia entre tons de neon e degradês (veja o arquivo para a configuração atual).

`src/index.css` contém as diretivas do Tailwind + variáveis de tema sombreadas (coordenadas no root e no modo `.dark`).

## 6. Utilitários compartilhados

- `src/lib/utils.ts`: helpers `cn`, `formatDate`, `formatCurrency`.
- `src/lib/supabase.ts`: cria o cliente Supabase e valida variáveis de ambiente.

## 7. Estrutura de UI e páginas

- `components/ui`: botões, cards, toasts, tooltips, etc.
- `layouts/NeonLayout.tsx`: envoltório principal com gradientes e fundos neon.
- `pages`: HomeProfiles, Welcome, Dashboard, Produtos, Delivery, etc.

## 8. Executar o projeto

```bash
npm install
npm run dev
```

## 9. Supabase e variáveis de ambiente

Copie `.env.example` para `.env` ou `.env.local` e defina:

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA-CHAVE-ANON
```

O `src/lib/supabase.ts` já valida esses valores e lança erro caso estejam ausentes.

### 9.1 Tabelas necessárias

No Supabase, crie as tabelas abaixo no schema público (ou use o SQL editor):

- `products` (`id` SERIAL PK, `name` TEXT, `sku` TEXT, `price` NUMERIC, `stock` INT, `category` TEXT, `status` TEXT, `description` TEXT, `created_at` TIMESTAMP DEFAULT now())
- `orders` (`id` TEXT PK, `customer` TEXT, `items` TEXT, `total` NUMERIC, `type` TEXT CHECK (type IN ('delivery','pickup')), `status` TEXT, `address` TEXT, `date` TEXT, `created_at` TIMESTAMP DEFAULT now())
- `service_orders` (`id` TEXT PK, `customer` TEXT, `device` TEXT, `issue` TEXT, `status` TEXT, `priority` TEXT, `date` TEXT, `created_at` TIMESTAMP DEFAULT now())

### 9.2 Seeds básicas (exemplo via SQL)

Use o editor de SQL do Supabase para inserir registros iniciais, por exemplo:

```sql
insert into products (name, sku, price, stock, category, status) values
( 'Capinha iPhone 14', 'CAP-IP14-001', 89.9, 45, 'Acessórios', 'active' ),
( 'Carregador Tipo-C', 'CAR-TC-020', 45.0, 28, 'Carregadores', 'active' );

insert into orders (id, customer, items, total, type, status, address, date) values
('ORD-1001', 'João Silva', '3 produtos', 234.8, 'delivery', 'pending', 'Rua das Flores, 123', '10/11/2025 14:30');

insert into service_orders (id, customer, device, issue, status, priority, date) values
('OS-1001', 'Maria Santos', 'Samsung Galaxy S21', 'Bateria não carrega', 'waiting', 'medium', '10/11/2025');
```

## 10. Git e verificações

- O repositório já possui histórico (`git status -sb` deve ficar limpo após ajustes). Sinta-se livre para usar git e GitHub como de costume.
- Não há acesso direto ao Supabase remoto aqui; configure as chaves no arquivo `.env` e valide no ambiente de desenvolvimento.

## 11. Rotas de dados e hooks React

- Os hooks em `src/hooks/use-products.ts`, `use-orders.ts` e `use-service-orders.ts` consomem `fetchProducts`, `fetchOrders` e `fetchServiceOrders` (`src/lib/erp.ts`).
- Mutations para criar/atualizar registros estão em `use-create-product.ts`, `use-update-order-status.ts` e `use-update-service-order-status.ts`, tornando a UI responsiva a `status`/`priority`.
- Atualizações invalidam os caches via `invalidateQueries({ queryKey: [...] })` e exibem toasts (`src/hooks/use-toast.ts`).

## Próximos passos sugeridos

1. Ajustar as páginas restantes (`Dashboard`, `Sales`, `Orders`, `Delivery`, etc.) com dados reais.
2. Conectar autenticação Supabase e proteger rotas onde necessário.
3. Criar testes automatizados ou storybook para os componentes UI.
