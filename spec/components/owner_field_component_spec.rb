# frozen_string_literal: true

require 'rails_helper'

RSpec.describe OwnerFieldComponent, type: :component do
  let(:field) { instance_double(Blacklight::FieldPresenter, render_field?: true, key: 'foo', label: 'bar', render: 'baz') }
  let(:component) do
    described_class.new(field: field)
  end
  let(:rendered) { render_inline(component) }

  it 'uses the custom layout' do
    expect(rendered).to have_selector 'dt.col-md-4', text: 'bar:'
    expect(rendered).to have_selector 'dd.col-md-8', text: 'baz'
  end
end
