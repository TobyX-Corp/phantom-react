Pod::Spec.new do |s|
  s.name                = 'PhantomKit_static_lib'
  s.version             = '1.0'
  s.summary             = 'Framework containing the PhantomRenderer'
  s.source              = { :path => '.' } # source is required, but path will be defined in user's Podfile (this value will be ignored).
  s.vendored_frameworks = 'PhantomKit_static_lib.framework'
  s.license             = {:type => 'Copyright', :text => "Copyright 2020 TobyX Corp" }
  s.author              = 'TobyX Corp'
  s.requires_arc        = true
  s.platform            = :ios, '9.3'
end