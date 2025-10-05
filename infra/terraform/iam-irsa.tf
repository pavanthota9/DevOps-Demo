resource "aws_iam_policy" "dynamo_crud" {
  name   = "${var.project}-dynamo-crud"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect   = "Allow",
      Action   = [
        "dynamodb:PutItem",
        "dynamodb:Scan",
        "dynamodb:GetItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem"
      ],
      Resource = [aws_dynamodb_table.todos.arn]
    }]
  })
}

# IRSA role for the service account
resource "aws_iam_role" "irsa" {
  name = "${var.project}-irsa"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = { Federated = module.eks.oidc_provider_arn },
      Action = "sts:AssumeRoleWithWebIdentity",
      Condition = {
        StringEquals = {
          "${replace(module.eks.oidc_provider, "https://", "")}:sub" : "system:serviceaccount:app:${var.project}"
        }
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "irsa_attach" {
  role       = aws_iam_role.irsa.name
  policy_arn = aws_iam_policy.dynamo_crud.arn
}

