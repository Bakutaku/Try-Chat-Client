# Try-Chat

> 環境構築

### 手順 1

```bash
npm i
```

### 手順 2

```bash
npx auth secret
```

作成された`.env.local`に以下の設定を追加してください(「{}」は消して入力してください)

```
AUTH_KEYCLOAK_ID={CLIENT_ID}
AUTH_KEYCLOAK_SECRET={CLIENT_SECRET}
AUTH_KEYCLOAK_ISSUER={ISSUER_URL}
```

### 手順 3(実行!!)

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
