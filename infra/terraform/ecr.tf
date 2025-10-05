resource "aws_ecr_repository" "app" {
  name                 = var.project
  image_scanning_configuration { scan_on_push = true }
  image_tag_mutability = "IMMUTABLE"
  encryption_configuration { encryption_type = "AES256" }
}