default_deprecation_behaviours = ActiveSupport::Deprecation.behavior
ActiveSupport::Deprecation.behavior = ->(message, callstack) {
  if Rails::VERSION::MAJOR == 5 && Rails::VERSION::MINOR > 1
    raise "Remove friendly_id deprecation silencing patch!"
  end
  unless callstack.find { |l| l.path =~ /gems\/friendly_id/ } &&
    message =~ /The behavior of .* inside of after callbacks will be changing/
    default_deprecation_behaviours.each { |b| b.call(message, callstack) }
  end
}
