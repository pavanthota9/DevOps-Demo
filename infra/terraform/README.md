# Terraform Notes

## Remote State
Use an S3 backend with SSE (KMS) and a DynamoDB table for state locking. Example `terraform init` flags are listed in the root README.

## Order of Apply
1. `vpc.tf` + `ecr.tf` + `dynamodb.tf`
2. `eks.tf`
3. `iam-irsa.tf`