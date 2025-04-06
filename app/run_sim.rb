#!/usr/bin/env ruby
require 'selenium-webdriver'
require 'base64'

# Path to your local HTML file. Adjust as needed.
# This path is the file url for sim.html (local file in the current directory)
FILE_URI = "file://#{File.expand_path('public/index.html', __dir__)}"

# Create Selenium driver for Chrome
driver = Selenium::WebDriver.for :chrome

begin
  # Navigate to the local HTML file
  driver.navigate.to FILE_URI

  # Wait 35 seconds to ensure the 30-second simulation completes
  # (extra cushion for loading and finishing)
  sleep(25)

  # Grab the story log from the #logContainer element
  log_container = driver.find_element(:id, 'logContainer')
  simulation_log = log_container.text

  # Write the log text to a local file
  File.open('simulation_log.txt', 'w') do |file|
    file.puts(simulation_log)
  end

  # Use JavaScript to convert the canvas contents to a Base64-encoded PNG
  base64_image = driver.execute_script(
  <<-JS
    var canvas = document.getElementById('worldCanvas');
    return canvas.toDataURL('image/png');
  JS
  )
  
  # Remove the 'data:image/png;base64,' prefix
  base64_image.sub!(/^data:image\/png;base64,/, '')

  # Decode and save the image locally
  File.open('canvas_snapshot.png', 'wb') do |f|
    f.write(Base64.decode64(base64_image))
  end

  puts "Simulation log saved to 'simulation_log.txt'"
  puts "Canvas snapshot saved to 'canvas_snapshot.png'"

rescue => e
  puts "An error occurred: #{e.message}"
ensure
  # Quit the driver/browser
  driver.quit
end
