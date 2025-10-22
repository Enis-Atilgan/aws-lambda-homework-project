output "api_gateway_url" {
  description = "API Gateway URL"
  value       = "https://${aws_api_gateway_rest_api.api.id}.execute-api.${var.aws_region}.amazonaws.com/${var.environment}"
}

output "static_website_url" {
  description = "Static website URL"
  value       = "http://${aws_s3_bucket.static_website.bucket_domain_name}"
}

output "s3_bucket_name" {
  description = "S3 bucket name for static website"
  value       = aws_s3_bucket.static_website.bucket
}

output "lambda_functions" {
  description = "Lambda function names"
  value = {
    hello   = aws_lambda_function.hello.function_name
    math    = aws_lambda_function.math.function_name
    weather = aws_lambda_function.weather.function_name
  }
}

output "cloudwatch_log_groups" {
  description = "CloudWatch log group names"
  value = {
    hello   = aws_cloudwatch_log_group.hello_logs.name
    math    = aws_cloudwatch_log_group.math_logs.name
    weather = aws_cloudwatch_log_group.weather_logs.name
  }
}

output "api_endpoints" {
  description = "Available API endpoints"
  value = {
    hello      = "https://${aws_api_gateway_rest_api.api.id}.execute-api.${var.aws_region}.amazonaws.com/${var.environment}/hello"
    math_square = "https://${aws_api_gateway_rest_api.api.id}.execute-api.${var.aws_region}.amazonaws.com/${var.environment}/math/square"
    math_factorial = "https://${aws_api_gateway_rest_api.api.id}.execute-api.${var.aws_region}.amazonaws.com/${var.environment}/math/factorial"
    weather   = "https://${aws_api_gateway_rest_api.api.id}.execute-api.${var.aws_region}.amazonaws.com/${var.environment}/weather"
  }
}
