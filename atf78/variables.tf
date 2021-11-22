# Input variable definitions

variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "us-east-2"
}

variable "sqs_name" {
  description = "AWS sqs queue"

  type = string
  default = "mySQSQueue"
}