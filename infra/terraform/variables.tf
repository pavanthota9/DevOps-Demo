variable "project" { default = "node-todo" }
variable "region"  { default = "us-east-1" }
variable "vpc_cidr" { default = "10.10.0.0/16" }
variable "azs"      { default = ["us-east-1a", "us-east-1b"] }
variable "public_subnets"  { default = ["10.10.0.0/20", "10.10.16.0/20"] }
variable "private_subnets" { default = ["10.10.32.0/20", "10.10.48.0/20"] }