require 'json'

package = JSON.parse(File.read(File.join(__dir__, '../package.json')))

Pod::Spec.new do |s|
  s.name                = 'PhantomReact'
  s.version             = '1.0'
  s.summary             = 'Test description'
  s.source              = { :http => 'https://github.com/TobyX-Corp/phantom-react.git'}
  s.source_files        = 'dist/include'
  s.public_header_files = 'dist/include/*.h'
  s.vendored_libraries  = 'dist/lib/libPhantomReact.a'
  s.license             = {:type => 'Copyright', :text => "Copyright 2020 TobyX Corp" }
  s.author              = 'TobyX Corp'
  s.requires_arc        = true
  s.platform            = :ios, '9.3'
end
