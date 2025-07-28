# Docker & AWS ECS デプロイガイド

このプロジェクトをDockerコンテナ化し、AWS ECSでデプロイするためのガイドです。

## 必要な環境

- Docker Desktop
- AWS CLI v2
- AWS アカウント（ECR、ECS、VPCの権限が必要）

## ローカルでのDocker実行

### 本番用ビルド

```bash
# イメージをビルド
docker build -t shadcn-admin .

# コンテナを起動
docker run -p 3000:80 shadcn-admin
```

### 開発用（docker-compose使用）

```bash
# 本番環境
docker-compose up

# 開発環境
docker-compose --profile dev up dev
```

アプリケーションは以下のURLでアクセス可能です：
- 本番環境: http://localhost:3000
- 開発環境: http://localhost:5173

## AWS ECSデプロイ

### 1. 事前準備

#### ECRリポジトリの作成
```bash
aws ecr create-repository --repository-name shadcn-admin --region ap-northeast-1
```

#### ECSクラスターの作成
```bash
aws ecs create-cluster --cluster-name shadcn-admin-cluster --capacity-providers FARGATE
```

#### CloudWatch Logs グループの作成
```bash
aws logs create-log-group --log-group-name /ecs/shadcn-admin-app --region ap-northeast-1
```

### 2. IAMロールの設定

以下のロールを作成してください：

#### ECS Task Execution Role
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

ポリシー: `AmazonECSTaskExecutionRolePolicy`

#### ECS Task Role
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### 3. 設定ファイルの更新

#### task-definition.json
以下の値を更新してください：
- `YOUR_ACCOUNT_ID`: AWSアカウントID
- `YOUR_ECR_REPOSITORY_URI`: ECRリポジトリURI

#### ecs-service.json
以下の値を更新してください：
- `YOUR_CLUSTER_NAME`: ECSクラスター名
- `subnet-xxxxxxxxx`: サブネットID
- `sg-xxxxxxxxx`: セキュリティグループID
- `YOUR_TARGET_GROUP_NAME`: ターゲットグループ名（ALB使用時）

#### deploy.sh
以下の変数を更新してください：
```bash
AWS_REGION="ap-northeast-1"
ECR_REPOSITORY_URI="123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/shadcn-admin"
CLUSTER_NAME="shadcn-admin-cluster"
SERVICE_NAME="shadcn-admin-service"
```

### 4. デプロイの実行

```bash
# デプロイスクリプトを実行
./deploy.sh
```

または手動でデプロイ：

```bash
# 1. Docker イメージをビルド
docker build -t shadcn-admin .

# 2. ECRにログイン
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin YOUR_ECR_URI

# 3. イメージをタグ付け
docker tag shadcn-admin:latest YOUR_ECR_URI:latest

# 4. ECRにプッシュ
docker push YOUR_ECR_URI:latest

# 5. タスク定義を登録
aws ecs register-task-definition --cli-input-json file://task-definition.json

# 6. サービスを作成（初回のみ）
aws ecs create-service --cli-input-json file://ecs-service.json

# 7. サービスを更新（2回目以降）
aws ecs update-service --cluster YOUR_CLUSTER_NAME --service shadcn-admin-service --task-definition shadcn-admin-app:latest
```

## トラブルシューティング

### よくある問題

1. **ビルドエラー**
   - TypeScriptエラーが発生した場合は、該当ファイルを修正してください
   - pnpmのキャッシュが原因の場合: `docker build --no-cache`

2. **ECRプッシュエラー**
   - AWS認証情報を確認してください
   - ECRリポジトリが存在することを確認してください

3. **ECSタスクが起動しない**
   - CloudWatch Logsでエラーログを確認してください
   - セキュリティグループの設定を確認してください
   - サブネットがインターネットアクセス可能か確認してください

### ログの確認

```bash
# ECS サービスの状態確認
aws ecs describe-services --cluster YOUR_CLUSTER_NAME --services shadcn-admin-service

# CloudWatch Logs確認
aws logs get-log-events --log-group-name /ecs/shadcn-admin-app --log-stream-name STREAM_NAME
```

## セキュリティ考慮事項

- セキュリティグループで必要最小限のポートのみ開放
- ECS Exec機能は開発時のみ有効化
- 本格運用時はALB/NLBとの組み合わせを推奨
- SSL/TLS証明書の設定
- 環境変数の適切な管理（AWS Systems Manager Parameter Store等の使用）

## コスト最適化

- 開発環境では適切なサイズのFargateインスタンスを選択
- Spot Fargateの利用検討
- Auto Scalingの設定
- 不要なリソースの定期的なクリーンアップ