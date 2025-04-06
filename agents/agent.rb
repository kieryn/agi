#!/usr/bin/env ruby
# frozen_string_literal: true

require 'optparse'
require 'openai'
require 'base64'

# Make sure you set or export OPENAI_API_KEY in your environment:
# export OPENAI_API_KEY="YOUR_OPENAI_API_KEY"

options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: agent.rb --system SYSTEM_PROMPT_FILE [--text TEXT_FILE] [--image IMAGE_FILE]"

  opts.on("--system FILE", "Path to the system prompt file") do |v|
    options[:system] = v
  end

  opts.on("--text FILE", "Path to the text file (optional)") do |v|
    options[:text] = v
  end

  opts.on("--image FILE", "Path to the image file (optional)") do |v|
    options[:image] = v
  end

  opts.on("-h", "--help", "Prints this help") do
    puts opts
    exit
  end
end.parse!

# Check that at least the system file was provided
if options[:system].nil?
  puts "Error: You must provide a --system file path."
  exit 1
end

# Read the system prompt from file
system_prompt = File.read(options[:system]).strip

# Prepare the content for user message
user_message_content = ""

if options[:text] && File.exist?(options[:text])
  text_content = File.read(options[:text])
  user_message_content << "Here is the TEXT content:\n\n#{text_content}\n\n"
end

if options[:image] && File.exist?(options[:image])
  image_data = File.binread(options[:image])
  encoded_image = Base64.strict_encode64(image_data)
  user_message_content << "Here is the IMAGE in Base64 format:\n\n#{encoded_image}\n\n"
end

if user_message_content.strip.empty?
  puts "Warning: Neither text nor image file was provided. This script expects at least one.\n" \
       "Continuing anyway, but the model will only receive the system prompt."
end

# Construct the messages for the ChatCompletion call
messages = [
  { role: "system", content: system_prompt }
]
unless user_message_content.strip.empty?
  messages << { role: "user", content: user_message_content }
end

# Create an OpenAI client (relies on ENV['OPENAI_API_KEY'] or other config)
openai_client = OpenAI::Client.new

# Call the Chat API with your desired parameters
response = openai_client.chat(
  parameters: {
    model: "gpt-3.5-turbo", # or any other model name, like "gpt-4"
    messages: messages,
    temperature: 0.7,       # adjust as desired
    max_tokens: 500         # adjust as desired
  }
)

# Print out the response
if response.dig("choices", 0, "message", "content")
  puts response.dig("choices", 0, "message", "content")
else
  puts "No response received from the API."
end
