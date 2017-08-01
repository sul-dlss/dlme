Rails.application.routes.draw do
  root to: 'spotlight/exhibits#index'
  mount Blacklight::Oembed::Engine, at: 'oembed'
  devise_for :users
  mount Blacklight::Engine => '/'
  concern :searchable, Blacklight::Routes::Searchable.new

  resource :catalog, only: [:index], as: 'catalog', path: '/catalog', controller: 'catalog' do
    concerns :searchable
  end

  concern :exportable, Blacklight::Routes::Exportable.new

  resources :solr_documents, only: [:show], path: '/catalog', controller: 'catalog' do
    concerns :exportable
  end

  resources :bookmarks do
    concerns :exportable

    collection do
      delete 'clear'
    end
  end

  mount Riiif::Engine => '/images', as: 'riiif'
  mount Spotlight::Engine, at: 'spotlight'
end
